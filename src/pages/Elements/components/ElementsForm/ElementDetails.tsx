import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, SelectBox, TextArea } from '../../../../components/base/Form';
import Button from '../../../../components/base/Button/Button';
import { formSteps, lookUpIds } from '../../../../lib/data';
import { FormElementType } from '../../../../types/apiResponseTypes';
import useGetLookupValues from '../../../../hooks/useGetLookupValues';

const schema = yup.object({
	name: yup.string().required('Name is required'),
	description: yup.string().required('Description is required'),
	payRunId: yup.number(),
	classificationId: yup.number(),
	categoryId: yup.number(),
	payRunValueId: yup
		.number()
		.required('Pay Run ID is required')
		.positive('Pay Run ID must be a positive number'),
	classificationValueId: yup
		.number()
		.required('Classification ID is required')
		.positive('Classification ID must be a positive number'),
	categoryValueId: yup
		.number()
		.required('Category ID is required')
		.positive('Category ID must be a positive number'),
	reportingName: yup.string().required('Reporting Name is required'),
});

export default function ElementDetails({
	setFormStep,
	closeModal,
	setFormData,
	values,
}: {
	setFormStep: React.Dispatch<React.SetStateAction<string>>;
	closeModal: () => void;
	setFormData: React.Dispatch<React.SetStateAction<FormElementType>>;
	values: FormElementType;
}) {
	const {
		handleSubmit,
		register,
		watch,
		getValues,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: values,
	});

	const { data: classifications, id: classificationParentId } =
		useGetLookupValues(lookUpIds.elementClassification);
	const { data: categoriesData, id: categoryParentId } = useGetLookupValues(
		lookUpIds.elementCategory
	);
	const payruns = useGetLookupValues(lookUpIds.payRun);
	const selectedClassificationId = watch('classificationValueId');

	const filteredCategories = () => {
		const indClassification = classifications.find(
			(classification) => +classification.id === selectedClassificationId
		);

		if (indClassification?.name === 'Deduction') {
			console.log(categoriesData.filter((item) => item.name !== 'Deduction'));
			return categoriesData.filter((item) => item.name.includes('Deduction'));
		}

		if (indClassification?.name === 'Earning') {
			return categoriesData.filter((item) => item.name.includes('Earning'));
		}

		return categoriesData;
	};

	console.log('watchedFieldValue', getValues('classificationValueId'));

	const saveData = (data: any) => {
		const lookUps = {
			classificationId: +classificationParentId,
			categoryId: +categoryParentId,
			payRunId: +payruns.id,
		};
		setFormData((prev) => ({ ...prev, ...data, ...lookUps }));
		setFormStep(formSteps.stepTwo);
	};
	const onError = (err: any) => {
		console.log('>>>>>>>', err);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(saveData, onError)}>
				<div className='form__cpntainer'>
					<div className='form-row-2'>
						<Input
							label='Name'
							required
							placeholder='Input name'
							register={{ ...register('name') }}
							error={errors.name}
						/>

						<SelectBox
							label='Element Classification'
							placeholder='Input name'
							id='elementClassifcation'
							register={{
								...register('classificationValueId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.classificationValueId}
						>
							<option value='' disabled>
								Select Element Classification
							</option>
							{classifications?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</SelectBox>
					</div>

					<div className='form-row-2'>
						<SelectBox
							label='Category'
							id='categoryValueId'
							register={{
								...register('categoryValueId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.categoryValueId}
							disabled={!selectedClassificationId}
						>
							<option disabled value=''>
								Select Element Category
							</option>
							{filteredCategories()?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</SelectBox>

						<SelectBox
							label='Payrun'
							id='payRunValueId,'
							register={{
								...register('payRunValueId', {
									setValueAs: (v) => parseInt(v),
								}),
							}}
							error={errors.payRunValueId}
						>
							<option disabled value=''>
								Select Payrun
							</option>
							{payruns?.data?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</SelectBox>
					</div>
					<div className='form-row'>
						<TextArea
							label='Description'
							required
							placeholder='Input name'
							register={{ ...register('description') }}
							error={errors.description}
						/>
					</div>
					<div className='form-row'>
						<TextArea
							label='Reporting Name'
							required
							placeholder='Input name'
							register={{ ...register('reportingName') }}
							error={errors.reportingName}
						/>
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
