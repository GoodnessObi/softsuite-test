import { useParams } from 'react-router-dom';
import { useGetElementQuery } from '../../store/apiService';
import ElementDetails from './components/ElementDetails';
import ElementLinks from './components/ElementLinks';
import './Element.scss';
import { ElementLink } from '../../types/apiResponseTypes';

export default function ElementPage() {
	const { id } = useParams() as { id: string };
	const { data: element, isLoading, isSuccess } = useGetElementQuery(id);

	if (isLoading) {
		return <div>Lodainggg..........</div>;
	}
	return (
		<div className='element'>
			{' '}
			{isSuccess && <ElementDetails element={element} />}
			<ElementLinks data={links} />
		</div>
	);
}

const links: ElementLink[] = [
	{
		id: '1',
		name: 'ElementLink1',
		elementId: 123,
		suborganizationId: 456,
		locationId: 789,
		departmentId: 101,
		employeeCategoryId: 202,
		employeeCategoryValueId: 303,
		employeeTypeId: 404,
		employeeTypeValueId: 505,
		jobTitleId: 606,
		grade: 7,
		gradeStep: 8,
		unionId: 909,
		amountType: 'Fixed',
		amount: 1000,
		rate: 25,
		effectiveStartDate: '2024-01-01',
		effectiveEndDate: '2024-12-31',
		status: 'Active',
		automate: 'Yes',
		additionalInfo: [
			{ lookupId: 1, lookupValueId: 101 },
			{ lookupId: 2, lookupValueId: 202 },
		],
	},
	{
		id: '1',
		name: 'ElementLink1',
		elementId: 123,
		suborganizationId: 456,
		locationId: 789,
		departmentId: 101,
		employeeCategoryId: 202,
		employeeCategoryValueId: 303,
		employeeTypeId: 404,
		employeeTypeValueId: 505,
		jobTitleId: 606,
		grade: 7,
		gradeStep: 8,
		unionId: 909,
		amountType: 'Fixed',
		amount: 1000,
		rate: 25,
		effectiveStartDate: '2024-01-01',
		effectiveEndDate: '2024-12-31',
		status: 'Active',
		automate: 'Yes',
		additionalInfo: [
			{ lookupId: 1, lookupValueId: 101 },
			{ lookupId: 2, lookupValueId: 202 },
		],
	},
	// Object 2
	{
		id: '2',
		name: 'ElementLink2',
		elementId: 456,
		suborganizationId: 789,
		locationId: 101,
		departmentId: 202,
		employeeCategoryId: 303,
		employeeCategoryValueId: 404,
		employeeTypeId: 505,
		employeeTypeValueId: 606,
		jobTitleId: 707,
		grade: 6,
		gradeStep: 7,
		unionId: 808,
		amountType: 'Hourly',
		amount: 20,
		rate: 30,
		effectiveStartDate: '2024-02-01',
		effectiveEndDate: '2024-11-30',
		status: 'Inactive',
		automate: 'No',
		additionalInfo: [
			{ lookupId: 3, lookupValueId: 303 },
			{ lookupId: 4, lookupValueId: 404 },
		],
	},
];
