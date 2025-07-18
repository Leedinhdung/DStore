import { productApi } from "@/api/services/products/product";
import { IDetailProduct, IProduct, IVariant } from "@/types/product";
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
export const useGetProductsSale = (
	options?: Omit<UseQueryOptions<IProduct[]>, "queryKey" | "queryFn">
) => {
	return useQuery<IProduct[]>({
		...options,
		queryKey: ["products-sale"],
		queryFn: productApi.getProductsSale,
	});
};
// export const useGetProductsOutstanding = (
// 	options?: Omit<UseQueryOptions<IProduct[]>, "queryKey" | "queryFn">
// ) => {
// 	return useQuery<IProduct[]>({
// 		...options,
// 		queryKey: ["products-outstanding"],
// 		queryFn: productApi.getProductsOutstanding,
// 	});
// };
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
export const useGetProductsBySlug = (
	slug: string,
	options?: Omit<UseQueryOptions<IDetailProduct>, "queryKey" | "queryFn">
) => {
	return useQuery({
		...options,
		queryKey: ["detail-product", slug],
		enabled: !!slug,
		queryFn: () => productApi.getProductBySlug(slug),
	});
};

export const useGetStockProduct = (
	id: number,
	options?: Omit<UseQueryOptions<IVariant>, "queryKey" | "queryFn">
) => {
	return useQuery({
		...options,
		queryKey: ["stock-product", id],
		enabled: !!id,
		queryFn: () => productApi.getStockProduct(id),
	});
};
