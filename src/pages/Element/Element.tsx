import { useParams } from 'react-router-dom';
import {
	useGetElementLinksQuery,
	useGetElementQuery,
} from '../../store/apiService';
import ElementDetails from './components/ElementDetails';
import ElementLinks from './components/ElementLinks';
import './Element.scss';
import Spinner from '../../components/base/Spinner/Spinner';

export default function ElementPage() {
	const { id } = useParams() as { id: string };
	const { data: element, isLoading, isSuccess } = useGetElementQuery(id);
	const { data: elementLinks, isLoading: isLinksLoading } =
		useGetElementLinksQuery(element?.id ? `${element.id}` : '');

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className='element'>
			{' '}
			{isSuccess && <ElementDetails element={element} />}
			<ElementLinks
				data={elementLinks ? elementLinks : []}
				isLoading={isLinksLoading}
			/>
		</div>
	);
}
