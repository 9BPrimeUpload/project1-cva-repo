console.log('[SERVER] Starting backend...');
const express = require('express');
console.log('[SERVER] express loaded');
const cors = require('cors');
console.log('[SERVER] cors loaded');
const admin = require('firebase-admin');
console.log('[SERVER] firebase-admin loaded');
const https = require('https');
console.log('[SERVER] https loaded');
require('dotenv').config();
console.log('[SERVER] dotenv loaded and env variables configured');

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
  try {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error('Invalid FIREBASE_SERVICE_ACCOUNT_BASE64 configuration.');
  }
} else {
  console.warn('FIREBASE_SERVICE_ACCOUNT_BASE64 is not set. Firebase Admin is unavailable.');
}

const db = admin.firestore ? admin.firestore() : null;
console.log('[SERVER] Firestore initialized');

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1538477558541320213/QMKjvnajsuVf2VI6y76doe0vhU0pB1Y2weTbq0bEJskAKPvCsNyxY5iqvC65BLPVwbhw';
const STAFF_DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1538511108917170186/GHjNAjHPiubj10KJyozMl-PMOyCmKiW1B4WoeTfGk6Z6a_hIvgZc7_IZYQYQKRGvU9Pj';
console.log('[SERVER] Discord webhook configured');

const requireFirebaseUser = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.substring(7).trim()
    : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decodedToken;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired Firebase token.' });
  }
};

async function sendDiscordEmbed({
  url = DISCORD_WEBHOOK_URL,
  title,
  description,
  fields = [],
  color = 0x4f46e5,
  content = '',
  components = [],
}) {
  if (!url) {
    throw new Error('Discord webhook URL is not configured.');
  }

  const safeFields = fields
    .map((field) => ({
      name: String(field.name || 'Field'),
      value: String(field.value ?? '(not provided)'),
      inline: Boolean(field.inline),
    }))
    .slice(0, 25);

  const classicEmbed = {
    color,
    title,
    description,
    fields: safeFields,
    timestamp: new Date().toISOString(),
  };

  const componentText = [
    `## ${title}`,
    description,
    ...safeFields.map((field) => `**${field.name}**\n${field.value}`),
  ]
    .filter(Boolean)
    .join('\n\n');

  const modernComponents = Array.isArray(components) && components.length > 0 ? components : [
    {
      type: 17,
      accent_color: color,
      components: [
        {
          type: 10,
          content: componentText,
        },
      ],
    },
  ];

  const modernPayload = {
    flags: 32768,
    components: modernComponents,
  };

  const classicPayload = {
    ...(content ? { content } : {}),
    embeds: [classicEmbed],
  };

  const sendWebhookRequest = (payloadBody) => {
    const payload = JSON.stringify(payloadBody);

    return new Promise((resolve, reject) => {
      const webhookUrl = new URL(url);
      const options = {
        hostname: webhookUrl.hostname,
        path: webhookUrl.pathname + webhookUrl.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ statusCode: res.statusCode, data });
          } else {
            reject(new Error(`Discord webhook returned ${res.statusCode}: ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(payload);
      req.end();
    });
  };

  try {
    return await sendWebhookRequest(modernPayload);
  } catch (error) {
    const errMessage = String(error && error.message ? error.message : error || '');
    if (errMessage.includes('components') || errMessage.includes('400')) {
      return sendWebhookRequest(classicPayload);
    }
    throw error;
  }
}

async function getNextAppId() {
  const fallback = Math.floor(Date.now() / 1000) % 100000;

  if (!db) {
    return `cva-${String(fallback).padStart(5, '0')}`;
  }

  try {
    const counterRef = db.collection('_counters').doc('enrollments');
    const result = await db.runTransaction(async (transaction) => {
      const counterDoc = await transaction.get(counterRef);
      let count = counterDoc.exists ? (counterDoc.data().count || 0) : 0;
      count += 1;

      if (counterDoc.exists) {
        transaction.update(counterRef, { count });
      } else {
        transaction.set(counterRef, { count });
      }

      return count;
    });

    return `cva-${String(result).padStart(5, '0')}`;
  } catch (error) {
    console.warn('Firestore counter unavailable; using fallback app ID:', error.message || error);
    return `cva-${String(fallback).padStart(5, '0')}`;
  }
}

function getDiscordTimestamp(firestoreTimestamp) {
  if (!firestoreTimestamp) return Math.floor(Date.now() / 1000);
  if (typeof firestoreTimestamp === 'string') {
    return Math.floor(new Date(firestoreTimestamp).getTime() / 1000);
  }
  // Firestore Timestamp object
  if (firestoreTimestamp.toDate) {
    return Math.floor(firestoreTimestamp.toDate().getTime() / 1000);
  }
  return Math.floor(Date.now() / 1000);
}

function getStatusErrorMessage(error) {
  if (error && error.message) {
    return error.message;
  }
  return 'Unexpected server error.';
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ status: 'online' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/send-enrollment-embed', async (req, res) => {
  try {
    console.log('Received enrollment Discord embed request');

    const { email, planType, course, robloxUsername, discordUsername } = req.body;

    if (!email || !planType || !course || !robloxUsername) {
      return res.status(400).json({ error: 'Missing required fields: email, planType, course, robloxUsername' });
    }

    // Generate app ID
    const appId = await getNextAppId();
    console.log(`Generated app ID: ${appId}`);

    // Get current timestamp in Discord epoch
    const enrollmentTimestamp = Math.floor(Date.now() / 1000);

    try {
      await sendDiscordEmbed({
        title: '🎓 Academy Enrollment Confirmation',
        description: 'A new student has successfully enrolled! Here are the details 👇',
        fields: [
          { name: '📘 Plan Type', value: planType || '(not provided)', inline: false },
          { name: '📧 Email', value: email || '(not provided)', inline: false },
          { name: '📚 Course', value: course || '(not provided)', inline: false },
          { name: '🎮 Roblox Username', value: robloxUsername || '(not provided)', inline: false },
          { name: '💬 Discord Username', value: discordUsername || '(not provided)', inline: false },
          { name: '🗓️ Enrollment Date', value: `<t:${enrollmentTimestamp}:F> • <t:${enrollmentTimestamp}:R>`, inline: false },
          { name: '🆔 Application ID', value: appId, inline: false },
          { name: '✅ Status', value: 'Enrollment processed successfully', inline: false },
        ],
        color: 0x585F82,
      });
      console.log(`Discord webhook message sent successfully for app ID: ${appId}`);
    } catch (discordError) {
      console.error(`Discord webhook failed: ${discordError.message}`);
      return res.status(500).json({ error: `Discord notification failed: ${discordError.message}` });
    }

    console.log('Enrollment notification sent successfully');

    return res.status(200).json({
      success: true,
      applicationId: appId,
      message: 'Enrollment sent to Discord successfully',
    });
  } catch (error) {
    console.error('send-enrollment-embed failed:', error && error.message ? error.message : error);
    return res.status(500).json({ error: 'Failed to send enrollment: ' + (error.message || 'Unknown error') });
  }
});

app.post('/send-staff-application-embed', async (req, res) => {
  try {
    console.log('Received staff application Discord embed request');

    const {
      fullName,
      email,
      age,
      robloxUsername,
      discordUsername,
      position,
      availability,
      experience,
      portfolioLink,
      motivation,
    } = req.body || {};

    if (!fullName || !email || !robloxUsername || !discordUsername || !position || !experience || !motivation) {
      return res.status(400).json({
        error: 'Missing required staff application fields: fullName, email, robloxUsername, discordUsername, position, experience, motivation.',
      });
    }

    const appId = await getNextAppId();
    const enrollmentTimestamp = Math.floor(Date.now() / 1000);

    try {
      await sendDiscordEmbed({
        url: STAFF_DISCORD_WEBHOOK_URL,
        title: '🧑‍🏫 Staff Application Submission',
        description: 'A new staff application has been submitted. Here are the details 👇',
        fields: [
          { name: '🧑 Full Name', value: fullName || '(not provided)', inline: false },
          { name: '📧 Email', value: email || '(not provided)', inline: false },
          { name: '🎂 Age', value: age || '(not provided)', inline: false },
          { name: '🎮 Roblox Username', value: robloxUsername || '(not provided)', inline: false },
          { name: '💬 Discord Username', value: discordUsername || '(not provided)', inline: false },
          { name: '📍 Position', value: position || '(not provided)', inline: false },
          { name: '🗓️ Availability', value: availability || '(not provided)', inline: false },
          { name: '💼 Experience', value: experience || '(not provided)', inline: false },
          { name: '🔗 Portfolio', value: portfolioLink || '(not provided)', inline: false },
          { name: '✨ Why Join', value: motivation || '(not provided)', inline: false },
          { name: '🕒 Submitted', value: `<t:${enrollmentTimestamp}:F> • <t:${enrollmentTimestamp}:R>`, inline: false },
          { name: '🆔 Application ID', value: appId, inline: false },
          { name: '✅ Status', value: 'Staff application received successfully', inline: false },
        ],
        color: 0x585F82,
      });
      console.log(`Staff Discord webhook message sent successfully for app ID: ${appId}`);
    } catch (discordError) {
      console.error(`Staff Discord webhook failed: ${discordError.message}`);
      return res.status(500).json({ error: `Staff notification failed: ${discordError.message}` });
    }

    return res.status(200).json({
      success: true,
      applicationId: appId,
      message: 'Staff application sent to Discord successfully',
    });
  } catch (error) {
    console.error('send-staff-application-embed failed:', error && error.message ? error.message : error);
    return res.status(500).json({ error: 'Failed to send staff application: ' + (error.message || 'Unknown error') });
  }
});

app.post('/create-staff-application-notification', requireFirebaseUser, async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Firebase Admin is not available.' });
    }

    const uid = req.firebaseUser.uid;
    const { applicationId } = req.body || {};

    let staffApplicationDocRef = null;

    if (applicationId) {
      staffApplicationDocRef = db.collection('staffApplications').doc(applicationId);
    } else {
      const staffQuery = await db
        .collection('staffApplications')
        .where('userId', '==', uid)
        .limit(1)
        .get();

      if (staffQuery.empty) {
        return res.status(404).json({ error: 'Staff application not found.' });
      }

      staffApplicationDocRef = staffQuery.docs[0].ref;
    }

    const staffSnap = await staffApplicationDocRef.get();
    if (!staffSnap.exists) {
      return res.status(404).json({ error: 'Staff application not found.' });
    }

    const applicationData = staffSnap.data() || {};
    if (applicationData.userId !== uid) {
      return res.status(403).json({ error: 'You do not have permission to notify for this application.' });
    }

    if (applicationData.discordNotificationSent === true) {
      return res.status(409).json({ error: 'Discord staff application notification already sent.' });
    }

    const firebaseUser = await admin.auth().getUser(uid);
    if (!firebaseUser.emailVerified) {
      return res.status(403).json({ error: 'Email must be verified before notifying for a staff application.' });
    }

    try {
      await sendDiscordEmbed({
        title: 'New Staff Application',
        description: 'A new staff application has been submitted.',
        fields: [
          { name: 'Full Name', value: applicationData.fullName || 'N/A' },
          { name: 'Email', value: firebaseUser.email || applicationData.email || 'N/A' },
          { name: 'Roblox Username', value: applicationData.robloxUsername || 'N/A' },
          { name: 'Discord Username', value: applicationData.discordUsername || 'N/A' },
          { name: 'Position', value: applicationData.position || 'N/A' },
          { name: 'Availability', value: applicationData.availability || 'N/A' },
          { name: 'Experience', value: applicationData.experience || 'N/A' },
          { name: 'Portfolio', value: applicationData.portfolioLink || applicationData.portfolio || 'N/A' },
          { name: 'Why Join', value: applicationData.reason || applicationData.motivation || 'N/A' },
          { name: 'Created At', value: applicationData.createdAt || 'N/A' },
        ],
      });
      console.log('Discord webhook message sent successfully for staff application');
    } catch (discordError) {
      console.error(`Discord webhook failed: ${discordError.message}`);
      return res.status(500).json({ error: `Discord notification failed: ${discordError.message}` });
    }

    const messageId = `staff-${Date.now()}-${uid}`;

    await staffApplicationDocRef.update({
      discordNotificationSent: true,
      discordMessageId: messageId,
    });

    return res.status(200).json({
      success: true,
      messageId,
      uid,
    });
  } catch (error) {
    console.error('create-staff-application-notification failed');
    const errorMessage = getStatusErrorMessage(error);

    if (errorMessage.includes('Discord')) {
      return res.status(500).json({ error: 'Discord notification failed.' });
    }

    return res.status(500).json({ error: 'Unexpected server error.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER] Backend server running on http://0.0.0.0:${PORT}`);
});

module.exports = app;
