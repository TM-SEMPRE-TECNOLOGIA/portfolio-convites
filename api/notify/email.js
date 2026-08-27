// ==============================================================================
// RESEND EMAIL HELPER — ATELIER DOS NOIVOS
// ==============================================================================

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM = process.env.RESEND_FROM || "Atelier dos Noivos <contato@resend.dev>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "thiagonascimento.barbosapro@gmail.com";

export async function sendEmail({ to, subject, html }) {
  if (!RESEND_API_KEY) {
    console.warn("[RESEND] RESEND_API_KEY não configurada. E-mail simulado:", { to, subject });
    return { success: false, error: "API Key ausente" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: Array.isArray(to) ? to : [to],
        subject: subject,
        html: html
      })
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("[RESEND Error]", data);
      return { success: false, error: data };
    }
    return { success: true, data };
  } catch (err) {
    console.error("[RESEND Exception]", err);
    return { success: false, error: err.message };
  }
}

// 1. E-mail de Pagamento Aprovado para o Cliente (com Prazo e Link do Briefing)
export async function sendCustomerPaidEmail({ clienteNome, clienteEmail, planoNome, modeloNome, tokenAcesso, prazoDias = 2 }) {
  const briefingUrl = `https://portfolioconvites.vercel.app/briefing.html?token=${tokenAcesso}`;

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head><meta charset="utf-8"></head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7f5f0; color: #2b2b2b; padding: 40px 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5dccb; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        
        <!-- Header com estética Atelier -->
        <div style="background: #14161d; color: #ffffff; padding: 36px 30px; text-align: center; border-bottom: 2px solid #e5b869;">
          <span style="color: #e5b869; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">✦ Atelier dos Noivos ✦</span>
          <h1 style="font-family: 'Georgia', serif; font-size: 26px; font-weight: normal; margin: 12px 0 6px; color: #f6f6f8;">Pagamento Confirmado com Sucesso!</h1>
          <p style="color: #a0a4b8; font-size: 14px; margin: 0;">Estamos muito felizes em fazer parte da história de vocês.</p>
        </div>

        <!-- Conteúdo do E-mail -->
        <div style="padding: 36px 30px;">
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Olá, <strong>${clienteNome}</strong>,</p>
          <p style="font-size: 15px; line-height: 1.6; color: #555; margin: 0 0 24px;">
            Recebemos a confirmação do seu pedido para o convite digital interativo. Abaixo estão os detalhes da sua contratação:
          </p>

          <!-- Box de Resumo -->
          <div style="background: #faf8f5; border-left: 4px solid #e5b869; padding: 18px 20px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
            <p style="margin: 0 0 8px; font-size: 14px;"><strong>Modelo Escolhido:</strong> ${modeloNome}</p>
            <p style="margin: 0 0 8px; font-size: 14px;"><strong>Plano:</strong> ${planoNome}</p>
            <p style="margin: 0; font-size: 14px; color: #b78119;"><strong>⏳ Prazo Estimado para Entrega:</strong> ${prazoDias} dias úteis (após o preenchimento do formulário)</p>
          </div>

          <!-- Próximo Passo: Briefing -->
          <h2 style="font-family: 'Georgia', serif; font-size: 20px; color: #14161d; margin: 0 0 12px;">Qual é o próximo passo?</h2>
          <p style="font-size: 15px; line-height: 1.6; color: #555; margin: 0 0 24px;">
            Para darmos início à produção artesanal do seu convite, precisamos que você preencha os dados da cerimônia, músicas, fotos e informações no nosso formulário de personalização:
          </p>

          <!-- Botão de Ação -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="${briefingUrl}" style="background: #14161d; color: #e5b869; padding: 16px 36px; border-radius: 50px; text-decoration: none; font-weight: bold; font-size: 15px; display: inline-block; border: 1px solid #e5b869; box-shadow: 0 4px 12px rgba(229,184,105,0.2);">
              Preencher Dados do Convite ➔
            </a>
          </div>

          <p style="font-size: 13px; color: #888; text-align: center; margin: 0;">
            Link direto seguro: <a href="${briefingUrl}" style="color: #b78119;">${briefingUrl}</a>
          </p>
        </div>

        <!-- Rodapé -->
        <div style="background: #f0ebe1; padding: 20px 30px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #e5dccb;">
          <p style="margin: 0 0 4px;">Atelier dos Noivos • TM Sempre Tecnologia</p>
          <p style="margin: 0;">Este é um e-mail automático do seu pedido. Guarde este e-mail para acompanhar seu convite.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: clienteEmail,
    subject: `💍 Pedido Confirmado: Seu Convite Digital (${modeloNome}) — Atelier dos Noivos`,
    html: html
  });
}

// 2. E-mail de Notificação de Briefing Completo para o Administrador (Você)
export async function sendAdminBriefingNotification({ briefing, pedido }) {
  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f6; color: #222; padding: 20px;">
      <div style="max-width: 650px; margin: 0 auto; background: #fff; border-radius: 8px; border: 1px solid #ddd; padding: 24px;">
        <h2 style="color: #14161d; border-bottom: 2px solid #e5b869; padding-bottom: 8px; margin-top: 0;">
          🎉 Novo Briefing Recebido — Pronto para Produzir!
        </h2>
        
        <p><strong>Noivos:</strong> ${briefing.noivo} & ${briefing.noiva}</p>
        <p><strong>Modelo:</strong> ${pedido?.modelo_id || 'N/A'} | <strong>Plano:</strong> ${pedido?.plano || 'N/A'} (R$ ${pedido?.valor || 'N/A'})</p>
        <p><strong>Data do Casamento:</strong> ${briefing.data_casamento} às ${briefing.horario}</p>
        <p><strong>Local:</strong> ${briefing.local_nome} — ${briefing.endereco}</p>
        ${briefing.link_maps ? `<p><strong>Link Google Maps / Waze:</strong> <a href="${briefing.link_maps}">${briefing.link_maps}</a></p>` : ''}
        <p><strong>WhatsApp RSVP:</strong> ${briefing.rsvp_whatsapp} (Data limite: ${briefing.rsvp_data})</p>
        
        <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
        
        <h3>📸 Mídia e Personalização:</h3>
        <p><strong>Link das Fotos / Drive:</strong> <a href="${briefing.link_fotos}" target="_blank" style="color: #b78119; font-weight: bold;">${briefing.link_fotos}</a></p>
        ${briefing.musica ? `<p><strong>Música:</strong> ${briefing.musica}</p>` : ''}
        ${briefing.pix_chave ? `<p><strong>Chave PIX:</strong> ${briefing.pix_chave} (Titular: ${briefing.pix_titular || 'N/A'})</p>` : ''}
        ${briefing.link_lista ? `<p><strong>Lista de Presentes:</strong> <a href="${briefing.link_lista}">${briefing.link_lista}</a></p>` : ''}
        ${briefing.dress_code ? `<p><strong>Dress Code:</strong> ${briefing.dress_code}</p>` : ''}
        ${briefing.cronograma ? `<p><strong>Cronograma:</strong> ${briefing.cronograma}</p>` : ''}
        ${briefing.observacoes ? `<p><strong>Observações dos Noivos:</strong> ${briefing.observacoes}</p>` : ''}

        <hr style="border: 0; border-top: 1px solid #eee; margin: 16px 0;" />
        <p><strong>Contato do Cliente:</strong> ${pedido?.cliente_nome || ''} (${pedido?.cliente_email || ''} / ${pedido?.cliente_telefone || ''})</p>
        <p><strong>Token do Pedido:</strong> <code>${briefing.token_acesso}</code></p>
      </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `🔔 Novo Briefing: ${briefing.noivo} & ${briefing.noiva} (${pedido?.plano || 'Convite'})`,
    html: html
  });
}
