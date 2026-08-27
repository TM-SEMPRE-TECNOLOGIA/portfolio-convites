// ==============================================================================
// APP.JS — CONTROLLER DA VITRINE, PREVIEW & CHECKOUT ASAAS (ATELIER DOS NOIVOS)
// ==============================================================================

import { TEMPLATES_DATA, PLANOS_DATA } from "./src/data/templates.js";

document.addEventListener("DOMContentLoaded", () => {
  let selectedModeloId = "royal-gold";
  let selectedPlanoId = "silver";
  let currentPaymentMethod = "PIX";

  // 1. RENDERIZAR GRID DE TEMPLATES
  const templatesGrid = document.getElementById("templatesGrid");
  
  function renderTemplates(filter = "all") {
    if (!templatesGrid) return;
    templatesGrid.innerHTML = "";

    const filtered = filter === "all" 
      ? TEMPLATES_DATA 
      : TEMPLATES_DATA.filter(t => t.category === filter || (filter === "destination" && (t.category === "destination" || t.category === "ao-ar-livre")));

    filtered.forEach(template => {
      const card = document.createElement("div");
      card.className = "template-card";
      card.innerHTML = `
        <div class="template-media">
          <span class="template-badge">${template.badge}</span>
          <video src="${template.video}" autoplay muted loop playsinline></video>
        </div>
        <div class="template-info">
          <h3 class="template-title">${template.name}</h3>
          <p class="template-style">${template.tagline}</p>
          <p class="template-desc">${template.description}</p>
          <div class="template-actions">
            <button class="btn btn-outline btn-sm btn-open-demo" data-url="${template.demoUrl}" data-title="${template.name}">
              Ver Demo
            </button>
            <button class="btn btn-primary btn-sm btn-select-model" data-id="${template.id}" data-name="${template.name}">
              Quero Este
            </button>
          </div>
        </div>
      `;
      templatesGrid.appendChild(card);
    });

    // Eventos dos botões de Demo
    document.querySelectorAll(".btn-open-demo").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const url = btn.getAttribute("data-url");
        const title = btn.getAttribute("data-title");
        openPreviewModal(url, title);
      });
    });

    // Eventos dos botões de Selecionar Modelo
    document.querySelectorAll(".btn-select-model").forEach(btn => {
      btn.addEventListener("click", (e) => {
        selectedModeloId = btn.getAttribute("data-id");
        openCheckoutModal(selectedPlanoId, selectedModeloId);
      });
    });
  }

  renderTemplates();

  // Filtros de Categoria
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderTemplates(btn.getAttribute("data-filter"));
    });
  });

  // 2. RENDERIZAR GRID DE PLANOS
  const pricingGrid = document.getElementById("pricingGrid");
  if (pricingGrid) {
    pricingGrid.innerHTML = "";
    PLANOS_DATA.forEach(plano => {
      const card = document.createElement("div");
      card.className = `pricing-card ${plano.popular ? "popular" : ""}`;
      
      const featuresHtml = plano.features.map(f => `<li>${f}</li>`).join("");

      card.innerHTML = `
        ${plano.popular ? '<span class="popular-badge">Mais Escolhido 🤍</span>' : ''}
        <div class="pricing-header">
          <h3 class="pricing-name">${plano.name}</h3>
          <p class="pricing-tagline">${plano.tagline}</p>
          <div class="pricing-price">${plano.formattedPrice}<small> / único</small></div>
        </div>
        <ul class="pricing-features">
          ${featuresHtml}
        </ul>
        <button class="btn ${plano.popular ? "btn-gold" : "btn-primary"} btn-block btn-select-plano" data-id="${plano.id}">
          Escolher ${plano.name}
        </button>
      `;
      pricingGrid.appendChild(card);
    });

    document.querySelectorAll(".btn-select-plano").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedPlanoId = btn.getAttribute("data-id");
        openCheckoutModal(selectedPlanoId, selectedModeloId);
      });
    });
  }

  // 3. MODAL DE PRÉVIA INTERATIVA
  const previewModal = document.getElementById("previewModal");
  const previewIframe = document.getElementById("previewIframe");
  const previewModalTitle = document.getElementById("previewModalTitle");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  function openPreviewModal(url, title) {
    if (!previewModal || !previewIframe) return;
    previewIframe.src = url;
    if (previewModalTitle) previewModalTitle.textContent = `Prévia: ${title}`;
    previewModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closePreviewModal() {
    if (!previewModal || !previewIframe) return;
    previewModal.classList.remove("active");
    setTimeout(() => { previewIframe.src = ""; }, 250);
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closePreviewModal);
  if (previewModal) {
    previewModal.addEventListener("click", (e) => {
      if (e.target === previewModal) closePreviewModal();
    });
  }

  // 4. MODAL DE CHECKOUT INTEGRADO (ASAAS)
  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutForm = document.getElementById("checkoutForm");
  const pixScreen = document.getElementById("pixScreen");
  const btnCancelCheckout = document.getElementById("btnCancelCheckout");
  const chkPlanoNome = document.getElementById("chkPlanoNome");
  const chkModeloNome = document.getElementById("chkModeloNome");
  const chkPlanoValor = document.getElementById("chkPlanoValor");

  function openCheckoutModal(planoId, modeloId) {
    if (!checkoutModal) return;
    selectedPlanoId = planoId || "silver";
    selectedModeloId = modeloId || "royal-gold";

    const plano = PLANOS_DATA.find(p => p.id === selectedPlanoId) || PLANOS_DATA[1];
    const modelo = TEMPLATES_DATA.find(m => m.id === selectedModeloId) || TEMPLATES_DATA[0];

    if (chkPlanoNome) chkPlanoNome.textContent = plano.name;
    if (chkModeloNome) chkModeloNome.textContent = `Modelo: ${modelo.name}`;
    if (chkPlanoValor) chkPlanoValor.textContent = plano.formattedPrice;

    if (checkoutForm) checkoutForm.style.display = "block";
    if (pixScreen) pixScreen.style.display = "none";

    checkoutModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCheckoutModal() {
    if (!checkoutModal) return;
    checkoutModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (btnCancelCheckout) btnCancelCheckout.addEventListener("click", closeCheckoutModal);
  if (checkoutModal) {
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) closeCheckoutModal();
    });
  }

  // Abas de Forma de Pagamento
  document.querySelectorAll(".pay-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pay-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentPaymentMethod = btn.getAttribute("data-method");
    });
  });

  // Envio do Checkout
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btnSubmit = document.getElementById("btnSubmitCheckout");
      const originalText = btnSubmit.innerHTML;
      btnSubmit.innerHTML = "Gerando Pagamento...";
      btnSubmit.disabled = true;

      const payload = {
        modeloId: selectedModeloId,
        planoId: selectedPlanoId,
        clienteNome: document.getElementById("chkNome").value.trim(),
        clienteEmail: document.getElementById("chkEmail").value.trim(),
        clienteTelefone: document.getElementById("chkTelefone").value.trim(),
        clienteCpf: document.getElementById("chkCpf").value.trim(),
        paymentMethod: currentPaymentMethod
      };

      try {
        const response = await fetch("/api/checkout/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          const briefingUrl = `/briefing.html?token=${data.token}`;

          if (currentPaymentMethod === "PIX" && data.pix) {
            // Exibir tela de PIX
            checkoutForm.style.display = "none";
            pixScreen.style.display = "block";

            const qrContainer = document.getElementById("pixQrCodeContainer");
            if (data.pix.encodedImage && qrContainer) {
              qrContainer.innerHTML = `<img src="data:image/png;base64,${data.pix.encodedImage}" alt="QR Code PIX" class="pix-qr-img">`;
            } else if (qrContainer) {
              qrContainer.innerHTML = `<div style="padding: 20px; background:#f0f0f0; border-radius:8px; margin-bottom:12px;">QR Code gerado para o pedido</div>`;
            }

            const copiaColaInput = document.getElementById("pixCopiaColaInput");
            if (copiaColaInput) copiaColaInput.value = data.pix.copiaCola || "Chave PIX do pedido";

            const btnGoBriefing = document.getElementById("btnGoToBriefingDirectly");
            if (btnGoBriefing) btnGoBriefing.href = briefingUrl;

            // Botão copiar PIX
            const btnCopyPix = document.getElementById("btnCopyPix");
            if (btnCopyPix) {
              btnCopyPix.onclick = () => {
                if (copiaColaInput) {
                  navigator.clipboard.writeText(copiaColaInput.value);
                  btnCopyPix.textContent = "✓ Código PIX Copiado!";
                  setTimeout(() => { btnCopyPix.textContent = "📋 Copiar Código PIX"; }, 2000);
                }
              };
            }
          } else {
            // Redirecionamento direto para o briefing
            window.location.href = briefingUrl;
          }
        } else {
          alert("Aviso: " + (data.error || "Não foi possível gerar a cobrança."));
        }
      } catch (err) {
        console.warn("API de checkout offline. Redirecionando para simulação de briefing.", err);
        // Modo fallback local para teste imediato
        const mockToken = "token_demo_" + Date.now();
        window.location.href = `/briefing.html?token=${mockToken}`;
      } finally {
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
      }
    });
  }

  // Tecla ESC fecha modais
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePreviewModal();
      closeCheckoutModal();
    }
  });
});
