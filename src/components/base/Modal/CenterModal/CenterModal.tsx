import Modal from '../Modal';
import React from 'react';
import './CenterModal.scss';

const CenterModal = ({ children }: { children: React.ReactElement }) => {
	return (
		<Modal>
			<div className='center__modal'>
				<div className='center__modal-body'>{children}</div>
			</div>
		</Modal>
	);
};

export default CenterModal;
