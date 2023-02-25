import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  const logGoogleUser = async () => {
    const responce = await signInWithGooglePopup();
    const { user } = responce;
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log('userDocRef:', userDocRef);
  };

  return (
    <div>
      <h1>SignIn Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
