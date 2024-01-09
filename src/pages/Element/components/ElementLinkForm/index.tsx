import { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../../store/hook';
// import { clearCurrentElementLink } from '../../../../store/elementLinksSlice';
import { linkFormSteps } from '../../../../lib/data';
import Progress from './ProgressBar/Progressbar';
import StaffInfo from './StaffInfo';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { FormElementLinkType } from '../../../../types/apiResponseTypes';
import { clearCurrentElementLink } from '../../../../store/elementLinksSlice';
import AdditionalInfo from './AdditionalInfo';
import ProcessingInfo from './ProcessingInfo';

const defaultState = {
	elementId: 0,
	suborganizationId: 0,
	name: '',
	locationId: 0,
	departmentId: 0,
	employeeCategoryId: 0,
	employeeCategoryValueId: 0,
	employeeTypeId: 0,
	employeeTypeValueId: 0,
	jobTitleId: 0,
	grade: 0,
	gradeStep: 0,
	unionId: 0,
	amountType: '',
	amount: 0,
	rate: 0,
	effectiveStartDate: '',
	effectiveEndDate: '',
	status: '',
	automate: '',
	additionalInfo: [
		{
			lookupId: 0,
			lookupValueId: 0,
		},
	],
};

export default function ELementLinkForm({
	setLinkModalOpen,
}: {
	setLinkModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const dispatch = useAppDispatch();
	const elementLink = useAppSelector(
		(state) => state.elementLinks.currentElementLink
	);
	const [formStep, setFormStep] = useState(linkFormSteps.stepThree);
	const [formData, setFormData] = useState<FormElementLinkType>(defaultState);
	// const [addElement, isSuccess] = useCreateElementMutation();
	// const [updateElement, updateSuccessful] = useUpdateElementMutation();

	useEffect(() => {
		if (elementLink) {
			setFormData({ ...elementLink });
		}
	}, [elementLink]);

	const closeModal = () => {
		setLinkModalOpen(false);
		dispatch(clearCurrentElementLink());
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		if (!formData) {
			return;
		}
		// formData.modifiedBy = 'Goodness Obi';

		// formData['effectiveStartDate'] = new Date(
		// 	formData.effectiveStartDate
		// ).toISOString();
		// formData['effectiveEndDate'] = new Date(
		// 	formData.effectiveEndDate
		// ).toISOString();

		try {
			if (elementLink) {
				console.log('edit', formData);
				// updateElement(formData as unknown as Element);

				// if (updateSuccessful) {
				// 	closeModal();
				// }
			} else {
				console.log(formData);
				// addElement(formData);

				// if (isSuccess) {
				// 	closeModal();
				// }
			}
		} catch (error) {
			console.error('An error occurred while processing the element:', error);
		}
	};

	return (
		<>
			<h1 className='page-title'>
				Create Element Link
				{/* {formStep === linkFormSteps.stepOne
					? 'Staff Information'
					: formStep === linkFormSteps.stepTwo
					? 'Additional Information'
					: 'Processing Information'} */}
			</h1>
			<Progress
				page={
					formStep === linkFormSteps.stepOne
						? 1
						: formStep === linkFormSteps.stepTwo
						? 2
						: 3
				}
			/>
			{formStep === linkFormSteps.stepOne && (
				<StaffInfo
					setFormStep={setFormStep}
					closeModal={closeModal}
					values={formData}
					setFormData={setFormData}
				/>
			)}
			{formStep === linkFormSteps.stepTwo && (
				<AdditionalInfo
					setFormStep={setFormStep}
					values={formData}
					setFormData={setFormData}
				/>
			)}
			{formStep === linkFormSteps.stepThree && (
				<ProcessingInfo
					setFormStep={setFormStep}
					submitForm={handleSubmit}
					values={formData}
					setFormData={setFormData}
				/>
			)}
		</>
	);
}
