# Gadisa Shop — Employee Dashboard

Next.js app showing live, confirmed payments (CBE, telebirr, BOA, Awash)
to logged-in employees and the owner, fed by the `gadisa_shop_listener`
phone app and the `gadisa-shop-backend` Supabase project.

## What employees see vs the owner

Both log in through the same `/login` page. Both currently land on the
same `/receipts` feed — individual confirmed payments only (payer name,
amount, provider, time). **No daily totals, no bank balance, no raw SMS
text** are shown or fetched anywhere in this app; those columns aren't
even in the data this app queries (see `employee_receipts_view` in the
backend migrations). An owner-only summary view can be added later as a
separate page once that's wanted.

## Setup

1. `npm install`
2. Fill in `.env.local` with the **Gadisa Shop** Supabase project's URL,
   anon key, and (server-only) service role key.
3. Make sure all 4 SQL migrations have been run on that Supabase project,
   including `0004_receipt_alerts_safe_realtime.sql`.
4. `npm run dev` — visit `http://localhost:3000`.
5. You'll be redirected to `/login`. Sign in with the phone/password you
   created via Supabase Auth and promoted with `bootstrap_owner(...)`.

## Bottom navigation

Home / telebirr / BOA / CBE — each provider tab filters the same feed by
provider via a URL query param (`/receipts?provider=BOA`), so it's just
one page underneath, easy to extend with an Awash tab once that sender ID
is confirmed.

## Important security note on Realtime

Live updates come from `receipt_alerts`, a separate narrow table — **not**
`receipts` directly. This is intentional: Supabase Realtime delivers full
table rows to anyone with table-level SELECT, bypassing the column
restrictions a view normally provides. `receipt_alerts` is populated by a
database trigger and physically never contains `balance_after` or
`raw_sms`, so there's nothing sensitive to leak through Realtime even if
a future code change forgets to filter a payload. See
`lib/supabase/receipts.ts` for where this is wired up.

## Still pending

- Awash sender ID + real SMS sample (affects the Flutter parser, not this
  app, but the 4th bottom-nav tab is ready whenever that's confirmed).
- An "Add employee" admin screen (calls Supabase Auth admin API +
  `add_employee_profile()` from the backend migrations) — not yet built.
- Owner-only summary/total view, if wanted later as a separate page.
