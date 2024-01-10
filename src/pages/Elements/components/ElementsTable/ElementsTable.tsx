import { useEffect, useState } from 'react';
import Icons from '../../../../assets/images';
import Pagination from '../../../../components/base/Pagination/Pagination';
import { Element } from '../../../../types/apiResponseTypes';
import './ElementsTable.scss';
import moment from 'moment';
import DropdownBtn from '../../../../components/base/DropdownBtn/DropdownBtn';
import EmptyState from '../../../../components/base/Emptystate/EmptyState';
import Spinner from '../../../../components/base/Spinner/Spinner';

export default function ElementsTable({
	data,
	setIsModalOpen,
	isLoading,
}: {
	data?: Element[];
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading: boolean;
}) {
	const [items, setCurrentItems] = useState<Element[]>();
	const [itemOffset, setItemOffset] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(5);

	useEffect(() => {
		if (data) {
			const endOffset = itemOffset + itemsPerPage;
			setCurrentItems(data?.slice(itemOffset, endOffset));
			setPageCount(Math.ceil(data?.length / itemsPerPage));
		}
	}, [itemOffset, itemsPerPage, data]);

	const handlePageChange = (selected: number) => {
		if (data) {
			const newOffset = (selected * itemsPerPage) % data?.length;
			setItemOffset(newOffset);
		}
	};

	if (items && items?.length <= 0) {
		return (
			<EmptyState
				text='There are no elements to display'
				styleProp={{ padding: '127px 0' }}
			/>
		);
	}

	return (
		<div className='elements-table'>
			<div className='mobile-header'>
				<p>items</p>
				<span role='button' className='open-filter'>
					<img src={Icons['Filter']} alt='' />
				</span>
			</div>

			<table>
				<thead>
					<tr>
						<th>
							Name{' '}
							<span role='button' className='open-filter'>
								<img src={Icons['Filter']} alt='' />
							</span>
						</th>
						<th>
							Element Category{' '}
							<span role='button' className='open-filter'>
								<img src={Icons['Filter']} alt='' />
							</span>
						</th>
						<th>
							Element Classification{' '}
							<span role='button' className='open-filter'>
								<img src={Icons['Filter']} alt='' />
							</span>
						</th>
						<th>
							Status{' '}
							<span role='button' className='open-filter'>
								<img src={Icons['Filter']} alt='' />
							</span>
						</th>
						<th className='date'>
							Date and Time Modified{' '}
							<span role='button' className='open-filter'>
								<img src={Icons['Filter']} alt='' />
							</span>
						</th>
						<th>
							Modified By{' '}
							<span role='button' className='open-filter'>
								<img src={Icons['Filter']} alt='' />
							</span>
						</th>
						<th>Action</th>
					</tr>
				</thead>
				{isLoading ? (
					<Spinner />
				) : (
					<tbody>
						{items?.map((item) => (
							<tr key={item.id}>
								<td data-name='name' className='itemname'>
									{item.name}
								</td>
								<td data-name='category'>{item.categoryValueId}</td>
								<td data-name='classification'>{item.classificationValueId}</td>
								<td data-name='status' className=''>
									<span className={`status-span ${item.status.toLowerCase()}`}>
										{item.status}
									</span>
								</td>
								<td className='date'>
									{moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
								</td>
								<td data-name='organization'>{item.modifiedBy}</td>

								<td data-name='action' className='action'>
									<DropdownBtn item={item} setIsModalOpen={setIsModalOpen} />
								</td>
							</tr>
						))}
					</tbody>
				)}
			</table>

			<Pagination
				totalCount={data?.length ?? 0}
				pageCount={pageCount}
				handlePageChange={handlePageChange}
				itemsPerPage={itemsPerPage}
				setItemsPerPage={setItemsPerPage}
			/>
		</div>
	);
}
