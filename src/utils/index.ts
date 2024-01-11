import moment from 'moment';

export interface DataItem {
	id: string;
	name: string;
}
export const getDataName = (id: string, data: DataItem[], isTrue = true) => {
	if (isTrue) {
		const item = data?.find((item) => item.id === id);
		return item ? item.name : '';
	}
};

export const convertToDataItems = (
	inputArray: Record<string, string>[]
): DataItem[] => {
	return inputArray.map((item) => ({
		id: item.id,
		name: item.name,
	}));
};

export const formatDate = (value?: string, format = 'YYYY-MM-DD') => {
	if (!value) {
		return moment(new Date()).format(format);
	}
	return moment(value).format(format);
};

export const formatDateTime = (value?: string) => {
	if (!value) {
		return moment(new Date()).format('DD-MM-YYYY || h:mm a');
	}
	return moment(value).format('DD-MM-YYYY || h:mm a');
};
