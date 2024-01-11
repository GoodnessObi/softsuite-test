import { FormProps } from './StaffInfo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { linkFormSteps } from '../../../../lib/data';
import {
	Input,
	Radio,
	SelectBox,
	ToggleButton,
} from '../../../../components/base/Form';
import Button from '../../../../components/base/Button/Button';
import { useAppSelector } from '../../../../store/hook';
import { formatDate } from '../../../../utils';

const schema = yup.object({
	amountType: yup.string().required('Amount Type is required'),
	amount: yup.number(),
	rate: yup.number(),
	effectiveStartDate: yup.string(),
	effectiveEndDate: yup.string(),
	status: yup.string(),
	automate: yup.string(),
});

export default function ProcessingInfo({
	setFormStep,
	setFormData,
	submitForm,
}: Omit<FormProps, 'closeModal'> & {
	submitForm: (e: Event) => Promise<void>;
}) {
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
			amountType: elementLink?.amountType ?? '',
			amount: elementLink?.amount ?? 0,
			rate: elementLink?.rate ?? 0,
			effectiveStartDate: formatDate(elementLink?.effectiveStartDate),
			effectiveEndDate: formatDate(elementLink?.effectiveEndDate),
			status: elementLink?.status ?? '',
			automate: elementLink?.automate ?? '',
		},
	});

	const amountTypeSelected = watch('amountType');

	const submit = async (data: any, e: any) => {
		console.log(data);

		data.rate = data.amount != 0 ? 0 : data.rate;
		data.amount = data.rate != 0 ? 0 : data.amount;

		if (data.amount == 0 && data.rate == 0) {
			console.log('errrorrrrr');
			return;
		}

		console.log('>>>>>>>>>>>>>>>>>>>>', data);

		setFormData((prev) => ({ ...prev, ...data }));
		await submitForm(e);
	};

	const onError = (err: any) => {
		console.log('>>>>>>>', err);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(submit, onError)}>
				<div className='form__container'>
					<div className='form-row-2'>
						<SelectBox
							label='AMount Type'
							placeholder='Input name'
							id='amountType'
							register={{
								...register('amountType'),
							}}
							error={errors.amountType}
						>
							<option value='' disabled>
								Select
							</option>
							<option value='Fixed Value'>Fixed Value</option>
							<option value='Rate of Salary'>Rate of Salary</option>
						</SelectBox>

						{amountTypeSelected === 'Fixed Value' ? (
							<Input
								label='Amount'
								required
								placeholder='Enter Amount'
								register={{ ...register('amount') }}
								error={errors.amount}
								disabled={!amountTypeSelected}
							/>
						) : (
							<Input
								label={amountTypeSelected === 'Rate of Salary' ? 'rate' : '...'}
								required
								placeholder={
									amountTypeSelected === 'Enter Rate' ? 'Rate' : 'Select'
								}
								register={{ ...register('rate') }}
								error={errors.rate}
								disabled={!amountTypeSelected}
							/>
						)}
					</div>

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
								label='Automate'
								id='autimate'
								register={{ ...register('automate', { required: true }) }}
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
						onClick={() => setFormStep(linkFormSteps.stepTwo)}
					>
						Back
					</Button>
					<Button
						type='submit'
						styleProp={{ width: '100%', justifyContent: 'center' }}
					>
						{elementLink?.id
							? 'Update Element Link'
							: 'Create A New Element Link'}
					</Button>
				</div>
			</form>
		</div>
	);
}
