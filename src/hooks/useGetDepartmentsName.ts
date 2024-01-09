import { useGetDepartmentsQuery } from '../store/apiService';
import { DataItem, getDataName } from '../utils';

export default function useGetDepartmentname(
	selectedSuborganizationId: string,
	departmentId: string
) {
	const { data } = useGetDepartmentsQuery(selectedSuborganizationId, {
		skip: selectedSuborganizationId === '',
	});

	const arr: DataItem[] = [];

	data?.forEach((d) => {
		arr.push({ id: d.id, name: d.name });
	});

	const departmentName = getDataName(departmentId, arr);

	return departmentName;
}
