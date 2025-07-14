import { productUri } from "@/api/uris/product";
import axiosClient from "@/configs/axiosClient";
import { IProduct } from "@/types/product";

export const productApi = {
	getProduts: async (): Promise<IProduct[]> => {
		return axiosClient.get(productUri.PRODUCTS);
	},
	getProductByCategory: async (slug: string): Promise<IProduct[]> => {
		return axiosClient.get(productUri.PRODUCTS_BY_CATEGORY(slug));
	},
};
