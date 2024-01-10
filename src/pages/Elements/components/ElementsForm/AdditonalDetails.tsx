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
import { useAppSelector } from '../../../../store/hook';
import moment from 'moment';

const schema = yup.object({
	processingType: yup.string().required('Processing Type is required'),
	status: yup.string().required('Status is required'),
	prorate: yup.string().required('Prorate is required'),
	effectiveStartDate: yup.string().required('Effective Start Date is required'),
	effectiveEndDate: yup.string().required('Effective End Date is required'),
	selectedMonths: yup
		.array()
		.of(yup.string())
		.required('Selected Months are required'),
	payFrequency: yup.string().required('Pay Frequency is required'),
});

type AdditonalDetailsProps = {
	setFormStep: React.Dispatch<React.SetStateAction<string>>;
	submitForm: (e: Event) => Promise<void>;
	setFormData: React.Dispatch<
		React.SetStateAction<FormElementType | undefined>
	>;
};

export default function AdditonalDetails({
	setFormStep,
	submitForm,
	setFormData,
}: AdditonalDetailsProps) {
	const element = useAppSelector((state) => state.elements.currentElement);
	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			processingType: element?.processingType ?? '',
			status: element?.status ?? '',
			prorate: element?.prorate ?? '',
			effectiveStartDate:
				moment(element?.effectiveStartDate).format('YYYY-MM-DD') ??
				moment(new Date()).format('YYYY-MM-DD'),
			effectiveEndDate:
				moment(element?.effectiveEndDate).format('YYYY-MM-DD') ??
				moment(new Date()).format('YYYY-MM-DD'),
			selectedMonths: element?.selectedMonths ?? [],
			payFrequency: element?.payFrequency ?? '',
		},
	});

	const selectedPayFrequency = watch('payFrequency');

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
							register={{
								...register('effectiveStartDate', {
									valueAsDate: true,
								}),
							}}
							error={errors.effectiveStartDate}
						/>

						<Input
							label='Effective End Date'
							required
							placeholder='Select Date'
							type='date'
							register={{
								...register('effectiveEndDate', {
									valueAsDate: true,
								}),
							}}
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
							disabled={selectedPayFrequency !== '2'}
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
						Back
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
