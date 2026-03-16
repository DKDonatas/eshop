import { useState, useEffect } from "react";
import { ShopContext } from "./shopContext";

const CART_STORAGE_KEY = "eshop_cart";
const FAVORITES_STORAGE_KEY = "eshop_favorites";

function loadFromStorage(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => loadFromStorage(CART_STORAGE_KEY, []));
  const [favorites, setFavorites] = useState(() =>
    loadFromStorage(FAVORITES_STORAGE_KEY, [])
  );

  // Persist cart whenever it changes (dependency: cart)
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Persist favorites whenever they change (dependency: favorites)
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function addToCart(product, quantity = 1) {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function updateCartQuantity(productId, quantity) {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  function addToFavorites(product) {
    setFavorites((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }

  function removeFromFavorites(productId) {
    setFavorites((prev) => prev.filter((p) => p.id !== productId));
  }

  function isInFavorites(productId) {
    return favorites.some((p) => p.id === productId);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const value = {
    cart,
    favorites,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToFavorites,
    removeFromFavorites,
    isInFavorites,
  };

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
}
