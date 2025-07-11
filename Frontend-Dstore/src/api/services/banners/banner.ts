import { bannerUri } from "@/api/uris/banner";
import axiosClient from "@/configs/axiosClient";
import { IBanner } from "@/types/banner";

export const bannerApi = {
	getBanners: async (): Promise<IBanner[]> => {
		return axiosClient.get(bannerUri.BANNER);
	},
};
