# FitPassport

Your size. Across every brand.

FitPassport is a universal clothing-size recommendation platform. Different brands cut to different measurements, so the same size label rarely means the same fit. FitPassport builds a personal "Fit Passport" from the clothes a user already owns and uses it to recommend sizes across brands.

- **Market:** India first, consumers first.
- **Platform:** responsive web application (Chrome extension later).
- **First category:** men's T-shirts.

> **Status:** landing page, design system and Supabase email/password authentication are implemented. The recommendation engine, database schema, onboarding, measurements and Chrome extension are intentionally not built yet.

## Tech stack

| Area        | Choice                                                     |
| ----------- | ---------------------------------------------------------- |
| Framework   | Next.js 16 (App Router, Proxy)                              |
| Language    | TypeScript (strict)                                         |
| Styling     | Tailwind CSS v4 with design tokens in `globals.css`         |
| Auth & data | Supabase Auth (PostgreSQL) via `@supabase/ssr` cookie sessions |
| Fonts       | Inter (UI) and Instrument Serif (display) via `next/font`   |
| Linting     | ESLint with `eslint-config-next`                            |

Node.js 20.9 or newer is required.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env.local

# 3. Fill in the Supabase values (see "Supabase setup" below)
# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without Supabase credentials the public site still renders, and the auth pages show a setup notice instead of pretending to work.

### Environment variables

| Variable                        | Required    | Purpose                                             |
| ------------------------------- | ----------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes         | Supabase project URL                                |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes         | Public anon key used by browser and server clients  |
| `NEXT_PUBLIC_SITE_URL`          | Production  | Canonical origin for email links (falls back to the request host) |

`.env.local` is git-ignored. Never commit real keys — only `.env.example` belongs in the repository, and the service-role key is never used here.

### Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the development server         |
| `npm run build`     | Create a production build            |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | Run ESLint                           |
| `npm run typecheck` | Run the TypeScript compiler (no emit) |

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com) (the free tier is enough).
2. In **Project Settings → API**, copy the project URL and the `anon` public key into `.env.local`.
3. In **Authentication → URL Configuration**:
   - **Site URL:** `http://localhost:3000` for development, or your production domain.
   - **Redirect URLs:** add `http://localhost:3000/auth/callback` and, when deployed, `https://<your-domain>/auth/callback`.
4. In **Authentication → Sign In / Providers → Email**, keep **Enable email confirmations** on. This project's registration flow expects a confirmation email; with it off, users are signed in immediately after signing up.
5. Leave the default email templates in place — they redirect to `/auth/callback?code=…`, which the app exchanges for a cookie session.

Email delivery on the built-in Supabase SMTP service is heavily rate-limited and intended for testing only. Configure custom SMTP before inviting real users.

## Routes

| Route              | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| `/`                | Landing page                                                   |
| `/register`        | Create an account (name, email, password, confirmation)        |
| `/login`           | Log in with email and password                                 |
| `/forgot-password` | Request a password reset email                                  |
| `/update-password` | Choose a new password after following a reset link (protected) |
| `/check-email`     | Post-registration "confirm your email" screen                  |
| `/dashboard`       | Protected Fit Passport placeholder                             |
| `/auth/callback`   | Route handler that exchanges the email link code for a session |

## Authentication

- **Session storage:** cookies managed by `@supabase/ssr`. Browser and server read the same session.
- **Clients:** `src/lib/supabase/client.ts` (browser), `src/lib/supabase/server.ts` (Server Components, Server Actions, Route Handlers).
- **Session refresh:** `src/proxy.ts` (Next.js 16 renamed middleware to proxy) runs `updateSession`, verifies the JWT with `getClaims()` and refreshes cookies on each request.
- **Route protection:** the proxy redirects signed-out visitors away from `/dashboard` and `/update-password`, and signed-in visitors away from the auth pages. The dashboard re-checks the session server-side before rendering — the proxy is only an optimistic check.
- **Forms:** React 19 `useActionState` with Server Actions in `src/lib/auth/actions.ts`, so credentials never pass through client code.
- **Validation:** native HTML constraints plus server-side checks in `src/lib/auth/validation.ts` (email format, password length, letter + number, matching passwords, name length).
- **Errors:** Supabase messages are mapped to plain language in `describeAuthError`; no raw API text reaches the UI.
- **Enumeration:** password reset always reports the same result whether or not an account exists. Duplicate sign-ups are detected via the empty `identities` array Supabase returns.

## Project structure

```text
src/
├── app/
│   ├── (marketing)/          # Public site: header, footer, landing page
│   ├── (auth)/               # Log in, register, reset, check-email
│   ├── auth/callback/        # Email link → session route handler
│   ├── dashboard/            # Protected Fit Passport placeholder
│   ├── globals.css           # Tailwind import and design tokens
│   ├── icon.svg              # Favicon
│   └── layout.tsx            # Root layout: fonts, metadata, skip link
├── components/
│   ├── auth/                 # Auth shell, forms, password field, alerts
│   ├── layout/               # Site header and footer
│   ├── marketing/            # Landing page sections
│   └── ui/                   # Button, Container, TextField, Spinner, Wordmark
├── config/site.ts            # Site metadata, navigation and step copy
├── lib/
│   ├── auth/                 # Form state, validation, actions, current user
│   └── supabase/             # Browser, server and proxy clients + config
└── proxy.ts                  # Next.js 16 proxy entry point
```

## Design system

- **Tokens** live in `src/app/globals.css` under `@theme`. Use `bg-paper`, `text-ink`, `border-line`, `text-danger`, `rounded-card` and similar utilities rather than raw colour values.
- **Palette:** warm paper surfaces, near-black ink, a muted brass accent and a deep red for errors only.
- **Typography:** Instrument Serif for headlines, Inter for interface and body copy. Display sizes use `clamp()`.
- **Components:** `Button` (primary, secondary, inverse, quiet), `Container`, `TextField` (label, hint, error, trailing slot), `Spinner` and `Wordmark`.
- **Motion:** colour transitions and a spinner only; animations are neutralised under `prefers-reduced-motion`.
- **Light theme only** for now.

## Accessibility

Landmark regions, a skip link, visible focus styles, labelled fields, `aria-invalid` plus `aria-describedby` on errors, `role="alert"` messages, and a password toggle that exposes `aria-pressed`. Interactive targets are at least 44px tall. Keep heading order and focus behaviour intact when extending the UI.

## What comes next

1. Database schema and Row Level Security policies.
2. Fit Passport onboarding: recording the sizes a user already wears.
3. The size recommendation engine.
4. Chrome extension.
