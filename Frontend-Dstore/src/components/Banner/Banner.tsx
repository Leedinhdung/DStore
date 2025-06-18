import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';


const Banner = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const menuItems = [
        'Tai nghe',
        'Loa',
        'Máy nghe nhạc',
        'DAC / AMP',
        'Phụ kiện Audio'
    ];

    const toggleItem = (index: number) => {
        setActiveIndex(index === activeIndex ? null : index);
    };
    return (
        <div className="max-w-screen-xl mx-auto px-4 h-[350px]">
            <div className="grid grid-cols-5 gap-4">
                {/* Sidebar menu */}
                <div className="col-span-1 rounded-xl shadow border border-gray-200 p-4 bg-white">

                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <li
                                key={item}
                                onClick={() => toggleItem(index)}
                                className="flex justify-between items-center text-sm font-medium cursor-pointer px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition-colors"
                            >
                                <span>{item}</span>
                                <FaChevronDown
                                    className={`transition-transform duration-200 ${activeIndex === index ? '-rotate-90' : ''}`}
                                />
                            </li>
                        ))}
                    </ul>
                </div>


                {/* Banner slider */}
                <div className="col-span-3 h-full">
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={1}
                        loop
                        autoplay={{ delay: 3000 }}
                        modules={[Autoplay]}
                        className="h-full"
                    >
                        <SwiperSlide>
                            <img
                                src="https://songlongmedia.com/media/banner/se215pro.jpg"
                                className="w-full h-full object-cover rounded-2xl shadow"
                                alt="banner-1"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src="https://songlongmedia.com/media/banner/Sennheiserhd505.jpg"
                                className="w-full h-full object-cover rounded-2xl shadow"
                                alt="banner-2"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Banner phụ */}

                <div className="col-span-1 grid grid-rows-3 gap-4 h-full">
                    {[...Array(3)].map((_, idx) => (
                        <img
                            key={idx}
                            className="w-full h-full object-cover rounded-xl shadow"
                            src="https://songlongmedia.com/media/banner/08_Apr8e56a105c1e82db38d84863b41a89e09.jpg"
                            alt={`sub-banner-${idx}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
