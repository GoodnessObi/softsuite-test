import { useNavigate } from 'react-router-dom';
import './SideNav.scss';
import { navlinks } from '../../../lib/data';
import SideNavLink from './SideNavLink';
import Icons from '../../../assets/images';
import { useState } from 'react';
import Dropdown from '../../../components/base/Dropdown/Dropdown';

export default function SideNav({ navIsOpen }: { navIsOpen: boolean }) {
	const navigate = useNavigate();
	const [selectedHeader, setSelectedHeader] = useState('Payroll Management');

	return (
		<nav className={`sidenav ${navIsOpen ? 'open' : ''}`} data-testid='sidenav'>
			<div>
				<div className='sidenav__top'>
					<Dropdown
						title={
							<>
								<img src={Icons['PayrollMgt']} alt='' />
								<p>
									<span>Switch Module</span>
									<span>{selectedHeader}</span>
								</p>
							</>
						}
						onClick={() => setSelectedHeader}
						className='sidenav__switch'
					>
						<>
							<li>Placeholder</li>
							<li>Placeholder</li>
						</>
					</Dropdown>
				</div>

				<ul className='sidenav__linklist'>
					{navlinks.sectionOne.map((link) => (
						<li key={link.label} className='sidenav__linkitem'>
							<SideNavLink link={link} />
						</li>
					))}

					<hr />

					{navlinks.sectionTwo.map((link) => (
						<li key={link.label} className='sidenav__linkitem'>
							<SideNavLink link={link} />
						</li>
					))}
					<li key='logout' className='sidenav__linkitem'>
						<span
							role='button'
							className='navlink'
							onClick={(e) => {
								e.preventDefault();
								navigate('/');
							}}
						>
							<img src={Icons['Logout']} alt='' className='navlink__icon' />
							Logout
						</span>
					</li>
				</ul>
			</div>
		</nav>
	);
}
