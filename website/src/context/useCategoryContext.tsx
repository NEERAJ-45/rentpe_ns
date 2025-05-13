// useCategoryContext.ts
import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext({
  category: 'all',
  setCategory: (cat: string) => { },
});

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState('all');
  console.log(category)
  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
