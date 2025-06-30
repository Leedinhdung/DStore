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
