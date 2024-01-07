import { ReactNode } from 'react';
import './Dropdown.scss';
import Icons from '../../../assets/images';

export default function Dropdown({
	children,
	title,
	className,
	onClick,
}: {
	children: ReactNode;
	title?: ReactNode;
	className?: string;
	onClick?: () => void;
}) {
	return (
		<div className={`${className}`}>
			<div className='dropdown'>
				<button className='dropdown__btn' onClick={onClick}>
					<span>{title}</span>
					<img src={Icons['ArrowDown']} alt='' className='icon' />
				</button>
				<ul className='dropdown__list'>{children}</ul>
			</div>
		</div>
	);
}
