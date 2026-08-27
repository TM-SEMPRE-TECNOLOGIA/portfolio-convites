// ==============================================================================
// SUBMIT BRIEFING — SALVA NO SUPABASE E NOTIFICA O ADMIN VIA RESEND
// ==============================================================================

import { sendAdminBriefingNotification } from "../_lib/email.js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://zuctjpgrddewaxjfmpli.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { token, briefingData } = req.body;

    if (!token || !briefingData) {
      return res.status(400).json({ error: "Dados incompletos." });
    }

    let pedido = null;

    if (SUPABASE_SERVICE_ROLE_KEY) {
      // 1. Buscar Pedido pelo Token
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

      // 2. Salvar / Atualizar Briefing
      const payloadBriefing = {
        token_acesso: token,
        pedido_id: pedido ? pedido.id : null,
        noivo: briefingData.noivo || "",
        noiva: briefingData.noiva || "",
        frase: briefingData.frase || "",
        pais: briefingData.pais || "",
        data_casamento: briefingData.data_casamento || "",
        horario: briefingData.horario || "",
        local_nome: briefingData.local_nome || "",
        endereco: briefingData.endereco || "",
        link_maps: briefingData.link_maps || "",
        recepcao: briefingData.recepcao || "",
        dress_code: briefingData.dress_code || "",
        restricoes: briefingData.restricoes || "",
        cronograma: briefingData.cronograma || "",
        rsvp_data: briefingData.rsvp_data || "",
        rsvp_whatsapp: briefingData.rsvp_whatsapp || "",
        pix_chave: briefingData.pix_chave || "",
        pix_titular: briefingData.pix_titular || "",
        link_lista: briefingData.link_lista || "",
        link_fotos: briefingData.link_fotos || "",
        musica: briefingData.musica || "",
        observacoes: briefingData.observacoes || "",
        status_producao: "novo",
        updated_at: new Date().toISOString()
      };

      // Inserir ou atualizar na tabela convites_briefings
      await fetch(`${SUPABASE_URL}/rest/v1/convites_briefings`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_SERVICE_ROLE_KEY,
          "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "resolution=merge-duplicates"
        },
        body: JSON.stringify(payloadBriefing)
      });
    }

    // 3. Disparar e-mail de alerta para o Administrador (Você) com todos os dados preenchidos
    await sendAdminBriefingNotification({
      briefing: briefingData,
      pedido: pedido || {
        modelo_id: briefingData.modelo || "Convite",
        plano: briefingData.plano || "Personalizado",
        cliente_nome: briefingData.noivo + " & " + briefingData.noiva
      }
    });

    return res.status(200).json({
      success: true,
      message: "Briefing enviado com sucesso! Nossa equipe já iniciou a preparação do seu convite."
    });

  } catch (error) {
    console.error("[Briefing Submit Error]", error);
    return res.status(500).json({ error: "Falha ao enviar briefing", details: error.message });
  }
}

