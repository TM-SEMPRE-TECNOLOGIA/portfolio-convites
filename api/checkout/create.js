// ==============================================================================
// ENDPOINT SERVERLESS: CRIAÇÃO DE CHECKOUT ASAAS & PEDIDO SUPABASE
// ==============================================================================

import crypto from "crypto";
import { sendCustomerPaidEmail } from "../_lib/email.js";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://zuctjpgrddewaxjfmpli.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const ASAAS_API_URL = process.env.ASAAS_API_URL || "https://api.asaas.com/v3";

const PRICES = {
  light: { name: "Plano Light", price: 99.00 },
  silver: { name: "Plano Silver", price: 149.00 },
  gold: { name: "Plano Gold", price: 199.00 },
  premium: { name: "Plano Premium", price: 250.00 }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const {
      modeloId,
      planoId,
      clienteNome,
      clienteEmail,
      clienteTelefone,
      clienteCpf,
      paymentMethod = "PIX",
      creditCard,
      creditCardHolderInfo
    } = req.body;

    if (!modeloId || !planoId || !clienteNome || !clienteEmail || !clienteTelefone) {
      return res.status(400).json({ error: "Dados obrigatórios não preenchidos." });
    }

    const plano = PRICES[planoId.toLowerCase()] || PRICES.light;
    const tokenAcesso = crypto.randomUUID();
    const dueDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    let asaasCustomerId = null;
    let asaasPaymentId = null;
    let asaasPixQrCode = null;
    let asaasPixCopiaCola = null;
    let asaasInvoiceUrl = null;
    let statusPagamento = "pending";

    // 1. Integração com Asaas (se chave estiver configurada)
    if (ASAAS_API_KEY) {
      try {
        // Criar ou buscar cliente no Asaas
        const customerRes = await fetch(`${ASAAS_API_URL}/customers`, {
          method: "POST",
          headers: {
            "access_token": ASAAS_API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: clienteNome,
            email: clienteEmail,
            phone: clienteTelefone.replace(/\D/g, ""),
            cpfCnpj: clienteCpf ? clienteCpf.replace(/\D/g, "") : undefined
          })
        });
        const customerData = await customerRes.json();
        asaasCustomerId = customerData.id;

        // Montar payload de pagamento
        const paymentPayload = {
          customer: asaasCustomerId,
          billingType: paymentMethod,
          value: plano.price,
          dueDate: dueDate,
          description: `Convite Digital Interativo — Modelo ${modeloId} (${plano.name})`,
          externalReference: tokenAcesso
        };

        if (paymentMethod === "CREDIT_CARD" && creditCard) {
          paymentPayload.creditCard = creditCard;
          paymentPayload.creditCardHolderInfo = creditCardHolderInfo || {
            name: clienteNome,
            email: clienteEmail,
            cpfCnpj: clienteCpf ? clienteCpf.replace(/\D/g, "") : "",
            postalCode: "74000000",
            addressNumber: "1",
            phone: clienteTelefone.replace(/\D/g, "")
          };
        }

        // Criar Cobrança
        const paymentRes = await fetch(`${ASAAS_API_URL}/payments`, {
          method: "POST",
          headers: {
            "access_token": ASAAS_API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(paymentPayload)
        });
        const paymentData = await paymentRes.json();
        
        if (paymentRes.ok) {
          asaasPaymentId = paymentData.id;
          asaasInvoiceUrl = paymentData.invoiceUrl;
          if (paymentData.status === "CONFIRMED" || paymentData.status === "RECEIVED") {
            statusPagamento = "paid";
          }

          // Se for PIX, buscar o QR Code e o Copia e Cola
          if (paymentMethod === "PIX") {
            const pixRes = await fetch(`${ASAAS_API_URL}/payments/${asaasPaymentId}/pixQrCode`, {
              headers: { "access_token": ASAAS_API_KEY }
            });
            if (pixRes.ok) {
              const pixData = await pixRes.json();
              asaasPixQrCode = pixData.encodedImage;
              asaasPixCopiaCola = pixData.payload;
            }
          }
        } else {
          console.warn("[Asaas Warning]", paymentData);
        }
      } catch (asaasErr) {
        console.error("[Asaas Exception]", asaasErr);
      }
    } else {
      // Modo Mock / Sandbox para desenvolvimento local sem API Key do Asaas
      console.log("[Checkout Mock] Criando pedido em modo simulação.");
      asaasPaymentId = "pay_mock_" + Date.now();
      asaasPixCopiaCola = "00020126580014BR.GOV.BCB.PIX0136mock-atelier-noivos-pix5204000053039865405" + plano.price + "5802BR5920Atelier dos Noivos6008Goiania62070503***6304ABCD";
    }

    // 2. Salvar Pedido no Supabase
    if (SUPABASE_SERVICE_ROLE_KEY) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/convites_pedidos`, {
          method: "POST",
          headers: {
            "apikey": SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
            "Content-Type": "application/json",
            "Prefer": "return=minimal"
          },
          body: JSON.stringify({
            token_acesso: tokenAcesso,
            plano: plano.name,
            modelo_id: modeloId,
            valor: plano.price,
            status_pagamento: statusPagamento,
            cliente_nome: clienteNome,
            cliente_email: clienteEmail,
            cliente_telefone: clienteTelefone,
            cliente_cpf: clienteCpf || null,
            asaas_customer_id: asaasCustomerId,
            asaas_payment_id: asaasPaymentId,
            asaas_pix_qrcode: asaasPixQrCode,
            asaas_pix_copiacola: asaasPixCopiaCola,
            asaas_invoice_url: asaasInvoiceUrl,
            prazo_dias: 2
          })
        });
      } catch (dbErr) {
        console.error("[Supabase DB Error]", dbErr);
      }
    }

    // Se já estiver pago (ex: Cartão aprovado na hora), envia o e-mail para o cliente
    if (statusPagamento === "paid") {
      await sendCustomerPaidEmail({
        clienteNome,
        clienteEmail,
        planoNome: plano.name,
        modeloNome: modeloId,
        tokenAcesso,
        prazoDias: 2
      });
    }

    return res.status(200).json({
      success: true,
      token: tokenAcesso,
      paymentId: asaasPaymentId,
      status: statusPagamento,
      valor: plano.price,
      pix: {
        encodedImage: asaasPixQrCode,
        copiaCola: asaasPixCopiaCola
      },
      invoiceUrl: asaasInvoiceUrl
    });

  } catch (error) {
    console.error("[Checkout Serverless Error]", error);
    return res.status(500).json({ error: "Falha ao processar checkout", details: error.message });
  }
}

