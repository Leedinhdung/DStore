import { Product, TabItem } from '@/constants/data';
import SectionHeader from '@/components/common/SectionHeader';
import ProductSwiper from '@/components/common/ProductSwiper';
import ProductCard from '@/components/Product/ProductCard';

interface ProductSectionProps {
    title: string;
    tabs: TabItem[];
    products: Product[];
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