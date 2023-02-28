import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Initialize Firebase app with configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAgpB3H88yROKntZ2ey9ngeTrE4YqhBwqo',
  authDomain: 'crwn-clothig-v3-db.firebaseapp.com',
  projectId: 'crwn-clothig-v3-db',
  storageBucket: 'crwn-clothig-v3-db.appspot.com',
  messagingSenderId: '737905056393',
  appId: '1:737905056393:web:7465878998e061a88a0458',
};
const firebaseApp = initializeApp(firebaseConfig);

// Create a GoogleAuthProvider object with custom parameters
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  promt: 'select_account',
});

// Export Firebase authentication and Firestore database instances
export const auth = getAuth();
export const db = getFirestore();

/**
 * Sign in using Google popup authentication.
 * @returns Promise containing the user's authentication data.
 */
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

/**
 * Creates a Firestore document for the user with additional information.
 * @param {Object} userAuth - The user's authentication data.
 * @param {Object} additionalInformation - Additional information to store in the document.
 * @returns Promise containing a reference to the Firestore document.
 */
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.error(`💥 error while setting user ${error.message}`);
    }
  }

  return userDocRef;
};

/**
 * Creates a user account using email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns Promise containing the user's authentication data.
 */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Signs in a user using email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns Promise containing the user's authentication data.
 */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Signs out the current user.
 * @returns Promise containing the result of the sign out operation.
 */
export const signOutUser = async () => await signOut(auth);

/**
 * Listens for changes in the user's authentication state.
 * @param {function} callback - The callback function to execute when the authentication state changes.
 * @returns Function to stop listening for authentication state changes.
 */
export const onAuthStateChangedListener = (callback) => {
  if (!callback) return;
  return onAuthStateChanged(auth, callback);
};
