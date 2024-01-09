import { useEffect, useState } from 'react';
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

const defaultState: FormElementType = {
	name: '',
	description: '',
	payRunId: 0,
	payRunValueId: 0,
	classificationId: 0,
	classificationValueId: 0,
	categoryId: 0,
	categoryValueId: 0,
	reportingName: '',
	processingType: '',
	status: '',
	prorate: '',
	effectiveStartDate: new Date().toISOString(),
	effectiveEndDate: new Date().toISOString(),
	selectedMonths: [],
	payFrequency: '',
};

export default function ELementsForm({
	setIsModalOpen,
}: {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const dispatch = useAppDispatch();
	const element = useAppSelector((state) => state.elements.currentElement);
	const [formStep, setFormStep] = useState(formSteps.stepOne);
	const [formData, setFormData] = useState<FormElementType>(defaultState);
	const [addElement, isSuccess] = useCreateElementMutation();
	const [updateElement, updateSuccessful] = useUpdateElementMutation();

	useEffect(() => {
		if (element) {
			setFormData({ ...element });
		}
	}, [element]);

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
		).toISOString();
		formData['effectiveEndDate'] = new Date(
			formData.effectiveEndDate
		).toISOString();

		try {
			if (element) {
				console.log('edit', formData);
				updateElement(formData as unknown as Element);

				if (updateSuccessful) {
					closeModal();
				}
			} else {
				console.log(formData);
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
					values={formData}
					setFormData={setFormData}
				/>
			)}
			{formStep === formSteps.stepTwo && (
				<AdditonalDetails
					setFormStep={setFormStep}
					submitForm={handleSubmit}
					values={formData}
					setFormData={setFormData}
				/>
			)}
		</>
	);
}
