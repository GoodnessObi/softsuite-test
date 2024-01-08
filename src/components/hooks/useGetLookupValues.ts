import { useGetLookupValuesQuery } from '../../store/apiService';
import { DataItem, getDataName } from '../../utils';

export default function useFetchHousing(id: string) {
	const { data } = useGetLookupValuesQuery(id, {
		skip: id === '',
	});

	const arr: DataItem[] = [];

	data?.forEach((d) => {
		arr.push({ id: d.id, name: d.name });
	});

	const name = getDataName(id, arr);

	return { name, data };
}
