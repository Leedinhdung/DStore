import { RootState } from "@/app/store"
import { priceFormat } from "@/helpers/formatHelper"
import { Breadcrumbs, Typography } from "@mui/material"
import { useMemo } from "react"
import { FaChevronRight } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import routes from "@/routes/routes";
import CartItem from "@/components/cart/CartItem";

const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart)

    const totalAmount = useMemo(() => {
        return cart.products.reduce((total, product) => total + product.price * product.quantity, 0)
    }, [cart.products])

    if (cart.products.length === 0) {
        return (
            <div className="max-w-screen-xl mx-auto">
                <Breadcrumbs
                    separator={<FaChevronRight fontSize="small" />}
                    aria-label="breadcrumb">
                    <Link color="inherit" to={routes.home}>
                        Trang chủ
                    </Link>
                    <Typography color="text.primary">Thông tin giỏ hàng</Typography>
                </Breadcrumbs>

                <div className="max-w-screen-md mx-auto">
                    <div className='flex flex-col gap-5 text-center my-32'>
                        <p className='font-bold text-base'>
                            Không có sản phẩm nào trong giỏ hàng, vui lòng quay lại
                        </p>
                        <Link to={routes.home} className='text-red-500 font-medium'>
                            Quay lại trang chủ
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl mx-auto">
            <Breadcrumbs
                separator={<FaChevronRight fontSize="small" />}
                aria-label="breadcrumb">
                <Link color="inherit" to={routes.home}>
                    Trang chủ
                </Link>
                <Typography color="text.primary">Thông tin giỏ hàng</Typography>
            </Breadcrumbs>

            <div className="max-w-screen-md mx-auto">
                <div className="flex flex-col gap-5">
                    <div className="flex">
                        <Link to={routes.detailProduct} className="flex items-center gap-1 font-bold">
                            ← Trở về
                        </Link>
                        <h2 className="mx-auto font-bold">Giỏ hàng</h2>
                    </div>

                    {/* Cart Items */}
                    {cart.products.map((item, index) => (
                        <CartItem key={`cart-item-${item.id}`} item={item} index={index} />
                    ))}

                    {/* Cart Summary */}
                    <div className="flex flex-col gap-5 shadow rounded-xl p-3 border">
                        <div className="flex justify-between font-bold">
                            <p>Tổng tiền tạm tính:</p>
                            <p>{priceFormat(totalAmount)}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="w-full font-bold uppercase text-center bg-[#1781E0] rounded-xl text-white p-4">
                                Tiến hành đặt hàng
                            </button>
                            <button className="w-full font-bold uppercase text-center border border-[#1781E0] rounded-xl text-[#1781E0] p-4">
                                Chọn thêm sản phẩm khác
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart