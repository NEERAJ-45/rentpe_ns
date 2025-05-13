// CategoryPage.tsx
import React from 'react';
import categoryLayouts from '@/config/categoryLayouts';
import { useCategory } from '@/context/useCategoryContext';

const CategoryPage = () => {
  const { category } = useCategory();
  const CategoryComponent = categoryLayouts[category] || (() => <div>Category Not Found</div>);

  return (
    <React.Fragment>
      <CategoryComponent />
    </React.Fragment>
  )
};

export default CategoryPage;
