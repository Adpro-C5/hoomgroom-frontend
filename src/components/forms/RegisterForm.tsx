'use client';

import { useRegister } from '@/hooks';
import { Form } from '@/components/forms';

export default function RegisterForm() {
	const {
        fullName,
        birthDate,
        gender,
		username,
		email,
		address,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
	} = useRegister();

	const config = [
        {
			labelText: 'Full Name',
			labelId: 'fullName',
			type: 'text',
			value: fullName,
			required: true,
		},
        {
			labelText: 'Date of Birth',
			labelId: 'birthDate',
			type: 'text',
			value: birthDate,
			required: true,
		},
        {
			labelText: 'Gender',
			labelId: 'gender',
			type: 'text',
			value: gender,
			required: true,
		},
		{
			labelText: 'Username',
			labelId: 'username',
			type: 'text',
			value: username,
			required: true,
		},
		{
			labelText: 'Email',
			labelId: 'email',
			type: 'email',
			value: email,
			required: true,
		},
		{
			labelText: 'Address',
			labelId: 'address',
			type: 'text',
			value: address,
			required: true,
		},
		{
			labelText: 'Password',
			labelId: 'password',
			type: 'password',
			value: password,
			required: true,
		},
		{
			labelText: 'Confirm password',
			labelId: 're_password',
			type: 'password',
			value: re_password,
			required: true,
		},
	];

	return (
		<Form
			config={config}
			isLoading={isLoading}
			btnText='Sign up'
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
}