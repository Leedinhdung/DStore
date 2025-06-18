import { RootState } from "@/app/store"
import { CartProduct, removeFromCart, updateQuantityProduct } from "@/features/cart/cartSlice"
import { percentFormat, priceFormat } from "@/helpers/formatHelper"
import { Breadcrumbs, Button, Stack, Typography } from "@mui/material"
import { useMemo } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
const Cart = () => {

    const cart = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch()

    const inscrea = (i: CartProduct) => {
        dispatch(updateQuantityProduct({ id: i.id, quantity: i.quantity + 1 }))
    }
    const descrea = (i: CartProduct) => {
        if (i.quantity <= 1) {
            alert('Số lượng sản phẩm phải lớn hơn 0')
        } else {
            dispatch(updateQuantityProduct({ id: i.id, quantity: i.quantity - 1 }))
        }
    }
    const totalAmount = useMemo(() => {
        return cart.products.reduce((a, b) => a + b.price * b.quantity, 0)
    }, [cart.products])
    return (
        <div className="max-w-screen-xl mx-auto">
            <Stack spacing={2}>
                <Breadcrumbs
                    separator={<FaChevronRight fontSize="small" />}
                    aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Trang chủ
                    </Link>
                    <Typography color="text.primary">Thông tin giỏ hàng</Typography>
                </Breadcrumbs>
            </Stack>
            <div className=" max-w-screen-md mx-auto">
                <div className="flex flex-col gap-5">
                    <div className="flex ">
                        <Link to={''} className="flex items-center gap-1 font-bold"><FaChevronLeft /> Trở về</Link>
                        <h2 className="mx-auto font-bold">Giỏ hàng</h2>
                    </div>
                    <div className="shadow border p-3 rounded-xl">
                        {cart.products.length === 0 ? (
                            <div>
                                Nothing in cart
                            </div>
                        ) : cart.products.map((i, index) => (
                            <div className="grid grid-cols-6 gap-4 ">
                                {/* Cột ảnh và nút xóa */}
                                <div className="col-span-2 flex flex-col items-center justify-between">
                                    <img
                                        src={i.image}
                                        className="w-36"
                                        alt={i.name}
                                    />
                                    <Button className="mt-6 text-red-600 hover:text-red-800" onClick={() => dispatch(removeFromCart(i))}>Xóa</Button>
                                </div>

                                {/* Cột thông tin sản phẩm */}

                                <div className="col-span-4 space-y-3" key={`cart-item-${index}`}>
                                    <p className="font-medium text-lg">
                                        {i.name}
                                    </p>
                                    <p>Màu sắc: <span className="font-medium">{i.color}</span></p>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-5">
                                            <p className="text-lg font-semibold text-red-600">{priceFormat(i.price)}</p>
                                            <del className="text-gray-500 text-sm font-medium">{priceFormat(i.priceOrigin)}</del>
                                        </div>
                                        <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                                            {percentFormat((i.priceOrigin - i.price) / i.priceOrigin)}
                                        </div>
                                    </div>

                                    {/* Chọn số lượng */}
                                    <div className="flex items-center gap-3">
                                        <p>Chọn số lượng:</p>
                                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white w-fit">
                                            <button
                                                onClick={() => descrea(i)}
                                                className="w-7 h-5 flex items-center justify-center hover:bg-gray-100"
                                            >
                                                −
                                            </button>
                                            <div className="w-12 h-7 flex items-center justify-center border-x border-gray-300 font-medium">
                                                {i.quantity}
                                            </div>
                                            <button
                                                onClick={() => inscrea(i)}
                                                className="w-7 h-5 flex items-center justify-center hover:bg-gray-100"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-5 shadow rounded-xl p-3 border">
                        <div className="flex justify-between font-bold">
                            <p>Tổng tiền tạm tính:</p>
                            <p>{priceFormat(totalAmount)}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="w-full font-bold uppercase text-center bg-[#1781E0] rounded-xl text-white p-4">Tiến hành đặt hàng</button>
                            <button className="w-full font-bold uppercase text-center border border-[#1781E0] rounded-xl text-[#1781E0] p-4">Chọn thêm sản phẩm khác</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart