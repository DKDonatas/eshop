import { memo } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../hooks/useShop";
import "./ProductCard.css";

/**
 * Single product card. Reusable on homepage, product detail, search results, etc.
 * Shows Add to Cart and Favorites when used inside ShopProvider.
 * Wrapped in memo to avoid re-renders when parent re-renders with same product props.
 */
function ProductCard({ product, showActions = true }) {
  const {
    addToCart,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
  } = useShop();

  const isFav = isInFavorites(product.id);

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__image-wrap">
        <img
          src={product.image_url}
          alt={product.name}
          className="product-card__image"
        />
      </Link>
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h2 className="product-card__name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h2>
        <p className="product-card__description">{product.description}</p>
        <p className="product-card__price">€{product.price.toFixed(2)}</p>
        {product.rating && (
          <span className="product-card__rating">
            ★ {product.rating.rate} ({product.rating.count} reviews)
          </span>
        )}
        {showActions && (
          <div className="product-card__actions">
            <button
              type="button"
              className="product-card__btn product-card__btn--cart"
              onClick={() => addToCart(product)}
              aria-label={`Add ${product.name} to cart`}
            >
              Add to cart
            </button>
            <button
              type="button"
              className={`product-card__btn product-card__btn--fav ${isFav ? "product-card__btn--fav-active" : ""}`}
              onClick={() =>
                isFav ? removeFromFavorites(product.id) : addToFavorites(product)
              }
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              ♥
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

export default memo(ProductCard);
