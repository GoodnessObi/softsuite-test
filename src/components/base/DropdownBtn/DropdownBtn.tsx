import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import './Dropdown.scss';
import Icons from '../../../assets/images';
import { setCurrentElement } from '../../../store/elementsSlice';
import { Element } from '../../../types/apiResponseTypes';
import { useAppDispatch } from '../../../store/hook';
import { useDeleteElementMutation } from '../../../store/apiService';

const DropdownBtn = ({
	item,
	setIsModalOpen,
}: {
	item: Element;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const dispatch = useAppDispatch();
	const [deleteElement] = useDeleteElementMutation();

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<Link
					rel='noopener noreferrer'
					to={`/elements/${item.id}`}
					className='dropdown-item'
				>
					<img src={Icons['View']} alt='' /> View Element Links
				</Link>
			),
		},
		{
			key: '2',
			label: (
				<span
					role='button'
					className='dropdown-item'
					onClick={() => {
						dispatch(setCurrentElement(item));
						setIsModalOpen(true);
						// dispatch(setCurrentEditElement(user));
						// setFormType('EDIT');
						// setShowModal(true);
					}}
				>
					<img src={Icons['Edit']} alt='' /> Edit Element
				</span>
			),
		},
		{
			key: '3',
			label: (
				<span
					role='button'
					className=' danger-item'
					onClick={() => {
						deleteElement(`${item.id}`);
					}}
				>
					<img src={Icons['Delete']} alt='' />
					Delete Element
				</span>
			),
		},
	];
	return (
		<Dropdown menu={{ items }} placement='bottom' className='dropdown-btn'>
			<Button className='li'>
				<img src={Icons['More']} alt='' />{' '}
			</Button>
		</Dropdown>
	);
};

export default DropdownBtn;
