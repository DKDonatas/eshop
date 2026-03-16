/**
 * E-shop API – fetches from a real backend.
 * Uses Fake Store API: https://fakestoreapi.com/
 * No API key required. Good for learning real fetch + loading/error handling.
 */

const BASE_URL = "https://fakestoreapi.com";

/**
 * Fetches all products (GET /products).
 * Maps API shape to our app: title→name, image→image_url, category (string).
 */
export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  const data = await res.json();
  return data.map((p) => ({
    id: p.id,
    name: p.title,
    description: p.description,
    price: p.price,
    image_url: p.image,
    category: p.category,
    rating: p.rating,
  }));
}

/**
 * Fetches a single product by ID (GET /products/:id).
 */
export async function fetchProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }
  const p = await res.json();
  return {
    id: p.id,
    name: p.title,
    description: p.description,
    price: p.price,
    image_url: p.image,
    category: p.category,
    rating: p.rating,
  };
}

/**
 * Fetches all category names (GET /products/categories).
 * API returns an array of strings, e.g. ["electronics", "jewelery", "men's clothing"].
 */
export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }
  const data = await res.json();
  return data.map((name, index) => ({ id: index + 1, name, slug: name }));
}
