import Icons from '../../../assets/images';
import './EmptyState.scss';

export default function EmptyState({ text }: { text?: string }) {
	return (
		<div className='empty'>
			<img src={Icons['Empty']} alt='' />
			<p>
				<img src={Icons['Error']} alt='' />{' '}
				{text ? text : 'Sorry, this is empty'}
			</p>
		</div>
	);
}
