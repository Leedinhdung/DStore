export interface CreateOrderRequest {
	total: number;
	payment_method: "cod" | "vnpay";
	note?: string;
	items: {
		id: number;
		quantity: number;
		price: number;
	}[];
	customer_name: string;
	customer_email: string;
	customer_phone: string;
	shipping_address: string;
}

export interface ApiResponse<T> {
	redirect_url: string;
	success: boolean;
	data?: T;
	message: string;
}
