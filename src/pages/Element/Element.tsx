import { useParams } from 'react-router-dom';
import {
	useGetElementLinksQuery,
	useGetElementQuery,
} from '../../store/apiService';
import ElementDetails from './components/ElementDetails';
import ElementLinks from './components/ElementLinks';
import './Element.scss';
import Spinner from '../../components/base/Spinner/Spinner';
import SideModal from '../../components/base/sideModal/SideModal';
import ElementLinkDetails from './components/ElementLinkDetails/ElementLinkDetails';
import { useAppSelector } from '../../store/hook';

export default function ElementPage() {
	const { id } = useParams() as { id: string };
	const isDetailModalOpen = useAppSelector(
		(state) => state.elementLinks.isDetailsModalOpen
	);
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
			{isDetailModalOpen && (
				<SideModal>
					<ElementLinkDetails />
				</SideModal>
			)}
		</div>
	);
}
