import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useShop } from "../hooks/useShop";
import { useAuth } from "../hooks/useAuth";
import "./MainNav.css";

/**
 * Main site navigation. Sticky, minimal fashion-style bar.
 * On small screens collapses into a hamburger menu.
 */
function MainNav() {
  const { cartCount } = useShop();
  const { isAuthenticated, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="main-nav">
      <div className="main-nav__inner">
        <Link to="/" className="main-nav__logo">
          E-Shop
        </Link>

        {/* Desktop links */}
        <nav className="main-nav__links" aria-label="Main navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/cart" className="main-nav__cart">
            Cart
            {cartCount > 0 && (
              <span className="main-nav__badge" aria-label={`${cartCount} items in cart`}>
                {cartCount}
              </span>
            )}
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/auth" state={{ mode: "signin" }} className="main-nav__auth-link">
                Sign in
              </Link>
              <Link to="/auth" state={{ mode: "signup" }} className="main-nav__auth-link">
                Register
              </Link>
            </>
          ) : (
            <button
              type="button"
              className="main-nav__auth-button"
              onClick={() => {
                signOut();
              }}
            >
              Sign out
            </button>
          )}
        </nav>

        {/* Hamburger button – mobile only */}
        <button
          ref={hamburgerRef}
          type="button"
          className={`main-nav__hamburger ${menuOpen ? "main-nav__hamburger--open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      <nav
        id="mobile-menu"
        ref={menuRef}
        className={`main-nav__mobile ${menuOpen ? "main-nav__mobile--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/cart">
          Cart
          {cartCount > 0 && (
            <span className="main-nav__badge" aria-label={`${cartCount} items`}>
              {cartCount}
            </span>
          )}
        </Link>
        {!isAuthenticated ? (
          <>
            <Link to="/auth" state={{ mode: "signin" }}>
              Sign in
            </Link>
            <Link to="/auth" state={{ mode: "signup" }}>
              Register
            </Link>
          </>
        ) : (
          <button
            type="button"
            className="main-nav__auth-button main-nav__auth-button--mobile"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        )}
      </nav>
    </header>
  );
}

export default MainNav;
