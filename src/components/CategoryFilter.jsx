import "./CategoryFilter.css";

/**
 * Category filter buttons. Reusable anywhere we filter by category.
 * categories: [{ id, name, slug }]
 * selectedCategory: string | null (category name or null for "All")
 * onSelectCategory: (categoryName: string | null) => void
 */
function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <nav className="category-filter" aria-label="Filter by category">
      <button
        type="button"
        className={`category-filter__btn ${selectedCategory === null ? "category-filter__btn--active" : ""}`}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug ?? cat.id}
          type="button"
          className={`category-filter__btn ${selectedCategory === cat.name ? "category-filter__btn--active" : ""}`}
          onClick={() => onSelectCategory(cat.name)}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
}

export default CategoryFilter;
