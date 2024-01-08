import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Input, SelectBox, TextArea } from '../../../../components/base/Form';
import Button from '../../../../components/base/Button/Button';
import { linkFormSteps } from '../../../../lib/data';
import { FormElementLinkType } from '../../../../types/apiResponseTypes';

export type FormProps = {
	setFormStep: React.Dispatch<React.SetStateAction<string>>;
	closeModal: () => void;
	setFormData: React.Dispatch<React.SetStateAction<FormElementLinkType>>;
	values: FormElementLinkType;
};

export default function StaffInfo({
	setFormStep,
	closeModal,
	setFormData,
	values,
}: FormProps) {
	const schema = yup.object({
		id: yup.string().required('ID is required'),
		name: yup.string().required('Name is required'),
		// elementId: yup.number().required('Element ID is required'),
		suborganizationId: yup.number().required('Suborganization ID is required'),
		locationId: yup.number().required('Location ID is required'),
		departmentId: yup.number().required('Department ID is required'),
		employeeCategoryId: yup
			.number()
			.required('Employee Category ID is required'),
		// employeeCategoryValueId: yup
		// 	.number()
		// 	.required('Employee Category Value ID is required'),
		employeeTypeId: yup.number().required('Employee Type ID is required'),
		employeeTypeValueId: yup
			.number()
			.required('Employee Type Value ID is required'),
		jobTitleId: yup.number().required('Job Title ID is required'),
		// grade: yup.number().required('Grade is required'),
		// gradeStep: yup.number().required('Grade Step is required'),
		// unionId: yup.number().required('Union ID is required'),
		// amountType: yup.string().required('Amount Type is required'),
		// amount: yup.number().required('Amount is required'),
		// rate: yup.number().required('Rate is required'),
		// effectiveStartDate: yup
		// 	.string()
		// 	.required('Effective Start Date is required'),
		// effectiveEndDate: yup.string().required('Effective End Date is required'),
		// status: yup.string().required('Status is required'),
		// automate: yup.string().required('Automate is required'),
		// additionalInfo: yup
		// 	.array()
		// 	.of(
		// 		yup.object().shape({
		// 			lookupId: yup.number().required('Lookup ID is required'),
		// 			lookupValueId: yup.number().required('Lookup Value ID is required'),
		// 		})
		// 	)
		// 	.required('Additional Info is required'),
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
		const {
			name,
			suborganizationId,
			locationId,
			departmentId,
			employeeCategoryId,
			jobTitleId,
			employeeTypeValueId,
		} = values;

		setValue('name', name ?? '');
		setValue('suborganizationId', suborganizationId ?? 0);
		setValue('locationId', locationId ?? 0);
		setValue('departmentId', departmentId ?? 0);
		setValue('employeeCategoryId', employeeCategoryId ?? 0);
		setValue('jobTitleId', jobTitleId ?? 0);
		setValue('employeeTypeValueId', employeeTypeValueId ?? 0);
		// eslint-disable-next-line
	}, [values]);

	const saveData = (data: any) => {
		console.log('--data', data);
		setFormData((prev) => ({ ...prev, ...data }));
		setFormStep(linkFormSteps.stepTwo);
	};

	const onError = (err: any) => {
		console.log('>>>>>>>', err);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(saveData, onError)}>
				<div className='form__cpntainer'>
					<div className='form-row'>
						<Input
							label='Name'
							required
							placeholder='Input name'
							register={{ ...register('name') }}
							error={errors.name}
						/>
					</div>

					<div className='form-row-2'>
						<SelectBox
							label='Suborganization'
							placeholder='Input name'
							id='suborganization'
							register={{
								...register('suborganizationId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.suborganizationId}
						>
							<option value='201'>Select Element Classification</option>
						</SelectBox>

						<SelectBox
							label='Department'
							id='departmentId'
							register={{
								...register('departmentId', {
									setValueAs: (v) => parseInt(v),
								}),
							}}
							error={errors.departmentId}
						>
							<option value='3'>Select Element Classification</option>
						</SelectBox>
					</div>

					<div className='form-row-2'>
						<SelectBox
							label='Job Title'
							id='payRunId'
							register={{
								...register('jobTitleId', {
									setValueAs: (v) => parseInt(v),
								}),
							}}
							error={errors.jobTitleId}
						>
							<option value='3'>Select Element Classification</option>
						</SelectBox>
						<SelectBox
							label='category'
							id='categoryId'
							register={{
								...register('locationId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.locationId}
						>
							<option value='401'>Select Element Classification</option>
						</SelectBox>
					</div>

					<div className='form-row-2'>
						<SelectBox
							label='Employee Type'
							id='employeeTypeValueId'
							register={{
								...register('employeeTypeValueId', {
									setValueAs: (v) => parseInt(v),
								}),
							}}
							error={errors.employeeTypeValueId}
						>
							<option value='3'>Select Element Classification</option>
						</SelectBox>

						<SelectBox
							label='Employee Category'
							id='categoryId'
							register={{
								...register('employeeCategoryId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.employeeCategoryId}
						>
							<option value='401'>Select Element Classification</option>
						</SelectBox>
					</div>
				</div>

				<div className='form-btn__wrapper'>
					<Button
						btnType='primary-inverse'
						styleProp={{ width: '100%' }}
						onClick={closeModal}
					>
						Cancel
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
