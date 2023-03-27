import { initializeApp } from 'firebase/app';

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	NextOrObserver,
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
	QueryDocumentSnapshot,
} from 'firebase/firestore';
import { Category } from '../../store/category/category.types';

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

export type ObjectToAdd = {
	title: string;
};
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
	console.log(`batch done`);
};

export const getCategoriesAndDocuments = async (
	collectionKey = 'categories'
): Promise<Category[]> => {
	const collectionRef = collection(db, collectionKey);

	const q = query(collectionRef);

	const querySnapShot = await getDocs(q);

	return querySnapShot.docs.map(
		(docSnapshot) => docSnapshot.data() as Category
	);
};

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export type AdditionalInformation = {
	displayName?: string;
};
export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
			console.error(`💥 error while setting user ${error}`);
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
	if (!callback) return;
	return onAuthStateChanged(auth, callback);
};

export const getCurrentUser = (): Promise<User | null> => {
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
