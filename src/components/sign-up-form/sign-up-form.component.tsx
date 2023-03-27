import { SignUpContainer } from './sign-up-form.styles';

import Button from '../button/button.component';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AuthError, AuthErrorCodes } from 'firebase/auth';

import { signUpStart } from '../../store/user/user.action';

import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const dispatch = useDispatch();

	const resetFormFields = () => setFormFields(defaultFormFields);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (confirmPassword !== password) {
			alert('The password does not match the confirmation password');
			return;
		}

		try {
			dispatch(signUpStart(email, password, displayName));
			resetFormFields();
		} catch (error) {
			if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
				alert('Email already in use');
			} else {
				console.error(
					`Error while creating user with email and password ${error}`
				);
			}
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignUpContainer>
			<h2>Don't have an account?</h2>
			<span>Sign up with you email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					required
					type='text'
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>
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
					pattern='.{6,}'
					title='Password must be at least 6 characters long.'
				/>
				<FormInput
					label='Confirm Password'
					required
					type='password'
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
					pattern='.{6,}'
					title='Password must be at least 6 characters long.'
				/>
				<Button type='submit'>Sign Up</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
