import { FormProps } from './StaffInfo';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { linkFormSteps, lookUpIds } from '../../../../lib/data';
import { SelectBox } from '../../../../components/base/Form';
import Button from '../../../../components/base/Button/Button';
import { useAppSelector } from '../../../../store/hook';
import useGetGrades from '../../../../hooks/useGetGrades';
import useGetGradeSteps from '../../../../hooks/useGetGradeSteps';
import useGetLookupValues from '../../../../hooks/useGetLookupValues';
import useGetUserDefinedTypes from '../../../../hooks/useGetUserDefinedTypes';
import Options from '../../../Elements/components/ElementsForm/Options';

const schema = yup.object({
	grade: yup.number(),
	gradeStep: yup.number(),
	unionId: yup.number(),
	additionalInfo: yup.array().of(
		yup.object().shape({
			lookupId: yup.number(),
			lookupValueId: yup.number(),
		})
	),
});

export default function AdditionalInfo({
	setFormStep,
	setFormData,
}: Omit<FormProps, 'closeModal'>) {
	const elementLink = useAppSelector(
		(state) => state.elementLinks.currentElementLink
	);
	const userTypes = useGetUserDefinedTypes();

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			grade: elementLink?.grade ?? 0,
			gradeStep: elementLink?.gradeStep ?? 0,
			unionId: elementLink?.unionId ?? 0,
			additionalInfo: elementLink?.additionalInfo ?? [],
		},
	});

	const gradeSelected = watch('grade');
	const { data: grades } = useGetGrades();
	const { data: gradeSteps } = useGetGradeSteps({
		gradeId: gradeSelected ? `${gradeSelected}` : '',
	});
	const { data: unions } = useGetLookupValues(lookUpIds.union);

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
							<option value='' disabled>
								Select{' '}
							</option>
							{grades?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
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
							disabled={!gradeSelected}
						>
							<option value='' disabled>
								Select{' '}
							</option>
							{gradeSteps?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
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
							<option value='' disabled>
								Select{' '}
							</option>
							{unions?.map((item) => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</SelectBox>
					</div>

					<div className='form-row-2 addional-assgnmen'>
						{userTypes?.length
							? userTypes.map((type) => (
									<SelectBox
										label={type.name}
										placeholder={`Input ${type.name}`}
										id={type.name}
										key={type.id}
										// {...register(
										// 	`additionalInfo.${}.lookupId`,
										// 	`additionalInfo.${}.lookupValueId`
										// )}
									>
										<option value='' disabled>
											Select{' '}
										</option>
										<Options typeId={type.id} />
									</SelectBox>
									// eslint-disable-next-line no-mixed-spaces-and-tabs
							  ))
							: 'N/A'}
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
