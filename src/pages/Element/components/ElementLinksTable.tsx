import { useEffect, useState } from 'react';
import Icons from '../../../assets/images';
import Pagination from '../../../components/base/Pagination/Pagination';
import { ElementLink } from '../../../types/apiResponseTypes';
import { useAppDispatch } from '../../../store/hook';
import { useDeleteElementLinkMutation } from '../../../store/apiService';
import { setCurrentElementLink } from '../../../store/elementLinksSlice';
import useGetSuborganizations from '../../../hooks/useGetSuborganization';
import useGetLookupValues from '../../../hooks/useGetLookupValues';
import { lookUpIds } from '../../../lib/data';
import useGetDepartments from '../../../hooks/useGetDepartments';
import { getDataName } from '../../../utils';

const DepartmentName = ({
	orgId,
	deptId,
}: {
	orgId: string;
	deptId: string;
}) => {
	const { data: departments } = useGetDepartments({
		orgId,
		departmentId: deptId,
	});

	const name = departments ? getDataName(deptId.toString(), departments) : '';

	return <>{name}</>;
};

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
	const { data: subOrganizations } = useGetSuborganizations();

	const { data: employeeCategories } = useGetLookupValues(
		lookUpIds.employeeCategory
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
	return (
		<div className='table-container'>
			<div className='mobile-header'>
				<p>Element Links</p>
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
						<th className='hide-sm'>
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

						<th className='hide-sm'>
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
							<td data-name='sub-organization' className='hide-sm'>
								{getDataName(
									item.suborganizationId.toString(),
									subOrganizations
								)}
							</td>
							<td data-name='department'>
								<DepartmentName
									orgId={item.suborganizationId.toString()}
									deptId={item.departmentId.toString()}
								/>
							</td>
							<td data-name='element-category'>
								{getDataName(
									item.employeeCategoryValueId.toString(),
									employeeCategories
								)}
							</td>
							<td data-name='amount' className='hide-sm'>
								{`NGN ${item.amount}`}y
							</td>
							<td data-name='view-details' className='view-details'>
								<span>View Details</span>
							</td>

							<td data-name='action' className='action'>
								<span className='btn-group'>
									<span
										onClick={() => {
											dispatch(setCurrentElementLink(item));
											setLinkModalOpen(true);
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
