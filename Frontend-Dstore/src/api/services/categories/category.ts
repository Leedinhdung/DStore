import { categoryUri } from "@/api/uris/category";
import axiosClient from "@/configs/axiosClient";
import { ICategory } from "@/types/category";

export const categoryApi = {
	getCategories: async (): Promise<ICategory[]> => {
		return axiosClient.get(categoryUri.CATEGORIES);
	},
};
