import { useCallback, useEffect, useState } from "react";
import { Product, PRODUCTS_DATA } from "@/constants/data";

export const useProducts = () => {
	const [activeTab, setActiveTab] = useState<string>("");
	const [products, setProducts] = useState<Product[]>([]);

	const onTabActive = useCallback((value: string) => {
		setActiveTab(value);
	}, []);

	const loadProducts = useCallback(() => {
		let data = PRODUCTS_DATA[activeTab];
		if (!activeTab) {
			data = Object.values(PRODUCTS_DATA).flat();
		}
		setProducts(data || []);
	}, [activeTab]);

	useEffect(() => {
		loadProducts();
	}, [loadProducts]);

	return {
		activeTab,
		products,
		onTabActive,
	};
};
