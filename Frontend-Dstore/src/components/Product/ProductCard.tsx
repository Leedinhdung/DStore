import { useState } from "react"
import { Link } from "react-router-dom";
import routes from "@/routes/routes";
import { priceFormat } from "@/helpers/formatHelper";
import { IProduct } from "@/types/product";
import { getImageUrl } from "@/lib/common";

interface ProductCardProps {
  product: IProduct | undefined;
  showDiscount?: boolean;
  discountPercent?: number;
}

const ProductCard = ({
  product,
  showDiscount = true,
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)


  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const discountAmount = (product && product.original_price && product.sale_price)
    ? product.original_price - product.sale_price
    : 0;

  const actualDiscountPercent = (product && product.original_price)
    ? Math.round((discountAmount / product.original_price) * 100)
    : 0;


  return (
    <div className=" bg-white rounded-2xl overflow-hidden border border-gray-200 shadow relative hover:shadow-lg">
      {/* Nhãn giảm giá */}
      {showDiscount && actualDiscountPercent > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
            Giảm {actualDiscountPercent}%
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Hình ảnh sản phẩm */}
        <Link to={routes.detailProduct.replace(':slug', product?.slug || '')} className='cursor-pointer'>
          <div className="relative mb-4 flex justify-center">
            <img
              src={getImageUrl(product?.image || '')}
              alt={product?.title}
              className="h-32 md:h-48 object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Tiêu đề sản phẩm */}
          <h3 className="text-gray-800 font-medium text-xs sm:text-sm mb-3 line-clamp-2 hover:text-blue-400">
            {product?.title}
          </h3>
        </Link>

        {/* Phần giá */}
        <div className="mb-4">
          <div className="grid md:flex items-center gap-1">
            <span className="text-red-600 font-bold text-base">
              {priceFormat(product?.original_price || 0)}
            </span>
            {product?.sale_price == null ? null : <span className="text-gray-400 line-through text-xs font-semibold">
              {priceFormat(product?.sale_price || 0)}
            </span>}
          </div>
        </div>

        {/* Đánh giá sao */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <svg key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {/* Nút yêu thích */}
        <div className="flex justify-end">
          <button
            onClick={toggleFavorite}
            className="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-200 p-1"
          >
            <span className="text-xs">Yêu thích</span>
            <svg
              className={`w-4 h-4 ml-1 ${isFavorite ? "fill-red-500 text-red-500" : "fill-none"}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>

          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
