import { useGetDepartmentsQuery } from '../store/apiService';
import { DataItem, getDataName } from '../utils';

export default function useGetDepartments({
	orgId,
	departmentId,
}: {
	orgId: string;
	departmentId?: string;
}) {
	const { data } = useGetDepartmentsQuery(orgId, {
		skip: orgId === '',
	});

	const arr: DataItem[] = [];

	data?.forEach((d) => {
		arr.push({ id: d.id, name: d.name });
	});

	const departmentName = departmentId ? getDataName(departmentId, arr) : '';

	return { departmentName, data };
}
