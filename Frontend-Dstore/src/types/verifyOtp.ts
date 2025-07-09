export interface VerifyOTPData {
	email: string;
	otp: string;
}

export interface VerifyOTPResponse {
	message: string;
	success: boolean;
}