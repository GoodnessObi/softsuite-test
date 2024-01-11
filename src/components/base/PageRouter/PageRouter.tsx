import { Link } from 'react-router-dom';
import './PageRouter.scss';
import Icons from '../../../assets/images';

export default function PageRouter({
	pages,
}: {
	pages: {
		name: string;
		link: string;
	}[];
}) {
	return (
		<div className='router'>
			{pages.map((page) => {
				return (
					<Link to={page.link} key={page.name}>
						{page.name}
						<img src={Icons['ArrowDown']} alt='' />
					</Link>
				);
			})}
		</div>
	);
}
