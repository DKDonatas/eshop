## E‑shop – React + Supabase storefront

A modern e‑commerce demo built with React, Vite, and Supabase. It uses the public Fake Store API for product data and is intended as a learning / portfolio project, not a production shop. The app showcases real‑world UX like product browsing, filtering, favorites, cart + checkout, and a first‑order discount backed by a Postgres database.

### Highlights

- **Auth + profiles**: Email/password signup and signin with Supabase Auth, ready for per‑user profile data.
- **Smart cart & discount**: Client‑side cart with a **10% first‑order discount** for logged‑in users, enforced in the database and visible in cart and checkout.
- **Orders history**: Orders are persisted in Supabase and loaded per user, not just per browser.
- **Solid UX**: Skeleton loading states, error boundaries, accessibility (skip links, ARIA), and responsive layout.

### Tech

- React, React Router, Vite  
- Supabase (Postgres, RLS, auth)  
- Context + custom hooks for cart, favorites, auth, and discounts

### Run locally

```bash
npm install
npm run dev
```

Then open the printed `http://localhost:5173` URL.

