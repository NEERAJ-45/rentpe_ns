// src/components/sections/Banner.tsx
const Banner = ({ image, alt }: { image: string; alt: string }) => (
  <section>
    <img src={image} alt={alt} className="w-full h-96 object-cover" />
  </section>
);
export default Banner;
