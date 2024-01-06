import { NavLink } from 'react-router-dom';
import { NavLinkType } from '../../../lib/data';

export default function NavDropdown({ links }: { links: NavLinkType[] }) {
	return (
		<ul className='navDropdown'>
			{links.map(
				(link) =>
					link.link && (
						<li key={link.link}>
							<NavLink className='navlink' to={link.link}>
								{link.label}
							</NavLink>
						</li>
					)
			)}
		</ul>
	);
}
