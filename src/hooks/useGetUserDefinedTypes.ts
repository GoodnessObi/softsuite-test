import { useGetLookupsQuery } from '../store/apiService';

export default function useGetUserDefinedTypes() {
	const { data } = useGetLookupsQuery();

	const userTypes = data?.filter((type) => type.type === 'User Defined');

	return userTypes;
}
