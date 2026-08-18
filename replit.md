# CHAT GAIN

A responsive React/Vite replica of the CHAT GAIN landing page, with live payout animation, chat profiles, registration CTAs, FAQ accordion, theme toggle, and mobile layout.

## Run & Operate

- `pnpm --filter @workspace/chat-gain run dev` — run the web app
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env for the API server: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/chat-gain/src/App.tsx` — page sections, CTA behavior, profile modal, FAQ state, and theme/language controls
- `artifacts/chat-gain/src/index.css` — CHAT GAIN visual system, responsive layout, payout animation, and reveal animation
- `artifacts/chat-gain/index.html` — document metadata
- `artifacts/api-server` — separate Express API service

## Architecture decisions

- The existing pnpm workspace and React/Vite stack are retained; the replica is implemented within the existing `chat-gain` artifact.
- The payout strip is placed below the top navigation to match the reference site.
- Profile photos use public Unsplash image URLs because the imported project does not contain the source profile assets.
- CTA buttons use in-page anchors and a profile modal so the visual replica remains functional without inventing a backend registration flow.

## Product

The page presents a CHAT GAIN-style marketplace for paid conversations: visitors can browse active profiles, open a chat preview, navigate to the guide/join sections, submit an earning-tips email, expand FAQs, toggle dark mode, and switch the visible language control.

## User preferences

- Preserve the existing main heading and paragraph copy when adjusting the replica.

## Gotchas

- The web preview does not require the API server; the API workflow still requires `DATABASE_URL`.
- Profile images are remote and require network access in the preview.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
