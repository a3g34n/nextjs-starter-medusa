# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server with Turbopack on port 8000
yarn build      # Production build (TS/ESLint errors are ignored)
yarn start      # Start production server on port 8000
yarn lint       # Run ESLint
yarn analyze    # Bundle analyzer build (ANALYZE=true)
```

No test suite is configured in this project.

## Environment Variables

Copy `.env.template` to `.env.local` and set:

- `MEDUSA_BACKEND_URL` — Medusa server URL (default: `http://localhost:9000`)
- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` — Medusa publishable API key
- `NEXT_PUBLIC_DEFAULT_REGION` — Default region code (default: `us`)
- `NEXT_PUBLIC_STRIPE_KEY` — Stripe public key (optional, for Stripe payments)
- `MEDUSA_CLOUD_S3_HOSTNAME` / `MEDUSA_CLOUD_S3_PATHNAME` — Medusa Cloud image hosting (optional)

## Architecture

### Tech Stack
- **Next.js 15** with App Router, Server Components, Server Actions, Turbopack
- **Medusa V2** (`@medusajs/js-sdk`) as the commerce backend
- **Tailwind CSS** + `@medusajs/ui` component library
- **TypeScript** (strict mode; build errors suppressed via `ignoreBuildErrors: true`)

### Path Aliases
Defined in `tsconfig.json` with `baseUrl: ./src`:
- `@lib/*` → `src/lib/*`
- `@modules/*` → `src/modules/*`

### Routing Structure
All storefont routes are scoped under `src/app/[countryCode]/`:
- `(main)/` — standard pages (home, products, collections, account, cart, etc.)
- `(checkout)/` — isolated checkout flow

The middleware (`src/middleware.ts`) runs on every request, fetches Medusa regions, maps country codes to regions, and redirects bare URLs to `/{countryCode}/...`. The region map is cached in-memory for 1 hour.

### Data Layer (`src/lib/data/`)
Server-only data functions grouped by domain: `cart.ts`, `products.ts`, `customer.ts`, `orders.ts`, `regions.ts`, `payment.ts`, `collections.ts`, `categories.ts`, `variants.ts`, `fulfillment.ts`.

All Medusa API calls go through the `sdk` singleton in `src/lib/config.ts`, which automatically injects the `x-medusa-locale` header from the `_medusa_locale` cookie.

Cache tags are scoped per-user via `_medusa_cache_id` cookie (set by middleware). Cache invalidation uses Next.js `revalidateTag`.

### Auth & Cookies
Managed server-side in `src/lib/data/cookies.ts`:
- `_medusa_jwt` — auth token (httpOnly)
- `_medusa_cart_id` — active cart (httpOnly)
- `_medusa_cache_id` — cache scoping (set by middleware)
- `_medusa_locale` — language preference

### Localization
Two locales are supported: **English (`en`)** and **Turkish (`tr`)**. The `getDictionary(locale)` function in `src/lib/util/dictionary.ts` returns a typed dictionary object. The `countryCode` URL param doubles as the locale key (e.g., `tr` → Turkish dictionary). Dictionary is passed as a prop down to components from page/layout Server Components. Locale preference is also stored in the `_medusa_locale` cookie and sent to the backend as `x-medusa-locale`.

### Module Structure (`src/modules/`)
UI is organized into feature modules, each with `components/` and `templates/` subdirectories:
- `layout/` — `Nav`, `Footer`, side-menu, cart-dropdown, country-select, language-select
- `home/` — hero, fullscreen-section, category-nav
- `products/`, `cart/`, `checkout/`, `account/`, `order/`, `search/`, `collections/`, `categories/`, `shipping/`, `skeletons/`, `common/`

### Payment
Payment providers are registered in `src/lib/constants.tsx` (`paymentInfoMap`). Stripe (`pp_stripe_stripe`) is the primary integration. To add a new payment provider, add an entry to `paymentInfoMap`.

### Home Page Layout
The home page uses a full-screen snap-scroll layout (`snap-y snap-mandatory`). Sections are full-viewport images/video, followed by a sticky `CategoryNav` overlay and a `Footer` section.
