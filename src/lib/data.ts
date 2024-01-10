export type NavLinkType = {
	label: string;
	link?: string;
	icon?: string;
	subSection?: NavLinkType[];
};

type NavLinksSection = NavLinkType[];

type NavLinks = {
	sectionOne: NavLinksSection;
	sectionTwo: NavLinksSection;
};

export const navlinks: NavLinks = {
	sectionOne: [
		{
			label: 'Dashboard',
			icon: 'Dashboard',
			link: '/dashboard',
		},
		{
			label: 'Payroll Activities',
			icon: 'PayrollAct',
			subSection: [
				{
					label: 'Placeholder',
					link: '/#',
				},
			],
		},
		{
			label: 'Salary Structure',
			icon: 'SalaryStructure',
			link: '/#',
		},
		{
			label: 'Element Setup',
			icon: 'Settings',
			subSection: [
				{
					label: 'Elements',
					link: '/elements',
				},
				{
					label: 'Balances',
					link: '/#',
				},
			],
		},
		{
			label: 'Employees',
			icon: 'Employees',
			link: '/#',
		},
	],
	sectionTwo: [
		{
			label: 'Payroll Settings',
			icon: 'Settings',
			subSection: [
				{
					label: 'Placeholder',
					link: '/#',
				},
			],
		},
		{
			label: 'My Account',
			icon: 'Profile',
			link: '/#',
		},
	],
};

export const formSteps = {
	stepOne: 'ELEMENT_DETAILS',
	stepTwo: 'ADDITIONAL_DETAILS',
};

export const linkFormSteps = {
	stepOne: 'STAFF_INFO',
	stepTwo: 'PROCESSING_INFO',
	stepThree: 'ADDITIONAL_INFO',
};

// export const lookUp = {
// 	classificationId: '2',
// 	payrunId: '5',
// 	jobTitleId: '6',
// 	locationId: '7',
// 	employeeTypeid: '4',
// 	employeeCategoryId: '5',
// 	unionId: '8',
// 	housingId: '9',
// 	wardrobeId: '10',
// 	securityId: '11',
// };

export const monthOptions = [
	{ value: 'January', label: 'January' },
	{ value: 'February', label: 'February' },
	{ value: 'March', label: 'March' },
	{ value: 'April', label: 'April' },
	{ value: 'May', label: 'May' },
	{ value: 'June', label: 'June' },
	{ value: 'July', label: 'July' },
	{ value: 'August', label: 'August' },
	{ value: 'September', label: 'September' },
	{ value: 'October', label: 'October' },
	{ value: 'November', label: 'November' },
	{ value: 'December', label: 'December' },
];

export const lookUpIds = {
	elementCategory: '1',
	elementClassification: '2',
	employeeCategory: '3',
	employeeType: '4',
	payRun: '5',
	jobTitle: '6',
	location: '7',
	union: '8',
	housing: '9',
	wardrobe: '10',
	security: '11',
};
