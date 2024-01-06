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
