import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduct } from "../../api/shop";
import { useShop } from "../../hooks/useShop";
import LoadingState from "../../components/LoadingState";
import ErrorMessage from "../../components/ErrorMessage";
import "./ProductDetailPage.css";

/**
 * Product detail page. Demonstrates useEffect with a required dependency:
 * we must re-fetch when the route param (id) changes. Without [id] in the
 * dependency array, navigating from /product/1 to /product/2 would still
 * show product 1.
 */
function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart, addToFavorites, removeFromFavorites, isInFavorites } =
    useShop();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Required: run when id changes so we fetch the correct product.
  // If we used [] we would only fetch once; switching from /product/1 to /product/2
  // would keep showing product 1.
  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProduct(id);
        if (!cancelled) setProduct(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Failed to load product");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="page">
        <LoadingState message="Loading product…" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page">
        <ErrorMessage message={error || "Product not found"} />
        <Link to="/">Back to shop</Link>
      </div>
    );
  }

  const isFav = isInFavorites(product.id);

  return (
    <div className="page product-detail-page">
      <Link to="/" className="product-detail-page__back">
        ← Back to shop
      </Link>
      <article className="product-detail">
        <div className="product-detail__image-wrap">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-detail__image"
          />
        </div>
        <div className="product-detail__body">
          <p className="product-detail__category">{product.category}</p>
          <h1 className="product-detail__name">{product.name}</h1>
          <p className="product-detail__description">{product.description}</p>
          <p className="product-detail__price">€{product.price.toFixed(2)}</p>
          {product.rating && (
            <p className="product-detail__rating">
              ★ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}
          <div className="product-detail__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
            <button
              type="button"
              className={`btn ${isFav ? "btn--secondary" : ""}`}
              onClick={() =>
                isFav ? removeFromFavorites(product.id) : addToFavorites(product)
              }
            >
              {isFav ? "Remove from favorites" : "Add to favorites"}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default ProductDetailPage;
