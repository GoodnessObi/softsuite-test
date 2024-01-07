import { FC, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
	register?: Record<string, any>;
	label: string;
	id: string;
	error?: any;
	required?: boolean;
	className?: string;
	children: ReactNode;
	multiple?: boolean;
	placeholder?: string;
}

const SelectBox: FC<InputProps> = ({
	children,
	id,
	label,
	error,
	required,
	disabled,
	multiple,
	register,
}) => {
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
			<select
				{...register}
				id={id}
				required={required}
				multiple={multiple}
				disabled={disabled}
			>
				{children}
			</select>
			{error && (
				<span id={`${id}_help`} className='error'>
					{error?.message}
				</span>
			)}
		</div>
	);
};

export { SelectBox };
