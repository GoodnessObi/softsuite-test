import { useGetGradesQuery } from '../store/apiService';
import { DataItem, getDataName } from '../utils';

export default function useFetchGrade(gradeId: string) {
	const { data } = useGetGradesQuery();

	const arr: DataItem[] = [];

	data?.forEach((d) => {
		arr.push({ id: d.id, name: d.name });
	});
	const gradeName = getDataName(gradeId, arr);
	return { gradeName, gradeData: data };
}
