import { productUri } from "@/api/uris/product";
import axiosClient from "@/configs/axiosClient";
import { IDetailProduct, IProduct } from "@/types/product";

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
};
