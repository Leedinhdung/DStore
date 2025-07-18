import { ICategory } from "@/types/category";

export interface IProduct {
	id: number;
	category_id: number;
	title: string;
	slug: string;
	brand: string;
	sku: string;
	image: string;
	original_price: number;
	sale_price?: number | null;
	condition: string;
	status: string;
	description: string;
	specification: string;
	short_description: string;
	variants: IVariant[];
	category: ICategory;
	created_at: string;
}

export interface IVariant {
	id: number;
	product_id: number;
	color: string;
	price: number;
	quantity: number;
	images: IVariantImage[];
	stock: number;
}

export interface IVariantImage {
	id: number;
	product_variant_id: number;
	image_path: string;
}
export interface IDetailProduct {
	product: IProduct;
	similarProducts: IProduct[];
}
