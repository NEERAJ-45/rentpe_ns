import Banner from "../sections/Banner";
import Carousel from "../sections/Carousel";
import Hero from "../sections/Hero";
import ProductGrid from "../sections/ProductGrid";

// components/categories/FashionLayout.tsx
const FashionLayout = () => (
  <div className="">
    <Hero title="Top Fashion Deals" />
    <Banner image="https://images.unsplash.com/photo-1700295805070-5e6f0cd0f846?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGNsb3Roc3xlbnwwfHwwfHx8MA%3D%3D" alt="Electronics Banner" />
    <Carousel category="Fashion" />
    <section>⚡ Flash Deals Component</section>
    <section>📱 Mobile Brands Component</section>
    <section>💻 Products Recommendations</section>
    <ProductGrid filter="Fashion" />
  </div>
);

export default FashionLayout;
