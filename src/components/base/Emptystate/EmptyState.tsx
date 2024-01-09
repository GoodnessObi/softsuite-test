import Icons from '../../../assets/images';
import './EmptyState.scss';

export default function EmptyState({
	text,
	styleProp,
}: {
	text?: string;
	styleProp?: React.CSSProperties;
}) {
	return (
		<div className='empty' style={{ ...styleProp }}>
			<img src={Icons['Empty']} alt='' />
			<p>
				<img src={Icons['Error']} alt='' />{' '}
				{text ? text : 'Sorry, this is empty'}
			</p>
		</div>
	);
}
