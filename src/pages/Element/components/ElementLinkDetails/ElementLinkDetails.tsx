import { useParams } from 'react-router-dom';
import { useGetElementLinkQuery } from '../../../../store/apiService';
import { useAppSelector } from '../../../../store/hook';
import Icons from '../../../../assets/images';
import Spinner from '../../../../components/base/Spinner/Spinner';
import { useDispatch } from 'react-redux';
import { closeDetailsModal } from '../../../../store/elementLinksSlice';
import '../../Element.scss';
import useGetLookupValues from '../../../../hooks/useGetLookupValues';
import { lookUpIds } from '../../../../lib/data';
import useGetSuborganizations from '../../../../hooks/useGetSuborganization';
import { formatDate, getDataName } from '../../../../utils';
import useGetDepartments from '../../../../hooks/useGetDepartments';
import useGetGrades from '../../../../hooks/useGetGrades';
import useGetGradeSteps from '../../../../hooks/useGetGradeSteps';

const ElementLinkDetails = () => {
	const { id } = useParams() as { id: string };
	const currentDetailId = useAppSelector(
		(state) => state.elementLinks.currentDetailId
	);
	const elementId = currentDetailId ? currentDetailId.toString() : '';

	console.log(id, 'hdhdh', elementId);
	const { data: details, isLoading } = useGetElementLinkQuery(
		{
			id,
			elementId,
		},
		{
			skip: elementId === '',
		}
	);
	const dispatch = useDispatch();
	const { data: locations } = useGetLookupValues(lookUpIds.location);
	const { data: employeeTypes } = useGetLookupValues(lookUpIds.employeeType);
	const { data: employeeCategories } = useGetLookupValues(
		lookUpIds.employeeCategory
	);
	const { data: subOrganizations } = useGetSuborganizations();
	const { departmentName } = useGetDepartments({
		orgId: details ? details.suborganizationId.toString() : '',
		departmentId: details ? details.departmentId.toString() : '',
	});
	const { data: grades } = useGetGrades();
	const { gradeStepName } = useGetGradeSteps({
		gradeId: details?.grade ? `${details?.grade}` : '',
		gradeStepId: details?.gradeStep ? `${details?.gradeStep}` : '',
	});

	return (
		<div className='element'>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<div className='page__header'>
						<button
							className='close-btn'
							onClick={() => dispatch(closeDetailsModal())}
						>
							<img src={Icons['CloseModal']} alt='' />
						</button>
						<h1 className='page-title'>Element Detail</h1>
					</div>
					<div className='element__detail element__detail--link'>
						<div className='element__item'>
							<p className='element__label'>NAME</p>
							<p className='element__text'>{details?.name}</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>sub organization</p>
							<p className='element__text'>
								{details?.suborganizationId
									? getDataName(
											details.suborganizationId.toString(),
											subOrganizations
											// eslint-disable-next-line no-mixed-spaces-and-tabs
									  )
									: '-'}
							</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Department</p>
							<p className='element__text'>{departmentName ?? '-'}</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Location</p>
							<p className='element__text'>
								{details?.locationId
									? getDataName(details.locationId.toString(), locations)
									: '-'}
							</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Employee Type</p>
							<p className='element__text'>
								{details?.employeeTypeValueId
									? getDataName(
											details.employeeTypeValueId.toString(),
											employeeTypes
											// eslint-disable-next-line no-mixed-spaces-and-tabs
									  )
									: '-'}
							</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Employee Category</p>
							<p className='element__text'>
								{details?.employeeCategoryValueId
									? getDataName(
											details.employeeCategoryValueId.toString(),
											employeeCategories
											// eslint-disable-next-line no-mixed-spaces-and-tabs
									  )
									: '-'}
							</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Effective Date</p>
							<p className='element__text'>
								{details?.effectiveStartDate
									? formatDate(details?.effectiveStartDate, 'DD - MM - YYYY')
									: '-'}
							</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Status</p>
							<p className='element__text'>
								{details?.status === 'true' ? 'Active' : 'Inactive'}
							</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>GRADE</p>
							<p className='element__text'>
								{`Grade - ${
									details?.grade
										? getDataName(details.grade.toString(), grades)
										: '-'
								}`}
							</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Grade Step</p>
							<p className='element__text'>{gradeStepName}</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Amount Type</p>
							<p className='element__text'>{details?.amountType}</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>
								{details?.amount !== 0 ? `Amount` : `Rate`}
							</p>
							<p className='element__text'>
								{details?.amount !== 0
									? `NGN ${details?.amount}`
									: `${details?.rate}%`}
							</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Wardrobe</p>
							<p className='element__text'>
								{/* {
                  useFetchWardrobe(
                    details?.additionalInfo[0].lookupValueId,
                    wardrobeData
                  ).wardrobeName
                } */}
							</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Housing</p>
							<p className='element__text'>
								{/* {
                  useFetchHousing(
                    details?.additionalInfo[1].lookupValueId,
                    housingData
                  ).housingName
                } */}
							</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Effective Start Date</p>
							<p className='element__text'>
								{details?.effectiveStartDate
									? formatDate(details?.effectiveStartDate, 'DD - MM - YYYY')
									: '-'}
							</p>
						</div>
						<div className='element__item'>
							<p className='element__label'>Effective End Date</p>
							<p className='element__text'>
								{details?.effectiveEndDate
									? formatDate(details?.effectiveEndDate, 'DD - MM - YYYY')
									: '-'}
							</p>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ElementLinkDetails;
