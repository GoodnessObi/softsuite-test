import { useGetGradeStepsQuery } from '../store/apiService';
import { DataItem, getDataName } from '../utils';

export default function useGetGradeSteps({
	gradeId,
	gradeStepId,
}: {
	gradeId: string;
	gradeStepId?: string;
}) {
	const { data } = useGetGradeStepsQuery(gradeId, {
		skip: gradeId === '',
	});

	const arr: DataItem[] = [];

	data?.forEach((d) => {
		arr.push({ id: d.id, name: d.name });
	});

	const gradeStepName = gradeStepId ? getDataName(gradeStepId, arr) : '';
	return { gradeStepName, data };
}
