import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

import { useState } from 'react';

import {
  // createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup(); // in respocre i need only UserCred~l.user
    } catch (error) {
      console.error(`Error during google sign-in: ${error.message}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      /*const { user } = */ await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Wrong password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        case 'auth/network-request-failed':
          alert('Network failure');
          break;
        case 'auth/too-many-requests':
          alert('Too many requests');
          break;

        default:
          console.error(`unknown error, code: ${error.code}`);
          break;
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with you email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPES_CLASSES.google}
            onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
