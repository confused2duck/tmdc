# DataOS Landing Page — PRD

## Original Problem Statement
Build a landing page for Google Ads with the brand guidelines of https://www.themoderndatacompany.com/. Make it interactive, simple, user-friendly. Copy covers DataOS: hero (Manage Data Lifecycle End-to-End, Turn Data Into Data Products 40% Faster), Executive Problem Statement, Solution, 4-stage Lifecycle (Ingest → Organize & Transform → Govern → Serve & Consume), Business Outcomes, What Sets DataOS Apart, Strategic Use Cases, Proof of Impact, Final CTA.

## User Choices
- Lead capture backend: **Google Sheets** (via Apps Script webhook) with MongoDB as safety net
- Brand: **Match The Modern Data Company closely**
- Interactive: **Animated hero, interactive 4-stage lifecycle diagram, scroll animations, hover effects, sticky CTA**
- Google Ads tracking: **Placeholders added** (`gtag` + `window.trackLeadConversion(ctaSource)`)

## User Persona
Enterprise data/engineering/analytics leaders evaluating a unified data lifecycle platform after clicking a Google Ads campaign.

## Architecture
- **Frontend**: React 19 + Tailwind + shadcn/ui + framer-motion + lucide-react. Pages in `/app/frontend/src/pages`, sections in `/app/frontend/src/components/sections`, shared UI in `/app/frontend/src/components`, context in `/app/frontend/src/context`.
- **Backend**: FastAPI on `/api/*` prefix. Routes: `GET /api/`, `GET /api/health`, `POST /api/leads`, `GET /api/leads`. Leads persisted to MongoDB (`leads` collection); payload is also forwarded to `GOOGLE_SHEETS_WEBHOOK_URL` if set. Timezone-aware UTC timestamps stored as ISO strings.
- **Integration**: Google Apps Script `doPost` web app appends each lead as a row in the target sheet. Setup doc: `/app/memory/GOOGLE_SHEETS_SETUP.md`.

## Implemented (2026-05-03)
- Full responsive landing page with all 9 sections from brief + navbar + footer
- Animated hero with grid background, glowing accents, eyebrow, trust bar
- Interactive 4-stage lifecycle diagram (click to expand with animated transitions)
- Lead form side-drawer modal with validation, loading state and success state
- Sticky CTA bar (appears after scrolling past hero)
- Scroll-triggered fade-up animations across all sections (framer-motion)
- Hover effects on all cards, chips, buttons
- Animated counter stats in Proof of Impact section
- Google Ads conversion tracking placeholders (`gtag` + `window.trackLeadConversion`)
- Backend lead API, MongoDB persistence, optional Google Sheets forwarding

## Testing Status
- Backend: 100% (8/8 endpoints passing pytest)
- Frontend: 100% functional flows via Playwright (all CTAs open modal, lifecycle stages update, sticky CTA appears, form submits + success state)

## Prioritized Backlog
### P1 (next logical wins)
- Replace placeholder customer logos with real SVGs
- Add short 30-sec product video / Loom embed near solution section
- FAQ / Objection-handling accordion (shadcn accordion) before Final CTA
- A/B test second headline variant via query param (`?variant=b`)

### P2
- Multi-step lead form (progressive profiling: step 1 email → step 2 details)
- Calendly / Cal.com embed for "Book a strategy call" in modal
- Blog / resource cards pulling from CMS
- Internationalization (i18n) support

## Environment Variables
- `MONGO_URL`, `DB_NAME`, `CORS_ORIGINS` — preserved defaults
- `GOOGLE_SHEETS_WEBHOOK_URL` — empty by default; set to Apps Script web app URL to forward leads
- `REACT_APP_BACKEND_URL` — external backend URL (frontend)
