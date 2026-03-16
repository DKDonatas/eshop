import { Link } from "react-router-dom";
import "./Footer.css";

/**
 * Site footer – quick links, contact, newsletter placeholder. Fashion-style dark strip.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col footer__col--brand">
          <span className="footer__logo">E-Shop</span>
          <p className="footer__tagline">
            A modern store for fashion, electronics, and more.
          </p>
        </div>
        <div className="footer__col">
          <h3 className="footer__heading">Quick links</h3>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h3 className="footer__heading">Contact</h3>
          <p className="footer__text">support@eshop.example.com</p>
          <p className="footer__text footer__text--muted">We reply within 24 hours.</p>
        </div>
        <div className="footer__col footer__col--newsletter">
          <h3 className="footer__heading">Stay updated</h3>
          <p className="footer__text footer__text--muted">
            New arrivals and offers. (Newsletter coming soon.)
          </p>
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">&copy; {new Date().getFullYear()} E-Shop. Learning project.</p>
      </div>
    </footer>
  );
}

export default Footer;
