-- Aivira Combined Schema + RLS (v1)
-- Safe to run multiple times (idempotent-ish). Works in Supabase SQL editor.
-- NOTE: Service role bypasses RLS; anon/authenticated do not.

-- 0) Extensions & helpers -----------------------------------------------------
create extension if not exists pgcrypto;  -- gen_random_uuid()

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;$$;

create or replace function public.normalize_email_trigger()
returns trigger language plpgsql as $$
begin
  if new.email is not null then
    new.email := lower(trim(new.email));
  end if;
  return new;
end;$$;

-- 1) Types -------------------------------------------------------------------
create type public.user_role as enum ('SME','CONSULTANT','VENDOR','ADMIN');
-- If already exists, the above may fail once; ignore subsequent runs.

-- 2) Core tables --------------------------------------------------------------
-- PROFILES: 1-1 with auth.users
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  company text,
  role public.user_role not null default 'SME',
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index if not exists profiles_email_unique on public.profiles (lower(email));
create trigger profiles_email_norm before insert or update on public.profiles
  for each row execute function public.normalize_email_trigger();
create trigger profiles_set_updated before update on public.profiles
  for each row execute function public.set_updated_at();

-- CONSENT VERSION CATALOG (to keep a copy of the text shown to users)
create table if not exists public.consent_versions (
  id uuid primary key default gen_random_uuid(),
  code text not null,              -- e.g. 'grant_matching_contact'
  version int not null,
  title text not null,
  body text not null,              -- full text presented to user
  created_at timestamptz not null default now(),
  unique (code, version)
);

-- CONSENTS: per user/email per version entry
create table if not exists public.consents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  version_id uuid not null references public.consent_versions(id) on delete restrict,
  purpose text not null,           -- duplicated for easy filtering
  granted boolean not null,
  source text not null check (source in ('ECT','Landing')),
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists consents_email_idx on public.consents (lower(email));
create index if not exists consents_user_idx on public.consents (user_id);
create trigger consents_email_norm before insert or update on public.consents
  for each row execute function public.normalize_email_trigger();
create trigger consents_set_updated before update on public.consents
  for each row execute function public.set_updated_at();

-- REPORTS: ECT outputs and structured fields for analytics
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  consent_id uuid references public.consents(id) on delete set null,
  ect_version int,
  -- denormalized analytics-friendly columns
  uen text,
  primary_goal text,
  budget_band text,
  timeline text,
  -- original payloads retained
  form_data jsonb not null,
  report_data jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint reports_email_or_user check (email <> '' or user_id is not null)
);
create index if not exists reports_email_idx on public.reports (lower(email));
create index if not exists reports_user_idx on public.reports (user_id);
create index if not exists reports_form_gin on public.reports using gin (form_data);
create index if not exists reports_report_gin on public.reports using gin (report_data);
create trigger reports_email_norm before insert or update on public.reports
  for each row execute function public.normalize_email_trigger();
create trigger reports_set_updated before update on public.reports
  for each row execute function public.set_updated_at();

-- ONBOARDING RESPONSES (one row per user)
create table if not exists public.onboarding_responses (
  user_id uuid primary key references auth.users(id) on delete cascade,
  version int not null default 1,
  answers jsonb not null,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger onboard_set_updated before update on public.onboarding_responses
  for each row execute function public.set_updated_at();

-- EVENTS/AUDIT (service/internal use; keep locked down)
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text,
  kind text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);
create index if not exists events_user_idx on public.events (user_id);
create index if not exists events_kind_idx on public.events (kind);

-- 3) New-user bootstrap trigger ----------------------------------------------
-- Automatically create a profile row when a new auth.users record is created
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles(user_id, email, full_name)
  values (new.id, lower(new.email), coalesce(new.raw_user_meta_data->>'full_name',''))
  on conflict (user_id) do nothing;
  return new;
end;$$;

-- Drop & recreate trigger safely
do $$ begin
  if exists (
    select 1 from pg_trigger t join pg_class c on c.oid = t.tgrelid
    where t.tgname = 'on_auth_user_created' and c.relname = 'users' and c.relnamespace = 'auth'::regnamespace
  ) then
    drop trigger on_auth_user_created on auth.users;
  end if;
end $$;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

-- 4) RLS ----------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.reports enable row level security;
alter table public.consents enable row level security;
alter table public.onboarding_responses enable row level security;
alter table public.events enable row level security;  -- no policies => deny all

-- PROFILES: self-read/self-update
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
for select using (auth.uid() = user_id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
for update using (auth.uid() = user_id);

drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self on public.profiles
for insert with check (auth.uid() = user_id);

-- REPORTS: own rows only (anon inserts must go through service-role edge function)
drop policy if exists reports_select_own on public.reports;
create policy reports_select_own on public.reports
for select using (user_id = auth.uid());

drop policy if exists reports_insert_self on public.reports;
create policy reports_insert_self on public.reports
for insert with check (user_id = auth.uid());

drop policy if exists reports_update_own on public.reports;
create policy reports_update_own on public.reports
for update using (user_id = auth.uid());

-- CONSENTS: user can view their own; inserts allowed for logged-in or service role
-- (service role bypasses RLS for unauth ECT)
drop policy if exists consents_select_own on public.consents;
create policy consents_select_own on public.consents
for select using (user_id is not null and user_id = auth.uid());

drop policy if exists consents_insert_self on public.consents;
create policy consents_insert_self on public.consents
for insert with check (user_id = auth.uid() or user_id is null);

drop policy if exists consents_update_own on public.consents;
create policy consents_update_own on public.consents
for update using (user_id = auth.uid());

-- ONBOARDING: one row per user, self-only
drop policy if exists onboarding_select_own on public.onboarding_responses;
create policy onboarding_select_own on public.onboarding_responses
for select using (user_id = auth.uid());

drop policy if exists onboarding_insert_self on public.onboarding_responses;
create policy onboarding_insert_self on public.onboarding_responses
for insert with check (user_id = auth.uid());

drop policy if exists onboarding_update_own on public.onboarding_responses;
create policy onboarding_update_own on public.onboarding_responses
for update using (user_id = auth.uid());

-- EVENTS: no public policies (service role only)

-- 5) Safe helper to link historical ECT reports to logged-in user -------------
create or replace function public.link_my_reports()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text;
  v_uid uuid := auth.uid();
  v_count int := 0;
begin
  select email into v_email from public.profiles where user_id = v_uid;
  if v_email is null then
    return 0;
  end if;
  update public.reports r
    set user_id = v_uid
  where r.user_id is null and lower(r.email) = lower(v_email);
  get diagnostics v_count = row_count;
  -- optional: log
  insert into public.events(user_id, email, kind, payload)
  values (v_uid, v_email, 'link_reports', jsonb_build_object('linked', v_count));
  return v_count;
end;$$;

grant execute on function public.link_my_reports() to authenticated;

-- 6) Seed a consent version (edit text to your real PDPA copy) ----------------
insert into public.consent_versions (id, code, version, title, body)
values (
  gen_random_uuid(),
  'grant_matching_contact',
  1,
  'Consent to Contact & Data Use for Grant Matching',
  'By submitting this form, you consent to Aivira Pte. Ltd. collecting and using your business contact information and project details for the purpose of grant matching, contacting you about eligibility results, and providing related services. You may withdraw your consent at any time by emailing support@aivira.com.sg. Our Data Protection Policy applies.'
) on conflict (code, version) do nothing;
