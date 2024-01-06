import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.scss';

export default function Pagination() {
	// const [currentUsers, setCurrentUsers] = useState<User[]>([]);
	const [pageCount, setPageCount] = useState(0);
	// const [itemOffset, setItemOffset] = useState(0);
	// const [itemsPerPage, setItemsPerPage] = useState(10);

	// useEffect(() => {
	// 	const endOffset = itemOffset + itemsPerPage;
	// 	setCurrentUsers(users.slice(itemOffset, endOffset));
	// 	setPageCount(Math.ceil(users.length / itemsPerPage));
	// }, [itemOffset, itemsPerPage, users]);

	const handlePageClick = () => {
		console.log('clickkkk');
		// const newOffset = (event.selected * itemsPerPage) % users.length;
		// setItemOffset(newOffset);
	};

	// const selectPageCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	setItemsPerPage(+e.currentTarget.value);
	// };

	return (
		<div className='pagination_wrapper'>
			<ReactPaginate
				nextLabel='>'
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				previousLabel='<'
				pageClassName='page-item'
				pageLinkClassName='page-link'
				previousClassName='page-item prev'
				previousLinkClassName='page-link'
				nextClassName='page-item next'
				nextLinkClassName='page-link'
				breakLabel='...'
				breakClassName='page-item'
				breakLinkClassName='page-link'
				containerClassName='pagination'
				activeClassName='active'
				renderOnZeroPageCount={null}
			/>
		</div>
	);
}
