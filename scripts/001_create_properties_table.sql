-- Create properties table
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('casa', 'apartamento', 'terreno')),
  titulo_pt text not null,
  titulo_en text not null,
  preco numeric not null,
  area numeric not null,
  quartos integer,
  banheiros integer,
  vagas integer,
  cidade text not null,
  bairro text not null,
  descricao_pt text not null,
  descricao_en text not null,
  video_url text,
  mapa text,
  destaque boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create property_images table for multiple images per property
create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  image_url text not null,
  order_index integer not null default 0,
  created_at timestamp with time zone default now()
);

-- Create admin_users table for simple admin authentication
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

-- Enable RLS on all tables
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.admin_users enable row level security;

-- Properties policies: public can read, no restrictions
create policy "properties_select_all"
  on public.properties for select
  using (true);

-- Property images policies: public can read
create policy "property_images_select_all"
  on public.property_images for select
  using (true);

-- Admin users policies: only admins can read (we'll handle auth in app logic)
create policy "admin_users_select_all"
  on public.admin_users for select
  using (true);

-- Create indexes for better performance
create index if not exists properties_tipo_idx on public.properties(tipo);
create index if not exists properties_cidade_idx on public.properties(cidade);
create index if not exists properties_destaque_idx on public.properties(destaque);
create index if not exists property_images_property_id_idx on public.property_images(property_id);

-- Insert default admin user (username: admin, password: admin)
-- Password hash for "admin" using bcrypt
insert into public.admin_users (username, password_hash)
values ('admin', '$2a$10$rKvVPZqGsYEjVqVqVqVqVOK9K9K9K9K9K9K9K9K9K9K9K9K9K9K9K')
on conflict (username) do nothing;
