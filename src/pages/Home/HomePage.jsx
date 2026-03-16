import { useState, useEffect, useMemo, useRef } from "react";
import { fetchProducts, fetchCategories } from "../../api/shop";
import Hero from "../../components/Hero";
import CategoryFilter from "../../components/CategoryFilter";
import ProductGrid from "../../components/ProductGrid";
import ErrorMessage from "../../components/ErrorMessage";
import { SkeletonGrid } from "../../components/SkeletonCard";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import "./HomePage.css";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortKey, setSortKey] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 300);
  const searchInputRef = useRef(null);

  // [] = fetch once on mount. We load ALL products and filter client-side.
  // Stale-closure note: If we later changed to "fetch products BY category" (e.g.
  // fetchProducts(selectedCategory)), we would HAVE to put [selectedCategory] in the
  // dependency array. Otherwise the effect would close over the initial selectedCategory
  // (e.g. null) and never re-fetch when the user picks a category → stale closure.
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (selectedCategory != null) {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sortKey === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortKey === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortKey === "rating") list = [...list].sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
    if (sortKey === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, selectedCategory, debouncedSearch, sortKey]);

  const handleClearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  if (loading) {
    return (
      <div className="home-page">
        <Hero />
        <div className="home-page__content">
          <SkeletonGrid count={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <h1>E-shop</h1>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="home-page">
      <Hero />
      <div className="home-page__content">
        <div className="home-page__search">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="home-page__search-input"
            aria-label="Search products"
          />
          <button
            type="button"
            onClick={handleClearSearch}
            className="home-page__search-clear"
            aria-label="Clear search"
          >
            Clear
          </button>
        </div>
        <div className="home-page__toolbar">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="home-page__sort">
            <label htmlFor="sort-select" className="home-page__sort-label">
              Sort:
            </label>
            <select
              id="sort-select"
              className="home-page__sort-select"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating">Top rated</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>
        <p className="home-page__count" aria-live="polite">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </p>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}

export default HomePage;
