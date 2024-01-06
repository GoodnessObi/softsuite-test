import { Link } from 'react-router-dom';
import Icons from '../../../assets/images';
import './TopNav.scss';
import Dropdown from '../../../components/base/Form/dropdown/Dropdown';

type NavbarProps = {
	toggleNav: () => void;
	navIsOpen: boolean;
};

export default function TopNav({ toggleNav, navIsOpen }: NavbarProps) {
	return (
		<nav className='navbar'>
			<Link to='/' className='navbar__logo'>
				<img src={Icons['Logo']} alt='softsuite' />
			</Link>
			<div className='navbar__items'>
				<div className='navbar__orgs'>
					<Dropdown
						title={
							<>
								<img src={Icons['Home']} alt='' />
								<span>
									Change Organization
									{/* PaperSoft Limited */}
								</span>
							</>
						}
					>
						<>
							<li>Organization 1</li>
							<li>Organization 2</li>
						</>
					</Dropdown>
				</div>

				<div className='navbar__search'>
					<div className='navbar__search-group'>
						<input
							type='search'
							className='form-input'
							placeholder='Search for anything'
						/>
						<span className='icon'>
							<img src={Icons['Search']} alt='SVG logo image' />
						</span>
					</div>
				</div>

				<div className='navbar__actions'>
					<span role='button' className='notification'>
						<img src={Icons['Notification']} alt='notificaion' />
					</span>
					<span className='current-user'>
						<img src={Icons['User']} alt='user avatar' />
						<span className='username'>Henry Okoro</span>
						{/* <img src={Icons['ArrowDown']} alt='SVG logo image' /> */}
					</span>
				</div>

				<div
					className='navbar__actions--mobile'
					role='button'
					onClick={toggleNav}
				>
					{navIsOpen ? (
						<img src={Icons['Close']} alt='' />
					) : (
						<img src={Icons['Hamburger']} alt='' />
					)}
				</div>
			</div>
		</nav>
	);
}
