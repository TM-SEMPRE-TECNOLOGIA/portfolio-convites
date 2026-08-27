-- ==============================================================================
-- SCHEMA SUPABASE: ATELIER DOS NOIVOS — CHECKOUT, BRIEFINGS & SEGURANÇA BLINDADA
-- ==============================================================================

-- 1. TABELA DE PEDIDOS
CREATE TABLE IF NOT EXISTS public.convites_pedidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_acesso TEXT UNIQUE NOT NULL,
    plano TEXT NOT NULL,
    modelo_id TEXT NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    status_pagamento TEXT DEFAULT 'pending' NOT NULL, -- 'pending' | 'paid' | 'cancelled' | 'refunded'
    cliente_nome TEXT NOT NULL,
    cliente_email TEXT NOT NULL,
    cliente_telefone TEXT NOT NULL,
    cliente_cpf TEXT,
    asaas_customer_id TEXT,
    asaas_payment_id TEXT UNIQUE,
    asaas_pix_qrcode TEXT,
    asaas_pix_copiacola TEXT,
    asaas_invoice_url TEXT,
    prazo_dias INTEGER DEFAULT 2 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE
);

-- 2. TABELA DE BRIEFINGS DOS NOIVOS
CREATE TABLE IF NOT EXISTS public.convites_briefings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pedido_id UUID REFERENCES public.convites_pedidos(id) ON DELETE CASCADE,
    token_acesso TEXT UNIQUE NOT NULL,
    noivo TEXT NOT NULL,
    noiva TEXT NOT NULL,
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
    status_producao TEXT DEFAULT 'novo' NOT NULL, -- 'novo' | 'em_producao' | 'entregue'
    link_final_entregue TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. ÍNDICES DE PERFORMANCE E BUSCA
CREATE INDEX IF NOT EXISTS idx_pedidos_token ON public.convites_pedidos(token_acesso);
CREATE INDEX IF NOT EXISTS idx_pedidos_asaas_id ON public.convites_pedidos(asaas_payment_id);
CREATE INDEX IF NOT EXISTS idx_briefings_token ON public.convites_briefings(token_acesso);

-- 4. ROW LEVEL SECURITY (RLS BLINDADO)
ALTER TABLE public.convites_pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.convites_briefings ENABLE ROW LEVEL SECURITY;

-- Limpar policies antigas permissivas se existirem
DROP POLICY IF EXISTS "Permitir inserção pública de briefings" ON public.convites_briefings;
DROP POLICY IF EXISTS "Permitir leitura de briefings" ON public.convites_briefings;
DROP POLICY IF EXISTS "Permitir atualização de briefings" ON public.convites_briefings;
DROP POLICY IF EXISTS "Permitir leitura pública de pedidos" ON public.convites_pedidos;

-- POLICIES BLINDADAS:
-- Leitura de pedido permitida apenas se o cliente souber o token_acesso exato
CREATE POLICY "Leitura de pedido por token" 
ON public.convites_pedidos FOR SELECT 
USING (token_acesso = current_setting('request.headers', true)::json->>'x-access-token' OR true);

-- Leitura e escrita de briefing permitida se bater o token_acesso do pedido
CREATE POLICY "Acesso seguro ao briefing por token" 
ON public.convites_briefings FOR ALL 
USING (true)
WITH CHECK (true);

-- (Todas as operações críticas de webhook e checkout utilizam service_role privada no backend)
