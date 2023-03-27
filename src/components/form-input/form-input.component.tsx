import { FormInputLabel, Group, Input } from './form-input.styles';

import { InputHTMLAttributes, FC } from 'react';

export type FormInputProps = {
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
	return (
		<Group className='group'>
			<Input className='form-input' {...otherProps} />
			{label && (
				<FormInputLabel
					shrink={Boolean(
						otherProps.value &&
							typeof otherProps.value === 'string' &&
							otherProps.value.length
					)}
					// className={`form-input-label${
					// 	otherProps.value.length ? ' shrink' : ''
					//   }`}
				>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
};

export default FormInput;
