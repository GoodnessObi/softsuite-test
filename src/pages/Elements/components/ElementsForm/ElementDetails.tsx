import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { Input, SelectBox, TextArea } from '../../../../components/base/Form';
import Button from '../../../../components/base/Button/Button';
import { formSteps } from '../../../../lib/data';
import { Element } from '../../../../types/apiResponseTypes';

export default function ElementDetails({
	setFormStep,
	closeModal,
	setSubmitData,
	values,
}: {
	setFormStep: React.Dispatch<React.SetStateAction<string>>;
	closeModal: () => void;
	setSubmitData: React.Dispatch<React.SetStateAction<Element>>;
	values: Element;
}) {
	const schema = yup.object({
		name: yup.string().required('Name is required'),
		description: yup.string().required('Description is required'),
		payRunId: yup
			.number()
			.required('Pay Run ID is required')
			.positive('Pay Run ID must be a positive number'),
		// payRunValueId: yup
		// 	.number()
		// 	.required('Pay Run Value ID is required')
		// 	.positive('Pay Run Value ID must be a positive number'),
		classificationId: yup
			.number()
			.required('Classification ID is required')
			.positive('Classification ID must be a positive number'),
		// classificationValueId: yup
		// 	.number()
		// 	.required('Classification Value ID is required')
		// 	.positive('Classification Value ID must be a positive number'),
		categoryId: yup
			.number()
			.required('Category ID is required')
			.positive('Category ID must be a positive number'),
		// categoryValueId: yup
		// 	.number()
		// 	.required('Category Value ID is required')
		// 	.positive('Category Value ID must be a positive number'),
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
			classificationId,
			payRunId,
			categoryId,
			reportingName,
		} = values;

		setValue('name', name);
		setValue('description', description);
		setValue('classificationId', classificationId);
		setValue('payRunId', payRunId);
		setValue('categoryId', categoryId);
		setValue('reportingName', reportingName);
		// eslint-disable-next-line
	}, [values]);

	const saveData = (data: any) => {
		console.log('--data', data);
		setSubmitData((prev) => ({ ...prev, ...data }));
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
								...register('classificationId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.classificationId}
						>
							<option value='201'>Select Element Classification</option>
						</SelectBox>
					</div>

					<div className='form-row-2'>
						<SelectBox
							label='categoryId'
							id='categoryId'
							register={{
								...register('categoryId', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.categoryId}
						>
							<option value='401'>Select Element Classification</option>
						</SelectBox>

						<SelectBox
							label='Payrun'
							id='payRunId'
							register={{
								...register('payRunId', {
									setValueAs: (v) => parseInt(v),
								}),
							}}
							error={errors.payRunId}
						>
							<option value='3'>Select Element Classification</option>
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
