import { FC, HTMLAttributes, useId } from 'react';

interface TextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
	register?: Record<string, string | any>;
	label: string;
	error?: any;
	required?: boolean;
	placeholder?: string;
}

const TextArea: FC<TextAreaProps> = ({
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
			<label aria-invalid={error} aria-required={required} htmlFor={id}>
				{label}
			</label>

			<textarea
				{...props}
				{...register}
				placeholder={placeholder}
				id={id}
				data-invalid={!!error}
			></textarea>
			{error && (
				<span id={`${id}_help`} className='error'>
					{error?.message}
				</span>
			)}
		</div>
	);
};

export { TextArea };
