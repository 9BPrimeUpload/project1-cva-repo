
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export async function signup({
  email,
  password,
  planType,
  course,
  age,
  previousRobloxExperience,
  robloxUsername,
  discordUsername,
}) {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = result.user;

  // Derive fullName from email (part before @) as placeholder
  const fullName = email.split('@')[0];

  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    planType,
    course,
    fullName,
    age,
    previousRobloxExperience,
    robloxUsername,
    discordUsername,
    createdAt: serverTimestamp(),
  });

  await sendEmailVerification(user);

  return user;
}

export async function sendEnrollmentEmbed(enrollmentData) {
  if (!enrollmentData) {
    throw new Error("No enrollment data provided.");
  }

  console.log('Sending enrollment to Discord:', enrollmentData);
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  
  const response = await fetch(`${backendUrl}/send-enrollment-embed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(enrollmentData),
  });

  console.log(`Discord embed endpoint response: ${response.status}`);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send enrollment notification');
  }

  return await response.json();
}

export async function sendStaffApplicationEmbed(applicationData) {
  if (!applicationData) {
    throw new Error("No staff application data provided.");
  }

  console.log('Sending staff application to Discord:', applicationData);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const response = await fetch(`${backendUrl}/send-staff-application-embed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicationData),
  });

  console.log(`Staff Discord embed endpoint response: ${response.status}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send staff application notification');
  }

  return await response.json();
}

export async function login(email, password) {
  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return result.user;
}

export async function logout() {
  await signOut(auth);
}
 
export async function resendVerification() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user is currently signed in.");
  }

  await sendEmailVerification(user);
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

export function observeAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}