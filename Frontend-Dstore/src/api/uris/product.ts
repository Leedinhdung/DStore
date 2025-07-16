const PRODUCT_URL = "products/";
export const productUri = {
	PRODUCTS: `${PRODUCT_URL}san-pham`,
	PRODUCTS_BY_CATEGORY: (slug: string) => `${PRODUCT_URL}san-pham/${slug}`,
	DETAIL_PRODUCT: (slug: string) => `${PRODUCT_URL}chi-tiet-san-pham/${slug}`,
	PRODUCTS_SALE: `${PRODUCT_URL}san-pham-sale`,
	// PRODUCTS_OUTSTANDING: `${PRODUCT_URL}san-pham-noi-bat`,
};
