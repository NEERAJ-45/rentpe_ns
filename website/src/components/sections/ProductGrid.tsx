// src/components/sections/ProductGrid.tsx
const ProductGrid = ({ filter }: { filter: string }) => (
  <section className="py-8">
    <h3 className="text-xl font-semibold mb-4">Products: {filter}</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Example products */}
      <div className="bg-white p-4 shadow rounded">Product 1</div>
      <div className="bg-white p-4 shadow rounded">Product 2</div>
      <div className="bg-white p-4 shadow rounded">Product 3</div>
      <div className="bg-white p-4 shadow rounded">Product 4</div>
    </div>
  </section>
);
export default ProductGrid;
