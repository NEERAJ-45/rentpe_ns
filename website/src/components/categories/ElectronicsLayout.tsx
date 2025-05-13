import Banner from "../sections/Banner";
import Carousel from "../sections/Carousel";
import Hero from "../sections/Hero";
import ProductGrid from "../sections/ProductGrid";

// components/categories/ElectronicsLayout.tsx
const ElectronicsLayout = () => (
  <div className="">
    <Hero title="Top Electronics Deals" />
    <Banner image="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Electronics Banner" />
    <Carousel category="Electronics" />
    <section>⚡ Flash Deals Component</section>
    <section>📱 Mobile Brands Component</section>
    <section>💻 Laptop Recommendations</section>
    <ProductGrid filter="laptops" />
  </div>
);

export default ElectronicsLayout;
