# LaptopStore

A production-ready laptop e-commerce website built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and MongoDB.

## Features

- Browse and search laptops with brand/price filters
- Product detail pages with specs
- Shopping cart (localStorage persistence)
- JWT authentication via httpOnly cookies
- User profile with order history
- Admin dashboard (product CRUD + stats)
- Admin order management (status updates)
- Dark mode with next-themes
- Apple Store–inspired premium UI

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Notifications | react-hot-toast |

## Prerequisites

- Node.js 20.9+
- MongoDB running locally or a MongoDB Atlas connection string

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# MongoDB — local or Atlas
MONGODB_URI=mongodb://127.0.0.1:27017/laptop-store

# JWT — use a long random string in production
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Variable walkthrough:**

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB connection string. Local default creates a `laptop-store` database automatically. |
| `JWT_SECRET` | Secret key used to sign/verify JWT tokens. Must be kept private. Use `openssl rand -base64 32` to generate one. |
| `NEXT_PUBLIC_APP_URL` | Base URL of your app (used for metadata and production cookie settings). |

### 3. Seed the database (optional)

Start MongoDB, then run:

```bash
npm run seed
```

This creates:
- 6 sample laptop products
- Admin account: `admin@laptopstore.com` / `admin123`
- Demo account: `demo@laptopstore.com` / `demo123`

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── page.tsx              # Home (product grid + filters)
├── login/ signup/        # Authentication pages
├── cart/ checkout/       # Shopping flow
├── profile/              # User profile + orders
├── products/[id]/        # Product detail
├── admin/                # Admin dashboard
├── admin/orders/         # Order management
└── api/                  # Route handlers (auth, products, orders)

components/               # Reusable UI components
context/                  # Auth + Cart providers
lib/                      # DB, auth, utilities
models/                   # Mongoose schemas
middleware.ts             # Route protection
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run seed` | Seed database with sample data |

## Authentication

- JWT tokens are stored in **httpOnly cookies** (not localStorage)
- Middleware protects `/admin/*`, `/profile`, and `/checkout`
- Admin role is enforced in both middleware and API routes

## License

MIT
