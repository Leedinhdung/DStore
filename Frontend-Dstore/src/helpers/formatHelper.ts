export function priceFormat(val: number) {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
		minimumFractionDigits: 0,
	}).format(val);
}
export function percentFormat(val: number) {
	return new Intl.NumberFormat("vi-VN", {
		style: "percent",
		minimumFractionDigits: 0,
	}).format(val);
}
