
# Dashboard (MVP)

Georim dashboard MVP for organization and event operations.

## Scope

- Frontend-only MVP with dummy data
- No backend/API integration in this repo
- In-memory state only (data resets on page refresh)
- Main application entry: `src/App.tsx`

## Current Status

- Suitable for UI iteration, demos, and frontend validation
- Not production-ready as a full product yet (missing backend, auth, persistence, and real integrations)

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+ (recommended)

## Stack

- React 18 + TypeScript
- Vite 6
- Utility-class UI styling (`src/index.css`)
- Apple-style icon mapping via `src/apple-icons.tsx`
- Recharts
- Vitest + Testing Library
- Playwright (smoke e2e)
- ESLint 9 + TypeScript ESLint

## Key Areas

- Organization dashboard, analytics, team, finance, profile, help
- Event creation and event management tabs
- Ticketing, orders, marketing, reports, settings
- Checked-In live log workflow with QR scan handling

## Getting Started

1. Install dependencies:
   `npm install`
2. Start development server:
   `npm run dev`
3. Open the app:
   `http://localhost:3000`

## Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build (`build/`)
- `npm run lint` - Run ESLint with zero warnings allowed
- `npm run typecheck` - Run strict TypeScript checks for app + node config
- `npm run test:unit` - Run Vitest unit tests
- `npm run test:unit:watch` - Run Vitest in watch mode
- `npm run test:e2e` - Run Playwright smoke tests

## Recommended Verification Flow

1. `npm run lint`
2. `npm run typecheck`
3. `npm run test:unit`
4. `npm run build`
5. `npm run test:e2e`

## Frontend Structure

- `src/App.tsx` - app shell and view/state orchestration
- `src/components/` - feature modules (dashboard, team, event creation/management, etc.)
- `src/components/ui/` - shared UI primitives
- `src/hooks/useModalA11y.ts` - modal accessibility behavior
- `src/types/` - shared TypeScript types
- `src/utils/` - helpers (example: report export)

## Quality and Accessibility Notes

- Core frontend forms use explicit label/input associations (`htmlFor`/`id`)
- Event management tabs use ARIA tab semantics with keyboard navigation support
- Modal interactions use focus management via `src/hooks/useModalA11y.ts`
- Standardized content states are handled via `src/components/ui/ContentState.tsx`

## Known MVP Limitations

- No authentication/authorization
- No API/server-side validation
- No database persistence
- No file storage backend (uploaded content is local-session only)
- No observability/monitoring pipeline

## Project Notes

- Static assets are served from `public/`
- Build and test artifacts are git-ignored (`build/`, `test-results/`, `playwright-report/`)
  
