import { useEffect, useState } from 'react';
import ElementDetails from './ElementDetails';
import AdditonalDetails from './AdditonalDetails';
import Progress from '../../../../components/base/ProgressBar/Progressbar';
import { formSteps } from '../../../../lib/data';
import { Element } from '../../../../types/apiResponseTypes';

export default function ELementsForm({
	setIsModalOpen,
	element,
}: {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	element?: Element;
}) {
	const defaultState = {
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
		effectiveStartDate: '',
		effectiveEndDate: '',
		selectedMonths: [],
		payFrequency: '',
		modifiedBy: ',',
	};

	const [formStep, setFormStep] = useState(formSteps.stepOne);
	const [submitData, setSubmitData] = useState<Element>(defaultState);

	useEffect(() => {
		if (element) {
			setSubmitData({ ...element });
		}
	}, [element]);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		if (!submitData) {
			return;
		}
		submitData.modifiedBy = 'Goodness Obi';
		try {
			console.log(submitData);
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
					values={submitData}
					setSubmitData={setSubmitData}
				/>
			)}
			{formStep === formSteps.stepTwo && (
				<AdditonalDetails
					setFormStep={setFormStep}
					submitForm={handleSubmit}
					values={submitData}
					setSubmitData={setSubmitData}
				/>
			)}
		</>
	);
}
