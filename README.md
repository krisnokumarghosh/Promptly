<div align="center">

# 🟢 Promptly

### The Neural Marketplace for AI Prompts

A full-stack prompt sharing & marketplace platform where users discover, creators build, and the community grows — powered by Next.js and a sleek dark + lime-green design system.

[![Live Demo](https://img.shields.io/badge/Live-Demo-AAFF00?style=for-the-badge&logo=vercel&logoColor=black)](https://promptly-ten-xi.vercel.app/)
[![Server Repo](https://img.shields.io/badge/Server-Repo-1a1a1a?style=for-the-badge&logo=github)](https://github.com/krisnokumarghosh/promptly-server)

</div>

---

## 📖 About

**Promptly** is a prompt-sharing and marketplace platform built for the AI era. Users can discover high-performance prompts for tools like ChatGPT, Claude, Midjourney, and more — copy them instantly, bookmark favorites, and leave reviews. Creators can publish and manage their own prompts with full analytics, while admins oversee the entire platform through a dedicated control panel.

🔗 **Live Site:** [promptly-ten-xi.vercel.app](https://promptly-ten-xi.vercel.app/)
🔗 **Backend Repo:** [github.com/krisnokumarghosh/promptly-server](https://github.com/krisnokumarghosh/promptly-server)

---

## ✨ Features

### 👤 User
- Browse and explore free public prompts
- Copy prompts directly to clipboard
- Bookmark prompts for later
- Create up to **3 prompts for free**
- Submit reviews & ratings, and report problematic prompts
- Personal dashboard to manage saved prompts, reviews, and reports
- **Upgrade to Pro** — unlimited prompt creation + full access to premium/private prompts

### 🛠️ Creator
- Create, update, and delete prompts
- Manage all owned prompts from a dedicated dashboard
- View personal analytics — total prompts, copies, growth trends, and performance charts
- Track prompt status (pending / approved / rejected)

### 🛡️ Admin
- Platform-wide analytics dashboard (users, prompts, reviews, copies, revenue)
- Manage all users — change roles (user / creator / admin), delete accounts
- Review and moderate all pending prompts — approve, delete, or mark as **Featured**
- Handle reported prompts — remove prompt, warn creator, or dismiss report
- View all payment transactions and subscription history

---

## 🧱 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js (App Router) |
| **Language** | JavaScript |
| **Styling** | Tailwind CSS |
| **UI Library** | HeroUI |
| **Authentication** | Better Auth (MongoDB Adapter) |
| **Database** | MongoDB |
| **Payments** | Stripe |
| **Charts** | Recharts |
| **Animation** | Framer Motion |
| **Icons** | Gravity UI Icons, React Icons |
| **Misc** | React Type Animation, React Fast Marquee, React Hot Toast |

---

## 📦 Key Packages

```bash
framer-motion
recharts
react-type-animation
react-icons
@gravity-ui/icons
react-hot-toast
react-fast-marquee
better-auth
```

---

## 🎨 Design System

Promptly uses a distinctive dark theme built around a neural/terminal aesthetic:

- **Background:** `#080d08`
- **Accent:** `#AAFF00` (lime green)
- **Typography:** JetBrains Mono for technical/terminal elements, clean sans-serif for headings
- Terminal-style UI cards, animated typewriter effects, and scroll-triggered Framer Motion animations throughout

---

## 🔐 Authentication & Roles

Promptly uses **Better Auth** with a MongoDB adapter for secure session-based authentication, supporting three role types:

- `user` — default role with limited free access
- `creator` — can publish and manage prompts
- `admin` — full platform control

Role-based dashboards and protected routes ensure each user type only accesses what's relevant to them.

---

## 💳 Payments

Subscription upgrades (Free → Pro) are handled via **Stripe Checkout**, unlocking:
- Unlimited prompt creation
- Full access to private/premium prompts
- Review & rating privileges

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance
- Stripe account (for payments)

### Installation

```bash
git clone https://github.com/krisnokumarghosh/promptly.git
cd promptly
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
NEXT_PUBLIC_API_URL=your_backend_api_url
```

### Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🔗 Related Repository

This is the **frontend** repository. The backend (Express + MongoDB) lives here:

➡️ [promptly-server](https://github.com/krisnokumarghosh/promptly-server)

---

## 📸 Preview

> Visit the live application to explore the full experience:
> **[promptly-ten-xi.vercel.app](https://promptly-ten-xi.vercel.app/)**

---

<div align="center">

Built with 🟢 by **Krisno Ghosh**

</div>