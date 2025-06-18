import ProductCard from "@/components/Product/ProductCard";
import { addToCart } from "@/features/cart/cartSlice";
import { percentFormat, priceFormat } from "@/helpers/formatHelper";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
const DetailProduct = () => {
    const [selectedColor, setSelectedColor] = useState("black")
    const dispatch = useDispatch()
    const colors = [
        {
            id: "black",
            name: "Black",
            price: "899.000đ",
            selected: true,
        },
        {
            id: "pink",
            name: "Pink",
            price: "899.000đ",
            selected: false,
        },
        {
            id: "titanium",
            name: "Titanium Gold",
            price: "899.000đ",
            selected: false,
        },
    ]
    const productData =
    {
        id: "soundpeats-cybergear",
        name: "Tai nghe Gaming True Wireless SoundPEATS Cyber Gear",
        price: 550000,
        priceOrigin: 750000,
        image: "https://songlongmedia.com/media/product/250_3610_tai_nghe_gaming_true_wireless_sony_inzone_buds_songlongmedia__5_.jpg",
    }
        ;
    const products = [
        {
            id: "soundpeats-cybergear",
            name: "Tai nghe Gaming True Wireless SoundPEATS Cyber Gear",
            price: 550000,
            priceOrigin: 750000,
            thumbnail: "https://tse1.mm.bing.net/th?id=OIP.BLI6wsVYqzupNWq1C5oujQHaHa&pid=Api",
        },
        {
            id: "7hz-sevenhertz-71",
            name: "DAC/Amp di động 7Hz Sevenhertz 71",
            price: 2000000,
            priceOrigin: null,
            thumbnail: "https://tse4.mm.bing.net/th?id=OIP.O_wqNYYPcVlRUsX5z-WDAwHaL6&pid=Api",
        },
        {
            id: "fiio-btr15",
            name: "FiiO BTR15 Bluetooth Receiver - USB DAC",
            price: 2490000,
            priceOrigin: null,
            thumbnail: "https://tse1.mm.bing.net/th?id=OIP.85uJvyJnJ_DM0w8zzYNbrgHaHa&pid=Api",
        },
        {
            id: "ruizu-d19",
            name: "Máy nghe nhạc Ruizu D19 (16GB, Bluetooth 5.0)",
            price: 900000,
            priceOrigin: null,
            thumbnail: "https://tse1.mm.bing.net/th?id=OIP.uXFFfZFqlDVwwf5dc0v30QHaHa&pid=Api",
        },
        {
            id: "earpad-corsair",
            name: "Earpad cho tai nghe Corsair HS50/HS60/HS70",
            price: 299000,
            priceOrigin: 349000,
            thumbnail: "https://songlongmedia.com/uploads/images/2022/08/05/earpad-corsair-hs70-pro.jpg",
        },
        {
            id: "earpad-corsair",
            name: "Earpad cho tai nghe Corsair HS50/HS60/HS70",
            price: 299000,
            priceOrigin: 349000,
            thumbnail: "https://songlongmedia.com/uploads/images/2022/08/05/earpad-corsair-hs70-pro.jpg",
        },
    ];


    const thumbnails = [
        "https://songlongmedia.com/media/product/3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
        "https://songlongmedia.com/media/product/3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
        "https://songlongmedia.com/media/product/3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
        "https://songlongmedia.com/media/product/3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
        "https://songlongmedia.com/media/product/3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg",
    ]
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
                    <div className=" rounded-lg overflow-hidden">
                        <img
                            src="https://songlongmedia.com/media/product/4172_tai_nghe_fiio_snowsky_anytime_black_songlongmedia__7_.jpg"
                            alt="FiiO SNOWSKY Anytime Headphones"
                            className="w-full h-[510px] object-contain"
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {thumbnails.map((thumb, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-28 h-28 bg-gray-100 rounded-lg overflow-hidden border hover:border-gray-300 cursor-pointer"
                            >
                                <img
                                    src={thumb || "/placeholder.svg"}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="space-y-6">
                    {/* Product Title */}
                    <h1 className="text-xl lg:text-2xl font-medium text-gray-900">
                        {productData.name}
                    </h1>

                    {/* Product Info */}
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Thương hiệu:</span>
                            <span className="text-blue-600 font-medium">FiiO</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">SKU:</span>
                            <span className="text-gray-900">4172</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Tình trạng:</span>
                            <span className="text-green-600">Còn hàng</span>
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
                        <div className="flex items-center gap-5">
                            <p className="text-4xl font-bold text-red-600">{priceFormat(productData.price)}</p>
                            <del className="text-gray-500 text-base font-medium">{priceFormat(productData.priceOrigin)}</del>
                        </div>
                        <div className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                            {percentFormat((productData.priceOrigin - productData.price) / productData.priceOrigin)}
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-gray-900">Lựa chọn phân loại</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {colors.map((color) => (
                                <div
                                    key={color.id}
                                    className={`border-2 rounded-lg p-3 cursor-pointer transition-colors ${selectedColor === color.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    onClick={() => setSelectedColor(color.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        {selectedColor === color.id && (
                                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                        <div>
                                            <div className="font-medium text-gray-900">{color.name}</div>
                                            <div className="text-blue-600 font-semibold">{color.price}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                            <div className="text-lg">MUA NGAY</div>
                            <div className="text-sm opacity-90">Giao nhanh hoặc nhận tại cửa hàng</div>
                        </button>
                        <button onClick={() => dispatch(addToCart(productData))} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                            <div className="text-lg">THÊM VÀO GIỎ HÀNG</div>
                            <div className="text-sm opacity-90">Tiếp tục mua sắm</div>
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
                            <span className="text-gray-600 min-w-0 flex-shrink-0">• Tình trạng:</span>
                            <span className="ml-2 text-gray-900">Nguyên hộp mới 100%, đầy đủ phụ kiện từ NSX</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 min-w-0 flex-shrink-0">• Xuất xứ:</span>
                            <span className="ml-2 text-gray-900">Chính hãng phân phối</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 min-w-0 flex-shrink-0">• Thương hiệu quốc gia:</span>
                            <span className="ml-2 text-gray-900">Trung Quốc</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 min-w-0 flex-shrink-0">• Sản xuất tại:</span>
                            <span className="ml-2 text-gray-900">Trung Quốc</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 min-w-0 flex-shrink-0">• Bộ sản phẩm gồm:</span>
                            <span className="ml-2 text-gray-900">01 Tai nghe FiiO SNOWSKY Anytime, 01 Dây sạc, 01 sách HDSD</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-600 min-w-0 flex-shrink-0">• Bảo hành:</span>
                            <span className="ml-2 text-gray-900">
                                12 tháng chính hãng, 1 đổi 1 trong 07 ngày nếu có lỗi phần cứng từ NSX.
                            </span>
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
                <div className="shadow p-5 rounded-xl ">
                    <h2 className="font-bold text-xl">Sản phẩm tương tự</h2>
                    <Swiper
                        spaceBetween={16}
                        breakpoints={{
                            320: { slidesPerView: 1 },
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
                        {products.map((item, index) => (
                            <SwiperSlide key={index}>
                                <ProductCard />
                            </SwiperSlide>
                        ))}
                    </Swiper>



                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-200">
                {/* Outstanding Features */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-red-600 bg-gray-100 py-2 px-4 rounded-lg">Đặc Điểm Nổi Bật</h3>
                    </div>

                    <div className="space-y-4 text-sm leading-relaxed">
                        <div className="flex items-start gap-2">
                            <div className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-700">
                                Tai nghe <span className="font-semibold">FiiO Snowsky Anytime</span> là dòng sản phẩm tai nghe onear
                                bluetooth có tích hợp công nghệ ANC cao cấp, đồng thời đây là sản phẩm đánh dấu sự kết hợp hoàn hảo
                                giữa phong cách thiết kế Retro Y2K cá tính với công nghệ hiện đại, hứa hẹn sẽ mang tới cho người
                                dùng một dòng sản phẩm vừa thời trang xen lẫn công nghệ âm thanh cao cấp
                            </p>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-700">
                                Thiết kế cực kì ấn tượng ngay từ ánh nhìn đầu tiên, lấy cảm hứng từ phong cách{" "}
                                <span className="font-semibold">retro Y2K</span> - một xu hướng đang trở lại mạnh mẽ trong thời điểm
                                hiện tại. Với vẻ ngoài cá tính, năng động cùng với nhiều màu sắc dễ dàng lựa chọn theo từng sở thích
                                cá nhân
                            </p>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-700">
                                Tai nghe <span className="font-semibold">FiiO Snowsky Anytime</span> được hoàn thiện với các vật
                                liệu, chất liệu cao cấp cho nên sẽ sở hữu trọng lượng khá nhẹ chỉ khoảng{" "}
                                <span className="font-semibold">155g</span>. Đem lại mềm mại êm ái, khả năng thoát khí cực nhanh phù
                                hợp đảm bảo sự dụng trong thời gian dài trong ngày.
                            </p>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-700">
                                Sử dụng driver <span className="font-semibold">Dynamic lên tới 40mm</span> chất lượng cao, đáp ứng
                                tần số rộng cùng với âm trầm mạnh mẽ, dễ dàng nghe nhiều dòng nhạc khác nhau
                            </p>
                        </div>

                        <div className="flex items-start gap-2">
                            <div className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5">
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-700">
                                Tai nghe <span className="font-semibold">FiiO Snowsky Anytime</span> sử dụng công nghệ kết nối{" "}
                                <span className="font-semibold">bluetooth 5.4 Codec SBC, AAC</span> mang tới khả năng
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="bg-white border border-gray-300 hover:bg-gray-50 px-6 py-2 rounded-lg text-gray-700 font-medium flex items-center gap-2 mx-auto">
                            Xem thêm
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Technical Specifications */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Thông số kỹ thuật</h3>

                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">KIỂU DÁNG</div>
                            <div className="col-span-2">
                                <div className="flex flex-col gap-1">
                                    <span>• Bluetooth</span>
                                    <span>• On-ear</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">ĐỊNH DẠNG BLUETOOTH</div>
                            <div className="col-span-2">
                                <div className="flex flex-col gap-1">
                                    <span>• 5.4</span>
                                    <span>• AAC</span>
                                    <span>• SBC</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">TRỢ NĂNG</div>
                            <div className="col-span-2">
                                <div className="flex flex-col gap-1">
                                    <span>• Chống ồn (ANC)</span>
                                    <span>• Dual Connect</span>
                                    <span>• Micro đàm thoại</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">THỜI LƯỢNG PIN</div>
                            <div className="col-span-2">
                                <span>• 58 giờ</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">KIỂU SẠC</div>
                            <div className="col-span-2">
                                <span>• Type-C</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">PHÍM BẤM</div>
                            <div className="col-span-2">
                                <span>• Phím vật lý</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">KÍCH THƯỚC DRIVER</div>
                            <div className="col-span-2">
                                <span>• 40mm</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200">
                            <div className="font-medium text-gray-700">MÀU SẮC</div>
                            <div className="col-span-2">
                                <div className="flex flex-col gap-1">
                                    <span>• Gold</span>
                                    <span>• Hồng</span>
                                    <span>• Đen</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 ml-auto">
                            Xem cấu hình chi tiết
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                </div>
                {/* Reviews Section */}

            </div>
            <div className="mb-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                    Đánh giá & nhận xét Tai nghe FiiO SNOWSKY Anytime (Bluetooth 5.4 | Pin 58h | Chống ồn ANC | Game Mode | Dual
                    Connect)
                </h3>

                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
                    <div className="flex gap-12">
                        {/* Overall Rating */}
                        <div className="text-center space-y-6">
                            <div className="text-7xl font-bold text-gray-900">0/5</div>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-10 h-10 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <div className="text-gray-600 text-lg">0 đánh giá và nhận xét</div>
                        </div>

                        {/* Rating Breakdown */}
                        <div className="w-full space-y-4">
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <div key={rating} className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
                                        <span className="text-lg font-semibold">{rating}</span>
                                        <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                                        <div className="bg-gray-300 h-3 rounded-full" style={{ width: "0%" }}></div>
                                    </div>
                                    <span className="text-gray-600 font-medium">0 bình luận</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600 mb-4">Bạn đánh giá sao sản phẩm này?</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl transition-colors text-lg">
                            Đánh giá ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
