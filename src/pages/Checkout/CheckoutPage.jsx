import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../hooks/useShop";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useAuth } from "../../hooks/useAuth";
import { useFirstOrderDiscount } from "../../hooks/useFirstOrderDiscount";
import { supabase } from "../../lib/supabaseClient";
import "./CheckoutPage.css";

const AUTO_CLOSE_SECONDS = 10;

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useShop();
  const [, saveOrder] = useLocalStorage("eshop_orders", []);
  const { isAuthenticated, user } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [countdown, setCountdown] = useState(AUTO_CLOSE_SECONDS);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const cityRef = useRef(null);
  const postalCodeRef = useRef(null);
  const modalCloseRef = useRef(null);

  const { eligible: discountEligible } = useFirstOrderDiscount(user);
  const hasDiscount = isAuthenticated && discountEligible && cartTotal > 0;
  const discountAmount = hasDiscount ? Number((cartTotal * 0.1).toFixed(2)) : 0;
  const finalCartTotal = hasDiscount
    ? Number((cartTotal - discountAmount).toFixed(2))
    : cartTotal;

  const closeModal = useCallback(() => {
    setConfirmation(null);
  }, []);

  // Escape key to close
  useEffect(() => {
    if (!confirmation) return;
    function onKey(e) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirmation, closeModal]);

  // Move focus into modal when it opens for keyboard / screen-reader users
  useEffect(() => {
    if (confirmation) {
      modalCloseRef.current?.focus();
    }
  }, [confirmation]);

  // 10-second auto-close countdown
  useEffect(() => {
    if (!confirmation) return;
    setCountdown(AUTO_CLOSE_SECONDS);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          closeModal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [confirmation, closeModal]);

  const isValid = useMemo(() => {
    if (!cart.length) return false;
    if (!fullName.trim()) return false;
    if (!email.trim()) return false;
    if (!address.trim()) return false;
    if (!city.trim()) return false;
    if (!postalCode.trim()) return false;
    return true;
  }, [address, cart.length, city, email, fullName, postalCode]);

  const itemCount = useMemo(
    () => cart.reduce((sum, { quantity }) => sum + quantity, 0),
    [cart],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) {
      if (!fullName.trim()) {
        fullNameRef.current?.focus();
      } else if (!email.trim()) {
        emailRef.current?.focus();
      } else if (!address.trim()) {
        addressRef.current?.focus();
      } else if (!city.trim()) {
        cityRef.current?.focus();
      } else if (!postalCode.trim()) {
        postalCodeRef.current?.focus();
      }
      return;
    }

    const orderId = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const baseOrder = {
      orderId,
      date: new Date().toISOString(),
      fullName: fullName.trim(),
      email: email.trim(),
      address: `${address.trim()}, ${city.trim()}, ${postalCode.trim()}`,
      items: cart.map(({ product, quantity }) => ({
        id: product.id,
        name: product.name,
        image_url: product.image_url,
        quantity,
        price: product.price,
        lineTotal: product.price * quantity,
      })),
      total: finalCartTotal,
    };

    if (isAuthenticated && user) {
      try {
        const payload = {
          user_id: user.id,
          total: finalCartTotal,
          status: "confirmed",
          discount_applied: hasDiscount,
          items: {
            ...baseOrder,
            originalTotal: cartTotal,
            total: finalCartTotal,
            discountApplied: hasDiscount,
            discountPercent: hasDiscount ? 10 : 0,
          },
        };

        await supabase.from("orders").insert(payload);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to save order to Supabase", error);
      }
    }

    const finalOrder = {
      ...baseOrder,
      total: finalCartTotal,
      discountApplied: hasDiscount,
    };

    setConfirmation(finalOrder);
    saveOrder((prev) => [finalOrder, ...prev]);
    clearCart();
  };

  if (!cart.length && !confirmation) {
    return (
      <div className="page checkout-page">
        <h1>Checkout</h1>
        <p className="checkout-page__empty">Your cart is empty.</p>
        <Link to="/" className="checkout-page__link">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="page checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-page__layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2 className="checkout-form__title">Shipping details</h2>

          <label className="checkout-form__field">
            <span>Full name</span>
            <input
              ref={fullNameRef}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
            />
          </label>

          <label className="checkout-form__field">
            <span>Email</span>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label className="checkout-form__field">
            <span>Address</span>
            <input
              ref={addressRef}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              autoComplete="street-address"
            />
          </label>

          <div className="checkout-form__row">
            <label className="checkout-form__field">
              <span>City</span>
              <input
                ref={cityRef}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                autoComplete="address-level2"
              />
            </label>

            <label className="checkout-form__field">
              <span>Postal code</span>
              <input
                ref={postalCodeRef}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                autoComplete="postal-code"
              />
            </label>
          </div>

          <div className="checkout-form__actions">
            <Link to="/cart" className="btn btn--secondary">
              Back to cart
            </Link>
            <button type="submit" className="btn btn--primary" disabled={!isValid}>
              Place order
            </button>
          </div>
        </form>

        <aside className="checkout-summary" aria-label="Order summary">
          <h2 className="checkout-summary__title">Order summary</h2>
          <ul className="checkout-summary__items">
            {cart.map(({ product, quantity }) => (
              <li key={product.id} className="checkout-summary__item">
                <span className="checkout-summary__name">
                  {product.name} <span className="checkout-summary__qty">×{quantity}</span>
                </span>
                <span className="checkout-summary__price">
                  €{(product.price * quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="checkout-summary__total">
            {!hasDiscount ? (
              <strong>Total: €{cartTotal.toFixed(2)}</strong>
            ) : (
              <>
                <div>
                  <span className="checkout-summary__label">Subtotal:</span>{" "}
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="checkout-summary__discount">
                  <span className="checkout-summary__label">First order discount (10%):</span>{" "}
                  <span>-€{discountAmount.toFixed(2)}</span>
                </div>
                <div className="checkout-summary__final">
                  <strong className="checkout-summary__label">You&apos;ll pay:</strong>{" "}
                  <strong>€{finalCartTotal.toFixed(2)}</strong>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
      {confirmation && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={closeModal}
        >
          {/* stopPropagation so clicking inside the modal box doesn't close it */}
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 id="modal-title" className="modal__title">Order placed ✓</h2>
            <p className="modal__text">
              Thanks, <strong>{confirmation.fullName}</strong>. Your order{" "}
              <strong>{confirmation.orderId}</strong> has been confirmed.
            </p>
            <p className="modal__email-note">
              A confirmation will be sent to <strong>{confirmation.email}</strong>.
            </p>
            <div className="modal__box">
              <div className="modal__row">
                <span>Email</span>
                <span>{confirmation.email}</span>
              </div>
              <div className="modal__row">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>
              <div className="modal__row">
                <span>Total</span>
                <span>€{confirmation.total.toFixed(2)}</span>
              </div>
            </div>
            <div className="modal__actions">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => {
                  closeModal();
                  navigate("/", { replace: true });
                }}
              >
                Continue shopping
              </button>
              <button
                ref={modalCloseRef}
                type="button"
                className="btn btn--primary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
            <p className="modal__countdown" aria-live="polite" aria-atomic="true">
              Closing automatically in {countdown}s — or press Close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
