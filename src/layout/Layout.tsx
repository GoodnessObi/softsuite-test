import { Outlet } from 'react-router-dom';
import './Layout.scss';
import SideNav from './components/sidenav/SideNav';
import TopNav from './components/topnav/TopNav';
import { useState } from 'react';
// import { useState } from 'react';
//
export function PageLayout() {
	const [navIsOpen, setIsOpen] = useState<boolean>(false);

	const toggleNav = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className='layout'>
			<TopNav toggleNav={toggleNav} navIsOpen={navIsOpen} />
			<SideNav navIsOpen={navIsOpen} />
			<div className='layout__body'>
				<Outlet />
			</div>
		</div>
	);
}
