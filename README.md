# 🍕 Next Pizza – Full-Stack Pizza Delivery Application

A comprehensive web application for pizza ordering and delivery, built with modern full-stack technologies to demonstrate expertise in building scalable, production-ready applications.

## 🎯 Key Features

- **Product Catalog** – Browse pizza menu with advanced filtering and search
- **Pizza Builder** – Interactive configurator to customize pizzas (sizes, crusts, ingredients)
- **Shopping Cart** – Smart cart management with persistent state
- **User Authentication** – Sign up, login, OAuth integration via NextAuth.js
- **Checkout System** – Multi-step checkout with address validation and Google Maps integration
- **Payment Integration** – WayForPay payment gateway integration
- **Email Notifications** – Order confirmation emails powered by Resend
- **User Profile** – Order history and account management
- **Admin Dashboard** – Optional management interface for products and orders
- **Admin CRUD example** – Start implementation for products with image upload (accessible under `/admin`)

## 🛠 Tech Stack

### Frontend

- **Next.js 15** – React metaframework with App Router, SSR, ISR
- **React 19** – Component-based architecture
- **TypeScript** – Full type safety
- **Tailwind CSS** – Utility-first CSS framework
- **React Hook Form + Zod** – Form management with validation
- **Zustand** – Lightweight state management (cart, filters)
- **Radix UI** – Accessible component primitives
- **Axios** – HTTP client for API requests
- **Lucide Icons** – Beautiful icon library

### Backend

- **Next.js API Routes & Server Actions** – Serverless backend functions
- **Prisma ORM** – Type-safe database layer
- **PostgreSQL** – Relational database
- **NextAuth.js** – Authentication & session management
- **Bcrypt** – Secure password hashing

### Third-party Integrations

- **WayForPay** – Payment processing
- **Resend** – Email service
- **Google Maps API** – Address/location services

### Development & Quality

- **ESLint** – Code linting and quality checks
- **TypeScript** – Compile-time type checking

## 📊 Architecture Overview

```
src/
├── app/
│   ├── (root)/              # Public pages
│   ├── (checkout)/          # Checkout flow
│   ├── (dashboard)/         # Admin panel
│   ├── api/                 # API endpoints
│   ├── actions.ts           # Server Actions
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── shared/              # Reusable components (header, cart, filters)
│   └── ui/                  # Radix UI based components
├── lib/
│   ├── auth-options.ts      # NextAuth configuration
│   ├── get-user-session.ts  # Session utilities
│   ├── send-email.ts        # Email templates & sending
│   └── [other utilities]    # Helpers & calculations
├── services/
│   ├── api-client.ts        # Axios configuration
│   ├── cart.ts              # Cart API service
│   ├── products.ts          # Products API service
│   └── [other services]     # External integrations
├── store/
│   ├── cart.ts              # Zustand cart store
│   ├── filters.ts           # Filter state management
│   └── category.ts          # Category state
└── hooks/
    ├── use-cart.ts          # Cart hooks
    ├── use-filter-ingredients.ts
    └── [custom hooks]       # Reusable logic

prisma/
├── schema.prisma            # Database schema
├── prisma-client.ts         # Prisma configuration
└── seed.ts                  # Database seeding
```

### ⚙️ Admin Panel & CRUD Setup

To try the new admin interface:

1. Run the database migrations and seed data:
   ```bash
   npx prisma migrate dev --name init
   npm run seed
   ```
   (The seed script already creates an admin user `admin@admin.com` / `admin`.)
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Login using the credentials above, then visit <https://localhost:3000/admin>.
   - View, create, edit and delete products.
   - Browse incoming orders under the **Orders** section.
   - Upload a single image per product; files are stored in `public/uploads`.

The UI lives under `src/app/(dashboard)/admin` and uses simple API routes in
`src/app/api/admin/*`. Orders can be viewed via `/admin/orders` and are backed
by `src/app/api/admin/orders/route.ts`. Feel free to extend with validation, 
categories, or switch to S3 signed URLs for uploads.

## 🏗 Architectural Highlights

### 1. **Server Actions for Backend Logic**

Leveraging Next.js Server Actions for server-side operations directly from components, eliminating the need for separate API routes for simple operations while maintaining security and type safety.

### 2. **Layered Architecture**

- **Presentation Layer** – React components (UI only)
- **Business Logic Layer** – Hooks, utilities, store
- **Data Access Layer** – Prisma ORM, API services
- **External Integration Layer** – Third-party services

### 3. **End-to-End Type Safety**

TypeScript + Zod validation ensures data consistency across the entire application:

- Frontend form validation with Zod schemas
- Server-side validation with the same schemas
- Type-safe database queries with Prisma
- Compile-time type checking throughout

### 4. **State Management Strategy**

- **Global State** – Zustand for cart and filters (lightweight, performant)
- **Server State** – Prisma & database for persistence
- **Form State** – React Hook Form (local component state)
- **Auth State** – NextAuth.js sessions

### 5. **Performance Optimization**

- ISR (Incremental Static Regeneration) for product pages
- Image optimization via Next.js Image component
- Strategic caching at multiple levels
- Code splitting and lazy loading
### Cron & Deployment Notes

- An example cron route (`/api/cron/seed`) is added to run daily seeds on Vercel.
  Configure `CRON_SECRET` and `vercel.json` as shown in repo.
## 📝 Core Functionality Examples

### Shopping Cart Management

```typescript
// shared/store/cart.ts
- Add/remove/update items
- Calculate totals and taxes
- Persist cart state across sessions
- Support for multiple product variants
```

### Order Creation Flow

```typescript
// src/app/actions.ts
1. Validate checkout form with Zod
2. Retrieve user's cart from database
3. Create order record with order items
4. Integrate with payment gateway (WayForPay)
5. Send confirmation email via Resend
6. Return payment URL to client
```

### Authentication & Authorization

- JWT-based sessions with NextAuth.js
- Password hashing with bcrypt
- Email verification on signup
- OAuth provider integration
- Role-based access control (USER, ADMIN)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Live Demo

Online: [next-pizza-lemon-chi.vercel.app](https://next-pizza-lemon-chi.vercel.app/)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd next-pizza

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
# DATABASE_URL, WAYFORPAY credentials, OAuth secrets, etc.

# Initialize database
npm run prisma:push
npm run prisma:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run prisma:push      # Sync schema with database
npm run prisma:studio    # Open Prisma Studio GUI
npm run prisma:seed      # Seed database with initial data
```

## 📚 Database Schema Highlights

- **User** – Authentication, profile, orders
- **Product** – Menu items with variants
- **ProductVariant** – Size/type variations with pricing
- **Cart & CartItem** – Shopping cart management
- **Order & OrderItem** – Order history and details
- **Ingredient** – Customizable pizza ingredients
- **Category** – Product categorization
- **VerificationCode** – Email verification tokens

## 🔐 Security Considerations

- ✅ Server Actions for secure backend operations
- ✅ Password hashing with bcrypt
- ✅ CSRF protection via NextAuth.js
- ✅ SQL injection prevention via Prisma ORM
- ✅ Environment variable protection
- ✅ Type-safe validation with Zod
- ✅ Secure session management

## 📈 What This Project Demonstrates

| Area                       | Key Skills                                                          |
| -------------------------- | ------------------------------------------------------------------- |
| **Frontend Development**   | Modern React patterns, component architecture, state management     |
| **Backend Development**    | API design, database modeling, authentication, email services       |
| **Full-Stack Integration** | Payment gateways, third-party APIs, webhooks                        |
| **Code Quality**           | TypeScript, linting, consistent code style, error handling          |
| **Database Design**        | Normalized schema, Prisma ORM, migrations                           |
| **Security**               | Password hashing, session management, input validation              |
| **Performance**            | Caching strategies, optimization techniques                         |
| **DevOps**                 | Environment configuration, database seeding, production-ready setup |

## 🎓 Learning Outcomes

This project showcases:

- ✅ Deep understanding of modern full-stack JavaScript/TypeScript development
- ✅ Ability to build scalable, maintainable applications
- ✅ Experience with popular ecosystem tools (Next.js, Prisma, NextAuth.js)
- ✅ Production-ready code with proper error handling and validation
- ✅ Understanding of database design and ORM patterns
- ✅ Integration with external services and payment systems
- ✅ Attention to security, performance, and user experience

## 📦 Deployment

The application is designed to be deployed on Vercel

## 📝 License

This project is created for portfolio/demonstration purposes.
