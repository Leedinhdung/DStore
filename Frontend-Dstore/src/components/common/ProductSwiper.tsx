import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SWIPER_BREAKPOINTS} from '@/constants/data';
import 'swiper/css';
import { IProduct } from '@/types/product';

interface ProductSwiperProps {
    products: IProduct[];
    Component: React.ComponentType<any>;
    breakpoints?: typeof SWIPER_BREAKPOINTS;
    autoplayDelay?: number;
    className?: string;
}

const ProductSwiper = ({
    products,
    Component,
    breakpoints = SWIPER_BREAKPOINTS,
    autoplayDelay = 3000,
    className = "h-full mt-5"
}: ProductSwiperProps) => {
    return (
        <Swiper
            spaceBetween={16}
            breakpoints={breakpoints}
            loop
            autoplay={{ delay: autoplayDelay }}
            modules={[Autoplay]}
            className={className}
        >
            {products.map((item, index) => (
                <SwiperSlide key={`swiper-${index}`}>
                    <Component product={item} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProductSwiper; 