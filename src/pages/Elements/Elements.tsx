import Icons from '../../assets/images';
import Button from '../../components/base/Button/Button';
import { Element } from '../../types/apiResponseTypes';
import './Elements.scss';
import ElementsTable from './components/ElementsTable';

export default function Elements() {
	return (
		<div className='elements'>
			<div className='elements__header'>
				<h1 className='page-title'>Elements</h1>

				<div className='elements__action'>
					<div className='elements__search'>
						<div className='search'>
							<div className='search-group'>
								<input
									type='search'
									className='form-input'
									placeholder='Search for anything'
								/>
								<span className='icon'>
									<img src={Icons['Search']} alt='' />
								</span>
							</div>
						</div>

						<Button btnType='secondary' styleProp={{ padding: '10px' }}>
							<img src={Icons['FilterBtn']} alt='' />
						</Button>
					</div>

					<Button styleProp={{ padding: '16px' }}>
						Create Element
						<img src={Icons['Plus']} alt='' />
					</Button>
				</div>
			</div>

			<ElementsTable data={elements} />
		</div>
	);
}

const elements: Element[] = [
	{
		name: 'Element1',
		description: 'Description for Element1',
		payRunId: 1,
		payRunValueId: 101,
		classificationId: 201,
		classificationValueId: 301,
		categoryId: 401,
		categoryValueId: 501,
		reportingName: 'Report1',
		processingType: 'Type1',
		status: 'Active',
		prorate: 'Yes',
		effectiveStartDate: '2024-01-01',
		effectiveEndDate: '2024-12-31',
		selectedMonths: ['January', 'February', 'March'],
		payFrequency: 'Monthly',
	},
	{
		name: 'Element2',
		description: 'Description for Element2',
		payRunId: 2,
		payRunValueId: 102,
		classificationId: 202,
		classificationValueId: 302,
		categoryId: 402,
		categoryValueId: 502,
		reportingName: 'Report2',
		processingType: 'Type2',
		status: 'Inactive',
		prorate: 'No',
		effectiveStartDate: '2024-02-01',
		effectiveEndDate: '2024-11-30',
		selectedMonths: ['April', 'May', 'June'],
		payFrequency: 'Bi-Monthly',
	},
	{
		name: 'Element3',
		description: 'Description for Element3',
		payRunId: 3,
		payRunValueId: 103,
		classificationId: 203,
		classificationValueId: 303,
		categoryId: 403,
		categoryValueId: 503,
		reportingName: 'Report3',
		processingType: 'Type3',
		status: 'Active',
		prorate: 'Yes',
		effectiveStartDate: '2024-03-01',
		effectiveEndDate: '2024-10-31',
		selectedMonths: ['July', 'August', 'September'],
		payFrequency: 'Weekly',
	},
	{
		name: 'Element4',
		description: 'Description for Element4',
		payRunId: 4,
		payRunValueId: 104,
		classificationId: 204,
		classificationValueId: 304,
		categoryId: 404,
		categoryValueId: 504,
		reportingName: 'Report4',
		processingType: 'Type4',
		status: 'Inactive',
		prorate: 'No',
		effectiveStartDate: '2024-04-01',
		effectiveEndDate: '2024-09-30',
		selectedMonths: ['October', 'November', 'December'],
		payFrequency: 'Monthly',
	},
	{
		name: 'Element6',
		description: 'Description for Element6',
		payRunId: 6,
		payRunValueId: 106,
		classificationId: 206,
		classificationValueId: 306,
		categoryId: 406,
		categoryValueId: 506,
		reportingName: 'Report6',
		processingType: 'Type6',
		status: 'Active',
		prorate: 'Yes',
		effectiveStartDate: '2024-06-01',
		effectiveEndDate: '2024-07-31',
		selectedMonths: ['January', 'March', 'April'],
		payFrequency: 'Monthly',
	},
	{
		name: 'Element7',
		description: 'Description for Element7',
		payRunId: 7,
		payRunValueId: 107,
		classificationId: 207,
		classificationValueId: 307,
		categoryId: 407,
		categoryValueId: 507,
		reportingName: 'Report7',
		processingType: 'Type7',
		status: 'Inactive',
		prorate: 'No',
		effectiveStartDate: '2024-07-01',
		effectiveEndDate: '2024-06-30',
		selectedMonths: ['May', 'November', 'December'],
		payFrequency: 'Bi-Monthly',
	},
	{
		name: 'Element8',
		description: 'Description for Element8',
		payRunId: 8,
		payRunValueId: 108,
		classificationId: 208,
		classificationValueId: 308,
		categoryId: 408,
		categoryValueId: 508,
		reportingName: 'Report8',
		processingType: 'Type8',
		status: 'Active',
		prorate: 'Yes',
		effectiveStartDate: '2024-08-01',
		effectiveEndDate: '2024-05-31',
		selectedMonths: ['February', 'April', 'September'],
		payFrequency: 'Weekly',
	},
	{
		name: 'Element9',
		description: 'Description for Element9',
		payRunId: 9,
		payRunValueId: 109,
		classificationId: 209,
		classificationValueId: 309,
		categoryId: 409,
		categoryValueId: 509,
		reportingName: 'Report9',
		processingType: 'Type9',
		status: 'Inactive',
		prorate: 'No',
		effectiveStartDate: '2024-09-01',
		effectiveEndDate: '2024-04-30',
		selectedMonths: ['March', 'July', 'October'],
		payFrequency: 'Bi-Weekly',
	},
	{
		name: 'Element10',
		description: 'Description for Element10',
		payRunId: 10,
		payRunValueId: 110,
		classificationId: 210,
		classificationValueId: 310,
		categoryId: 410,
		categoryValueId: 510,
		reportingName: 'Report10',
		processingType: 'Type10',
		status: 'Active',
		prorate: 'Yes',
		effectiveStartDate: '2024-10-01',
		effectiveEndDate: '2024-03-31',
		selectedMonths: ['June', 'August', 'November'],
		payFrequency: 'Monthly',
	},
];
