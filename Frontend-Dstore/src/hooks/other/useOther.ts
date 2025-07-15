import { searchApi } from "@/api/services/others/others";
import { IProduct } from "@/types/product";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useSearch = (
	value: string = "",
	options?: Omit<UseQueryOptions<IProduct[]>, "queryKey" | "queryFn">
) => {
	return useQuery<IProduct[]>({
		...options,
		queryKey: ["search", value],
		enabled: !!value && value.length > 1,
		queryFn: () => searchApi.getDataSearch(value),
	});
};
