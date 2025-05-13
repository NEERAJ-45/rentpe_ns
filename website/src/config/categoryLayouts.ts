// categoryLayouts.ts
import all from '@/components/categories/AllCategoriesLayout';
import ElectronicsLayout from '@/components/categories/ElectronicsLayout';
import FashionLayout from '@/components/categories/FashionLayout';

const categoryLayouts: Record<string, React.FC> = {
    all: all,
    electronics: ElectronicsLayout,
    fashion: FashionLayout,
    // Add more categories...
};

export default categoryLayouts;
