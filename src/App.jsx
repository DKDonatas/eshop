import "./App.css";
import MainNav from "./components/MainNav";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/Home/HomePage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import CartPage from "./pages/Cart/CartPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import NotFound from "./pages/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MainNav />
        <main id="main-content" className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
