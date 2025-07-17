import { useMutation } from "@tanstack/react-query";
import { CreateOrderRequest } from "@/types/order";
import { authApi } from "@/api/services/accounts/auth";

export const useCheckout = () => {
	return useMutation({
		mutationFn: (orderData: CreateOrderRequest) => authApi.checkout(orderData),
	});
};
