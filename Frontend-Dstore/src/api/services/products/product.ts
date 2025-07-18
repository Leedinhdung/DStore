import { productUri } from "@/api/uris/product";
import axiosClient from "@/configs/axiosClient";
import { IDetailProduct, IProduct, IVariant } from "@/types/product";

export const productApi = {
	getProduts: async (): Promise<IProduct[]> => {
		return axiosClient.get(productUri.PRODUCTS);
	},
	getProductByCategory: async (slug: string): Promise<IProduct[]> => {
		return axiosClient.get(productUri.PRODUCTS_BY_CATEGORY(slug));
	},
	getProductBySlug: async (slug: string): Promise<IDetailProduct> => {
		return axiosClient.get(productUri.DETAIL_PRODUCT(slug));
	},
	getProductsSale: async (): Promise<IProduct[]> => {
		return axiosClient.get(productUri.PRODUCTS_SALE);
	},
	getStockProduct: async (id: number): Promise<IVariant> => {
		return axiosClient.get(productUri.STOCK_PRODUCT(id));
	},
	// getProductsOutstanding: async (): Promise<IProduct[]> => {
	// 	return axiosClient.get(productUri.PRODUCTS_OUTSTANDING);
	// },
};
