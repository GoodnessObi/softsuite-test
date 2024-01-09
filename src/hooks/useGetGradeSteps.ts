import { useGetGradeStepsQuery } from '../store/apiService';
import { DataItem, getDataName } from '../utils';

export default function useGetGradeSteps(
	selectedGradeId: string,
	gradeStepId: string
) {
	const { data } = useGetGradeStepsQuery(selectedGradeId, {
		skip: selectedGradeId === '',
	});

	const arr: DataItem[] = [];

	data?.forEach((d) => {
		arr.push({ id: d.id, name: d.name });
	});

	const gradeStepName = getDataName(gradeStepId, arr);
	return gradeStepName;
}
