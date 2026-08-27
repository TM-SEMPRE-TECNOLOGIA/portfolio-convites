// ==============================================================================
// APP.JS - CONTROLLER DA VITRINE, PREVIEW & CHECKOUT (ATELIER DOS NOIVOS)
// ==============================================================================

import { TEMPLATES_DATA, PLANOS_DATA } from "./src/data/templates.js";

document.addEventListener("DOMContentLoaded", () => {
  let selectedModeloId = "minimalist";
  let selectedPlanoId = "silver";
  let currentPaymentMethod = "PIX";
  let showAllPlans = false;

  // ----------------------------------------------------------------------------
  // 1. MENU MOBILE
  // ----------------------------------------------------------------------------
  const navToggle = document.querySelector(".nav-toggle");
  const navMobile = document.querySelector(".nav-mobile");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (navMobile) {
        navMobile.setAttribute("aria-hidden", isOpen ? "false" : "true");
      }
    });
  }

  // Fechar menu mobile ao clicar em um link
  if (navMobile) {
    navMobile.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
        navMobile.setAttribute("aria-hidden", "true");
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 2. RENDERIZAR VITRINE DE TEMPLATES (LAYOUT EDITORIAL)
  // ----------------------------------------------------------------------------
  const templatesGrid = document.getElementById("templatesGrid");

  function renderTemplates(filter = "all") {
    if (!templatesGrid) return;
    templatesGrid.innerHTML = "";

    const filtered = filter === "all"
      ? TEMPLATES_DATA
      : TEMPLATES_DATA.filter(t => t.category === filter || (filter === "destination" && (t.category === "destination" || t.category === "ao-ar-livre")));

    filtered.forEach((template, index) => {
      const card = document.createElement("article");
      const isFeatured = filter === "all" && (index === 0 || index === 1);
      card.className = `template-card ${isFeatured ? "template-card--featured" : ""} reveal`;

      card.innerHTML = `
        <div class="template-media" data-url="${template.demoUrl}" data-title="${template.name}" role="button" tabindex="0" aria-label="Abrir demonstracao de ${template.name}">
          <video src="${template.video}" muted loop playsinline preload="metadata" loading="lazy" aria-hidden="true"></video>
        </div>
        <div class="template-info">
          <span class="template-tagline">${template.tagline}</span>
          <h3 class="template-name">${template.name}</h3>
          <p class="template-desc">${template.description}</p>
          <div class="template-actions">
            <button type="button" class="btn btn-outline btn-sm btn-open-demo" data-url="${template.demoUrl}" data-title="${template.name}">
              Ver demonstracao
            </button>
            <button type="button" class="btn btn-primary btn-sm btn-select-model" data-id="${template.id}" data-name="${template.name}">
              Escolher modelo
            </button>
          </div>
        </div>
      `;

      templatesGrid.appendChild(card);
    });

    // Iniciar videos ao passar o mouse / tocar
    templatesGrid.querySelectorAll(".template-media").forEach(media => {
      const video = media.querySelector("video");
      if (video) {
        media.addEventListener("mouseenter", () => {
          video.play().catch(() => {});
        });
        media.addEventListener("mouseleave", () => {
          video.pause();
        });
      }

      // Clique na midia abre preview
      media.addEventListener("click", () => {
        const url = media.getAttribute("data-url");
        const title = media.getAttribute("data-title");
        openPreviewModal(url, title);
      });

      media.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const url = media.getAttribute("data-url");
          const title = media.getAttribute("data-title");
          openPreviewModal(url, title);
        }
      });
    });

    // Botoes de Demo
    templatesGrid.querySelectorAll(".btn-open-demo").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const url = btn.getAttribute("data-url");
        const title = btn.getAttribute("data-title");
        openPreviewModal(url, title);
      });
    });

    // Botoes de Escolher Modelo
    templatesGrid.querySelectorAll(".btn-select-model").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectedModeloId = btn.getAttribute("data-id");
        openCheckoutModal(selectedPlanoId, selectedModeloId);
      });
    });

    // Aplicar observador de scroll nos novos cards
    observeReveals();
  }

  renderTemplates();

  // Filtros de Categoria
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      renderTemplates(btn.getAttribute("data-filter"));
    });
  });

  // Botoes da secao de destaque
  document.querySelectorAll(".featured-actions .btn-open-demo").forEach(btn => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");
      const title = btn.getAttribute("data-title");
      openPreviewModal(url, title);
    });
  });

  document.querySelectorAll(".featured-actions .btn-select-model").forEach(btn => {
    btn.addEventListener("click", () => {
      selectedModeloId = btn.getAttribute("data-id") || "minimalist";
      openCheckoutModal(selectedPlanoId, selectedModeloId);
    });
  });

  // ----------------------------------------------------------------------------
  // 3. RENDERIZAR GRID DE PRECOS (2 PLANOS POR PADRAO + TOGGLE)
  // ----------------------------------------------------------------------------
  const pricingGrid = document.getElementById("pricingGrid");
  const pricingToggle = document.getElementById("pricingToggle");

  function renderPricing() {
    if (!pricingGrid) return;
    pricingGrid.innerHTML = "";

    const visiblePlans = showAllPlans ? PLANOS_DATA : PLANOS_DATA.filter(p => p.visible);

    visiblePlans.forEach(plano => {
      const card = document.createElement("div");
      card.className = `pricing-card ${plano.popular ? "recommended popular" : ""} reveal`;

      const featuresHtml = plano.features.map(f => `<li>${f}</li>`).join("");

      card.innerHTML = `
        <div class="pricing-card-header">
          <h3 class="plan-name">${plano.name}</h3>
          <p class="plan-tagline">${plano.tagline}</p>
          <div class="plan-price">${plano.formattedPrice}</div>
        </div>
        <ul class="plan-features">
          ${featuresHtml}
        </ul>
        <button type="button" class="btn ${plano.popular ? "btn-primary" : "btn-outline"} btn-block btn-select-plano" data-id="${plano.id}">
          Escolher ${plano.name}
        </button>
      `;

      pricingGrid.appendChild(card);
    });

    pricingGrid.querySelectorAll(".btn-select-plano").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedPlanoId = btn.getAttribute("data-id");
        openCheckoutModal(selectedPlanoId, selectedModeloId);
      });
    });

    observeReveals();
  }

  renderPricing();

  if (pricingToggle) {
    pricingToggle.addEventListener("click", () => {
      showAllPlans = !showAllPlans;
      pricingToggle.textContent = showAllPlans ? "Ocultar planos adicionais" : "Ver todos os planos";
      pricingToggle.setAttribute("aria-expanded", showAllPlans ? "true" : "false");
      renderPricing();
    });
  }

  // ----------------------------------------------------------------------------
  // 4. MODAL DE PREVIA INTERATIVA
  // ----------------------------------------------------------------------------
  const previewModal = document.getElementById("previewModal");
  const previewIframe = document.getElementById("previewIframe");
  const previewModalTitle = document.getElementById("previewModalTitle");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  function openPreviewModal(url, title) {
    if (!previewModal || !previewIframe) return;
    previewIframe.src = url;
    if (previewModalTitle) previewModalTitle.textContent = `Preview: ${title}`;
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

  // ----------------------------------------------------------------------------
  // 5. MODAL DE CHECKOUT INTEGRADO (ASAAS)
  // ----------------------------------------------------------------------------
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
    selectedModeloId = modeloId || "minimalist";

    const plano = PLANOS_DATA.find(p => p.id === selectedPlanoId) || PLANOS_DATA[1];
    const modelo = TEMPLATES_DATA.find(m => m.id === selectedModeloId) || TEMPLATES_DATA[0];

    if (chkPlanoNome) chkPlanoNome.textContent = `Plano ${plano.name}`;
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
      btnSubmit.innerHTML = "Gerando pagamento...";
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

            // Botao copiar PIX
            const btnCopyPix = document.getElementById("btnCopyPix");
            if (btnCopyPix) {
              btnCopyPix.onclick = () => {
                if (copiaColaInput) {
                  navigator.clipboard.writeText(copiaColaInput.value);
                  btnCopyPix.textContent = "Codigo PIX copiado";
                  setTimeout(() => { btnCopyPix.textContent = "Copiar codigo PIX"; }, 2000);
                }
              };
            }
          } else {
            // Redirecionamento direto para o briefing
            window.location.href = briefingUrl;
          }
        } else {
          alert("Aviso: " + (data.error || "Nao foi possivel gerar a cobranca."));
        }
      } catch (err) {
        console.warn("API de checkout offline. Redirecionando para simulacao de briefing.", err);
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

  // ----------------------------------------------------------------------------
  // 6. SCROLL REVEAL (INTERSECTION OBSERVER COM SUPORTE A REDUCED MOTION)
  // ----------------------------------------------------------------------------
  function observeReveals() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll(".reveal:not(.visible)").forEach(el => {
      observer.observe(el);
    });
  }

  // Adicionar classe reveal as secoes principais
  document.querySelectorAll(".section, .proof-strip, .hero-content").forEach(el => {
    el.classList.add("reveal");
  });

  observeReveals();
});
