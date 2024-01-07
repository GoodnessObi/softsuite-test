import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Input,
	Radio,
	SelectBox,
	ToggleButton,
} from '../../../../components/base/Form';
import Button from '../../../../components/base/Button/Button';
import { formSteps, monthOptions } from '../../../../lib/data';
import { FormElementType } from '../../../../types/apiResponseTypes';
import { useEffect } from 'react';
import moment from 'moment';

type AdditonalDetailsProps = {
	setFormStep: React.Dispatch<React.SetStateAction<string>>;
	submitForm: (e: Event) => Promise<void>;
	setFormData: React.Dispatch<React.SetStateAction<FormElementType>>;
	values: FormElementType;
};

export default function AdditonalDetails({
	setFormStep,
	submitForm,
	setFormData,
	values,
}: AdditonalDetailsProps) {
	const schema = yup.object({
		processingType: yup.string().required('Processing Type is required'),
		status: yup.string().required('Status is required'),
		prorate: yup.string().required('Prorate is required'),
		effectiveStartDate: yup
			.string()
			.required('Effective Start Date is required'),
		effectiveEndDate: yup.string().required('Effective End Date is required'),
		selectedMonths: yup
			.array()
			.of(yup.string())
			.required('Selected Months are required'),
		payFrequency: yup.string().required('Pay Frequency is required'),
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
			processingType,
			status,
			prorate,
			effectiveStartDate,
			effectiveEndDate,
			selectedMonths,
			payFrequency,
		} = values;

		setValue('processingType', processingType);
		setValue('status', status);
		setValue('prorate', prorate);
		setValue(
			'effectiveStartDate',
			moment(effectiveStartDate).format('yyyy-MM-dd')
		);
		setValue('effectiveEndDate', moment(effectiveEndDate).format('yyyy-MM-dd'));
		setValue('selectedMonths', selectedMonths);
		setValue('payFrequency', payFrequency);
		// eslint-disable-next-line
	}, [values]);

	const submit = async (data: any, e: any) => {
		console.log(data);
		setFormData((prev) => ({ ...prev, ...data }));
		await submitForm(e);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(submit)}>
				<div className='form__cpntainer'>
					<div className='form-row-2'>
						<Input
							label='Effective Start Date'
							required
							placeholder='Select Date'
							type='date'
							register={{ ...register('effectiveStartDate') }}
							error={errors.effectiveStartDate}
						/>

						<Input
							label='Effective End Date'
							required
							placeholder='Select Date'
							type='date'
							register={{ ...register('effectiveEndDate') }}
							error={errors.effectiveEndDate}
						/>
					</div>

					<div className='form-row-2'>
						<div className='form-radio'>
							<Radio
								label='Processing Type'
								id='processingType'
								register={{ ...register('processingType', { required: true }) }}
								required={true}
								options={[
									{ value: 1, label: 'Open' },
									{ value: 2, label: 'Closed' },
								]}
							/>
						</div>
						<div className='form-radio'>
							<Radio
								label='Pay Frequency'
								id='payFrequency'
								register={{ ...register('payFrequency', { required: true }) }}
								required={true}
								options={[
									{ value: 1, label: 'Monthly' },
									{ value: 2, label: 'Selected Months' },
								]}
							/>
						</div>
					</div>

					<div className='form-row'>
						<SelectBox
							id='selectedMonth'
							label='Selected Pay Months'
							placeholder='Input name'
							register={{ ...register('selectedMonths') }}
							error={errors.selectedMonths}
							// disabled={selectedPayFrequency !== '2'}
							multiple={true}
						>
							{monthOptions.map((option) => (
								<option value={option.value} key={option.value}>
									{option.label}
								</option>
							))}
						</SelectBox>
					</div>

					<div className='form-row-2'>
						<div className='form-radio'>
							<Radio
								id='prorate'
								label='Prorate'
								register={{ ...register('prorate', { required: true }) }}
								required={true}
								options={[
									{ value: 1, label: 'Yes' },
									{ value: 2, label: 'No' },
								]}
							/>
						</div>

						<div className='input-group'>
							<ToggleButton
								label='Status'
								id='status'
								register={{ ...register('status') }}
							/>
						</div>
					</div>
				</div>
				<div className='form-btn__wrapper'>
					<Button
						btnType='primary-inverse'
						styleProp={{ width: '100%' }}
						onClick={() => setFormStep(formSteps.stepOne)}
					>
						Cancel
					</Button>
					<Button
						type='submit'
						styleProp={{ width: '100%', justifyContent: 'center' }}
					>
						Create New Element
					</Button>
				</div>
			</form>
		</div>
	);
}
