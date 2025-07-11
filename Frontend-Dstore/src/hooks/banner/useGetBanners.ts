import { bannerApi } from "@/api/services/banners/banner";
import { IBanner } from "@/types/banner";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetBanners = (
	options?: Omit<UseQueryOptions<IBanner[]>, "queryKey" | "queryFn">
) => {
	return useQuery<IBanner[]>({
		...options,
		queryKey: ["banners"],
		queryFn: bannerApi.getBanners,
	});
};
