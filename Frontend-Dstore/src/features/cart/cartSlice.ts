import { Product } from "@/types/Product";
import { createSlice } from "@reduxjs/toolkit";

export interface CartProduct extends Product {
	quantity: number;
}

interface CartState {
	products: CartProduct[];
}

const initialState = { products: [] } satisfies CartState as CartState;

export const cartSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const p: CartProduct = action.payload;
			const isExisting = state.products.find((i) => i.id === action.payload.id);
			if (isExisting) {
				const newList = state.products.filter(
					(i) => i.id !== action.payload.id
				);
				isExisting.quantity += 1;
				state.products = [...newList, isExisting];
			} else {
				state.products = [...state.products, { ...p, quantity: 1 }];
			}
		},

		removeFromCart: (state, action) => {
			const productToRemove: CartProduct = action.payload;
			state.products = state.products.filter(
				(i) => i.id !== productToRemove.id
			);
		},
		updateCartList: (state, action) => {
			const list = action.payload;
			state.products = list;
		},
		updateQuantityProduct: (state, action) => {
			const {
				payload: { id, quantity },
			} = action;
			// const product = state.products.find((i) => i.id === id);
			// if (product) {
			// 	product.quantity = quantity;
			// 	state.products.filter((i) => i.id !== id);
			// 	state.products.push(product);
			// }
			state.products = state.products.map((i) => {
				if (i.id === id) {
					i.quantity = quantity;
				}
				return i;
			});
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	addToCart,
	removeFromCart,
	updateCartList,
	updateQuantityProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
