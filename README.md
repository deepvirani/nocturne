# Maison Nocturne

A luxury, dark-themed e-commerce storefront with a full product admin panel, built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

The demo house sells watches, leather goods, fragrance, jewellery, audio, furniture, and objects — all presented with editorial layouts and custom SVG artwork (no external image dependencies).

## Features

### Storefront
- Editorial home page with hero, featured collection, brand marquee, atelier story, category grid, journal, and service notes
- Collection page with live search, category filters, sorting, and empty states
- Product pages with static generation, detail views, stock status, quantity picker, "buy now", related products, and Product JSON-LD
- Slide-out shopping bag with quantity controls and `localStorage` persistence
- Demo checkout with server-side price recalculation, stock checks, order confirmation, and order numbers

### Admin (`/admin`)
- Passcode-protected dashboard (HTTP-only cookie session, 8 hours)
- Revenue, order, product, and low-stock stats
- Product table with create, edit, and delete
- Product form covering pricing, stock, category, artwork, badges, descriptions, specs, and featured status
- Orders table with customer, item, and status details
- Mutations invalidate the product cache so storefront changes appear immediately

### Technical
- Next.js 16 App Router with **Cache Components** and **Partial Prefetching** enabled
- Server Components by default, Client Components only where interactivity is needed
- Server Actions for all mutations
- Tag-based cache invalidation (`use cache`, `cacheTag`, `updateTag`) and path revalidation
- JSON file persistence for products and orders
- Typography via `next/font` (Playfair Display + Inter)
- Accessible labels, keyboard-dismissible drawer/menu, reduced-motion support, and responsive layouts

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Admin

- URL: [http://localhost:3000/admin](http://localhost:3000/admin)
- Default passcode: `atelier`
- Override it with an environment variable:

```bash
ADMIN_PASSWORD=your-passcode
```

Copy `.env.example` to `.env.local` for local use.

## Data

Products and orders live in plain JSON:

```
data/products.json
data/orders.json
```

- Storefront reads are cached with the `products` tag.
- Admin reads are uncached so edits appear immediately.
- After a mutation the app writes the JSON file, invalidates the `products` tag, and revalidates affected routes.
- To reset the demo, restore the seed files or replace them with your own data using the same shape.

> **Note:** File persistence is intended for local demos and self-hosted single-instance deployments. Serverless platforms with read-only/ephemeral filesystems need a database instead.

## Project structure

```
app/
├── (store)/                 # Storefront route group
│   ├── page.tsx             # Home
│   ├── shop/page.tsx        # Collection + filters
│   ├── product/[slug]/      # Product detail (static params + Suspense)
│   ├── checkout/page.tsx    # Checkout
│   └── layout.tsx           # Store shell (header, footer, cart)
├── admin/
│   ├── page.tsx             # Protected dashboard
│   ├── login/page.tsx       # Passcode sign-in
│   └── layout.tsx
├── globals.css              # Tailwind theme, typography, utilities
├── layout.tsx               # Root layout and fonts
├── icon.svg                 # Gold monogram favicon
└── not-found.tsx
components/                  # Artwork, cart, product, shop, checkout, admin UI
lib/                         # Types, formatting, cached data, actions, auth
data/                        # products.json, orders.json
```

## Demo limitations

- No real payment processor — card fields are presentational and never stored.
- Admin authentication is a single shared passcode intended for the demo, not multi-user production auth.
- Orders are simulated and persisted to JSON.
