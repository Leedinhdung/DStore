import * as yup from "yup";

// Login validation schema
export const loginSchema = yup.object({
	email: yup
		.string()
		.required("Email không được để trống")
		.email("Email không hợp lệ"),
	password: yup
		.string()
		.required("Mật khẩu không được để trống")
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

// Register validation schema
export const registerSchema = yup.object({
	fullName: yup
		.string()
		.required("Họ tên không được để trống")
		.min(2, "Họ tên phải có ít nhất 2 ký tự"),
	email: yup
		.string()
		.required("Email không được để trống")
		.email("Email không hợp lệ"),
	password: yup
		.string()
		.required("Mật khẩu không được để trống")
		.min(8, "Mật khẩu phải có ít nhất 8 ký tự")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
		),
	confirmPassword: yup
		.string()
		.required("Vui lòng xác nhận mật khẩu")
		.oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
	agreeTerms: yup
		.boolean()
		.required("Vui lòng đồng ý với điều khoản dịch vụ")
		.oneOf([true], "Vui lòng đồng ý với điều khoản dịch vụ"),
});

// Type definitions
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;

export const validateQuantity = (quantity: number): boolean => {
	return quantity > 0 && Number.isInteger(quantity);
};

export const validatePrice = (price: number): boolean => {
	return price >= 0 && !isNaN(price);
};

export const validateProduct = (product: any): boolean => {
	return (
		product &&
		typeof product.id === "number" &&
		typeof product.name === "string" &&
		validatePrice(product.price) &&
		validatePrice(product.priceOrigin) &&
		product.price <= product.priceOrigin
	);
};
