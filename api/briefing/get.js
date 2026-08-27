// ==============================================================================
// GET BRIEFING / PEDIDO POR TOKEN SEGURO
// ==============================================================================

const SUPABASE_URL = process.env.SUPABASE_URL || "https://zuctjpgrddewaxjfmpli.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: "Token de acesso ausente." });
  }

  try {
    let pedido = null;
    let briefing = null;

    if (SUPABASE_SERVICE_ROLE_KEY) {
      // 1. Buscar Pedido
      const pedidoRes = await fetch(`${SUPABASE_URL}/rest/v1/convites_pedidos?token_acesso=eq.${token}`, {
        headers: {
          "apikey": SUPABASE_SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
        }
      });
      if (pedidoRes.ok) {
        const list = await pedidoRes.json();
        if (list.length > 0) pedido = list[0];
      }

      // 2. Buscar Briefing existente (se já preenchido)
      const briefingRes = await fetch(`${SUPABASE_URL}/rest/v1/convites_briefings?token_acesso=eq.${token}`, {
        headers: {
          "apikey": SUPABASE_SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
        }
      });
      if (briefingRes.ok) {
        const list = await briefingRes.json();
        if (list.length > 0) briefing = list[0];
      }
    }

    if (!pedido) {
      // Fallback para desenvolvimento / token local
      return res.status(200).json({
        valid: true,
        mock: true,
        pedido: {
          token_acesso: token,
          cliente_nome: "Cliente de Demonstração",
          plano: "Plano Silver",
          modelo_id: "royal-gold",
          status_pagamento: "paid",
          prazo_dias: 2
        },
        briefing: null
      });
    }

    return res.status(200).json({
      valid: true,
      pedido,
      briefing
    });
  } catch (err) {
    console.error("[Briefing Get Error]", err);
    return res.status(500).json({ error: "Erro ao buscar dados do pedido." });
  }
}
