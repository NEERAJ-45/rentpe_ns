// src/components/SectionRenderer.tsx
import Hero from './sections/Hero';
import Banner from './sections/Banner';
import Carousel from './sections/Carousel';
import ProductGrid from './sections/ProductGrid';

const sectionMap: Record<string, React.FC<any>> = {
  hero: Hero,
  banner: Banner,
  carousel: Carousel,
  productGrid: ProductGrid,
};

export const SectionRenderer = ({ type, props }: { type: string; props?: any }) => {
  const Component = sectionMap[type];
  if (!Component) return null;
  return <Component {...props} />;
};
