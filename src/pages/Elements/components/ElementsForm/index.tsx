import { useState } from 'react';
import ElementDetails from './ElementDetails';
import AdditonalDetails from './AdditonalDetails';
import Progress from '../../../../components/base/ProgressBar/Progressbar';

export default function ELementsForm() {
	const [formStep, setFormStep] = useState(formSteps.stepOne);
	return (
		<>
			<Progress page={formStep === formSteps.stepOne ? 1 : 2} />
			{formStep === formSteps.stepOne && (
				<ElementDetails setFormStep={setFormStep} />
			)}
			{formStep === formSteps.stepTwo && (
				<AdditonalDetails setFormStep={setFormStep} />
			)}
		</>
	);
}

const formSteps = {
	stepOne: 'ELEMENT_DETAILS',
	stepTwo: ' ADDITIONAL_DETAILS',
};
