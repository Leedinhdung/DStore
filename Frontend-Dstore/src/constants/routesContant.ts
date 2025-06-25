import Layout from "@/layouts/Layout";
import Home from "@/pages/Home";

import routes from "@/routes/routes";
import Cart from "@/pages/Cart";
import DetailProduct from "@/pages/DetailProduct";

export const publicRoutes = [
	{ path: routes.home, layout: Layout, element: Home },
	{ path: routes.login, layout: Layout, element: Home },
	{ path: routes.register, layout: Layout, element: Home },
	{ path: routes.detailProduct, layout: Layout, element: DetailProduct },
	{ path: routes.cart, layout: Layout, element: Cart },
];
