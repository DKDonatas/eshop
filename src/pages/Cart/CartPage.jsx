import { Link } from "react-router-dom";
import { useShop } from "../../hooks/useShop";
import "./CartPage.css";

function CartPage() {
  const { cart, cartTotal, removeFromCart, updateCartQuantity } = useShop();

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
          <strong>Total: €{cartTotal.toFixed(2)}</strong>
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
