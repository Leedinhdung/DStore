import ProductCard from "@/components/Product/ProductCard";
import { addToCart } from "@/features/cart/cartSlice";
import { percentFormat, priceFormat } from "@/helpers/formatHelper";
import { useGetSlugParams } from "@/hooks/common/useCustomParams";
import { useGetProductsBySlug } from "@/hooks/product/useGetProducts";
import { getImageUrl } from "@/lib/common";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
const DetailProduct = () => {
    const slug = useGetSlugParams('slug')
    const [selectedColor, setSelectedColor] = useState<number | undefined>(undefined);
    const { data: product } = useGetProductsBySlug(slug!)
    const detailProduct = product?.product
    const [mainImage, setMainImage] = useState<string | undefined>(
        detailProduct?.image
    );
    const dispatch = useDispatch()
    const [showFullSpec, setShowFullSpec] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <Stack spacing={2}>
                <Breadcrumbs
                    separator={<FaChevronRight fontSize="small" />}
                    aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Trang chủ
                    </Link>
                    <Link to={''}>
                        Tai nghe
                    </Link>
                    <Typography color="text.primary">Tai nghe bluetooth</Typography>
                </Breadcrumbs>
            </Stack>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Images Section */}
                <div className="space-y-4">
                    {/* Main Product Image */}
                    <div className="border-2 md:border-none rounded-lg overflow-hidden flex justify-center">
                        <img
                            src={getImageUrl(mainImage || detailProduct?.image || '')}
                            alt={detailProduct?.title}
                            className="h-auto max-h-[500px] sm:h-[510px] object-cover rounded-lg mx-auto"
                        />
                    </div>
                    <Swiper
                        spaceBetween={10}
                        breakpoints={{
                            320: { slidesPerView: 4 },
                            640: { slidesPerView: 5 },
                            768: { slidesPerView: 5 },
                            1024: { slidesPerView: 5 },
                            1280: { slidesPerView: 5 },
                        }}
                        loop
                        className="h-full mt-5"
                    >
                        {detailProduct?.variants.map((variant, variantIndex) =>
                            variant.images.map((img, imgIndex) => (
                                <SwiperSlide
                                    key={`${variantIndex}-${imgIndex}`}
                                    style={{ width: '112px' }}
                                >
                                    <div
                                        onClick={() => setMainImage(img.image_path)}
                                        className="w-28 h-28 bg-gray-100 rounded-lg overflow-hidden border-2 hover:border-gray-400 cursor-pointer"
                                    >
                                        <img
                                            src={getImageUrl(img.image_path) || "/placeholder.svg"}
                                            alt={`Thumbnail ${variantIndex + 1}-${imgIndex + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>

                {/* Product Details Section */}
                <div className="space-y-6">
                    {/* Product Title */}
                    <h1 className="text-base lg:text-xl font-bold text-gray-900">
                        {detailProduct?.title}
                    </h1>
                    {/* Product Info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Thương hiệu:</span>
                            <span className="text-blue-600 font-medium">{detailProduct?.brand}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">SKU:</span>
                            <span className="text-gray-900">{detailProduct?.sku}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Tình trạng:</span>
                            {detailProduct?.condition == 'instock' ? <span className="text-green-600">Còn hàng</span> : <span className="text-green-600">Hết hàng</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Bảo hành:</span>
                            <span className="text-blue-600">12 Tháng</span>
                        </div>
                    </div>

                    {/* Fundiin Payment Info */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600">Trả sau đến 12 tháng với</span>
                        <div className="flex items-center gap-1">
                            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">Fundiin</span>
                            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">?</span>
                            </div>
                        </div>
                    </div>

                    {/* Discount Banner */}
                    <div className="bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg p-4 text-white">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">%</div>
                            <div>
                                <div className="font-bold">Giảm đến 50K khi thanh toán qua</div>
                                <div className="flex items-center gap-1">
                                    <span>Fundiin.</span>
                                    <span className="underline cursor-pointer">xem thêm</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-4">
                        {detailProduct?.sale_price != null ? (
                            <>
                                <p className="text-4xl font-bold text-red-600">
                                    {priceFormat(detailProduct.sale_price)}
                                </p>
                                <del className="text-gray-500 text-base font-medium">
                                    {priceFormat(detailProduct.original_price || 0)}
                                </del>
                            </>
                        ) : (
                            <p className="text-[32px] font-bold text-red-600">
                                {priceFormat(detailProduct?.original_price || 0)}
                            </p>
                        )}
                        <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                            {detailProduct?.sale_price != null && detailProduct?.original_price
                                ? percentFormat(
                                    (detailProduct.original_price - detailProduct.sale_price) /
                                    detailProduct.original_price
                                )
                                : null}

                        </div>
                    </div>

                    {/* Lựa chọn phân loại */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900">Lựa chọn phân loại</h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {detailProduct?.variants.map((item) => (
                                <div
                                    key={item.id}
                                    className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${selectedColor === item.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setSelectedColor(item.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-medium text-gray-900">{item.color}</div>
                                            <div className="text-blue-600 font-semibold">
                                                {priceFormat(item.price || 0)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nút hành động */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <button className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg transition-colors">
                            <div className="text-lg font-bold">MUA NGAY</div>
                            <div className="text-sm font-medium opacity-90">
                                Giao nhanh hoặc nhận tại cửa hàng
                            </div>
                        </button>
                        <button
                            onClick={() => dispatch(addToCart(detailProduct))}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg transition-colors"
                        >
                            <div className="text-lg font-bold">THÊM VÀO GIỎ HÀNG</div>
                            <div className="text-sm opacity-90 font-medium">Tiếp tục mua sắm</div>
                        </button>
                    </div>

                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-1 pt-8 border-t border-gray-200">
                {/* Product Information */}
                <div className="space-y-4 border p-5 rounded-lg">
                    <h3 className="text-xl font-bold text-gray-900">Thông tin sản phẩm</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex">
                            <div className="text-gray-600 text-sm leading-loose"
                                dangerouslySetInnerHTML={{ __html: detailProduct?.short_description || "" }} />
                        </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                        Thu gọn
                        <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* Service Guarantees */}
                <div className="space-y-4 border p-5 rounded-lg">
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-700 text-sm">
                                Miễn phí tư vấn tận tình, chọn sản phẩm phù hợp với đúng nhu cầu
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-700 text-sm">Cam kết hàng chính hãng công ty phân phối</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-700 text-sm">Dịch vụ kĩ thuật sau bán hàng, sửa chữa, cung cấp phụ kiện.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-700 text-sm">Giao hàng hỏa tốc nội thành và toàn quốc</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6">
                <div className="shadow p-2.5 md:p-5 rounded-xl ">
                    <h2 className="font-bold text-xl">Sản phẩm tương tự</h2>
                    <Swiper
                        spaceBetween={10}
                        breakpoints={{
                            320: { slidesPerView: 2 },
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                        }}
                        loop
                        autoplay={{ delay: 3000 }}
                        modules={[Autoplay]}
                        className="h-full mt-5"
                    >
                        {product?.similarProducts?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <ProductCard product={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8  sm:mt-12 sm:pt-8 ">
                {/* Outstanding Features - chiếm 8 cột */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-red-600 bg-gray-100 py-2 px-4 rounded-lg">Đặc Điểm Nổi Bật</h3>
                    </div>
                    <div
                        className={`space-y-4 text-sm leading-relaxed px-5 transition-all duration-300 ${showFullDescription ? '' : 'max-h-72 overflow-hidden'
                            }`}
                    >
                        <p
                            className="text-gray-700"
                            dangerouslySetInnerHTML={{ __html: detailProduct?.description || '' }}
                        />
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="mt-2 px-4 py-2 text-sm text-blue-600 border border-gray-300 rounded hover:bg-gray-50"
                        >
                            {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                    </div>
                </div>


                {/* Technical Specifications - chiếm 4 cột */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-red-600 bg-gray-100 py-2 px-4 rounded-lg">Đặc Điểm Nổi Bật</h3>
                    </div>
                    <div className="overflow-x-auto text-center">
                        <div
                            className={`text-sm leading-relaxed pl-4 transition-all duration-300 ${showFullSpec ? '' : 'max-h-72 overflow-hidden'
                                }`}
                            dangerouslySetInnerHTML={{
                                __html: (detailProduct?.specification || '')
                                    .replace(
                                        /<table>/g,
                                        '<table class="w-full border-2 border-gray-200 text-sm text-left text-gray-700">'
                                    )
                                    .replace(
                                        /<tr>/g,
                                        '<tr class="border-b odd:bg-white even:bg-gray-200">'
                                    )
                                    .replace(
                                        /<td>/g,
                                        '<td class="px-4 py-3 align-top">'
                                    )
                                    .replace(
                                        /<ul>/g,
                                        '<ul class="list-disc list-inside space-y-1">'
                                    ),
                            }}
                        />

                        <button
                            onClick={() => setShowFullSpec(!showFullSpec)}
                            className="mt-4 px-4 py-2 text-sm text-blue-600 border border-gray-300 rounded hover:bg-gray-50"
                        >
                            {showFullSpec ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                    </div>

                </div>
            </div>

            <div className="my-16">
                <h3 className="text-md md:text-2xl font-bold text-gray-900 mb-8">
                    Đánh giá & nhận xét {detailProduct?.title}
                </h3>

                <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-8">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Overall Rating */}
                        <div className="text-center space-y-4 lg:space-y-6">
                            <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900">0/5</div>
                            <div className="flex justify-center gap-1 sm:gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <div className="text-gray-600 text-base sm:text-lg">0 đánh giá và nhận xét</div>
                        </div>

                        {/* Rating Breakdown */}
                        <div className="w-full overflow-x-auto space-y-4">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center gap-4 min-w-[320px] sm:min-w-0">
                                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                        <span className="text-sm sm:text-lg font-semibold">{rating}</span>
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div className="bg-gray-300 h-3 rounded-full" style={{ width: "0%" }}></div>
                                    </div>
                                    <span className="text-gray-600 text-sm sm:text-base font-medium">0 bình luận</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-6 sm:mt-8">
                        <p className="text-gray-600 text-sm sm:text-base mb-4">Bạn đánh giá sao sản phẩm này?</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-xl transition-colors text-base sm:text-lg">
                            Đánh giá ngay
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DetailProduct;
