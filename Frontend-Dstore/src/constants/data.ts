export interface TabItem {
	name: string;
	slug: string;
}

export interface Product {
	id: number;
	color: string;
	name: string;
	price: number;
	priceOrigin: number;
	image: string;
}

export const PRODUCT_CATEGORIES = {
	HEADPHONES: "headphones",
	SPEAKERS: "speakers",
} as const;

export const PRODUCTS_DATA: Record<string, Product[]> = {
	trueWireless: [
		{
			id: 1,
			color: "Yellow",
			name: "AirPods Pro 2",
			price: 5500000,
			priceOrigin: 6050000,
			image:
				"https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
		},
		{
			id: 2,
			color: "Yellow",
			name: "Soundcore Liberty 4",
			price: 2690000,
			priceOrigin: 2959000,
			image:
				"https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
		},
	],
	bluetooth: [
		{
			id: 3,
			color: "Yellow",
			name: "Sony WH-CH520",
			price: 1490000,
			priceOrigin: 1639000,
			image:
				"https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
		},
		{
			id: 4,
			color: "Yellow",
			name: "JBL Tune 510BT",
			price: 1190000,
			priceOrigin: 1309000,
			image:
				"https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
		},
	],
	wired: [
		{
			id: 5,
			color: "Yellow",
			name: "KZ ZSN Pro X",
			price: 490000,
			priceOrigin: 539000,
			image:
				"https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
		},
		{
			id: 6,
			color: "Yellow",
			name: "CCA CRA+",
			price: 390000,
			priceOrigin: 429000,
			image:
				"https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
		},
	],
};

export const SWIPER_BREAKPOINTS = {
	320: { slidesPerView: 2 },
	640: { slidesPerView: 2 },
	768: { slidesPerView: 3 },
	1024: { slidesPerView: 4 },
	1280: { slidesPerView: 5 },
} as const;

export const SWIPER_BREAKPOINTS_SMALL = {
	0: { slidesPerView: 2 },
	480: { slidesPerView: 2 },
	640: { slidesPerView: 3 },
	768: { slidesPerView: 3 },
	1024: { slidesPerView: 4 },
	1280: { slidesPerView: 5 },
} as const;

export const THEME_COLORS = {
	primary: "#1781E0",
	secondary: "#f59e0b",
	success: "#10b981",
	danger: "#ef4444",
} as const;

// URLs and Images
export const IMAGES = {
	PRODUCT_DEFAULT:
		"https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
	PROMOTIONAL_BANNER:
		"https://songlongmedia.com/media/banner/09_Maye732e344e8d2b51085a4e72cfaa773d2.png",
	FLASH_SALE_BG:
		"https://songlongmedia.com/static/assets/2023/images/home-deal-bg.png",
	OUTSTANDING_PRODUCT:
		"https://songlongmedia.com/static/assets/2023/images/category-hot-product-bg.png",
} as const;
