// src/components/sections/Carousel.tsx
const Carousel = ({ category }: { category: string }) => (
  <section className="py-8">
    <h3 className="text-xl font-semibold mb-4">Featured {category}</h3>
    {/* Carousel items would go here */}
    <div className="flex space-x-4 overflow-x-auto">
      {/* Example items */}
      <div className="w-48 h-48 bg-gray-200 flex-shrink-0"></div>
      <div className="w-48 h-48 bg-gray-200 flex-shrink-0"></div>
      <div className="w-48 h-48 bg-gray-200 flex-shrink-0"></div>
    </div>
  </section>
);
export default Carousel;
