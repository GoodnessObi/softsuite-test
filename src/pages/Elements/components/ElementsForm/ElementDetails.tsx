import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Input, SelectBox, TextArea } from '../../../../components/base/Form';
import Button from '../../../../components/base/Button/Button';
import { formSteps, lookUpIds } from '../../../../lib/data';
import { FormElementType } from '../../../../types/apiResponseTypes';
import useGetLookupValues from '../../../../hooks/useGetLookupValues';

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
	const classifications = useGetLookupValues(lookUpIds.elementClassification);
	const categories = useGetLookupValues(lookUpIds.elementCategory);
	const payruns = useGetLookupValues(lookUpIds.payRun);

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
			description,
			classificationValueId,
			categoryValueId,
			payRunValueId,
			reportingName,
		} = values;

		console.log('I rannnn');

		setValue('name', name);
		setValue('description', description);
		setValue('classificationValueId', classificationValueId);
		setValue('categoryValueId', categoryValueId);
		setValue('payRunValueId', payRunValueId);
		setValue('reportingName', reportingName);
		// eslint-disable-next-line
	}, [values, classifications, payruns, categories]);

	const saveData = (data: any) => {
		const lookUps = {
			classificationId: +classifications.id,
			categoryId: +categories.id,
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
							<option value=''>Select Element Classification</option>
							{classifications?.data?.map((item) => (
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
						>
							<option value=''>Select Element Category</option>
							{categories?.data?.map((item) => (
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
							<option value=''>Select Payrun</option>
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
