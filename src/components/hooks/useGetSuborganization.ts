import { useGetSuborganizationsQuery } from '../../store/apiService';
import { DataItem, getDataName } from '../../utils';

export default function useGetSuborganizations(suborganizationId: string) {
	const { data } = useGetSuborganizationsQuery();

	const arr: DataItem[] = [];

	data?.forEach((d) => {
		arr.push({ id: d.id, name: d.name });
	});

	const suborganizationName = getDataName(suborganizationId, arr);

	return { suborganizationName, suborganizationData: data };
}
