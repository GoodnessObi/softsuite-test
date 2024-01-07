import Icons from '../../../assets/images';
import { Element } from '../../../types/apiResponseTypes';
import { Link } from 'react-router-dom';

export default function ElementDetails({ element }: { element: Element }) {
	return (
		<div className='page__header'>
			<div className='element__back'>
				<Link to='/'>
					<img src={Icons['Back']} alt='SVG logo' />
				</Link>
			</div>
			<h2>Element Details</h2>
			{
				<div className='element__detail'>
					<div className='single__detail'>
						<p className='element__label'>Element Name</p>
						<p className='element__text'>{element?.name}</p>
					</div>
					<div className='single__detail'>
						<p className='element__label'>Element Classification</p>
						<p className='element__text'>
							{/* {
								useGetElementClassification(
									element?.classificationId,
									elementClassificationData,
									isSuccess
								).elementClassificationName
							} */}
						</p>
					</div>
					<div className='single__detail'>
						<p className='element__label'>ELEMENT category</p>
						<p className='element__text'>
							{/* {
								useGetElementCategory(
									element?.categoryValueId,
									elementCategoryData
								).elementCategoryName
							} */}
						</p>
					</div>
					<div className='single__detail'>
						<p className='element__label'>payrun</p>
						<p className='element__text'>
							{/* {useGetPayrun(element?.payRunId, payrunData).payrunName} */}
						</p>
					</div>
					<div className='single__detail'>
						<p className='element__label'>Effective Start Date</p>
						<p className='element__text'>{element?.effectiveStartDate}</p>
					</div>
					<div className='single__detail'>
						<p className='element__label'>Effective END Date</p>
						<p className='element__text'>{element?.effectiveEndDate}</p>
					</div>
					<div className='single__detail'>
						<p className='element__label'>PROCESSING TYPE</p>
						<p className='element__text'>
							{element?.processingType === '1'
								? 'Open'
								: element?.processingType === '2'
								? 'Closed'
								: ''}
						</p>
					</div>
					<div className='single__detail'>
						<p className='element__label'>PAY frequency</p>
						<p className='element__text'>
							{element?.payFrequency === '1'
								? 'Monthly'
								: element?.payFrequency === '2'
								? 'Selected Months'
								: ''}
						</p>
					</div>
					<div className='single__detail'>
						<p className='element__label'>Pay Months</p>
						<p className='element__text'>{element?.selectedMonths}</p>
					</div>
					<div className='single__detail'>
						<p className='element__label'>Prorate</p>
						<p className='element__text'>
							{element?.prorate === '1'
								? 'Yes'
								: element?.prorate === '2'
								? 'No'
								: ''}
						</p>
					</div>
					<div className='single__detail'>
						<p className='element__label'>Status</p>
						<p className='element__text'>
							{/* {element?.status === true ||
							element?.status === 'active' ||
							element?.status === 'Active'
								? 'Active'
								: element?.status === false ||
								  element?.status === 'inactive' ||
								  element?.status === 'Inactive' ||
								  element?.status === ''
								? 'Inactive'
								: 'Unknown'} */}
						</p>
					</div>
					<div className='single__detail'>
						<p className='element__label' style={{ display: 'none' }}>
							Prorate
						</p>
						<p className='element__text' style={{ display: 'none' }}>
							Yes
						</p>
					</div>
				</div>
			}
		</div>
	);
}
