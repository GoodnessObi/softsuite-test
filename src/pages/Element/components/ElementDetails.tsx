import Icons from '../../../assets/images';
import useGetLookupValues from '../../../hooks/useGetLookupValues';
import { lookUpIds } from '../../../lib/data';
import { Element } from '../../../types/apiResponseTypes';
import { Link } from 'react-router-dom';
import { formatDate, getDataName } from '../../../utils';

export default function ElementDetails({ element }: { element: Element }) {
	const { data: classifications } = useGetLookupValues(
		lookUpIds.elementClassification
	);
	const { data: categoriesData } = useGetLookupValues(
		lookUpIds.elementCategory
	);
	const { data: payruns } = useGetLookupValues(lookUpIds.payRun);

	console.log('eeee', element);

	return (
		<div>
			<div className='element__back'>
				<Link to='/'>
					<img src={Icons['Back']} alt='SVG logo' />
				</Link>
			</div>
			<h1 className='page-title'>Element Details</h1>

			<div className='element__detail'>
				<div className='element__item'>
					<p className='element__label'>Element Name</p>
					<p className='element__text'>{element?.name}</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>Element Classification</p>
					<p className='element__text'>
						{getDataName(
							element.classificationValueId.toString(),
							classifications
						)}
					</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>ELEMENT category</p>
					<p className='element__text'>
						{getDataName(element.categoryValueId.toString(), categoriesData)}
					</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>payrun</p>
					<p className='element__text'>
						{getDataName(element.payRunValueId.toString(), payruns)}
					</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>Description</p>
					<p className='element__text'>{element?.description}</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>Reporting Name</p>
					<p className='element__text'>{element?.reportingName}</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>Effective Start Date</p>
					<p className='element__text'>
						{formatDate(element?.effectiveStartDate, 'DD-MM-YYYY')}
					</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>Effective END Date</p>
					<p className='element__text'>
						{' '}
						{formatDate(element?.effectiveEndDate, 'DD-MM-YYYY')}
					</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>processing Type</p>
					<p className='element__text'>
						{element?.processingType === '1'
							? 'Open'
							: element?.processingType === '2'
							? 'Closed'
							: ''}
					</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>PAY frequency</p>
					<p className='element__text'>
						{element?.payFrequency === '1'
							? 'Monthly'
							: element?.payFrequency === '2'
							? 'Selected Months'
							: ''}
					</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>Pay Months</p>
					<p className='element__text'>{element?.selectedMonths?.toString()}</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>Prorate</p>
					<p className='element__text'>
						{element?.prorate === '1'
							? 'Yes'
							: element?.prorate === '2'
							? 'No'
							: ''}
					</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>Status</p>
					<p className='element__text'>
						{element?.status == 'true' ? 'Active' : 'Inactive'}
					</p>
				</div>
				<div className='element__item'>
					<p className='element__label'>Prorate</p>
					<p className='element__text'>Yes</p>
				</div>
			</div>
		</div>
	);
}
