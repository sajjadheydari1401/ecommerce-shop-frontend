# E-Commerce Frontend (Demo)

This repository contains a small, demo e-commerce frontend built with Next.js (App Router), TypeScript and Tailwind CSS. It demonstrates a typical product listing and cart flow with client-side data fetching, state persistence for the cart, and a few UI helpers (skeletons, empty/error states).

Key features

- Product listing with filters, pagination and search
- Product detail page with gallery and add-to-cart
- Cart persisted in-browser via `zustand` + `zustand/middleware` persist
- Client data fetching using `@tanstack/react-query` and `axios`
- Responsive UI styled with Tailwind CSS
- Toast notifications via `react-toastify`

Tech stack

- Next.js (App Router)
- React 19 + TypeScript
- @tanstack/react-query
- zustand (cart state)
- axios
- Tailwind CSS
- react-toastify

Getting started

1. Install dependencies

```bash
npm install
```

2. Set environment variables

- Create a `.env.local` at the project root and set at least the API base URL:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

3. Run in development

```bash
npm run dev
```

4. Build and run production

```bash
npm run build
npm run start
```

Useful scripts

- `dev` — starts Next.js in development
- `build` — builds the app for production
- `start` — runs the production build
- `lint` — runs ESLint

Project structure (high level)

- `app/` — Next.js App Router routes (home, product pages, cart)
- `components/` — reusable UI components and feature components (product, cart, common)
- `hooks/` — data-fetching and UI hooks (`useProducts`, `useProduct`, `useCheckout`, etc.)
- `store/` — `zustand` store for cart state
- `utils/` — shared utilities (e.g., `api.ts` axios instance)
- `public/` — static assets
- `types/` — TypeScript interfaces used across the app

Notes and configuration

- The app expects `NEXT_PUBLIC_API_BASE_URL` to point to your backend API.
- The axios instance is configured in `utils/api.ts` and reads `process.env.NEXT_PUBLIC_API_BASE_URL`.
- The cart is persisted to browser storage via `zustand`'s `persist` middleware.


