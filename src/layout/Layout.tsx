import { Outlet } from 'react-router-dom';
import './Layout.scss';
import SideNav from './components/sidenav/SideNav';
import TopNav from './components/topnav/TopNav';
import { useState } from 'react';
import PageRouter from '../components/base/PageRouter/PageRouter';
import { useAppSelector } from '../store/hook';
//
export function PageLayout() {
	const [navIsOpen, setIsOpen] = useState<boolean>(false);
	const routes = useAppSelector((state) => state.baseState.routes);

	const toggleNav = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className='layout'>
			<TopNav toggleNav={toggleNav} navIsOpen={navIsOpen} />
			<SideNav navIsOpen={navIsOpen} />
			<div className='layout__body'>
				<PageRouter pages={routes} />
				<Outlet />
			</div>
		</div>
	);
}
