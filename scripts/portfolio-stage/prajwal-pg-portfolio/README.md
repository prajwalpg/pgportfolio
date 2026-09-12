# Portfolio — Prajwal PG (AI/ML Engineer)

A modern, dark-themed, glassmorphism portfolio for an AI/ML Engineer, built with **Next.js 16 + TypeScript + Tailwind CSS + Framer Motion**.

## ✨ Features

- Dark, modern AI/tech aesthetic with animated gradient backgrounds & particle canvas
- Glassmorphism cards with glow-on-hover borders
- Sticky navbar with scroll-spy active link highlighting + mobile menu
- Scroll progress bar (Framer Motion `useScroll`)
- Sections: Hero · About · Skills · Featured Projects · Experience · Certifications · Resume · Contact
- Working contact form (front-end ready — wire to your favourite backend)
- Fully responsive (mobile-first)
- Editable content — all data lives in `src/lib/portfolio-data.ts`

## 🧱 Tech Stack

- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS 4
- Framer Motion
- shadcn/ui components + Lucide icons

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install        # or: pnpm install / yarn / bun install

# 2. Run the dev server
npm run dev        # or: bun run dev / pnpm dev

# 3. Open http://localhost:3000
```

## 🏗️ Build for Production

```bash
npm run build
npm run start
```

## ☁️ Deploy to Vercel

1. Push this project to a new GitHub repository.
2. Visit [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — no extra config needed.
4. Click **Deploy**.

## 📝 Customization

All editable content lives in **`src/lib/portfolio-data.ts`**:

- `profile` — your name, role, tagline, intro, about text, socials, resume URL
- `skillGroups` — your skill categories & technologies
- `projects` — featured project cards (title, description, highlights, stack, links)
- `experiences` — work history with bullet points
- `certifications` — your certifications & credentials

**Resume:** Replace `public/resume.pdf` with your own PDF — both **View Resume** and **Download** buttons will automatically use it.

**Contact form:** The form currently simulates submission. To make it live, wire the `onSubmit` handler in `src/components/portfolio/Contact.tsx` to your preferred service (Formspree, Resend, your own API route, etc.).

**Colors / theme:** Tweak the design tokens in `src/app/globals.css` (the `:root` block at the top).

## 📁 Project Structure

```
.
├── public/
│   └── resume.pdf              # Replace with your own PDF
├── src/
│   ├── app/
│   │   ├── globals.css         # Dark AI/tech theme + glassmorphism utilities
│   │   ├── layout.tsx          # Root layout + metadata
│   │   └── page.tsx            # Section composition
│   ├── components/
│   │   ├── portfolio/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Certifications.tsx
│   │   │   ├── Resume.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   └── SectionHeading.tsx
│   │   └── ui/                 # shadcn/ui components
│   └── lib/
│       ├── portfolio-data.ts   # ← edit this to update content
│       └── utils.ts
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
└── README.md
```

## 📄 License

MIT — free to use, modify, and ship.

---

Built with care. Good luck with the job hunt. 🚀
