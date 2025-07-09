import { authApi } from "@/api/services/accounts/auth";
import { VerifyOTPData } from "@/types/verifyOtp";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useVerifyOTP = () => {
	return useMutation({
		mutationFn: (data:VerifyOTPData) => authApi.verifyOTP(data),
		onSuccess: (data) => {
			toast.success(data.message || "Đăng ký thành công!");
		},
		onError: (error: any) => {
			console.error("OTP verification error:", error);
			const message =
				error?.response?.data?.message || "Xác thực OTP thất bại!";
			toast.error(message);
		},
	});
};
