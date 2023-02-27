import './sign-in-form.styles.scss';

import Button from '../button/button.component';

import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
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
    const responce = await signInWithGooglePopup();
    const { user } = responce;
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log('userDocRef:', userDocRef);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responce = await signInAuthUserWithEmailAndPassword(email, password);
      console.log('responce:', responce);
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
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with you email and password or via google</span>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google signin
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

// <input type="text" name="password" required pattern="(?=.*\d)(?=.*[A-Z]).{6,}" title="Please enter a password with at least 6 characters, 1 number, and 1 capital letter">
// <input type="password" id="password" name="password" required pattern=".{6,}" title="Password must be at least 6 characters long.">
