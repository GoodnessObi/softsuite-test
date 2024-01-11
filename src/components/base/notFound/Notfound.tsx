import Icons from '../../../assets/images';
import './Notfound.scss';
import { Link } from 'react-router-dom';

const Notfound = () => {
	return (
		<div>
			<div className='notFound'>
				<div className='notFound__body'>
					<p>Oops! Page Not Found</p>
					<img src={Icons['Empty']} alt='SVG logo' />

					<p>The page you are looking for doesn't exist.</p>
					<Link to='/'>Visit the elements page to continue</Link>
				</div>
			</div>
		</div>
	);
};

export default Notfound;
