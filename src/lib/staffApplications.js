import { db } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc,
  getDoc,
  serverTimestamp 
} from "firebase/firestore";

const COLLECTION_NAME = "staffApplications";

/**
 * Submit a staff application to Firestore
 * @param {Object} applicationData - Application data from form
 * @returns {Promise<string>} Document ID of created application
 * @throws {Error} If submission fails
 */
export async function submitStaffApplication(applicationData) {
  if (!auth.currentUser) {
    throw new Error("You must be authenticated to submit an application");
  }

  if (!auth.currentUser.emailVerified) {
    throw new Error("Your email must be verified to apply");
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      // User identification
      userId: auth.currentUser.uid,
      email: auth.currentUser.email,
      
      // Application data
      fullName: applicationData.name,
      age: applicationData.age,
      discordUsername: applicationData.discord,
      robloxUsername: applicationData.roblox,
      position: applicationData.position,
      experience: applicationData.experience,
      reason: applicationData.motivation,
      motivation: applicationData.motivation,
      availability: applicationData.availability || "Full-time",
      portfolio: applicationData.portfolio || "",
      portfolioLink: applicationData.portfolio || "",
      
      // Metadata
      createdAt: serverTimestamp(),
      status: "pending",
    });

    return docRef.id;
  } catch (error) {
    console.error("Error submitting staff application:", error);
    throw new Error(
      error.message || "Failed to submit application. Please try again."
    );
  }
}

/**
 * Get all applications for the current user
 * @returns {Promise<Array>} Array of user's applications
 */
export async function getUserApplications() {
  if (!auth.currentUser) {
    throw new Error("You must be authenticated");
  }

  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", auth.currentUser.uid)
    );
    
    const querySnapshot = await getDocs(q);
    const applications = [];
    
    querySnapshot.forEach((doc) => {
      applications.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return applications;
  } catch (error) {
    console.error("Error fetching user applications:", error);
    throw error;
  }
}

/**
 * Get a specific application by ID
 * @param {string} applicationId - Document ID
 * @returns {Promise<Object>} Application data
 */
export async function getApplicationById(applicationId) {
  if (!auth.currentUser) {
    throw new Error("You must be authenticated");
  }

  try {
    const docRef = doc(db, COLLECTION_NAME, applicationId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Application not found");
    }

    const data = docSnap.data();

    // Ensure user can only view their own application
    if (data.userId !== auth.currentUser.uid) {
      throw new Error("You do not have permission to view this application");
    }

    return {
      id: docSnap.id,
      ...data,
    };
  } catch (error) {
    console.error("Error fetching application:", error);
    throw error;
  }
}

/**
 * Check if user has already applied for a specific position
 * @param {string} position - Position title
 * @returns {Promise<boolean>} True if user has already applied
 */
export async function hasUserAppliedForPosition(position) {
  if (!auth.currentUser) {
    return false;
  }

  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", auth.currentUser.uid),
      where("position", "==", position)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking application status:", error);
    return false;
  }
}
