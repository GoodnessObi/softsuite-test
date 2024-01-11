import './SideModal.scss';
import Modal from '../Modal/Modal';

const SideModal = ({ children }: { children: React.ReactElement }) => {
	return (
		<Modal>
			<div className='side__modal'>
				<div className='side__modal-body'>{children}</div>
			</div>
		</Modal>
	);
};

export default SideModal;
