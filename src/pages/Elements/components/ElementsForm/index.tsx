import { useState } from 'react';
import ElementDetails from './ElementDetails';
import AdditonalDetails from './AdditonalDetails';
import Progress from './ProgressBar/Progressbar';
import { formSteps } from '../../../../lib/data';
import { Element, FormElementType } from '../../../../types/apiResponseTypes';
import {
	useCreateElementMutation,
	useUpdateElementMutation,
} from '../../../../store/apiService';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { clearCurrentElement } from '../../../../store/elementsSlice';

export default function ELementsForm({
	setIsModalOpen,
}: {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const dispatch = useAppDispatch();
	const element = useAppSelector((state) => state.elements.currentElement);
	const [formStep, setFormStep] = useState(formSteps.stepOne);
	const [formData, setFormData] = useState<FormElementType>();
	const [addElement, isSuccess] = useCreateElementMutation();
	const [updateElement, updateSuccessful] = useUpdateElementMutation();

	const closeModal = () => {
		setIsModalOpen(false);
		dispatch(clearCurrentElement());
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		if (!formData) {
			return;
		}
		formData.modifiedBy = 'Goodness Obi';

		formData['effectiveStartDate'] = new Date(
			formData.effectiveStartDate
		).toUTCString();
		formData['effectiveEndDate'] = new Date(
			formData.effectiveEndDate
		).toUTCString();

		try {
			if (element) {
				console.log('edit', formData);
				updateElement(formData as unknown as Element);

				if (updateSuccessful) {
					closeModal();
				}
			} else {
				console.log(formData, 'adddddddddddd');
				addElement(formData);

				if (isSuccess) {
					closeModal();
				}
			}
		} catch (error) {
			console.error('An error occurred while processing the element:', error);
		}
	};

	return (
		<>
			<h1 className='page-title'>
				{formStep === formSteps.stepOne
					? 'Element Details'
					: 'Additional Details'}
			</h1>
			<Progress page={formStep === formSteps.stepOne ? 1 : 2} />
			{formStep === formSteps.stepOne && (
				<ElementDetails
					setFormStep={setFormStep}
					closeModal={closeModal}
					setFormData={setFormData}
				/>
			)}
			{formStep === formSteps.stepTwo && (
				<AdditonalDetails
					setFormStep={setFormStep}
					submitForm={handleSubmit}
					setFormData={setFormData}
				/>
			)}
		</>
	);
}
