<p align="center">
  <img src="src/assets/fusionify-logo.png" alt="Fusionify Digital Solutions" width="180" />
</p>

<h1 align="center">Fusionify Digital Solutions</h1>

<p align="center">
  <em>🚀 Premium Digital Transformation Partner — Automation-First Approach</em>
</p>

<p align="center">
  <a href="https://solutionsfusionifydigitalstore.lovable.app">🌐 Live Website</a> &nbsp;·&nbsp;
  <a href="#-architecture">📐 Architecture</a> &nbsp;·&nbsp;
  <a href="#-features">✨ Features</a> &nbsp;·&nbsp;
  <a href="#-tech-stack">🛠 Tech Stack</a> &nbsp;·&nbsp;
  <a href="#-getting-started">🏁 Getting Started</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-BaaS-3FCF8E?style=flat-square&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12.x-FF0055?style=flat-square&logo=framer&logoColor=white" />
</p>

---

## 📖 About

**Fusionify Digital Solutions** is the digital transformation arm of **PT Fusionify Digital Store**, serving SMEs, startups, enterprises, and individuals across Indonesia. We deliver end-to-end solutions with an **automation-first** philosophy and **scalable systems**.

Our ecosystem connects: **Automation → Store → Payment Gateway → Cloud**, enabling clients to achieve operational efficiency through smart automation, enterprise-grade security, and seamless cross-product integration.

> 🌍 **Live at**: [solutionsfusionifydigitalstore.lovable.app](https://solutionsfusionifydigitalstore.lovable.app)

---

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT  BROWSER                        │
│                                                             │
│   React 18  ·  Framer Motion  ·  TanStack Query  ·  RRD 6  │
│                        │                                    │
│              Supabase Client SDK                            │
└────────────────────────┼────────────────────────────────────┘
                         │  HTTPS / WSS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   SUPABASE  BACKEND                         │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │  PostgreSQL  │  │    Edge Fn   │  │  Storage Buckets │   │
│  │  + RLS       │  │  (Deno)      │  │  logos, projects │   │
│  └──────┬───────┘  └──────┬───────┘  └─────────────────┘   │
│         │                 │                                 │
│         │          ┌──────┴───────┐   ┌────────────────┐    │
│         │          │  Resend API  │   │  Auth + Roles  │    │
│         │          │  (Email)     │   │  admin/mod/usr │    │
│         │          └──────────────┘   └────────────────┘    │
│         │                                                   │
│         ▼  Realtime (WebSocket)                             │
│   Admin Dashboard  🔔                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🎨 Frontend

| | Feature | Details |
|---|---------|---------|
| 🌗 | **Dark / Light Mode** | Persistent theme preference |
| 🌐 | **Bilingual (ID / EN)** | Context-aware translations |
| 🎭 | **Cinematic Animations** | Scroll-triggered parallax via Framer Motion |
| 📱 | **Fully Responsive** | Mobile-first, 6+ breakpoints |
| 🌊 | **Splash Screen** | Branded loading experience |
| 🤖 | **AI Chatbot** | Gemini-powered assistant |

### 🏗 Content Sections

| | Section | |
|---|---------|---|
| 🦸 | **Hero** | Animated headline, CTA, gradient effects |
| 😩 | **Pain Point** | Problem identification for target audience |
| 💼 | **Services** | 5 categories with dedicated sub-pages |
| 🏆 | **Why Choose Us** | Competitive differentiators |
| 🔗 | **Unified Ecosystem** | Cross-product integration |
| 📦 | **Product Suite** | Full lineup presentation |
| 📊 | **Results** | Impact metrics & outcomes |
| ⭐ | **Testimonials** | Dynamic reviews from DB |
| 🖼 | **Portfolio** | Filterable projects + detail pages |
| ❓ | **FAQ** | Accordion + JSON-LD schema |
| 🤝 | **Client & Partner Logos** | Auto-scrolling carousels |
| 📬 | **Contact** | Consultation form + email notification |
| 🔮 | **Future Vision** | Roadmap & innovation preview |

### 🔧 Admin Dashboard

| | Feature | Details |
|---|---------|---------|
| 🔐 | **Protected Routes** | Role-based (admin / moderator / user) |
| 📝 | **Projects CRUD** | Image upload, toggle featured/active |
| ⭐ | **Testimonials CRUD** | Drag-and-drop ordering |
| ❓ | **FAQ Management** | Sortable, toggle active |
| 🖼 | **Logo Management** | Client & partner admin |
| 📩 | **Consultation Inbox** | Status workflow + real-time notifications |
| 🔔 | **Live Alerts** | Sound + toast on new submissions |

### 📧 Email System

| | | |
|---|---|---|
| 📤 | **Admin Notification** | Instant alert on new consultation |
| 📥 | **Client Auto-Reply** | Branded confirmation with request summary |
| 🎨 | **HTML Templates** | Professional styled emails |

### 🔍 SEO & Structured Data

| | | |
|---|---|---|
| 📋 | **LocalBusiness** | JSON-LD with geo, hours, services, ratings |
| ❓ | **FAQPage** | Dynamic structured data for rich snippets |
| 🗺 | **Sitemap & Robots** | Search engine crawling ready |
| 🏷 | **Open Graph** | OG & Twitter Card meta tags |

---

## 🔄 Message Flow

### Consultation Request Lifecycle

```
 Client (Browser)              Edge Function              Resend API
       │                            │                         │
       │  1 ─ Submit Form ─────────▶│                         │
       │                            │  2 ─ Validate           │
       │                            │  3 ─ Save to DB         │
       │                            │  4 ─ Admin Email ──────▶│
       │                            │  5 ─ Auto-Reply ───────▶│──▶ Client Inbox
       │  6 ◀── Success Response ───│                         │
       │                            │  7 ─ Realtime ──▶ 🔔 Admin Dashboard
```

### Admin Status Workflow

```
  ┌─────────┐     ┌───────────┐     ┌─────────────┐     ┌─────────┐
  │   New   │────▶│ Contacted │────▶│ In Progress │────▶│  Done   │
  └────┬────┘     └───────────┘     └─────────────┘     └─────────┘
       │                                                     │
       └──────────────── Cancelled ◀─────────────────────────┘
```

---

## 🗄 Database Schema

```
 consultation_requests          projects                  testimonials
 ─────────────────────         ─────────────────          ─────────────────
 id           uuid  PK        id           uuid  PK      id           uuid  PK
 name         text             title        text          name         text
 email        text             slug         text  UQ      role         text
 company      text?            description  text          company      text
 service      text             service_cat  text          quote        text
 budget       text?            technologies text[]        avatar_init  text
 message      text             thumbnail    text?         image_url    text?
 status       text             images       text[]        display_order int
 created_at   tstz             is_featured  bool          is_active    bool
 updated_at   tstz             is_active    bool
                               display_order int

 faqs                          client_logos               user_roles
 ─────────────────             ─────────────────          ─────────────────
 id           uuid  PK        id           uuid  PK      id           uuid  PK
 question     text             name         text          user_id      uuid  FK
 answer       text             logo_url     text          role         enum
 display_order int             website_url  text?         created_at   tstz
 is_active    bool             is_partner   bool
 created_at   tstz             is_active    bool
 updated_at   tstz             display_order int
```

### 🔒 Row-Level Security

| Table | Public | Authenticated Admin |
|-------|--------|---------------------|
| `projects` | `SELECT` active | Full CRUD |
| `testimonials` | `SELECT` active | Full CRUD |
| `faqs` | `SELECT` active | Full CRUD |
| `client_logos` | `SELECT` active | Full CRUD |
| `consultation_requests` | `INSERT` only | Read / Update / Delete |
| `user_roles` | Read own | Full management |

---

## 🛠 Tech Stack

### Frontend

| Package | Role |
|---------|------|
| React 18.3 | UI framework |
| TypeScript 5 | Type safety |
| Vite 5 | Build & dev server |
| Tailwind CSS | Utility-first styling |
| Framer Motion 12 | Animations |
| React Router 6 | Client-side routing |
| TanStack Query 5 | Server-state caching |
| shadcn/ui | Component library |
| Lucide React | Icon system |
| Sonner | Toast notifications |

### Backend

| Service | Role |
|---------|------|
| Supabase | BaaS platform |
| PostgreSQL | Database + RLS |
| Edge Functions (Deno) | Serverless logic |
| Supabase Auth | Authentication |
| Supabase Storage | File uploads |
| Supabase Realtime | Live subscriptions |

### Integrations

| Service | Role |
|---------|------|
| Resend | Transactional email |
| Google Maps | Business location |
| WhatsApp | Client communication |

---

## 📊 Milestones

<table>
  <tr>
    <td align="center"><strong>50+</strong><br/><sub>Clients Served</sub></td>
    <td align="center"><strong>4.9 / 5.0</strong><br/><sub>Avg. Rating</sub></td>
    <td align="center"><strong>5</strong><br/><sub>Service Lines</sub></td>
    <td align="center"><strong>6+</strong><br/><sub>Breakpoints</sub></td>
  </tr>
  <tr>
    <td align="center"><strong>2</strong><br/><sub>Themes</sub></td>
    <td align="center"><strong>2</strong><br/><sub>Languages</sub></td>
    <td align="center"><strong>RLS</strong><br/><sub>All Tables</sub></td>
    <td align="center"><strong>2</strong><br/><sub>Auto Emails</sub></td>
  </tr>
</table>

---

## 🎨 Service Categories

| # | Service | Description |
|---|---------|-------------|
| 1 | 🌐 **Web Development** | Modern, responsive websites & web apps |
| 2 | 🤖 **Automation & Bots** | Workflow automation & chatbot solutions |
| 3 | 🖥 **Digital Systems** | Custom digital infrastructure |
| 4 | ☁️ **Cloud Support** | Migration, optimization & managed services |
| 5 | 📋 **Project Services** | End-to-end project management |

---

## 📁 Project Structure

```
fusionify-digital-solutions/
├── public/                      # Static assets
│   ├── favicon.png
│   ├── og-image.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sounds/
├── src/
│   ├── assets/                  # Imported assets
│   ├── components/
│   │   ├── admin/               # Admin dashboard
│   │   ├── auth/                # Auth guards
│   │   ├── layout/              # Navbar, Footer, Chatbot
│   │   ├── portfolio/           # Portfolio cards
│   │   ├── sections/            # Landing sections (15+)
│   │   └── ui/                  # shadcn/ui + custom
│   ├── contexts/                # Auth, Language
│   ├── hooks/                   # Custom hooks
│   ├── integrations/supabase/   # Auto-generated types
│   ├── lib/                     # Utilities
│   ├── pages/
│   │   ├── admin/               # 5 admin modules
│   │   ├── services/            # 5 service pages
│   │   ├── Index.tsx            # Landing page
│   │   ├── Portfolio.tsx        # Portfolio listing
│   │   └── ProjectDetail.tsx    # Project detail
│   ├── App.tsx                  # Root + routing
│   └── main.tsx                 # Entry point
├── supabase/
│   └── functions/               # Edge Functions
│       ├── chat/
│       └── send-consultation-email/
├── tailwind.config.ts
└── vite.config.ts
```

---

## 🏁 Getting Started

```bash
# Clone
git clone https://github.com/your-username/fusionify-digital-solutions.git
cd fusionify-digital-solutions

# Install
npm install

# Environment
cp .env.example .env
# Fill VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY

# Dev
npm run dev

# Build
npm run build
```

---

## 🔐 Security

- **RLS** enforced on all database tables
- **Role-based access** — `admin` · `moderator` · `user`
- **JWT verification** on protected Edge Functions
- **Input validation** on client and server
- **CORS** properly configured
- **Service Role Key** server-side only

---

## 📜 License

Proprietary software owned by **PT Fusionify Digital Store**.  
All rights reserved. Unauthorized reproduction or distribution is prohibited.

---

<p align="center">
  <strong>Built with ❤️ by Fusionify Digital Solutions</strong><br/>
  <sub>Transforming businesses through automation-first digital solutions</sub>
</p>

<p align="center">
  <a href="https://solutionsfusionifydigitalstore.lovable.app">Website</a> &nbsp;·&nbsp;
  <a href="https://maps.app.goo.gl/fapbqT7gC3PYYpJz8">Location</a> &nbsp;·&nbsp;
  <a href="mailto:fusionifydigital@gmail.com">Email</a>
</p>
