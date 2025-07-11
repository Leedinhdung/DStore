import { categoryApi } from "@/api/services/categories/category";
import { ICategory } from "@/types/category";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetCategories = (
	options?: Omit<UseQueryOptions<ICategory[]>, "queryKey" | "queryFn">
) => {
	return useQuery<ICategory[]>({
		...options,
		queryKey: ["categories"],
		queryFn: categoryApi.getCategories,
	});
};
