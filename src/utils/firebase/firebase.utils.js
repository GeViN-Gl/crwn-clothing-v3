// Import Firebase App and Auth SDK
import { initializeApp } from 'firebase/app';
import {
  getAuth, // Get the authentication service for the app
  signInWithRedirect, // Sign in with a redirect
  signInWithPopup, // Sign in with a popup
  GoogleAuthProvider, // Google authentication provider
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// TEST Part
// logger true/false
const isLogEnabled = false;

// Firebase app configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAgpB3H88yROKntZ2ey9ngeTrE4YqhBwqo',
  authDomain: 'crwn-clothig-v3-db.firebaseapp.com',
  projectId: 'crwn-clothig-v3-db',
  storageBucket: 'crwn-clothig-v3-db.appspot.com',
  messagingSenderId: '737905056393',
  appId: '1:737905056393:web:7465878998e061a88a0458',
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
if (isLogEnabled) {
  console.log('firebaseApp:', firebaseApp);
}

// Create a Google authentication provider instance
const provider = new GoogleAuthProvider();

// Set custom parameters for the provider instance
provider.setCustomParameters({
  promt: 'select_account',
});

// Export the authentication service for the app
export const auth = getAuth();

// Export a function to sign in with Google using a popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

/**
 * Creates a user document in Firestore if one does not already exist for the provided user authentication data.
 *
 * @async
 * @param {firebase.User} userAuth - The user authentication data.
 * @returns {Promise<firebase.firestore.DocumentReference>} A Promise that resolves with the user document reference in Firestore.
 */
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (isLogEnabled) {
    console.log('userDocRef:', userDocRef);
    console.log('userSnapshot:', userSnapshot);
  }

  // if user data does NOT exist
  // create/set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
      console.log('new user created');
    } catch (error) {
      console.error(`💥 error while setting user ${error.message}`);
    }
  }

  // if user data does exist, return userDocRef
  console.log('User exist');
  return userDocRef;
};
