import ProductCard from "./ProductCard";
import "./ProductGrid.css";

/**
 * Grid of product cards. Reusable on homepage, search results, category pages.
 */
function ProductGrid({ products }) {
  if (!products?.length) {
    return (
      <p className="product-grid__empty">No products to show.</p>
    );
  }

  return (
    <section className="product-grid" aria-label="Products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductGrid;
