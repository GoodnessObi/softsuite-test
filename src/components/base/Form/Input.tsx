import { FC, InputHTMLAttributes, useId } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	register?: Record<string, string | any>;
	label: string;
	error?: any;
	required?: boolean;
}

const Input: FC<InputProps> = ({
	type = 'text',
	placeholder = '',
	register,
	label,
	error,
	required,
	...props
}) => {
	const id = useId();

	return (
		<div className='form-control'>
			<label
				aria-invalid={error}
				aria-required={required}
				htmlFor={id}
				className=''
			>
				{label}
			</label>
			<input
				{...props}
				autoComplete='none'
				{...register}
				type={type ? type : 'text'}
				placeholder={placeholder}
				id={id}
				data-invalid={!!error}
				className=''
			/>

			{error && (
				<span id={`${id}_help`} className='error'>
					{error?.message}
				</span>
			)}
		</div>
	);
};

export { Input };
