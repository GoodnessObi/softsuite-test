export type Element = {
	id: number;
	name: string;
	description: string;
	payRunId: number;
	payRunValueId: number;
	classificationId: number;
	classificationValueId: number;
	categoryId: number;
	categoryValueId: number;
	reportingName: string;
	processingType: string;
	status: string;
	prorate: string;
	effectiveStartDate: string;
	effectiveEndDate: string;
	selectedMonths: string[];
	payFrequency: string;
	modifiedBy?: string;
	createdAt?: string;
};

export type FormElementType = Omit<Element, 'id' | 'createdAt'>;

export type ElementLink = {
	id: number;
	name: string;
	elementId: number;
	suborganizationId: number;
	locationId: number;
	departmentId: number;
	employeeCategoryId: number;
	employeeCategoryValueId: number;
	employeeTypeId: number;
	employeeTypeValueId: number;
	jobTitleId: number;
	grade: number;
	gradeStep: number;
	unionId: number;
	amountType: string;
	amount: number;
	rate: number;
	effectiveStartDate: string;
	effectiveEndDate: string;
	modifiedBy?: string;
	status: string;
	automate: string;
	additionalInfo: {
		lookupId: number;
		lookupValueId: number;
	}[];
};

export type FormElementLinkType = Partial<ElementLink>;

export type LookUp = {
	createdAt: string; // Assuming createdAt is a string representing a date in ISO format
	name: string;
	description: string;
	type: string;
	id: string;
};

export type LookUpValue = {
	id: string;
	name: string;
	description: string;
	status: string;
	lookupId: string;
	lookupName: string;
	createdAt: string; // Assuming createdAt is a string representing a date in ISO format
};

export type Suborganization = {
	createdAt: string; // Assuming createdAt is a string representing a date in ISO format
	name: string;
	note: string;
	id: string;
};

export type Department = {
	createdAt: string; // Assuming createdAt is a string representing a date in ISO format
	name: string;
	note: string;
	id: string;
	suborganizationId: string;
};

export type Grade = {
	createdAt: string; // Assuming createdAt is a string representing a date in ISO format
	name: string;
	description: string;
	id: string;
};

export type GradeStep = {
	createdAt: string; // Assuming createdAt is a string representing a date in ISO format
	name: string;
	amount: string;
	description: string;
	id: string;
	gradeId: string;
};
