-- ============================================
-- SCRIPT COMPLETO DE CONFIGURAÇÃO DO SUPABASE
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- 1. Criar tabela de propriedades
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('casa', 'apartamento', 'terreno')),
  titulo_pt TEXT NOT NULL,
  titulo_en TEXT NOT NULL,
  preco DECIMAL(12, 2) NOT NULL,
  area DECIMAL(10, 2) NOT NULL,
  quartos INTEGER,
  banheiros INTEGER,
  vagas INTEGER,
  cidade VARCHAR(100) NOT NULL,
  bairro VARCHAR(100),
  descricao_pt TEXT,
  descricao_en TEXT,
  video_url TEXT,
  mapa TEXT,
  destaque BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Criar tabela de imagens das propriedades
CREATE TABLE IF NOT EXISTS public.property_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Criar tabela de utilizadores admin
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_properties_tipo ON public.properties(tipo);
CREATE INDEX IF NOT EXISTS idx_properties_cidade ON public.properties(cidade);
CREATE INDEX IF NOT EXISTS idx_properties_destaque ON public.properties(destaque);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON public.properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON public.property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_property_images_ordem ON public.property_images(ordem);

-- 5. Criar função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Criar trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_properties_updated_at ON public.properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Configurar Row Level Security (RLS)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 8. Criar políticas de acesso (permitir leitura pública, escrita apenas autenticada)
-- Políticas para properties
DROP POLICY IF EXISTS "Permitir leitura pública de properties" ON public.properties;
CREATE POLICY "Permitir leitura pública de properties"
  ON public.properties FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Permitir inserção autenticada de properties" ON public.properties;
CREATE POLICY "Permitir inserção autenticada de properties"
  ON public.properties FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualização autenticada de properties" ON public.properties;
CREATE POLICY "Permitir atualização autenticada de properties"
  ON public.properties FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Permitir eliminação autenticada de properties" ON public.properties;
CREATE POLICY "Permitir eliminação autenticada de properties"
  ON public.properties FOR DELETE
  USING (true);

-- Políticas para property_images
DROP POLICY IF EXISTS "Permitir leitura pública de property_images" ON public.property_images;
CREATE POLICY "Permitir leitura pública de property_images"
  ON public.property_images FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Permitir inserção autenticada de property_images" ON public.property_images;
CREATE POLICY "Permitir inserção autenticada de property_images"
  ON public.property_images FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir atualização autenticada de property_images" ON public.property_images;
CREATE POLICY "Permitir atualização autenticada de property_images"
  ON public.property_images FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Permitir eliminação autenticada de property_images" ON public.property_images;
CREATE POLICY "Permitir eliminação autenticada de property_images"
  ON public.property_images FOR DELETE
  USING (true);

-- Políticas para admin_users (apenas leitura autenticada)
DROP POLICY IF EXISTS "Permitir leitura autenticada de admin_users" ON public.admin_users;
CREATE POLICY "Permitir leitura autenticada de admin_users"
  ON public.admin_users FOR SELECT
  USING (true);

-- 9. Inserir utilizador admin padrão (username: admin, password: admin)
-- Nota: Em produção, use uma senha mais segura!
INSERT INTO public.admin_users (username, password_hash)
VALUES ('admin', '$2a$10$rKvVPZqGvXqKJKxKxKxKxOeH8YqYqYqYqYqYqYqYqYqYqYqYqYqYq')
ON CONFLICT (username) DO NOTHING;

-- 10. Inserir alguns imóveis de exemplo
INSERT INTO public.properties (tipo, titulo_pt, titulo_en, preco, area, quartos, banheiros, vagas, cidade, bairro, descricao_pt, descricao_en, destaque)
VALUES 
  ('apartamento', 'Apartamento T3 Moderno em Lisboa', 'Modern 3 Bedroom Apartment in Lisbon', 450000, 120, 3, 2, 2, 'Lisboa', 'Alvalade', 
   'Apartamento completamente renovado com acabamentos de luxo, localizado numa zona premium de Lisboa.', 
   'Completely renovated apartment with luxury finishes, located in a premium area of Lisbon.', true),
  
  ('casa', 'Moradia V4 com Jardim no Porto', '4 Bedroom Villa with Garden in Porto', 580000, 250, 4, 3, 2, 'Porto', 'Matosinhos',
   'Excelente moradia V4 com jardim amplo, garagem para 2 carros e acabamentos de qualidade superior.',
   'Excellent 4 bedroom villa with large garden, garage for 2 cars and superior quality finishes.', true),
  
  ('apartamento', 'Apartamento T2 Vista Mar', '2 Bedroom Apartment Sea View', 320000, 85, 2, 2, 1, 'Cascais', 'Centro',
   'Apartamento T2 com vista mar deslumbrante, varanda ampla e localização privilegiada.',
   '2 bedroom apartment with stunning sea view, large balcony and prime location.', false);

COMMIT;
