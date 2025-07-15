import { searchUri } from "@/api/uris/other";
import axiosClient from "@/configs/axiosClient";
import { IProduct } from "@/types/product";

export const searchApi = {
	getDataSearch: async (value: string): Promise<IProduct[]> => {
		return axiosClient.get(searchUri.SEARCH(value));
	},
};
