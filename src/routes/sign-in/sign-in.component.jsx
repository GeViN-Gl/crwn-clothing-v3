import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const responce = await signInWithGooglePopup();
    const { user } = responce;
    // console.log('responce:', responce);
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log('userDocRef:', userDocRef);
  };

  return (
    <div>
      <h1>SignIn Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
    </div>
  );
};

export default SignIn;
