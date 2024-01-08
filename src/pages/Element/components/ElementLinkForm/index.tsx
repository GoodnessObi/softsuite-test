import { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../../store/hook';
// import { clearCurrentElementLink } from '../../../../store/elementLinksSlice';
import { linkFormSteps } from '../../../../lib/data';
import Progress from './ProgressBar/Progressbar';
import StaffInfo from './StaffInfo';
import AdditionalInfo from './AdditionalInfo';
import ProcessingInfo from './ProcessingInfo';

export default function ELementLinkForm({
	setLinkModalOpen,
}: {
	setLinkModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	// const dispatch = useAppDispatch();
	// const element = useAppSelector((state) => state.elements.currentElement);
	const [formStep, setFormStep] = useState(linkFormSteps.stepOne);
	// const [formData, setFormData] = useState<FormElementType>();
	// const [addElement, isSuccess] = useCreateElementMutation();
	// const [updateElement, updateSuccessful] = useUpdateElementMutation();

	// useEffect(() => {
	// 	if (element) {
	// 		setFormData({ ...element });
	// 	}
	// }, [element]);

	// const closeModal = () => {
	// 	setIsModalOpen(false);
	// 	dispatch(clearCurrentElementLink());
	// };

	// const handleSubmit = async (e: Event) => {
	// 	e.preventDefault();

	// 	if (!formData) {
	// 		return;
	// 	}
	// 	formData.modifiedBy = 'Goodness Obi';

	// 	formData['effectiveStartDate'] = new Date(
	// 		formData.effectiveStartDate
	// 	).toISOString();
	// 	formData['effectiveEndDate'] = new Date(
	// 		formData.effectiveEndDate
	// 	).toISOString();

	// 	try {
	// 		if (element) {
	// 			console.log('edit', formData);
	// 			// updateElement(formData as unknown as Element);

	// 			// if (updateSuccessful) {
	// 			// 	closeModal();
	// 			// }
	// 		} else {
	// 			console.log(formData);
	// 			// addElement(formData);

	// 			// if (isSuccess) {
	// 			// 	closeModal();
	// 			// }
	// 		}
	// 	} catch (error) {
	// 		console.error('An error occurred while processing the element:', error);
	// 	}
	// };

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
				// setFormStep={setFormStep}
				// closeModal={closeModal}
				// values={formData}
				// setFormData={setFormData}
				/>
			)}
			{formStep === linkFormSteps.stepTwo && (
				<AdditionalInfo
				// setFormStep={setFormStep}
				// submitForm={handleSubmit}
				// values={formData}
				// setFormData={setFormData}
				/>
			)}
			{formStep === linkFormSteps.stepTwo && (
				<ProcessingInfo
				// setFormStep={setFormStep}
				// submitForm={handleSubmit}
				// values={formData}
				// setFormData={setFormData}
				/>
			)}
		</>
	);
}
