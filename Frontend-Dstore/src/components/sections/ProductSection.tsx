import { TabItem } from '@/constants/data';
import SectionHeader from '@/components/common/SectionHeader';
import ProductSwiper from '@/components/common/ProductSwiper';
import ProductCard from '@/components/Product/ProductCard';
import { IProduct } from '@/types/product';

interface ProductSectionProps {
    title: string;
    tabs: TabItem[];
    products: IProduct[];
    activeTab: string;
    onTabChange: (value: string) => void;
    showViewAll?: boolean;
    breakpoints?: any;
}

const ProductSection = ({
    title,
    tabs,
    products,
    activeTab,
    onTabChange,
    showViewAll = true,
    breakpoints
}: ProductSectionProps) => {
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-6">
            <div>
                <SectionHeader
                    title={title}
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={onTabChange}
                    showViewAll={showViewAll}
                />

                <ProductSwiper
                    products={products}
                    Component={ProductCard}
                    breakpoints={breakpoints}
                />
            </div>
        </div>
    );
};

export default ProductSection; 