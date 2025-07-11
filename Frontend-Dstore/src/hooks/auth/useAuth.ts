import { authApi } from "@/api/services/accounts/auth";
import { useUserStore } from "@/app/userStore";
import { removeAccessToken, setAccessToken } from "@/lib/common";
import routes from "@/routes/routes";
import { ILogin, ISignUp } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegister = () => {
	return useMutation({
		mutationFn: (data: ISignUp) => authApi.signUp(data),
	});
};

export const useLogin = () => {
	const navigate = useNavigate();
	const setUser = useUserStore((state) => state.setUser);
	const setProfile = useUserStore((state) => state.setProfile);
	return useMutation({
		mutationFn: (data: ILogin) => authApi.login(data),
		onSuccess: async (data) => {
			setUser(data.user);
			setProfile(data.profile);
			setAccessToken(data.access_token);
			navigate(routes.home);
			toast.success("Đăng nhập thành công");
		},
	});
};
export const useLogout = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const clearUserAndProfile = useUserStore(
		(state) => state.clearUserAndProfile
	);
	return useMutation({
		mutationFn: authApi.logout,
		onSuccess: () => {
			removeAccessToken();
			clearUserAndProfile();
			navigate(routes.home);
			queryClient.clear();
		},
	});
};
