import { Link } from "react-router-dom";
import { useShop } from "../../hooks/useShop";
import { useAuth } from "../../hooks/useAuth";
import { useFirstOrderDiscount } from "../../hooks/useFirstOrderDiscount";
import "./CartPage.css";

function CartPage() {
  const { cart, cartTotal, removeFromCart, updateCartQuantity } = useShop();
  const { isAuthenticated, user } = useAuth();
  const { eligible } = useFirstOrderDiscount(user);

  const hasDiscount = isAuthenticated && eligible && cartTotal > 0;
  const discountAmount = hasDiscount ? Number((cartTotal * 0.1).toFixed(2)) : 0;
  const finalTotal = hasDiscount ? Number((cartTotal - discountAmount).toFixed(2)) : cartTotal;

  if (cart.length === 0) {
    return (
      <div className="page cart-page">
        <h1>Your Cart</h1>
        <p className="cart-page__empty">Your cart is empty.</p>
        <Link to="/" className="cart-page__link">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <h1>Your Cart</h1>
        {!isAuthenticated && (
          <div className="cart-page__promo" role="status" aria-live="polite">
            <strong>New here?</strong> Create an account and log in to get{" "}
            <strong>10% off your first purchase.</strong>{" "}
            <Link to="/auth" state={{ mode: "signup" }} className="cart-page__promo-link">
              Sign up or log in
            </Link>
            .
          </div>
        )}
      <ul className="cart-list" aria-label="Cart items">
        {cart.map(({ product, quantity }) => (
          <li key={product.id} className="cart-item">
            <div className="cart-item__image">
              <img src={product.image_url} alt={product.name} />
            </div>
            <div className="cart-item__details">
              <h2 className="cart-item__name">{product.name}</h2>
              <p className="cart-item__price">€{product.price.toFixed(2)}</p>
              <div className="cart-item__quantity">
                <button
                  type="button"
                  onClick={() => updateCartQuantity(product.id, quantity - 1)}
                  aria-label={`Decrease quantity of ${product.name}`}
                >
                  −
                </button>
                <span aria-live="polite" aria-atomic="true">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateCartQuantity(product.id, quantity + 1)}
                  aria-label={`Increase quantity of ${product.name}`}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="cart-item__remove"
                onClick={() => removeFromCart(product.id)}
                aria-label={`Remove ${product.name} from cart`}
              >
                Remove
              </button>
            </div>
            <p className="cart-item__subtotal">
              €{(product.price * quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <div className="cart-page__footer">
        <div className="cart-page__total">
          {!hasDiscount ? (
            <strong>Total: €{cartTotal.toFixed(2)}</strong>
          ) : (
            <>
              <div>
                <span className="cart-page__total-label">Subtotal:</span>{" "}
                <span>€{cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-page__total-discount">
                <span className="cart-page__total-label">First order discount (10%):</span>{" "}
                <span>-€{discountAmount.toFixed(2)}</span>
              </div>
              <div className="cart-page__total-final">
                <strong className="cart-page__total-label">You&apos;ll pay:</strong>{" "}
                <strong>€{finalTotal.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>
        <div className="cart-page__actions">
          <Link to="/" className="btn btn--secondary">
            Continue shopping
          </Link>
          <Link to="/checkout" className="btn btn--primary">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
