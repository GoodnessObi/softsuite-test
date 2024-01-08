import { FormProps } from './StaffInfo';

export default function ProcessingInfo({
	setFormStep,
	closeModal,
	setFormData,
	submitForm,
	values,
}: FormProps extends {
	submitForm: (e: Event) => Promise<void>;
}) {
	return <div>Heyyyyyyyyyyyyyyy</div>;
}
