import Icons from '../../../assets/images';
import './Spinner.scss';

const Spinner = () => {
	return (
		<div className='spinner'>
			<img src={Icons['Spinner']} alt='SVG logo' />
		</div>
	);
};

export default Spinner;
