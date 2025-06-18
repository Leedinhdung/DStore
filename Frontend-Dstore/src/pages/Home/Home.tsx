import Banner from '@/components/Banner/Banner';
import Post from '@/components/Post/Post';
import ProductCard from '@/components/Product/ProductCard';
import Review from '@/components/Review/Review';
import { Product } from '@/types/Product';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const tabsHeadPhone = [
	{
		label: 'Tai nghe true wireless',
		value: 'trueWireless',
	},
	{
		label: 'Tai nghe bluetooth',
		value: 'bluetooth',
	},
	{
		label: 'Tai nghe có dây',
		value: 'wired',
	},
];
export const tabsSpeaker = [
	{
		label: 'Loa vi tính',
		value: 'speakerPC',
	},
	{
		label: 'Loa kiểm âm',
		value: 'bluetooth',
	},
	{
		label: 'Tai nghe có dây',
		value: 'wired',
	},
];

export const productsData: { [type: string]: Product[] } = {
	trueWireless: [
		{
			id: 1,
			color: 'Yellow',
			name: 'AirPods Pro 2',
			price: 5500000,
			priceOrigin: 6050000,
			image: 'https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg'
		},
		{
			id: 2,
			color: 'Yellow',
			name: 'Soundcore Liberty 4',
			price: 2690000,
			priceOrigin: 2959000,
			image: 'https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg'
		}
	],
	bluetooth: [
		{
			id: 3,
			color: 'Yellow',
			name: 'Sony WH-CH520',
			price: 1490000,
			priceOrigin: 1639000,
			image: 'https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg'
		},
		{
			id: 4,
			color: 'Yellow',
			name: 'JBL Tune 510BT',
			price: 1190000,
			priceOrigin: 1309000,
			image: 'https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg'
		}
	],
	wired: [
		{
			id: 5,
			color: 'Yellow',
			name: 'KZ ZSN Pro X',
			price: 490000,
			priceOrigin: 539000,
			image: 'https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg'
		},
		{
			id: 6,
			color: 'Yellow',
			name: 'CCA CRA+',
			price: 390000,
			priceOrigin: 429000,
			image: 'https://songlongmedia.com/media/product/250_3629_skullcandy_crusher_evo_all_love_songlongmedia__1_.jpg'
		}
	]
};

const Home = () => {
	const [activeTab, setActiveTab] = useState('');

	const [products, setProducts] = useState<Product[]>([]);

	const onTabActive = (value: string) => {
		setActiveTab(value);
	};

	const loadProducts = useCallback(() => {
		// load product by tab
		let data = productsData[activeTab];
		if (!activeTab) {
			data = Object.values(productsData).flat()
		}
		setProducts(data);
	}, [activeTab]);

	useEffect(() => {
		loadProducts();
	}, [activeTab]);
	return (
		<div>
			<Banner />
			<div className="max-w-screen-xl mx-auto px-4 py-6">
				<img
					src="https://songlongmedia.com/media/banner/09_Maye732e344e8d2b51085a4e72cfaa773d2.png"
					alt=""
					className="w-full rounded-xl shadow"
				/>
			</div>
			<div className="max-w-screen-xl mx-auto px-4 py-6 relative">
				<img
					src="https://songlongmedia.com/static/assets/2023/images/home-deal-bg.png"
					alt=""
					className="w-full rounded-xl shadow"
				/>

				<div className="absolute top-6 sm:top-10 left-4 sm:left-10 right-4 sm:right-10">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
						<h2 className="italic text-yellow-300 text-3xl sm:text-5xl font-extrabold drop-shadow-lg">
							FLASH SALE TUẦN NÀY
						</h2>
						<button className="bg-slate-50 font-medium px-4 py-2 rounded-xl shadow hover:bg-[#1781E0] hover:text-white">
							Xem tất cả
						</button>
					</div>

					<div className="mt-6">
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
							className="h-full">
							{[...Array(6)].map((_, i) => (
								<SwiperSlide key={i}>
									<ProductCard />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
			<div className="max-w-screen-xl mx-auto px-4 py-6">
				<div>

					<Stack direction="row" justifyContent="space-between">
						<Box bgcolor="#1781E0" borderRadius={1}>
							<Typography variant='h6' className='uppercase font-medium ' px={1} color='#fff'>
								Tai nghe
							</Typography>
						</Box>
						<Stack direction="row" spacing={1}>
							{tabsHeadPhone.map((tab, index) => (
								<Button
									size="small"
									sx={{
										border: 1,
										backgroundColor: activeTab === tab.value ? '#1781E0' : 'white',
										color: activeTab === tab.value ? 'white' : 'black',
										'&:hover': {
											backgroundColor: '#1781E0',
											color: 'white',
										},
									}}
									key={index}
									type="button"
									onClick={() => onTabActive(tab.value)}
								>
									{tab.label}
								</Button>
							))}
							<Button
								size="small"
								onClick={() => onTabActive('')}
								type='button'
								sx={{
									border: 1,
									backgroundColor: !activeTab ? '#1781E0' : 'white',
									color: !activeTab ? 'white' : 'black',
									'&:hover': {
										backgroundColor: '#1781E0',
										color: 'white',
									},
								}}
							>
								Xem tất cả
							</Button>

						</Stack>
					</Stack>

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
						className="h-full mt-5">
						<Stack direction="row" spacing={5}>
							{products.map((i, index) => (
								<SwiperSlide key={`tab-${index}`}>
									<ProductCard />
								</SwiperSlide>
							))}
						</Stack>
					</Swiper>


				</div>
			</div>
			<div className="max-w-screen-xl mx-auto px-4 py-6">
				<div>

					<Stack direction="row" justifyContent="space-between">
						<Box bgcolor="#1781E0" borderRadius={1}>
							<Typography variant='h6' className='uppercase font-medium ' px={1} color='#fff'>
								Loa
							</Typography>
						</Box>
						<Stack direction="row" spacing={1}>
							{tabsSpeaker.map((tab, index) => (
								<Button
									size="small"
									sx={{
										border: 1,
										backgroundColor: activeTab === tab.value ? '#1781E0' : 'white',
										color: activeTab === tab.value ? 'white' : 'black',
										'&:hover': {
											backgroundColor: '#1781E0',
											color: 'white',
										},
									}}
									key={index}
									type="button"
									onClick={() => onTabActive(tab.value)}
								>
									{tab.label}
								</Button>
							))}
							<Button
								size="small"
								onClick={() => onTabActive('')}
								type='button'
								sx={{
									border: 1,
									backgroundColor: !activeTab ? '#1781E0' : 'white',
									color: !activeTab ? 'white' : 'black',
									'&:hover': {
										backgroundColor: '#1781E0',
										color: 'white',
									},
								}}
							>
								Xem tất cả
							</Button>

						</Stack>
					</Stack>

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
						className="h-full mt-5">
						<Stack direction="row" spacing={5}>
							{products.map((i, index) => (
								<SwiperSlide key={`tab-${index}`}>
									<ProductCard />
								</SwiperSlide>
							))}
						</Stack>
					</Swiper>


				</div>
			</div>
			<div className="max-w-screen-xl mx-auto px-4 py-6">
				<div>

					<Stack direction="row" justifyContent="space-between">
						<Box bgcolor="#1781E0" borderRadius={1}>
							<Typography variant='h6' className='uppercase font-medium ' px={1} color='#fff'>
								Tin công nghệ
							</Typography>
						</Box>
						<Stack direction="row" spacing={1}>
							<Button
								size="small"
								onClick={() => onTabActive('')}
								type='button'
								sx={{
									border: 1,
									'&:hover': {
										backgroundColor: '#1781E0',
										color: 'white',
									},
								}}
							>
								Xem tất cả
							</Button>

						</Stack>
					</Stack>

					<Swiper
						spaceBetween={16}
						breakpoints={{
							320: { slidesPerView: 1 },
							640: { slidesPerView: 2 },
							768: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
							1280: { slidesPerView: 4 },
						}}
						loop
						autoplay={{ delay: 3000 }}
						modules={[Autoplay]}
						className="h-full mt-5">
						<Stack direction="row" spacing={5}>
							{products.map((i, index) => (
								<SwiperSlide key={`tab-${index}`}>
									<Post />
								</SwiperSlide>
							))}
						</Stack>
					</Swiper>


				</div>
			</div>
			<div className="max-w-screen-xl mx-auto px-4 py-6">
				<div>

					<Stack direction="row" justifyContent="space-between">
						<Box bgcolor="#1781E0" borderRadius={1}>
							<Typography variant='h6' className='uppercase font-medium ' px={1} color='#fff'>
								Đánh giá từ khách hàng
							</Typography>
						</Box>
					</Stack>

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
						className="h-full mt-5">
						<Stack direction="row" spacing={5}>
							{products.map((i, index) => (
								<SwiperSlide key={`tab-${index}`}>
									<Review />
								</SwiperSlide>
							))}
						</Stack>
					</Swiper>


				</div>
			</div>
		</div>
	);
};

export default Home;
