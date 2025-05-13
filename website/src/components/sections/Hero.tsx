// src/components/sections/Hero.tsx
const Hero = ({ title }: { title: string }) => (
  <section className="bg-blue-100 py-12 text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
  </section>
);
export default Hero;
