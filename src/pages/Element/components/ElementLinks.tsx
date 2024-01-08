import Icons from '../../../assets/images';
import Button from '../../../components/base/Button/Button';
import EmptyState from '../../../components/base/Emptystate/EmptyState';
import { ElementLink } from '../../../types/apiResponseTypes';
import ElementLinksTable from './ElementLinksTable';

export default function ElementLinks({ data }: { data: ElementLink[] }) {
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

						<Button btnType='secondary' styleProp={{ padding: '10px' }}>
							<img src={Icons['FilterBtn']} alt='' />
						</Button>
					</div>

					<Button
						styleProp={{ padding: '16px' }}
						// onClick={() => setIsModalOpen(true)}
					>
						Create Element
						<img src={Icons['Plus']} alt='' />
					</Button>
				</div>

				{data?.length === 0 ? (
					<EmptyState text='There are no element links to display' />
				) : (
					<ElementLinksTable data={data} />
				)}
			</div>
		</div>
	);
}
