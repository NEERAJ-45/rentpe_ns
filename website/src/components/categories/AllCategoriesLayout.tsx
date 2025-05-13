import Banner from "../sections/Banner";
import Carousel from "../sections/Carousel";
import Hero from "../sections/Hero";
import ProductGrid from "../sections/ProductGrid";

// components/categories/AllLayout.tsx
const AllLayout = () => (
  <div className="">
    <Hero title="Top All Deals" />
    <Banner image="https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D" alt="Electronics Banner" />
    <Carousel category="All" />
    <section>⚡ Flash Deals Component</section>
    <section>📱 Mobile Brands Component</section>
    <section>💻 Products Recommendations</section>
    <ProductGrid filter="all" />
  </div>
);

export default AllLayout;
