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
