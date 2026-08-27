// ==============================================================================
// WEBHOOK ASAAS — PROCESSAMENTO AUTOMÁTICO DE PAGAMENTOS CONFIRMADOS
// ==============================================================================

import { sendCustomerPaidEmail } from "../notify/email.js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://zuctjpgrddewaxjfmpli.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { event, payment } = req.body;
    console.log(`[Asaas Webhook] Evento recebido: ${event}`, payment?.id);

    if (event === "PAYMENT_CONFIRMED" || event === "PAYMENT_RECEIVED") {
      const paymentId = payment.id;
      const externalReference = payment.externalReference; // token_acesso

      if (!paymentId && !externalReference) {
        return res.status(400).json({ error: "Referência de pagamento não encontrada" });
      }

      // 1. Buscar dados do Pedido no Supabase
      let pedido = null;
      if (SUPABASE_SERVICE_ROLE_KEY) {
        const queryUrl = externalReference 
          ? `${SUPABASE_URL}/rest/v1/convites_pedidos?token_acesso=eq.${externalReference}`
          : `${SUPABASE_URL}/rest/v1/convites_pedidos?asaas_payment_id=eq.${paymentId}`;

        const getRes = await fetch(queryUrl, {
          headers: {
            "apikey": SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
          }
        });
        
        if (getRes.ok) {
          const list = await getRes.json();
          if (list && list.length > 0) {
            pedido = list[0];
          }
        }

        // 2. Atualizar status para 'paid'
        if (pedido) {
          await fetch(`${SUPABASE_URL}/rest/v1/convites_pedidos?id=eq.${pedido.id}`, {
            method: "PATCH",
            headers: {
              "apikey": SUPABASE_SERVICE_ROLE_KEY,
              "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              status_pagamento: "paid",
              paid_at: new Date().toISOString()
            })
          });

          // 3. Disparar E-mail automático para o Cliente com Prazo e Link do Briefing
          await sendCustomerPaidEmail({
            clienteNome: pedido.cliente_nome,
            clienteEmail: pedido.cliente_email,
            planoNome: pedido.plano,
            modeloNome: pedido.modelo_id,
            tokenAcesso: pedido.token_acesso,
            prazoDias: pedido.prazo_dias || 2
          });
          
          console.log(`[Asaas Webhook] Pagamento confirmado e e-mail enviado para: ${pedido.cliente_email}`);
        }
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("[Asaas Webhook Error]", error);
    return res.status(500).json({ error: "Erro interno no processamento do webhook" });
  }
}
