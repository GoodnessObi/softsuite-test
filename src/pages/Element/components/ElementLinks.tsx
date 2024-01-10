import { useState } from 'react';
import Icons from '../../../assets/images';
import Button from '../../../components/base/Button/Button';
import EmptyState from '../../../components/base/Emptystate/EmptyState';
import { ElementLink } from '../../../types/apiResponseTypes';
import ElementLinksTable from './ElementLinksTable';
import CenterModal from '../../../components/base/Modal/CenterModal/CenterModal';
import ELementLinkForm from './ElementLinkForm';

export default function ElementLinks({ data }: { data: ElementLink[] }) {
	const [linkModalOpen, setLinkModalOpen] = useState(false);

	return (
		<div>
			<div className='elements__header'>
				<h1 className='page-title'>Elements</h1>
				<div className='elements__action'>
					<div className='elements__search'>
						<div className='search'>
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
						Create Element Link
						<img src={Icons['Plus']} alt='' />
					</Button>
				</div>

				{data?.length === 0 ? (
					<EmptyState text='There are no element links to display' />
				) : (
					<ElementLinksTable data={data} setLinkModalOpen={setLinkModalOpen} />
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
