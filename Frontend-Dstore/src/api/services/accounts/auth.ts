import { authUri } from "@/api/uris/auth";
import axiosClient from "@/configs/axiosClient";

import { ILogin, IRefreshToken, ISignUp, IUserProfile } from "@/types/auth";
import { IResponse } from "@/types/common";
import { ApiResponse, CreateOrderRequest } from "@/types/order";
import { VerifyOTPData, VerifyOTPResponse } from "@/types/verifyOtp";

export const authApi = {
	signUp: async (authData: ISignUp): Promise<IUserProfile> => {
		return axiosClient.post(authUri.SIGNUP, authData);
	},
	login: async (authData: ILogin): Promise<IUserProfile> => {
		return axiosClient.post(authUri.LOGIN, authData);
	},
	logout: async (): Promise<IResponse> => {
		return axiosClient.post(authUri.LOGOUT);
	},
	verifyOTP: async (data: VerifyOTPData): Promise<VerifyOTPResponse> => {
		return axiosClient.post(authUri.VERIFY_OTP, data);
	},
	refreshToken: async (): Promise<IRefreshToken> => {
		return axiosClient.post(authUri.REFRESH_TOKEN);
	},
	checkout: async (
		orderData: CreateOrderRequest
	): Promise<ApiResponse<CreateOrderRequest>> => {
		return axiosClient.post(authUri.CHECKOUT, orderData);
	},
};
