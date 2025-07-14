const PRODUCT_URL = "products/";
export const productUri = {
	PRODUCTS: `${PRODUCT_URL}san-pham`,
	PRODUCTS_BY_CATEGORY: (slug: string) => `${PRODUCT_URL}san-pham/${slug}`,
};
