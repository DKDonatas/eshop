## E‑shop – React + Supabase storefront

Modern e‑commerce storefront built with React and Vite, backed by Supabase for auth and data. It features category‑based browsing, search and sorting, favorites and cart management, a first‑order discount for registered users, and a clean, responsive UI.

### Features

- **Product catalog**: Fetches products and categories from an API and displays them in a responsive grid.
- **Filtering and search**: Filter by category, search by name, and sort by price, rating, or name.
- **Favorites and cart**: Add items to favorites or cart, with per‑user persistence planned via Supabase.
- **Product detail view**: See detailed information for each product on its own page.
- **Checkout and orders**: Guest checkout plus logged‑in checkout that saves orders to Supabase.
- **First‑order discount**: Logged‑in users get 10% off their first purchase, enforced via the database and visible in cart and checkout.
- **Authentication**: Email/password sign‑up and sign‑in with Supabase Auth.
- **Error handling and loading states**: Error boundary, skeleton loaders, and inline error messages for a smooth UX.
- **Accessibility**: Skip‑to‑content link, semantic structure, and ARIA attributes where appropriate.

### Tech stack

- **React** with **React Router** for SPA navigation
- **Vite** for fast dev server and builds
- **Supabase** for authentication and persisted orders (Postgres + RLS)
- **Custom hooks** for debounced search, local storage, auth, and discounts
- **Context** for global shop state (cart, favorites, etc.)

### Getting started

- **Install dependencies**:

```bash
npm install
```

- **Run the dev server**:

```bash
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

### Available scripts

- **`npm run dev`** – start the development server
- **`npm run build`** – create a production build
- **`npm run preview`** – preview the production build locally
- **`npm run lint`** – run ESLint checks

### Project structure (high level)

- **`src/App.jsx`**: Application shell, routing, and layout.
- **`src/pages/*`**: Route‑level pages such as home, product detail, cart, favorites, checkout, orders, about, contact, and not‑found.
- **`src/components/*`**: Reusable UI building blocks (navigation, hero, product grid, cards, filters, skeletons, etc.).
- **`src/context/*`**: Shop context and provider for shared state.
- **`src/api/*`**: API helpers for fetching products and categories.
- **`src/lib/supabaseClient.js`**: Supabase client configuration.
- **`src/context/AuthContext.jsx`** and **`src/hooks/useAuth.js`**: Authentication state and helpers.

### Future improvements

- **Real payment integration**
- **Supabase‑backed product catalog instead of external API**
- **Full per‑user favorites and carts stored in Supabase**
- **More advanced filtering (price ranges, tags, etc.)**

