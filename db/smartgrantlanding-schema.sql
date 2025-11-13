-- =========================================================
-- Aivira Pilot: Profiles + Onboarding (idempotent)
-- =========================================================

-- 0) Roles enum (safe-create)
do $$ begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('sme','consultant','vendor');
  end if;
end $$;

-- 1) Core tables
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role,
  full_name text,
  company text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.onboarding_responses (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null,
  answers jsonb not null default '{}'::jsonb,
  version int not null default 1,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) Updated-at trigger function (locked search_path)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2a) Triggers for both tables
drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists trg_onboarding_responses_updated on public.onboarding_responses;
create trigger trg_onboarding_responses_updated
before update on public.onboarding_responses
for each row execute function public.set_updated_at();

-- 3) RLS + policies
alter table public.profiles enable row level security;
alter table public.onboarding_responses enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='profiles: read own'
  ) then
    create policy "profiles: read own"
      on public.profiles for select
      using (id = auth.uid());
  end if;

  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='profiles: insert self'
  ) then
    create policy "profiles: insert self"
      on public.profiles for insert
      with check (id = auth.uid());
  end if;

  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='profiles' and policyname='profiles: update own'
  ) then
    create policy "profiles: update own"
      on public.profiles for update
      using (id = auth.uid())
      with check (id = auth.uid());
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='onboarding_responses' and policyname='onboarding: read own'
  ) then
    create policy "onboarding: read own"
      on public.onboarding_responses for select
      using (user_id = auth.uid());
  end if;

  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='onboarding_responses' and policyname='onboarding: insert own'
  ) then
    create policy "onboarding: insert own"
      on public.onboarding_responses for insert
      with check (user_id = auth.uid());
  end if;

  if not exists (
    select 1 from pg_policies where schemaname='public' and tablename='onboarding_responses' and policyname='onboarding: update own'
  ) then
    create policy "onboarding: update own"
      on public.onboarding_responses for update
      using (user_id = auth.uid())
      with check (user_id = auth.uid());
  end if;
end $$;

-- 4) RPC to finish onboarding (atomic write to both tables)
create or replace function public.finish_onboarding(
  _role user_role,
  _full_name text,
  _company text,
  _answers jsonb,
  _version int default 1
)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  uid uuid;
begin
  uid := auth.uid();
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  -- Upsert profiles (mark as completed)
  insert into public.profiles as p (id, role, full_name, company, onboarding_completed)
  values (uid, _role, _full_name, _company, true)
  on conflict (id) do update
    set role = excluded.role,
        full_name = excluded.full_name,
        company = excluded.company,
        onboarding_completed = true,
        updated_at = now();

  -- Upsert onboarding_responses (merge JSON answers)
  insert into public.onboarding_responses as r (user_id, role, answers, version, completed_at)
  values (uid, _role, coalesce(_answers, '{}'::jsonb), coalesce(_version, 1), now())
  on conflict (user_id) do update
    set role = excluded.role,
        answers = coalesce(r.answers, '{}'::jsonb) || coalesce(excluded.answers, '{}'::jsonb),
        version = excluded.version,
        completed_at = now(),
        updated_at = now();
end;
$$;

-- Restrict who can execute the RPC
revoke all on function public.finish_onboarding(user_role, text, text, jsonb, int) from public;
grant execute on function public.finish_onboarding(user_role, text, text, jsonb, int) to authenticated;

-- 5) Optional sanity checks (run manually if you wish)
-- select enumlabel from pg_enum e join pg_type t on t.oid=e.enumtypid where t.typname='user_role';
-- select policyname, cmd from pg_policies where schemaname='public' and tablename in ('profiles','onboarding_responses');