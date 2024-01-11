import './AlertModal.scss';
import Modal from '../Modal/Modal';

const AlertModal = ({ children }: { children: React.ReactElement }) => {
	return (
		<Modal>
			<div className='alert__modal'>
				<div className='alert__modal-body'>{children}</div>
			</div>
		</Modal>
	);
};

export default AlertModal;
