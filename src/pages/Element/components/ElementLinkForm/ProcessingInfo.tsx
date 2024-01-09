import { FormProps } from './StaffInfo';
import { useEffect } from 'react';
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

export default function ProcessingInfo({
	setFormStep,
	setFormData,
	values,
	submitForm,
}: Omit<FormProps, 'closeModal'> & {
	submitForm: (e: Event) => Promise<void>;
}) {
	const schema = yup.object({
		amountType: yup.string().required('Amount Type is required'),
		amount: yup.number().required('Amount is required'),
		// rate: yup.number().required('Rate is required'),
		effectiveStartDate: yup
			.string()
			.required('Effective Start Date is required'),
		effectiveEndDate: yup.string().required('Effective End Date is required'),
		status: yup.string().required('Status is required'),
		automate: yup.string().required('Automate is required'),
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
			amountType,
			amount,
			effectiveStartDate,
			effectiveEndDate,
			automate,
			status,
		} = values;

		setValue('amountType', amountType ?? '');
		setValue('amount', amount ?? 0);
		setValue('effectiveStartDate', effectiveStartDate ?? '');
		setValue('effectiveEndDate', effectiveEndDate ?? '');
		setValue('automate', automate ?? '');
		setValue('status', status ?? '');
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
				<div className='form__container'>
					<div className='form-row-2'>
						<SelectBox
							label='AMount Type'
							placeholder='Input name'
							id='amountType'
							register={{
								...register('amountType', {
									setValueAs: (v) => +v,
								}),
							}}
							error={errors.amountType}
						>
							<option value='201'>Select Element Classification</option>
						</SelectBox>

						<Input
							label='Amount'
							required
							placeholder='Select Date'
							register={{ ...register('amount') }}
							error={errors.amount}
						/>
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
						Create New Element
					</Button>
				</div>
			</form>
		</div>
	);
}
