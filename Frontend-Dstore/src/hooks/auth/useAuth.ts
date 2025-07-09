import { authApi } from "@/api/services/accounts/auth";
import { ISignUp } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
	return useMutation({
		mutationFn: (data: ISignUp) => authApi.signUp(data),
	});
};

export { useVerifyOTP } from "./useOTP";
