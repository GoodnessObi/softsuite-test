import { useEffect } from 'react';
import { FormProps } from './StaffInfo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { linkFormSteps } from '../../../../lib/data';
import { SelectBox } from '../../../../components/base/Form';
import Button from '../../../../components/base/Button/Button';

export default function AdditionalInfo({
	setFormStep,
	setFormData,
	values,
}: Omit<FormProps, 'closeModal'>) {
	const schema = yup.object({
		grade: yup.number().required('Grade is required'),
		gradeStep: yup.number().required('Grade Step is required'),
		unionId: yup.number().required('Union ID is required'),
		additionalInfo: yup
			.array()
			.of(
				yup.object().shape({
					lookupId: yup.number().required('Lookup ID is required'),
					lookupValueId: yup.number().required('Lookup Value ID is required'),
				})
			)
			.required('Additional Info is required'),
	});

	const {
		handleSubmit,
		register,
		// watch,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		const { grade, gradeStep, unionId, additionalInfo } = values;

		setValue('grade', grade ?? 0);
		setValue('gradeStep', gradeStep ?? 0);
		setValue('unionId', unionId ?? 0);
		setValue('additionalInfo', additionalInfo ?? []);
		// eslint-disable-next-line
	}, [values]);

	const saveData = (data: any) => {
		console.log('--data', data);
		setFormData((prev) => ({ ...prev, ...data }));
		setFormStep(linkFormSteps.stepThree);
	};

	const onError = (err: any) => {
		console.log('>>>>>>>', err);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(saveData, onError)}>
				<div className='form__cpntainer'>
					<div className='form-row-2'>
						<SelectBox
							label='Grade'
							placeholder='Input name'
							id='suborganization'
							register={{
								...register('grade', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.grade}
						>
							<option value='201'>Select Element Classification</option>
						</SelectBox>

						<SelectBox
							label='Grade Step'
							id='gradeStep'
							register={{
								...register('gradeStep', {
									setValueAs: (v) => parseInt(v),
								}),
							}}
							error={errors.gradeStep}
						>
							<option value='3'>Select Element Classification</option>
						</SelectBox>
					</div>

					<div className='form-row'>
						<SelectBox
							label='Union'
							placeholder='Input name'
							id='unionId'
							register={{
								...register('unionId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.unionId}
						>
							<option value='201'>Select Element Classification</option>
						</SelectBox>
					</div>

					<div className='form-row'>
						<SelectBox
							label='Union'
							placeholder='Input name'
							id='unionId'
							register={{
								...register('unionId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.unionId}
						>
							<option value='201'>Select Element Classification</option>
						</SelectBox>

						<SelectBox
							label='Union'
							placeholder='Input name'
							id='unionId'
							register={{
								...register('unionId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.unionId}
						>
							<option value='201'>Select Element Classification</option>
						</SelectBox>
					</div>
				</div>

				<div className='form-btn__wrapper'>
					<Button
						btnType='primary-inverse'
						styleProp={{ width: '100%' }}
						onClick={() => setFormStep(linkFormSteps.stepOne)}
					>
						Back
					</Button>
					<Button
						type='submit'
						styleProp={{ width: '100%', justifyContent: 'center' }}
					>
						Next
					</Button>
				</div>
			</form>
		</div>
	);
}
