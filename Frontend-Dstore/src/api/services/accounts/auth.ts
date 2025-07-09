import { authUri } from "@/api/uris/auth";
import axiosClient from "@/configs/axiosClient";
import { ISignUp } from "@/types/auth";
import { IUser } from "@/types/user";
import { VerifyOTPData, VerifyOTPResponse } from "@/types/verifyOtp";

export const authApi = {
	signUp: async (authData: ISignUp): Promise<IUser> => {
		return axiosClient.post(authUri.SIGNUP, authData);
	},
	verifyOTP: async (data: VerifyOTPData): Promise<VerifyOTPResponse> => {
		return axiosClient.post(authUri.VERIFY_OTP, data);
	},
};
