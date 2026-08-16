const functions = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

exports.onUserCreated = functions.firestore
  .document("users/{userId}")
  .onCreate((snapshot, context) => {
    const userId = context.params.userId;
    const data = snapshot.data() || {};
    logger.info("New user document created", {
      uid: userId,
      enrollmentData: data.enrollmentData || data,
    });
    return null;
  });
