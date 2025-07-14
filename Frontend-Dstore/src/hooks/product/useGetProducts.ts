import { productApi } from "@/api/services/products/product";
import { IProduct } from "@/types/product";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetProducts = (
	options?: Omit<UseQueryOptions<IProduct[]>, "queryKey" | "queryFn">
) => {
	return useQuery<IProduct[]>({
		...options,
		queryKey: ["products"],
		queryFn: productApi.getProduts,
	});
};
export const useGetProductsByCategory = (
	slug: string,
	options?: Omit<UseQueryOptions<IProduct[]>, "queryKey" | "queryFn">
) => {
	return useQuery({
		...options,
		queryKey: ["products-by-category", slug],
		enabled: !!slug,
		queryFn: () => productApi.getProductByCategory(slug),
	});
};
