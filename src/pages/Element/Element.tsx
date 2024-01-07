import { useParams } from 'react-router-dom';
import { useGetElementQuery } from '../../store/apiService';
import ElementDetails from './components/ElementDetails';
import ElementLinksTable from './components/ElementLinksTable';

export default function ElementPage() {
	const { id } = useParams() as { id: string };
	const { data: element, isLoading, isSuccess } = useGetElementQuery(id);
	// const [user] = useUser(id);
	if (isLoading) {
		return <div>Lodainggg..........</div>;
	}
	return (
		<div className='element'>
			{' '}
			{isSuccess && <ElementDetails element={element} />}
			<ElementLinksTable />
		</div>
	);
}
