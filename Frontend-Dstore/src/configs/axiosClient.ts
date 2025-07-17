import { authApi } from "@/api/services/accounts/auth";
import { backendUrl } from "@/configs/baseUrl";
import { getAccessTokenFromLocalStorage } from "@/lib/common";
import axios from "axios";

// Tạo instance axios
const axiosClient = axios.create({
	baseURL: backendUrl,
	withCredentials: true,
	withXSRFToken: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// Interceptor request: Thêm token vào header
axiosClient.interceptors.request.use((config) => {
	const token = getAccessTokenFromLocalStorage();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	config.headers.Accept = "application/json";

	// Chỉ set multipart nếu là FormData
	if (config.data instanceof FormData) {
		config.headers["Content-Type"] = "multipart/form-data";
	} else {
		config.headers["Content-Type"] = "application/json";
	}

	return config;
});

// Interceptor response: Xử lý response và lỗi
axiosClient.interceptors.response.use(
	(res) => res.data?.data ?? res.data,
	async (error) => {
		const originalRequest = error.config;

		// Xử lý refresh token khi token hết hạn (lỗi 401)
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const response = await authApi.refreshToken();
				console.log(response);
				const { access_token, refresh_token } = response.data.data;
				localStorage.setItem("access_token", access_token);
				localStorage.setItem("refresh_token", refresh_token);

				// Cập nhật Authorization header
				originalRequest.headers.Authorization = `Bearer ${access_token}`;

				// Gửi lại request ban đầu với token mới
				return axiosClient(originalRequest);
			} catch (refreshError) {
				// Xóa token nếu refresh thất bại
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				localStorage.removeItem("user_data");
				localStorage.removeItem("user_profile");

				// Chuyển hướng về trang đăng nhập
				window.location.href = "/dang-nhap";

				return Promise.reject(refreshError);
			}
		}

		// Có thể custom trả về error message cho UI ở đây
		return Promise.reject(error);
	}
);
export default axiosClient;
