import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import FormInput from '../form-input/form-input.component';

import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import {
	googleSignInStart,
	emailSignInStart,
} from '../../store/user/user.action';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => setFormFields(defaultFormFields);

	const dispatch = useDispatch();

	//TODO remove async
	const signInWithGoogle = async () => {
		dispatch(googleSignInStart());
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			dispatch(emailSignInStart(email, password));
			resetFormFields();
		} catch (error) {
			console.error(`unknown error: ${error}`);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with you email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					required
					type='email'
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<FormInput
					label='Password'
					required
					type='password'
					onChange={handleChange}
					name='password'
					value={password}
				/>
				<ButtonsContainer>
					<Button type='submit'>Sign In</Button>
					<Button
						type='button'
						buttonType={BUTTON_TYPES_CLASSES.google}
						onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
