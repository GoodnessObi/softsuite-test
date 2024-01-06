// import { Link } from 'react-router-dom';
import Icons from '../../../assets/images';
import Pagination from '../../../components/base/Pagination/Pagination';
import { Element } from '../../../types/apiResponseTypes';
import './ElementsTable.scss';

export default function ElementsTable({ data }: { data: Element[] }) {
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
				<tbody>
					{data.map((item) => (
						<tr key={item.payRunId}>
							<td data-name='name' className='itemname'>
								{/* <Link to={`/items/${item.id}`}> */}
								{item.name}
								{/* </Link> */}
							</td>
							<td data-name='category'>{item.categoryId}</td>
							<td data-name='classification'>{item.classificationId}</td>
							<td data-name='status' className=''>
								<span className={`status-span ${item.status.toLowerCase()}`}>
									{item.status}
								</span>
							</td>
							<td className='date'>{item.effectiveEndDate}</td>
							<td data-name='organization'>{item.effectiveStartDate}</td>

							<td data-name='action' className='action'>
								{/* <DropdownBtn id={item.id} status={item.status} /> */}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Pagination />
		</div>
	);
}