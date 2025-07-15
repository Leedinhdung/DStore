import { CartProduct, removeFromCart, updateQuantityProduct } from "@/features/cart/cartSlice";
import { percentFormat, priceFormat } from "@/helpers/formatHelper";
import { validateQuantity } from "@/utils/validation";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

interface CartItemProps {
    item: CartProduct;
    index: number;
}

const CartItem = ({ item }: CartItemProps) => {
    const dispatch = useDispatch();

    const increaseQuantity = () => {
        const newQuantity = item.quantity + 1;
        if (validateQuantity(newQuantity)) {
            dispatch(updateQuantityProduct({ id: item.id, quantity: newQuantity }));
        }
    };

    const decreaseQuantity = () => {
        const newQuantity = item.quantity - 1;
        if (newQuantity < 1) {
            alert('Số lượng sản phẩm phải lớn hơn 0');
            return;
        }
        dispatch(updateQuantityProduct({ id: item.id, quantity: newQuantity }));
    };

    const handleRemove = () => {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            dispatch(removeFromCart(item));
        }
    };

    return (
        <div className="shadow border p-3 rounded-xl">
            <div className="grid grid-cols-6 gap-4">
                {/* Cột ảnh và nút xóa */}
                <div className="col-span-2 flex flex-col items-center justify-between">
                    <img
                        src={item.image}
                        loading="lazy"
                        className="w-36"
                        alt={item.name}
                    />
                    <Button
                        className="mt-6 text-red-600 hover:text-red-800"
                        onClick={handleRemove}
                    >
                        Xóa
                    </Button>
                </div>

                {/* Cột thông tin sản phẩm */}
                <div className="col-span-4 space-y-3">
                    <p className="font-medium text-lg">
                        {item.name}
                    </p>
                    <p>Màu sắc: <span className="font-medium">{item.color}</span></p>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-5">
                            <p className="text-lg font-semibold text-red-600">
                                {priceFormat(item.price)}
                            </p>
                            <del className="text-gray-500 text-sm font-medium">
                                {priceFormat(item.priceOrigin)}
                            </del>
                        </div>
                        <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                            {percentFormat((item.priceOrigin - item.price) / item.priceOrigin)}
                        </div>
                    </div>

                    {/* Chọn số lượng */}
                    <div className="flex items-center gap-3">
                        <p>Chọn số lượng:</p>
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white w-fit">
                            <button
                                onClick={decreaseQuantity}
                                className="w-7 h-5 flex items-center justify-center hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                            >
                                −
                            </button>
                            <div className="w-12 h-7 flex items-center justify-center border-x border-gray-300 font-medium">
                                {item.quantity}
                            </div>
                            <button
                                onClick={increaseQuantity}
                                className="w-7 h-5 flex items-center justify-center hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem; 