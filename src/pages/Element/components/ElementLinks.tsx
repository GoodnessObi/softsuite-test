import { useState } from 'react';
import Icons from '../../../assets/images';
import Button from '../../../components/base/Button/Button';
import EmptyState from '../../../components/base/Emptystate/EmptyState';
import { ElementLink } from '../../../types/apiResponseTypes';
import ElementLinksTable from './ElementLinksTable';
import CenterModal from '../../../components/base/Modal/CenterModal/CenterModal';
import ELementLinkForm from './ElementLinkForm';
import Spinner from '../../../components/base/Spinner/Spinner';

export default function ElementLinks({
	data,
	isLoading,
}: {
	data: ElementLink[];
	isLoading: boolean;
}) {
	const [linkModalOpen, setLinkModalOpen] = useState(false);

	return (
		<div>
			<div className='elements__header'>
				<h1 className='page-title'>Element Links</h1>
				<div className='elements__action'>
					<div className='elements__search'>
						<div className='search-input'>
							<div className='search-group'>
								<input
									type='search'
									className='form-input'
									placeholder='Search for anything'
								/>
								<span className='icon'>
									<img src={Icons['Search']} alt='' />
								</span>
							</div>
						</div>
					</div>

					<Button
						styleProp={{ padding: '16px' }}
						onClick={() => setLinkModalOpen(true)}
					>
						<span className='text-hide'>Create Element Link</span>
						<img src={Icons['Plus']} alt='' />
					</Button>
				</div>

				{isLoading ? (
					<Spinner size='medium' />
				) : data?.length === 0 ? (
					<EmptyState text='There are no element links to display' />
				) : (
					<ElementLinksTable setLinkModalOpen={setLinkModalOpen} data={data} />
				)}
			</div>

			{linkModalOpen && (
				<CenterModal>
					<ELementLinkForm setLinkModalOpen={setLinkModalOpen} />
				</CenterModal>
			)}
		</div>
	);
}
