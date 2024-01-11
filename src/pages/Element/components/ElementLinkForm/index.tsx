import { useEffect, useState } from 'react';
import { linkFormSteps } from '../../../../lib/data';
import Progress from './ProgressBar/Progressbar';
import StaffInfo from './StaffInfo';
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import {
	ElementLink,
	FormElementLinkType,
} from '../../../../types/apiResponseTypes';
import { clearCurrentElementLink } from '../../../../store/elementLinksSlice';
import AdditionalInfo from './AdditionalInfo';
import ProcessingInfo from './ProcessingInfo';
import {
	useAddElementLinkMutation,
	useUpdateElementLinkMutation,
} from '../../../../store/apiService';
import { useParams } from 'react-router-dom';

export default function ELementLinkForm({
	setLinkModalOpen,
}: {
	setLinkModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const dispatch = useAppDispatch();
	const { id } = useParams() as { id: string };
	const elementLink = useAppSelector(
		(state) => state.elementLinks.currentElementLink
	);
	const [formStep, setFormStep] = useState(linkFormSteps.stepOne);
	const [formData, setFormData] = useState<FormElementLinkType>();
	const [addElementLink, isSuccess] = useAddElementLinkMutation();
	const [updateElementLink, updateSuccessful] = useUpdateElementLinkMutation();

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
		formData.elementId = +id;
		formData.modifiedBy = 'Goodness Obi';
		formData['effectiveStartDate'] = formData.effectiveStartDate
			? new Date(formData.effectiveStartDate).toISOString()
			: '';
		formData['effectiveEndDate'] = formData.effectiveEndDate
			? new Date(formData.effectiveEndDate).toISOString()
			: '';

		try {
			if (elementLink) {
				console.log('edit', formData);
				updateElementLink(formData as unknown as ElementLink);

				if (updateSuccessful) {
					closeModal();
				}
			} else {
				console.log(formData);
				addElementLink(formData as unknown as ElementLink);

				if (isSuccess) {
					closeModal();
				}
			}
		} catch (error) {
			console.error(
				'An error occurred while processing the element link:',
				error
			);
		}
	};

	return (
		<>
			<h1 className='page-title'>
				{elementLink?.id ? 'Edit Element Link' : 'Create Element Link'}
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
					setFormData={setFormData}
				/>
			)}
			{formStep === linkFormSteps.stepTwo && (
				<AdditionalInfo setFormStep={setFormStep} setFormData={setFormData} />
			)}
			{formStep === linkFormSteps.stepThree && (
				<ProcessingInfo
					setFormStep={setFormStep}
					submitForm={handleSubmit}
					setFormData={setFormData}
				/>
			)}
		</>
	);
}
