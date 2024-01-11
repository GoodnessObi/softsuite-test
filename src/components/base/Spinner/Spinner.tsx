export default function Spinner({ size }: { size?: 'small' | 'medium' }) {
	return (
		<div className={`loader-container ${size}`}>
			<div className='loader'></div>
		</div>
	);
}
