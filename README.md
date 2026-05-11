# E-Commerce Frontend (Sample)

This is a small sample e-commerce frontend built to demonstrate UI, state management, and API integration.

Technologies
- Next.js
- React Query (@tanstack/react-query)
- Zustand (cart state, persisted)
- Tailwind CSS

Run

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
npm run start
```

Architecture
- `pages/` — Next.js pages
- `components/` — Reusable UI components
- `hooks/` — React Query hooks for API calls
- `store/` — Zustand store for cart, persisted to `localStorage`
- `utils/api.ts` — Axios instance configured for the sample API

Notes
- Shows loading skeletons while fetching
- Persists cart to LocalStorage
- Basic error handling and empty states
arn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
