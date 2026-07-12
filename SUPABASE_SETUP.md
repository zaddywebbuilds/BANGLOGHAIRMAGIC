# BANGLOG HAIR MAGIC — Supabase Setup

Follow these steps once. Takes about 10 minutes.

---

## Step 1 — Create a Supabase project

1. Go to https://supabase.com and sign in (or create a free account)
2. Click **New project**
3. Name it `banglog-hair-magic`
4. Choose a strong database password and save it somewhere safe
5. Pick a region close to Nigeria (e.g. West EU or any available)
6. Click **Create new project** and wait ~2 minutes

---

## Step 2 — Run the SQL

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Paste the entire block below and click **Run**

```sql
-- Orders table
create table if not exists public.orders (
  id               uuid        primary key default gen_random_uuid(),
  code             text        unique not null,
  customer_name    text,
  customer_phone   text,
  delivery_address text,
  product          text,
  status           text        not null default 'Order Confirmed',
  current_location text,
  events           jsonb       not null default '[]'::jsonb,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Row Level Security: only logged-in admin can read/write the full table
alter table public.orders enable row level security;

drop policy if exists "admin full access" on public.orders;
create policy "admin full access" on public.orders
  for all to authenticated using (true) with check (true);

-- Public tracking: anonymous users can look up ONE order by code
-- (returns only non-personal fields — name/phone/address are NOT exposed)
create or replace function public.track_order(p_code text)
returns table (
  code             text,
  status           text,
  product          text,
  delivery_address text,
  current_location text,
  events           jsonb,
  updated_at       timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    code, status, product, delivery_address,
    current_location, events, updated_at
  from public.orders
  where upper(code) = upper(trim(p_code))
  limit 1;
$$;

grant execute on function public.track_order(text) to anon, authenticated;
```

---

## Step 3 — Create the admin user

1. In Supabase, go to **Authentication → Users**
2. Click **Add user → Create new user**
3. Enter the email and password you will use to log into `admin.html`
4. Click **Create user**

That's the only account that can log in. No one else can sign up.

---

## Step 4 — Get your API keys

1. In Supabase, go to **Project Settings → API**
2. Copy **Project URL** (looks like `https://xxxx.supabase.co`)
3. Copy **anon public** key (long string under "Project API keys")

---

## Step 5 — Paste keys into config.js

Open `config.js` in the BANGLOG folder and replace the placeholders:

```js
window.SUPA_URL  = "https://xxxx.supabase.co";   // your Project URL
window.SUPA_ANON = "eyJhbGciOiJIUzI1NiIs...";   // your anon public key
```

Save the file and push to GitHub. The site is live.

---

## How tracking codes work

Every order gets a code like `BHM-2026-AF3X`:
- `BHM` = BANGLOG Hair Magic
- `2026` = year the order was created
- `AF3X` = 4 random characters (no ambiguous letters like O/0 or I/1)

Customers enter this code on `track.html` to follow their order.

---

## Statuses (in order)

1. Order Confirmed
2. Processing
3. Dispatched
4. In Transit
5. Out for Delivery
6. Delivered
7. Delayed (use if there's a hold-up)
