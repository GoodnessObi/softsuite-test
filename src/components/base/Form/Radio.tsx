type RadioButtonProps = {
	label: string;
	register: Record<string, any>;
	required: boolean;
	id: string;
	options: { value: number; label: string }[];
};

const Radio: React.FC<RadioButtonProps> = ({
	label,
	register,
	// required,
	options,
}) => {
	return (
		<div>
			<label>{label}</label>
			<div className='radio'>
				{options.map((option) => (
					<div className='radiogroup' key={option.value}>
						<input
							className=''
							type='radio'
							value={option.value}
							{...register}
						/>
						<label>{option.label}</label>
					</div>
				))}
			</div>
		</div>
	);
};

export { Radio };
