import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
	key: "root",
	storage,
};

const rootReducer = combineReducers({
	cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
