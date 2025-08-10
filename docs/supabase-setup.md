# Supabase Project Setup

## 1. Create a Supabase Project
- Go to https://app.supabase.com and sign in.
- Click "New Project" and fill in the project name, password, and region.
- Wait for the project to initialize.

## 2. Get API Keys
- In your Supabase project dashboard, go to Project Settings > API.
- Copy the `Project URL` and `anon` public key.
- Add these to your `.env.local` file:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your-project-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  ```

## 3. Create Database Tables
- Go to the SQL Editor in Supabase.
- Run the following SQL to create tables:

```sql
-- Users table
create table users (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text unique not null,
  role text default 'player',
  created_at timestamp with time zone default now()
);

-- Games table
create table games (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  created_at timestamp with time zone default now()
);

-- User-Games join table (many-to-many)
create table user_games (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  game_id uuid references games(id) on delete cascade,
  progress jsonb,
  score int,
  created_at timestamp with time zone default now()
);
```

## 4. Enable Row Level Security (RLS)
- In the Supabase dashboard, enable RLS for each table.
- Add policies to allow users to access their own data and admins to access all data.

## 5. Set Up Auth
- In the Auth section, enable email/password sign-in.
- Optionally, configure OAuth providers.

---

For more details, see the Supabase docs: https://supabase.com/docs
