import { useEffect, useState } from 'react';
import Icons from '../../../assets/images';
// import Button from '../../../components/base/Button/Button';
import Pagination from '../../../components/base/Pagination/Pagination';
import { ElementLink } from '../../../types/apiResponseTypes';
import { useAppDispatch } from '../../../store/hook';
import { useDeleteElementLinkMutation } from '../../../store/apiService';
import { setCurrentElementLink } from '../../../store/elementLinksSlice';

export default function ElementLinksTable({
	data,
	setLinkModalOpen,
}: {
	data: ElementLink[];
	setLinkModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [items, setCurrentItems] = useState<ElementLink[]>();
	const [itemOffset, setItemOffset] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const dispatch = useAppDispatch();
	const [deleteElementLink] = useDeleteElementLinkMutation();

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
							Sub-Organization{' '}
							<span role='button' className='open-filter'>
								<img src={Icons['Filter']} alt='' />
							</span>
						</th>
						<th>
							Department{' '}
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
							Amount{' '}
							<span role='button' className='open-filter'>
								<img src={Icons['Filter']} alt='' />
							</span>
						</th>
						<th>Details</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{items?.map((item) => (
						<tr key={item.id}>
							<td data-name='name' className='itemname'>
								{item.name}
							</td>
							<td data-name='sub-organization'>{item.suborganizationId}</td>
							<td data-name='department'>{item.departmentId}</td>
							<td data-name='element-category'>{item.employeeCategoryId}</td>
							<td data-name='amount'>{`NGN ${item.amount}`}y</td>
							<td data-name='view-details'>
								<span>View Details</span>
							</td>

							<td data-name='action' className='action'>
								<span
									onClick={() => {
										dispatch(setCurrentElementLink(item));
										setLinkModalOpen(true);
										// dispatch(setCurrentEditElement(user));
										// setFormType('EDIT');
										// setShowModal(true);
									}}
								>
									<img src={Icons['Edit']} alt='' />
								</span>

								<span
									onClick={() => {
										deleteElementLink({
											id: `${item.id}`,
											elementId: `${item.elementId}`,
										});
									}}
								>
									<img src={Icons['Delete']} alt='' />
								</span>
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
