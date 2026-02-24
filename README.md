<p align="center">
  <img src="src/assets/fusionify-logo.png" alt="Fusionify Digital Solutions" width="200" />
</p>

<h1 align="center">Fusionify Digital Solutions</h1>

<p align="center">
  <strong>🚀 Premium Digital Transformation Partner with Automation-First Approach</strong>
</p>

<p align="center">
  <a href="https://solutionsfusionifydigitalstore.lovable.app">🌐 Live Website</a> •
  <a href="#-architecture-overview">📐 Architecture</a> •
  <a href="#-key-features">✨ Features</a> •
  <a href="#-tech-stack">🛠 Tech Stack</a> •
  <a href="#-getting-started">🏁 Getting Started</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.x-FF0055?style=for-the-badge&logo=framer&logoColor=white" />
</p>

---

## 📖 About

**Fusionify Digital Solutions** is the digital transformation arm of **PT Fusionify Digital Store**, serving SMEs, startups, enterprises, and individuals across Indonesia. Positioned as a modern tech startup — not a conventional IT service — we deliver end-to-end solutions with an **automation-first** philosophy and **scalable systems**.

Our ecosystem connects: **Automation → Store → Payment Gateway → Cloud**, enabling clients to achieve operational efficiency through smart automation, enterprise-grade security, and seamless cross-product integration.

> 🌍 **Live at**: [solutionsfusionifydigitalstore.lovable.app](https://solutionsfusionifydigitalstore.lovable.app)

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │  React   │  │ Framer   │  │  Tanstack │  │  React Router │  │
│  │   18.3   │  │  Motion  │  │   Query   │  │     v6        │  │
│  └────┬─────┘  └──────────┘  └─────┬─────┘  └───────────────┘  │
│       │                            │                            │
│       ▼                            ▼                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Supabase Client SDK (@supabase/js)          │   │
│  └───────────────────────┬─────────────────────────────────┘   │
└──────────────────────────┼──────────────────────────────────────┘
                           │ HTTPS
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                     SUPABASE BACKEND (Cloud)                     │
│                                                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────────────┐  │
│  │   PostgreSQL   │  │ Edge Functions  │  │  Storage Buckets  │  │
│  │   Database     │  │  (Deno)        │  │  (logos, projects, │  │
│  │                │  │                │  │   testimonials)   │  │
│  │  • projects    │  │  • send-email  │  └───────────────────┘  │
│  │  • faqs        │  │  • ai-chat     │                         │
│  │  • testimonials│  │                │  ┌───────────────────┐  │
│  │  • consult_req │  └───────┬────────┘  │   Auth + RLS      │  │
│  │  • client_logos│          │           │   Row Level Sec.   │  │
│  │  • user_roles  │          ▼           └───────────────────┘  │
│  └────────────────┘  ┌────────────────┐                         │
│                      │  Resend API    │                         │
│                      │  (Email)       │                         │
│                      └────────────────┘                         │
└──────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Features

### 🎨 Frontend Experience

| Feature | Description |
|---------|-------------|
| 🌗 **Dark/Light Mode** | Seamless theme switching with persistent preference |
| 🌐 **Bilingual (ID/EN)** | Full Indonesian & English support with context-aware translations |
| 🎭 **Cinematic Animations** | Framer Motion powered scroll-triggered animations, parallax effects |
| 📱 **Fully Responsive** | Mobile-first design with adaptive layouts across all breakpoints |
| 🌊 **Splash Screen** | Branded loading experience on initial visit |
| 🔝 **Scroll to Top** | Smooth scroll-to-top navigation |
| 🤖 **AI Chatbot** | Integrated AI-powered assistant for visitor questions |

### 🏗 Content Sections

| Section | Description |
|---------|-------------|
| 🦸 **Hero** | Animated headline with CTA and gradient effects |
| 😩 **Pain Point** | Problem identification that resonates with target audience |
| 💼 **Services** | 5 core service categories with detailed sub-pages |
| 🏆 **Why Choose Us** | Competitive differentiators with visual storytelling |
| 🔗 **Unified Ecosystem** | Cross-product integration showcase |
| 📦 **Product Suite** | Full product lineup presentation |
| 📊 **Results** | Impact metrics and client outcomes |
| ⭐ **Testimonials** | Dynamic client reviews from database |
| 🖼 **Portfolio** | Filterable project showcase with detail pages |
| ❓ **FAQ** | Accordion-style with dynamic content + JSON-LD schema |
| 🤝 **Client & Partner Logos** | Auto-scrolling logo carousels |
| 📬 **Contact** | Multi-field consultation form with email notifications |
| 🔮 **Future Vision** | Company roadmap and innovation preview |

### 🔧 Admin Dashboard

| Feature | Description |
|---------|-------------|
| 🔐 **Protected Routes** | Role-based access control (admin/moderator/user) |
| 📝 **Projects CRUD** | Full project management with image uploads |
| ⭐ **Testimonials CRUD** | Manage client testimonials with drag-and-drop ordering |
| ❓ **FAQ Management** | Add, edit, reorder FAQs with sortable interface |
| 🖼 **Logo Management** | Client & partner logo administration |
| 📩 **Consultation Inbox** | Real-time notification system with status workflow |
| 🔔 **Live Notifications** | Sound alerts + toast notifications for new submissions |

### 📧 Email System

| Feature | Description |
|---------|-------------|
| 📤 **Admin Notification** | Instant email to admin on new consultation requests |
| 📥 **Client Auto-Reply** | Branded confirmation email with request summary |
| 🎨 **HTML Templates** | Professional styled email templates |

### 🔍 SEO & Structured Data

| Feature | Description |
|---------|-------------|
| 📋 **LocalBusiness Schema** | JSON-LD with address, geo, hours, services, ratings |
| ❓ **FAQ Schema** | Dynamic FAQPage structured data for rich snippets |
| 🗺 **Sitemap & Robots** | Auto-generated for search engine crawling |
| 🏷 **Meta Tags** | Open Graph & Twitter Card meta for social sharing |

---

## 🔄 Message Flow

### Consultation Request Flow

```
  ┌──────────┐         ┌──────────────┐        ┌─────────────┐
  │  Client  │         │  Edge Func.  │        │   Resend    │
  │ (Browser)│         │ send-consult │        │   API       │
  └────┬─────┘         └──────┬───────┘        └──────┬──────┘
       │                      │                       │
       │  1. Submit Form      │                       │
       │─────────────────────▶│                       │
       │                      │                       │
       │                      │  2. Validate Input    │
       │                      │──────┐                │
       │                      │◀─────┘                │
       │                      │                       │
       │                      │  3. Save to DB        │
       │                      │──────┐                │
       │                      │◀─────┘                │
       │                      │                       │
       │                      │  4. Send Admin Email  │
       │                      │──────────────────────▶│
       │                      │                       │
       │                      │  5. Send Auto-Reply   │
       │                      │──────────────────────▶│──▶ Client Inbox
       │                      │                       │
       │  6. Success Response │                       │
       │◀─────────────────────│                       │
       │                      │                       │
       │                      │  7. Realtime Event    │
       │                      │──────┐                │
       │                      │      ▼                │
       │                      │  Admin Dashboard      │
       │                      │  🔔 Notification      │
```

### Admin Consultation Workflow

```
  New Request ──▶ Dihubungi ──▶ Dalam Proses ──▶ Selesai
       │                                           │
       └──────────────── Dibatalkan ◀──────────────┘
```

---

## 🗄 Database Schema

```
┌──────────────────────┐     ┌──────────────────────┐
│   consultation_      │     │      projects         │
│   requests           │     ├──────────────────────┤
├──────────────────────┤     │ id            (uuid) │
│ id          (uuid)   │     │ title         (text) │
│ name        (text)   │     │ slug          (text) │
│ email       (text)   │     │ description   (text) │
│ company     (text?)  │     │ service_cat.  (text) │
│ service     (text)   │     │ technologies  (arr)  │
│ budget      (text?)  │     │ thumbnail_url (text?)│
│ message     (text)   │     │ images        (arr)  │
│ status      (text)   │     │ is_featured   (bool) │
│ created_at  (tstz)   │     │ is_active     (bool) │
│ updated_at  (tstz)   │     │ display_order (int)  │
└──────────────────────┘     └──────────────────────┘

┌──────────────────────┐     ┌──────────────────────┐
│    testimonials      │     │        faqs           │
├──────────────────────┤     ├──────────────────────┤
│ id          (uuid)   │     │ id          (uuid)   │
│ name        (text)   │     │ question    (text)   │
│ role        (text)   │     │ answer      (text)   │
│ company     (text)   │     │ display_order (int)  │
│ quote       (text)   │     │ is_active   (bool)   │
│ avatar_init (text)   │     │ created_at  (tstz)   │
│ image_url   (text?)  │     │ updated_at  (tstz)   │
│ display_order (int)  │     └──────────────────────┘
│ is_active   (bool)   │
└──────────────────────┘     ┌──────────────────────┐
                             │    client_logos       │
┌──────────────────────┐     ├──────────────────────┤
│     user_roles       │     │ id          (uuid)   │
├──────────────────────┤     │ name        (text)   │
│ id          (uuid)   │     │ logo_url    (text)   │
│ user_id     (uuid)   │     │ website_url (text?)  │
│ role        (enum)   │     │ is_partner  (bool)   │
│ created_at  (tstz)   │     │ is_active   (bool)   │
└──────────────────────┘     │ display_order (int)  │
                             └──────────────────────┘
```

### Row-Level Security (RLS)

All tables are protected with RLS policies:

| Table | Public Access | Admin Access |
|-------|--------------|--------------|
| `projects` | Read active only | Full CRUD |
| `testimonials` | Read active only | Full CRUD |
| `faqs` | Read active only | Full CRUD |
| `client_logos` | Read active only | Full CRUD |
| `consultation_requests` | Insert only | Read, Update, Delete |
| `user_roles` | Read own roles | Full management |

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| **React 18.3** | UI framework with concurrent features |
| **TypeScript 5** | Type-safe development |
| **Vite 5** | Lightning-fast build tool & dev server |
| **Tailwind CSS** | Utility-first styling with design tokens |
| **Framer Motion 12** | Production-grade animations |
| **React Router 6** | Client-side routing with lazy loading |
| **TanStack Query 5** | Server state management & caching |
| **shadcn/ui** | Accessible, customizable component library |
| **Lucide React** | Beautiful icon system |
| **Sonner** | Toast notification system |

### Backend

| Technology | Purpose |
|-----------|---------|
| **Supabase** | Backend-as-a-Service (BaaS) |
| **PostgreSQL** | Relational database with RLS |
| **Edge Functions (Deno)** | Serverless backend logic |
| **Supabase Auth** | Authentication with role-based access |
| **Supabase Storage** | File storage for images & assets |
| **Supabase Realtime** | Live data subscriptions |

### Integrations

| Service | Purpose |
|---------|---------|
| **Resend** | Transactional email delivery |
| **Google Maps** | Business location & directions |
| **WhatsApp** | Direct client communication channel |

---

## 📊 Achievements & Milestones

| Metric | Value |
|--------|-------|
| 🏢 Clients Served | **50+** satisfied clients |
| ⭐ Client Rating | **4.9 / 5.0** average satisfaction |
| 🌐 Services Offered | **5** core digital service categories |
| 📱 Responsive Breakpoints | **6+** device sizes supported |
| 🌗 Theme Support | **2** (Dark + Light mode) |
| 🌐 Languages | **2** (Indonesian + English) |
| 🔒 Security | **RLS** on all tables + role-based admin |
| 📧 Email Automation | **2** automated emails per consultation |
| 🔍 SEO Schemas | **2** (LocalBusiness + FAQPage) |
| ⚡ Build Tool | **Vite** with sub-second HMR |

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** or **bun** package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/fusionify-digital-solutions.git

# Navigate to project directory
cd fusionify-digital-solutions

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
fusionify-digital-solutions/
├── public/                     # Static assets
│   ├── favicon.png
│   ├── og-image.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sounds/
├── src/
│   ├── assets/                 # Imported assets
│   ├── components/
│   │   ├── admin/              # Admin dashboard components
│   │   ├── auth/               # Auth guards
│   │   ├── layout/             # Navbar, Footer, Chatbot, etc.
│   │   ├── portfolio/          # Portfolio components
│   │   ├── sections/           # Landing page sections (15+)
│   │   └── ui/                 # shadcn/ui + custom components
│   ├── contexts/               # React contexts (Auth, Language)
│   ├── hooks/                  # Custom hooks
│   ├── integrations/supabase/  # Auto-generated Supabase types
│   ├── lib/                    # Utility functions
│   ├── pages/
│   │   ├── admin/              # Admin pages (5 modules)
│   │   ├── services/           # Service detail pages (5)
│   │   ├── Index.tsx           # Main landing page
│   │   ├── Portfolio.tsx       # Portfolio listing
│   │   └── ProjectDetail.tsx   # Individual project view
│   ├── App.tsx                 # Root component & routing
│   └── main.tsx                # Entry point
├── supabase/
│   ├── functions/              # Edge Functions
│   │   ├── chat/               # AI chatbot function
│   │   └── send-consultation-email/
│   └── config.toml             # Supabase configuration
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

---

## 🎨 Service Categories

| # | Service | Description |
|---|---------|-------------|
| 1 | 🌐 **Web Development** | Modern, responsive websites & web applications |
| 2 | 🤖 **Automation & Bots** | Smart workflow automation & chatbot solutions |
| 3 | 🖥 **Digital Systems** | Custom digital infrastructure & management systems |
| 4 | ☁️ **Cloud Support** | Cloud migration, optimization & managed services |
| 5 | 📋 **Project Services** | End-to-end project management & consultation |

---

## 🔐 Security

- **Row-Level Security (RLS)** enforced on all database tables
- **Role-based access control** with `admin`, `moderator`, `user` roles
- **JWT verification** for protected Edge Functions
- **Input validation** on both client and server side
- **CORS headers** properly configured on all Edge Functions
- **Service Role Key** used only in server-side (Edge Functions)

---

## 📜 License

This project is proprietary software owned by **PT Fusionify Digital Store**.
All rights reserved. Unauthorized reproduction or distribution is prohibited.

---

<p align="center">
  <strong>Built with ❤️ by Fusionify Digital Solutions</strong><br/>
  <sub>Transforming businesses through automation-first digital solutions</sub>
</p>

<p align="center">
  <a href="https://solutionsfusionifydigitalstore.lovable.app">Website</a> •
  <a href="https://maps.app.goo.gl/fapbqT7gC3PYYpJz8">Location</a> •
  <a href="mailto:fusionifydigital@gmail.com">Email</a>
</p>
