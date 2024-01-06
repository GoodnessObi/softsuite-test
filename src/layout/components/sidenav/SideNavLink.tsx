import { NavLink } from 'react-router-dom';
import './SideNavLink.scss';
import { NavLinkType } from '../../../lib/data';
import Icons from '../../../assets/images';
import NavDropdown from './NavDropdown';
import { useState } from 'react';

export default function SideNavLink({ link }: { link: NavLinkType }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen((prev) => !prev);
	};

	return link.link ? (
		<NavLink to={link.link} className='navlink'>
			{link.icon && (
				<img src={Icons[link.icon]} alt='' className='navlink__icon' />
			)}
			{link.label}
		</NavLink>
	) : (
		<div className={`navlink-dropdown ${isOpen ? 'active' : ''}`}>
			<button className='navlink__btn' onClick={toggleOpen}>
				<span>
					{link.icon && (
						<img src={Icons[link.icon]} alt='' className='navlink__icon' />
					)}
					{link.label}
				</span>
				<img src={Icons['ArrowDown']} alt='' className='arrow-icon' />
			</button>
			{link.subSection && <NavDropdown links={link.subSection} />}
		</div>
	);
}
