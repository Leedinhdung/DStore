import Layout from "@/layouts/Layout";
import Home from "@/pages/Home";

import routes from "@/routes/routes";
import Cart from "@/pages/Cart";
import DetailProduct from "@/pages/DetailProduct";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import AuthLayout from "@/layouts/AuthLayout";

export const publicRoutes = [
	{ path: routes.home, layout: Layout, element: Home },
	{ path: routes.login, layout: AuthLayout, element: Login },
	{ path: routes.register, layout: AuthLayout, element: Register },
	{ path: routes.detailProduct, layout: Layout, element: DetailProduct },
	{ path: routes.cart, layout: Layout, element: Cart },
	{ path: routes.category, layout: Layout, element: Cart },
];
