import { useGetBanners } from '@/hooks/banner/useGetBanners'
import { useGetCategories } from '@/hooks/category/useGetCategories'
import { getImageUrl } from '@/lib/common'
import { ChevronRight } from 'lucide-react'
import React, { useState, useRef } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Banner = () => {
    const [activeMenu, setActiveMenu] = useState<number | null>(null)
    const menuRefs = useRef<HTMLLIElement[]>([])
    const { data: categories } = useGetCategories()
    const { data: banners } = useGetBanners()
    const bannerRight = [
        'https://songlongmedia.com/media/banner/08_Apr8e56a105c1e82db38d84863b41a89e09.jpg',
        'https://songlongmedia.com/media/banner/08_Apr4be4c95a7324e1a546a0fe00b88ee650.jpg',
        'https://songlongmedia.com/media/banner/20_Apr3cf4193b268ecff5315a949593e2ab4b.png'
    ]

    const handleMouseEnter = (index: number) => {
        setActiveMenu(index)
    }
    const handleMouseLeave = () => {
        setActiveMenu(null)
    }
    return (
        <div className="max-w-screen-xl mx-auto px-4 h-[350px]">
            <div className="grid grid-cols-5 gap-4">
                {/* Sidebar menu */}
                <div className="col-span-1 rounded-xl shadow border border-gray-200 p-4 bg-white relative z-20">
                    <ul className="space-y-2">
                        {categories && categories.map((item, index) => (
                            <li
                                key={item.id}
                                ref={(el) => {
                                    menuRefs.current[index] = el as HTMLLIElement
                                }}
                                onMouseEnter={() => handleMouseEnter(index)}
                                className="flex justify-between items-center text-sm font-medium cursor-pointer px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition-all duration-200"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-blue-500 group-hover:text-white"
                                        dangerouslySetInnerHTML={{ __html: item.icon_svg }}
                                    />

                                    <span>{item.name}</span>
                                </div>
                                {item.children?.length > 0 && <ChevronRight size={16} />}

                                {/* Submenu */}
                                {item.children?.length > 0 && activeMenu === index && (
                                    <div
                                        className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-lg border border-gray-100 w-64 py-3 px-2 z-30"
                                        style={{
                                            top: menuRefs.current[index]?.offsetTop || 0,
                                            maxHeight: '320px',
                                            overflow: 'auto',
                                        }}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="absolute left-0 top-4 -ml-2 w-3 h-3 bg-white transform rotate-45 border-l border-t border-gray-100"></div>
                                        <h3 className="text-sm font-semibold text-gray-800 px-3 pb-2 mb-2 border-b">
                                            {item.name}
                                        </h3>
                                        <ul className="space-y-1">
                                            {item.children.map((subItem) => (
                                                <li key={subItem.name}>
                                                    <a
                                                        href="#"
                                                        className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
                                                    >
                                                        <span
                                                            className="text-blue-500 group-hover:text-white"
                                                            dangerouslySetInnerHTML={{ __html: subItem.icon_svg }}
                                                        />
                                                        <span>{subItem.name}</span>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Banner slider - Custom implementation replacing Swiper */}
                <div className="col-span-3 h-full">
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={1}
                        loop
                        autoplay={{ delay: 3000 }}
                        modules={[Autoplay]}
                        className="h-full"
                    >
                        {banners?.map((banner, index) => (
                            <SwiperSlide>
                                <img key={index}
                                    src={banner.url ? banner.url : getImageUrl(banner.image)}
                                    className="w-full h-full object-cover rounded-2xl shadow"
                                    alt="banner-1"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* Banner phụ */}
                <div className="col-span-1 grid grid-rows-3 gap-4 h-full">
                    {bannerRight.map((url, idx) => (
                        <img
                            key={idx}
                            className="w-full h-full object-cover rounded-xl shadow"
                            src={url}
                            alt={`sub-banner-${idx}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Banner
