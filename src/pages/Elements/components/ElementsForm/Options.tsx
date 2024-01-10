import useGetLookupValues from '../../../../hooks/useGetLookupValues';

const Options = ({ typeId }: { typeId: string }) => {
	const { data } = useGetLookupValues(typeId);
	return (
		<>
			{data.map((d) => (
				<option key={d.id} value={d.id}>
					{d.name}
				</option>
			))}
		</>
	);
};

export default Options;
