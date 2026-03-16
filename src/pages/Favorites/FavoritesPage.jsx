import { Link } from "react-router-dom";
import { useShop } from "../../hooks/useShop";
import ProductCard from "../../components/ProductCard";
import "./FavoritesPage.css";

function FavoritesPage() {
  const { favorites, removeFromFavorites, addToCart } = useShop();

  if (favorites.length === 0) {
    return (
      <div className="page favorites-page">
        <h1>Favorites</h1>
        <p className="favorites-page__empty">You haven't added any favorites yet.</p>
        <Link to="/" className="favorites-page__link">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="page favorites-page">
      <h1>Favorites</h1>
      <section className="product-grid">
        {favorites.map((product) => (
          <div key={product.id} className="favorites-card-wrap">
            <ProductCard product={product} showActions={false} />
            <div className="favorites-card-wrap__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => removeFromFavorites(product.id)}
              >
                Remove from favorites
              </button>
            </div>
          </div>
        ))}
      </section>
      <Link to="/" className="favorites-page__link">
        Browse more products
      </Link>
    </div>
  );
}

export default FavoritesPage;
