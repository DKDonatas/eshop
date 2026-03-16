## E‑shop – React storefront

Modern e‑commerce storefront built with React and Vite. It features category‑based browsing, search and sorting, favorites and cart management, and a clean, responsive UI.

### Features

- **Product catalog**: Fetches products and categories from an API and displays them in a responsive grid.
- **Filtering and search**: Filter by category, search by name, and sort by price, rating, or name.
- **Favorites and cart**: Add items to favorites or cart and manage quantities from dedicated pages.
- **Product detail view**: See detailed information for each product on its own page.
- **Checkout and orders**: Simple checkout flow and orders page to review previous purchases.
- **Error handling and loading states**: Error boundary, skeleton loaders, and inline error messages for a smooth UX.
- **Accessibility**: Skip‑to‑content link, semantic structure, and ARIA attributes where appropriate.

### Tech stack

- **React** with **React Router** for SPA navigation
- **Vite** for fast dev server and builds
- **Custom hooks** for debounced search and local storage
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

### Future improvements

- **Authentication and user accounts**
- **Real payment integration**
- **Persistent backend for orders and products**
- **More advanced filtering (price ranges, tags, etc.)**

