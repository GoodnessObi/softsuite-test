import ReactPaginate from 'react-paginate';
import './Pagination.scss';

export default function Pagination({
	pageCount,
	totalCount,
	handlePageChange,
	itemsPerPage,
	setItemsPerPage,
}: {
	pageCount: number;
	totalCount: number;
	itemsPerPage: number;
	setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
	handlePageChange: (event: any) => void;
}) {
	const handlePageClick = (event: any) => {
		handlePageChange(event.selected);
		// const newOffset = (event.selected * itemsPerPage) % users.length;
		// setItemOffset(newOffset);
	};

	const selectPageCount = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setItemsPerPage(+e.currentTarget.value);
	};

	return (
		<div className='pagination_wrapper'>
			<div className='select-box'>
				<span>
					Showing out
					<span>
						<label htmlFor='pageitems' hidden></label>
						<select
							className='pageitems'
							name='page Items'
							id='pageitems'
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
								selectPageCount(e)
							}
						>
							<option value={itemsPerPage}>{itemsPerPage}</option>
							<option value='20'>10</option>
							<option value='50'>20</option>
							<option value='100'>50</option>
						</select>
					</span>
					out of {totalCount}
				</span>
			</div>
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
