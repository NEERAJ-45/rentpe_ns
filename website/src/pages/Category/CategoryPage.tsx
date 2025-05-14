// CategoryPage.tsx
import React from 'react';
import categoryLayouts from '@/config/categoryLayouts';
import { useCategory } from '@/hooks/useCategory';

const CategoryPage = () => {
  const { currentCategory } = useCategory();
  console.log(currentCategory)
  const CategoryComponent = categoryLayouts[currentCategory] || (() => <div>Category Not Found</div>);

  return (
    <React.Fragment>
      <CategoryComponent />
    </React.Fragment>
  )
};

export default CategoryPage;
