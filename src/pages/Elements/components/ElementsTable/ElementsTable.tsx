import { useEffect, useState } from 'react';
import Icons from '../../../../assets/images';
import Pagination from '../../../../components/base/Pagination/Pagination';
import { Element } from '../../../../types/apiResponseTypes';
import './ElementsTable.scss';
import DropdownBtn from '../../../../components/base/DropdownBtn/DropdownBtn';
import EmptyState from '../../../../components/base/Emptystate/EmptyState';
import useGetLookupValues from '../../../../hooks/useGetLookupValues';
import { lookUpIds } from '../../../../lib/data';
import { formatDateTime, getDataName } from '../../../../utils';

export default function ElementsTable({
	data,
	setIsModalOpen,
}: {
	data?: Element[];
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [items, setCurrentItems] = useState<Element[]>();
	const [itemOffset, setItemOffset] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const { data: classifications } = useGetLookupValues(
		lookUpIds.elementClassification
	);
	const { data: categoriesData } = useGetLookupValues(
		lookUpIds.elementCategory
	);

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
		<div className='table-container'>
			<div className='mobile-header'>
				<p>elements</p>
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
						<th className='date hide-sm'>
							Date and Time Modified{' '}
							<span role='button' className='open-filter'>
								<img src={Icons['Filter']} alt='' />
							</span>
						</th>
						<th className='hide-sm'>
							Modified By{' '}
							<span role='button' className='open-filter'>
								<img src={Icons['Filter']} alt='' />
							</span>
						</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					{items?.map((item) => (
						<tr key={item.id}>
							<td data-name='name' className='itemname'>
								{item.name}
							</td>
							<td data-name='category'>
								{getDataName(item.categoryValueId.toString(), categoriesData)}
							</td>
							<td data-name='classification'>
								{getDataName(
									item.classificationValueId.toString(),
									classifications
								)}
							</td>
							<td data-name='status' className='status'>
								<span className={`status-span ${item.status.toLowerCase()}`}>
									{item.status}
								</span>
							</td>
							<td className='date hide-sm'>{formatDateTime(item.createdAt)}</td>
							<td data-name='modifiedBy' className='hide-sm'>
								{item.modifiedBy}
							</td>

							<td data-name='action' className='action'>
								<DropdownBtn item={item} setIsModalOpen={setIsModalOpen} />
							</td>
						</tr>
					))}
				</tbody>
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
