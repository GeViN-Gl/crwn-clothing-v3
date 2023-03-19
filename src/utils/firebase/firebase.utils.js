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

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// Initialize Firebase app with configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAgpB3H88yROKntZ2ey9ngeTrE4YqhBwqo',
  authDomain: 'crwn-clothig-v3-db.firebaseapp.com',
  projectId: 'crwn-clothig-v3-db',
  storageBucket: 'crwn-clothig-v3-db.appspot.com',
  messagingSenderId: '737905056393',
  appId: '1:737905056393:web:7465878998e061a88a0458',
};
export const firebaseApp = initializeApp(firebaseConfig);

// Create a GoogleAuthProvider object with custom parameters
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  promt: 'select_account',
});

// Export Firebase authentication and Firestore database instances
export const auth = getAuth();
export const db = getFirestore();

/**
 * Adds a collection and documents to a Firestore database using a batch write.
 * @param {string} collectionKey - The name of the collection to add.
 * @param {Object[]} objectsToAdd - The array of objects to add as documents.
 * @param {string} field - The name of the field to use as the document ID.
 * @returns {Promise<void>} A promise that resolves when the batch is committed.
 */
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log(`batch done`);
};

/**
 * Gets categories and documents from a Firestore collection.
 * @returns {Promise<Object>} A promise that resolves to an object mapping category titles to items arrays.
 */
export const getCategoriesAndDocuments = async (
  collectionKey = 'categories'
) => {
  // const collectionKey = 'categories';
  const collectionRef = collection(db, collectionKey);

  // Create a query to get all documents from the collection
  const q = query(collectionRef);

  // Execute the query and get a snapshot of the documents
  const querySnapShot = await getDocs(q);

  // Reduce the snapshot to an object mapping category titles to items arrays
  return querySnapShot.docs.map((docSnapshot) => docSnapshot.data());
  // categoryMap = querySnapShot.docs
  // .reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
};

/**
 * Sign in using Google popup authentication.
 * @returns Promise containing the user's authentication data.
 */
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

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

  return userSnapshot;
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

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
