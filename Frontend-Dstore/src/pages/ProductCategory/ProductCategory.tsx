import Post from "@/components/Post/Post"
import ProductCard from "@/components/Product/ProductCard"
import { IMAGES, SWIPER_BREAKPOINTS_SMALL } from "@/constants/data"
import { useGetSlugParams } from "@/hooks/common/useCustomParams"
import { useGetProductsByCategory } from "@/hooks/product/useGetProducts"
import { IProduct } from "@/types/product"
import { Breadcrumbs, Button, Pagination, Stack, Typography } from "@mui/material"
import { ArrowDownWideNarrow, ArrowUpWideNarrow, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const ProductCategory = () => {
    const slug = useGetSlugParams('slug')
    const { data } = useGetProductsByCategory(slug!)
    const [sortType, setSortType] = useState("default");
    const [sortedData, setSortedData] = useState<IProduct[] | undefined>([]);

    const banners = [
        'https://songlongmedia.com/media/banner/09_Apr8aeb4075d06a0eb166c58d9c99e61ba6.jpg',
        'https://songlongmedia.com/media/banner/09_Apr9e16d901adbc9f5e5877d4cfe8a372ce.jpg'
    ]
    useEffect(() => {
        setSortedData(data);
    }, [data]);
    const getFilterPrice = (product: IProduct) => {
        const salePrice = Number(product.sale_price)
        const originPrice = Number(product.original_price)
        return !isNaN(salePrice) && salePrice > 0 ? salePrice : originPrice
    }
    const handleSort = (type: string) => {
        setSortType(type);
        if (!data) return;
        let sorted = [...data];

        switch (type) {
            case "price-asc":
                sorted.sort((a, b) => getFilterPrice(a) - getFilterPrice(b));
                break;
            case "price-desc":
                sorted.sort((a, b) => getFilterPrice(b) - getFilterPrice(a));
                break;
            case "newest":
                sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                break;
            // case "best-seller":
            //     sorted.sort((a, b) => b.sold - a.sold); 
            //     break;
            default:
                sorted = [...data];
        }

        setSortedData(sorted);
    };


    const buttonStyle = (active: boolean) => ({
        border: "1px solid",
        borderRadius: "4px",
        padding: "4px 8px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        textTransform: "none",
        backgroundColor: active ? "#1976d2" : "transparent",
        color: active ? "#fff" : "inherit",
    });

    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <Stack spacing={2}>
                <Breadcrumbs
                    separator={<ChevronRight size={15} />}
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

            <div className="col-span-1 md:col-span-1 lg:col-span-3 h-full mt-6">
                <Swiper
                    spaceBetween={16}
                    slidesPerView={2}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 2 },
                        1280: { slidesPerView: 2 },
                    }}
                    loop
                    autoplay={{ delay: 3000 }}
                    modules={[Autoplay]}
                    className="h-full"
                >
                    {banners?.map((banner, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={banner}
                                loading="lazy"
                                className="w-full h-full object-fit rounded-2xl shadow"
                                alt={`banner-${index}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Flash Sale Section */}
            <div className="max-w-screen-xl mx-auto  py-3 md:py-6 relative">
                {/* Background container with fixed height on desktop */}
                <div className="relative w-full h-auto sm:h-[500px] rounded-xl overflow-hidden">
                    {/* Background image */}
                    <img
                        src={IMAGES.OUTSTANDING_PRODUCT}
                        alt="Sản phẩm nổi bật"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />

                    <div className="relative z-10 px-1 sm:px-10 py-4 sm:py-3 h-full flex flex-col justify-between">
                        {/* Title */}
                        <div className="flex justify-center flex-col sm:flex-row sm:items-center w-full gap-4">
                            <h2 className="text-white text-2xl mx-auto md:mx-0 sm:text-4xl font-bold drop-shadow-lg text-center sm:text-left">
                                TOP 10 SẢN PHẨM NỔI BẬT
                            </h2>
                        </div>

                        {/* Swiper section */}
                        <div className="mt-6">
                            <Swiper
                                spaceBetween={5}
                                breakpoints={SWIPER_BREAKPOINTS_SMALL}
                                loop
                                autoplay={{ delay: 3000 }}
                                modules={[Autoplay]}
                                className="h-full"
                            >
                                {/* {product?.data &&
                                    Object.values(product.data)
                                        .flat()
                                        .slice(0, 10) 
                                        .map((item, i) => (
                                            <SwiperSlide key={i}>
                                                <ProductCard product={item} />
                                            </SwiperSlide>
                                        ))} */}

                            </Swiper>
                        </div>

                        {/* Button - center on mobile, right on desktop */}
                        <div className="sm:hidden mt-6 flex justify-center sm:justify-end">
                            <button className="bg-slate-50 font-medium px-4 py-2 rounded-xl shadow hover:bg-[#1781E0] hover:text-white w-full sm:w-auto max-w-xs">
                                Xem tất cả
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="max-w-screen-xl mx-auto py-3 md:py-6 px-4">
                <h3 className="text-xl font-bold">Sắp xếp theo</h3>

                <div className="flex flex-wrap gap-3 mt-3 items-center">
                    <Button
                        size="small"
                        sx={buttonStyle(sortType === "price-asc")}
                        onClick={() => handleSort("price-asc")}
                    >
                        <ArrowUpWideNarrow size={16} />
                        <span>Giá thấp - cao</span>
                    </Button>

                    <Button
                        size="small"
                        sx={buttonStyle(sortType === "price-desc")}
                        onClick={() => handleSort("price-desc")}
                    >
                        <ArrowDownWideNarrow size={16} />
                        <span>Giá cao - thấp</span>
                    </Button>

                    <Button
                        size="small"
                        sx={buttonStyle(sortType === "newest")}
                        onClick={() => handleSort("newest")}
                    >
                        <ArrowUpWideNarrow size={16} />
                        <span>Mới nhất</span>
                    </Button>

                    <Button
                        size="small"
                        sx={buttonStyle(sortType === "best-seller")}
                        onClick={() => handleSort("best-seller")}
                    >
                        <ArrowUpWideNarrow size={16} />
                        <span>Bán chạy</span>
                    </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
                    {sortedData?.map((item, i) => (
                        <ProductCard key={i} product={item} />
                    ))}
                </div>

                <Stack
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        marginTop: "50px",
                    }}
                >
                    <Pagination count={5} color="primary" />
                </Stack>
            </div>

            <div className="max-w-screen-xl mx-auto  py-6">
                <div className="border border-gray-100 shadow-md p-5 rounded-xl">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="font-bold ">Tin tức về sản phẩm</h3>
                    </div>
                    <Swiper
                        spaceBetween={16}
                        breakpoints={SWIPER_BREAKPOINTS_SMALL}
                        loop
                        autoplay={{ delay: 3000 }}
                        modules={[Autoplay]}
                        className="h-full mt-5"
                    >
                        {[...Array(4)].map((_, i) => (
                            <SwiperSlide key={i}>
                                <Post />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div >
    )
}
export default ProductCategory