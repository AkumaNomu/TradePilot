# TradePilot Next.js Landing Page

A converted Next.js App Router project based on the provided TradePilot static HTML landing page.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- lucide-react icons

## Project structure

```txt
app/
  globals.css
  layout.tsx
  page.tsx
components/
  Button.tsx
  Footer.tsx
  HeroSection.tsx
  HeroVisual.tsx
  HowItWorksSection.tsx
  IntelligenceSection.tsx
  Navbar.tsx
  PlatformSection.tsx
  SectionHeading.tsx
  SolutionsSection.tsx
data/
  site.ts
lib/
  utils.ts
```

## Run locally

```bash
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

## Notes

The landing page keeps the original dark, futuristic, corporate revenue-intelligence direction while making the code modular and easier to maintain. Content lives in `data/site.ts`, while layout and UI are split into reusable components.
