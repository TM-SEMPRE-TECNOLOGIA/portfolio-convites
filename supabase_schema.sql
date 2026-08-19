-- ==============================================================================
-- SCHEMA SUPABASE: CONVITES DIGITAIS INTERATIVOS (ATELIER DOS NOIVOS)
-- Execute este script no SQL Editor do seu projeto Supabase
-- ==============================================================================

-- 1. TABELA DE BRIEFINGS RECEBIDOS
CREATE TABLE IF NOT EXISTS public.convites_briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    noivo TEXT NOT NULL,
    noiva TEXT NOT NULL,
    modelo TEXT NOT NULL,
    plano TEXT DEFAULT 'Light',
    frase TEXT,
    pais TEXT,
    data_casamento TEXT NOT NULL,
    horario TEXT NOT NULL,
    local_nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    link_maps TEXT,
    recepcao TEXT,
    dress_code TEXT,
    restricoes TEXT,
    cronograma TEXT,
    rsvp_data TEXT NOT NULL,
    rsvp_whatsapp TEXT NOT NULL,
    pix_chave TEXT,
    pix_titular TEXT,
    link_lista TEXT,
    link_fotos TEXT NOT NULL,
    musica TEXT,
    observacoes TEXT,
    status TEXT DEFAULT 'novo' -- 'novo' | 'em_producao' | 'entregue'
);

-- 2. TABELA DE PREÇOS DOS PLANOS
CREATE TABLE IF NOT EXISTS public.convites_planos (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    preco NUMERIC NOT NULL,
    descricao TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Inserir planos padrão se não existirem
INSERT INTO public.convites_planos (id, nome, preco, descricao)
VALUES 
    ('light', 'Plano Light', 99.00, 'Entrada econômica com 1 foto, contagem regressiva, GPS e RSVP'),
    ('silver', 'Plano Silver', 149.00, 'Música ambiente flutuante, galeria, cronograma e botão PIX'),
    ('gold', 'Plano Gold', 199.00, 'Vídeo vertical no hero, storytelling dos noivos e guia de convidados'),
    ('premium', 'Plano Premium', 250.00, 'Vídeo vertical HD + Trilha sonora + Linha do tempo + Múltiplos locais + QR Code PIX + Cartão PDF')
ON CONFLICT (id) DO NOTHING;

-- 3. POLICIES DE SEGURANÇA (RLS)
ALTER TABLE public.convites_briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.convites_planos ENABLE ROW LEVEL SECURITY;

-- Permite inserção pública de novos briefings (para os noivos preencherem sem login)
CREATE POLICY "Permitir inserção pública de briefings" 
ON public.convites_briefings FOR INSERT 
WITH CHECK (true);

-- Permite leitura de briefings (para o painel admin)
CREATE POLICY "Permitir leitura de briefings" 
ON public.convites_briefings FOR SELECT 
USING (true);

-- Permite atualização de status no admin
CREATE POLICY "Permitir atualização de briefings" 
ON public.convites_briefings FOR UPDATE 
USING (true);

-- Permite leitura pública de preços
CREATE POLICY "Permitir leitura pública de planos" 
ON public.convites_planos FOR SELECT 
USING (true);

-- Permite atualização de preços pelo admin
CREATE POLICY "Permitir atualização de planos" 
ON public.convites_planos FOR UPDATE 
USING (true);
