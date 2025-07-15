import Banner from '@/components/Banner/Banner';
import Post from '@/components/Post/Post';
import Review from '@/components/Review/Review';
import ProductSection from '@/components/sections/ProductSection';
import { useProducts } from '@/hooks/useProducts';
import { SWIPER_BREAKPOINTS_SMALL, IMAGES } from '@/constants/data';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useGetCategories } from '@/hooks/category/useGetCategories';
import { useGetProducts } from '@/hooks/product/useGetProducts';
import { ICategory } from '@/types/category';
import { IProduct } from '@/types/product';

const Home = () => {
	const { activeTab, onTabActive } = useProducts();
	const { data: product } = useGetProducts()
	const { data: categories } = useGetCategories()
	console.log(product)
	const getFilteredProducts = (category: ICategory): IProduct[] => {
		const list = product?.[category.slug] || [];
		const isFiltering = activeTab && category.children.some(c => c.slug === activeTab);
		return isFiltering ? list.filter((p: IProduct) => p.category?.slug === activeTab) : list;
	};

	return (
		<div>
			<Banner />

			{/* Promotional Banner */}
			<div className="max-w-screen-xl mx-auto px-4 py-3 md:py-6">
				<img
					src={IMAGES.PROMOTIONAL_BANNER}
					alt="Promotional Banner"
					loading='lazy'
					className="w-full rounded-lg md:rounded-xl shadow"
				/>
			</div>

			{/* Flash Sale Section */}
			<div className="max-w-screen-xl mx-auto px-4 py-3 md:py-6 relative">
				{/* Background container with fixed height on desktop */}
				<div className="relative w-full h-auto sm:h-[500px] rounded-xl overflow-hidden">
					{/* Background image */}
					<img
						src={IMAGES.FLASH_SALE_BG}
						alt="Flash Sale Background"
						loading='lazy'
						className="absolute inset-0 w-full h-full object-cover z-0"
					/>

					<div className="relative z-10 px-1 sm:px-10 py-4 sm:py-3 h-full flex flex-col justify-between">
						{/* Title */}
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
							<h2 className="italic text-yellow-300 text-2xl mx-auto md:mx-0 sm:text-5xl font-extrabold drop-shadow-lg text-center sm:text-left">
								FLASH SALE TUẦN NÀY
							</h2>
							<button className="bg-slate-50 font-medium px-4 py-2 rounded-xl shadow hover:bg-[#1781E0] hover:text-white w-full sm:w-auto max-w-xs hidden md:block">
								Xem tất cả
							</button>
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


			{categories?.map((category) => (
				<ProductSection
					key={category.id}
					title={category.name}
					tabs={category.children.map(child => ({ name: child.name, slug: child.slug }))}
					products={getFilteredProducts(category)}
					activeTab={activeTab}
					onTabChange={onTabActive}
				/>
			))}

			{/* Technology News Section */}
			<div className="max-w-screen-xl mx-auto px-4 py-6">
				<div>
					<div className="flex justify-between items-center mb-5">
						<div className="bg-[#1781E0] rounded px-3 py-1">
							<h3 className="text-white font-medium uppercase">Tin công nghệ</h3>
						</div>
						<button className="border border-gray-300 px-3 py-1 rounded hover:bg-[#1781E0] hover:text-white">
							Xem tất cả
						</button>
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

			{/* Customer Reviews Section */}
			<div className="max-w-screen-xl mx-auto px-4 py-6">
				<div>
					<div className="bg-[#1781E0] rounded px-3 py-1 w-fit mb-5">
						<h3 className="text-white font-medium uppercase">Đánh giá từ khách hàng</h3>
					</div>

					<Swiper
						spaceBetween={16}
						breakpoints={{
							320: { slidesPerView: 1 },
							640: { slidesPerView: 2 },
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 2 },
							1280: { slidesPerView: 2 },
						}}
						loop
						autoplay={{ delay: 5000 }}
						modules={[Autoplay]}
						className="h-full mt-5"
					>
						{[...Array(4)].map((_, i) => (
							<SwiperSlide key={i}>
								<Review />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	);
};

export default Home;
