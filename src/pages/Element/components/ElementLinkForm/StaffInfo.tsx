import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, SelectBox } from '../../../../components/base/Form';
import Button from '../../../../components/base/Button/Button';
import { linkFormSteps, lookUpIds } from '../../../../lib/data';
import { FormElementLinkType } from '../../../../types/apiResponseTypes';
import { useAppSelector } from '../../../../store/hook';
import useGetSuborganizations from '../../../../hooks/useGetSuborganization';
import useGetDepartments from '../../../../hooks/useGetDepartments';
import useGetLookupValues from '../../../../hooks/useGetLookupValues';

const schema = yup.object({
	name: yup.string().required('Name is required'),
	suborganizationId: yup.number(),
	locationId: yup.number(),
	departmentId: yup.number(),
	employeeCategoryValueId: yup.number(),
	employeeCategoryId: yup.number(),
	employeeTypeId: yup.number(),
	employeeTypeValueId: yup.number(),
	jobTitleId: yup.number(),
});

export type FormProps = {
	setFormStep: React.Dispatch<React.SetStateAction<string>>;
	closeModal: () => void;
	setFormData: React.Dispatch<
		React.SetStateAction<FormElementLinkType | undefined>
	>;
};

export default function StaffInfo({
	setFormStep,
	closeModal,
	setFormData,
}: FormProps) {
	const elementLink = useAppSelector(
		(state) => state.elementLinks.currentElementLink
	);

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: elementLink?.name ?? '',
			suborganizationId: elementLink?.suborganizationId ?? 0,
			departmentId: elementLink?.departmentId ?? 0,
			jobTitleId: elementLink?.jobTitleId ?? 0,
			locationId: elementLink?.locationId ?? 0,
			employeeCategoryValueId: elementLink?.employeeCategoryValueId ?? 0,
			employeeTypeValueId: elementLink?.employeeTypeValueId ?? 0,
		},
	});

	const suborgSelected = watch('suborganizationId');
	const { data: subOrganizations } = useGetSuborganizations();
	const { data: departments } = useGetDepartments({
		orgId: suborgSelected ? suborgSelected.toString() : '',
	});
	const { data: jobs } = useGetLookupValues(lookUpIds.jobTitle);
	const { data: locations } = useGetLookupValues(lookUpIds.location);
	const { data: employeeTypes } = useGetLookupValues(lookUpIds.employeeType);
	const { data: employeecategories } = useGetLookupValues(
		lookUpIds.employeeCategory
	);

	const saveData = (data: any) => {
		data.employeeTypeId =
			data.employeeTypeValueId != 0 ? +lookUpIds.employeeType : 0;
		data.employeeCategoryId =
			data.employeeCategoryValueId != 0 ? +lookUpIds.elementCategory : 0;

		setFormData((prev) => ({ ...prev, ...data }));
		console.log(data, 'heyyeyyyy');
		setFormStep(linkFormSteps.stepTwo);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(saveData)}>
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
							<option value='' disabled>
								Select{' '}
							</option>
							{subOrganizations?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
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
							disabled={!suborgSelected}
						>
							<option value='' disabled>
								Select{' '}
							</option>
							{departments?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
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
							<option value='' disabled>
								Select{' '}
							</option>
							{jobs?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</SelectBox>
						<SelectBox
							label='Location'
							id='locationId'
							register={{
								...register('locationId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.locationId}
						>
							<option value='' disabled>
								Select{' '}
							</option>
							{locations?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
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
							<option value='' disabled>
								Select{' '}
							</option>
							{employeeTypes?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</SelectBox>

						<SelectBox
							label='Employee Category'
							id='categoryId'
							register={{
								...register('employeeCategoryValueId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.employeeCategoryValueId}
						>
							<option value='' disabled>
								Select{' '}
							</option>
							{employeecategories?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
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
