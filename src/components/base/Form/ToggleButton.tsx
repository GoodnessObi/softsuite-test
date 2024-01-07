interface CheckboxProps {
	label: string;
	value: string;
	onChange: (arg: boolean) => void;
	register: Record<string, string | any>;
	required: boolean;
	id: string;
}

const ToggleButton: React.FC<CheckboxProps> = ({ label, register, id }) => {
	return (
		<div>
			<label htmlFor={id}>
				<div>{label}</div>
				<div className='radio'>
					<div className='switch'>
						<input type='checkbox' id={id} {...register} />
						<span className='slider'></span>
					</div>
				</div>
			</label>
		</div>
	);
};

export { ToggleButton };
