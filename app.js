// ==============================================================================
// APP.JS - CONTROLLER DA VITRINE, PREVIEW & CHECKOUT (ATELIER DOS NOIVOS)
// ==============================================================================

import { TEMPLATES_DATA, PLANOS_DATA } from "./src/data/templates.js";

document.addEventListener("DOMContentLoaded", () => {
  let selectedModeloId = "royal-gold";
  let selectedPlanoId = "completo";
  let currentPaymentMethod = "PIX";

  // ----------------------------------------------------------------------------
  // 0. PRELOADER SPLASH SCREEN (ALIANCAS ENTRELACADAS)
  // ----------------------------------------------------------------------------
  const preloader = document.getElementById("sitePreloader");

  if (preloader) {
    const checkAllLoaded = async () => {
      // 1. Aguarda todas as fontes web (Outfit, etc.)
      if (document.fonts) {
        try {
          await document.fonts.ready;
        } catch (e) {}
      }

      // 2. Aguarda carregamento de todas as imagens da pagina
      const images = Array.from(document.images);
      const imgPromises = images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      });
      await Promise.all(imgPromises);

      // 3. Aguarda dupla frame de renderizacao para evitar qualquer piscada
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      // 4. Libera a pagina suavemente
      preloader.classList.add("loaded");
    };

    if (document.readyState === "complete") {
      checkAllLoaded();
    } else {
      window.addEventListener("load", checkAllLoaded);
    }
  }

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

    document.querySelectorAll(".nav-mobile a").forEach(link => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
        navMobile.setAttribute("aria-hidden", "true");
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 2. RENDERIZAR VITRINE DE MODELOS (MOCKUPS VERTICAIS COM PREVIEW)
  // ----------------------------------------------------------------------------
  const templatesGrid = document.getElementById("templatesGrid");

  function renderTemplates(filter = "all") {
    if (!templatesGrid) return;
    templatesGrid.innerHTML = "";

    const filtered = filter === "all"
      ? TEMPLATES_DATA
      : TEMPLATES_DATA.filter(t => t.category === filter || (filter === "destination" && (t.category === "destination" || t.category === "ao-ar-livre")));

    filtered.forEach(template => {
      const card = document.createElement("article");
      card.className = "template-card reveal";

      const dotsHtml = (template.palette || [])
        .map(color => `<span class="palette-dot" style="background-color: ${color};" title="${color}"></span>`)
        .join("");

      card.innerHTML = `
        <div class="template-mockup-frame btn-open-demo" data-url="${template.demoUrl}" data-title="${template.name}" role="button" tabindex="0" aria-label="Abrir demonstracao interativa de ${template.name}">
          <span class="template-badge">${template.badge || "Exclusivo"}</span>
          <div class="template-palette-dots">${dotsHtml}</div>
          <video class="lazy-video" src="${template.video}" poster="${template.poster || ''}" preload="metadata" muted loop playsinline aria-hidden="true"></video>
        </div>
        <div class="template-info">
          <span class="template-tagline">${template.tagline}</span>
          <h3 class="template-name">${template.name}</h3>
          <p class="template-desc">${template.description}</p>
          <div class="template-actions">
            <button type="button" class="btn btn-outline btn-sm btn-open-demo" data-url="${template.demoUrl}" data-title="${template.name}">
              Ver Demo
            </button>
            <button type="button" class="btn btn-gold btn-sm btn-select-model" data-id="${template.id}" data-name="${template.name}">
              Escolher por R$ 87,90
            </button>
          </div>
        </div>
      `;

      templatesGrid.appendChild(card);
    });

    // Eventos de clique para Preview
    document.querySelectorAll(".btn-open-demo").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const url = btn.getAttribute("data-url");
        const title = btn.getAttribute("data-title");
        if (url) openPreviewModal(url, title);
      });
    });

    // Eventos de clique para Escolher Modelo
    document.querySelectorAll(".btn-select-model").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        selectedModeloId = btn.getAttribute("data-id");
        openCheckoutModal(selectedPlanoId, selectedModeloId);
      });
    });

    // Observador de videos e scroll reveal
    observeMediaAndReveals();
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

  // ----------------------------------------------------------------------------
  // 3. RENDERIZAR OFERTA UNICA (R$ 87,90 - TUDO INCLUIDO)
  // ----------------------------------------------------------------------------
  const pricingGrid = document.getElementById("pricingGrid");

  function renderPricing() {
    if (!pricingGrid) return;
    pricingGrid.innerHTML = "";

    const plano = PLANOS_DATA[0] || {
      id: "completo",
      name: "Convite Digital Completo",
      price: 87.90,
      formattedPrice: "R$ 87,90",
      tagline: "Tudo Incluido • Oferta Especial",
      features: [
        "Qualquer modelo autoral da colecao a sua escolha",
        "Foto e historia dos noivos em alta definicao",
        "Confirmacao de presenca em tempo real (WhatsApp)",
        "Rotas com clique direto para Google Maps e Waze",
        "Trilha sonora do casal (player com musica de fundo)",
        "Galeria de fotos e momentos especiais",
        "Cronograma visual da cerimonia e festa",
        "Guia de trajes recomendados (Dress Code)",
        "Botao de Presente via PIX com Copia e Cola",
        "Link exclusivo e seguro (HTTPS) ativo ate o casamento",
        "Entrega expressa em ate 48h uteis apos o briefing"
      ]
    };

    const card = document.createElement("div");
    card.className = "single-pricing-card reveal";

    const featuresHtml = plano.features.map(f => `
      <li class="single-feature-item">
        <span class="single-feature-icon">✓</span>
        <span>${f}</span>
      </li>
    `).join("");

    card.innerHTML = `
      <div class="single-pricing-badge">★ Oferta Exclusiva • Pagamento Unico</div>
      <div class="single-pricing-header">
        <h3 class="single-plan-title">${plano.name}</h3>
        <p class="single-plan-tagline">Design editorial, entrega em ate 48h uteis e tudo que seu casamento precisa.</p>
        <div class="single-plan-price-box">
          <span class="single-plan-price">${plano.formattedPrice}</span>
          <span class="single-plan-period">/ pagamento unico</span>
        </div>
      </div>
      
      <div class="single-pricing-body">
        <h4 class="single-features-title">Tudo o que esta incluido no seu convite:</h4>
        <ul class="single-features-list">
          ${featuresHtml}
        </ul>
      </div>

      <div class="single-pricing-footer">
        <button type="button" class="btn btn-gold btn-lg btn-block btn-select-plano" data-id="${plano.id}">
          Quero Meu Convite por R$ 87,90
        </button>
        <p class="single-pricing-guarantee">🔒 Pagamento 100% seguro via PIX ou Cartao • Sem mensalidades</p>
      </div>
    `;

    pricingGrid.appendChild(card);

    pricingGrid.querySelectorAll(".btn-select-plano").forEach(btn => {
      btn.addEventListener("click", () => {
        selectedPlanoId = btn.getAttribute("data-id");
        openCheckoutModal(selectedPlanoId, selectedModeloId);
      });
    });

    observeMediaAndReveals();
  }

  renderPricing();

  // ----------------------------------------------------------------------------
  // 4. MODAL DE PREVIA INTERATIVA (IFRAME FULLSCREEN RESPONSIVO)
  // ----------------------------------------------------------------------------
  const previewModal = document.getElementById("previewModal");
  const previewIframe = document.getElementById("previewIframe");
  const previewModalTitle = document.getElementById("previewModalTitle");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  function openPreviewModal(url, title) {
    if (!previewModal || !previewIframe) return;
    previewIframe.src = url;
    if (previewModalTitle) previewModalTitle.textContent = `Demonstracao: ${title}`;
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

  // Envio do Formulario de Checkout
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btnSubmit = document.getElementById("btnSubmitCheckout");
      const originalText = btnSubmit.innerHTML;
      btnSubmit.innerHTML = "Gerando Pagamento Seguro...";
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
            // Exibir tela do PIX
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

            const btnCopyPix = document.getElementById("btnCopyPix");
            if (btnCopyPix) {
              btnCopyPix.onclick = () => {
                if (copiaColaInput) {
                  navigator.clipboard.writeText(copiaColaInput.value);
                  btnCopyPix.textContent = "Codigo PIX Copiado!";
                  setTimeout(() => { btnCopyPix.textContent = "Copiar Codigo PIX"; }, 2000);
                }
              };
            }
          } else {
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
  // 6. OTIMIZACAO DE PERFORMANCE & CARREGAMENTO INTELIGENTE DE VIDEOS
  // ----------------------------------------------------------------------------
  function observeMediaAndReveals() {
    // 6.1 Scroll Reveal
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    } else if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

      document.querySelectorAll(".reveal:not(.visible)").forEach(el => {
        revealObserver.observe(el);
      });
    } else {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    }

    // 6.2 Otimizacao de Video (Play quando visivel, Pause quando invisivel para economizar GPU/CPU)
    if ("IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll("video").forEach(v => {
        videoObserver.observe(v);
      });
    } else {
      document.querySelectorAll("video").forEach(v => {
        v.play().catch(() => {});
      });
    }
  }

  // ----------------------------------------------------------------------------
  // 7. FAQ ACCORDION INTERATIVO
  // ----------------------------------------------------------------------------
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isExpanded = item.classList.contains("active");

      // Fecha outros itens para comportamento de acordeao limpo
      document.querySelectorAll(".faq-item").forEach(other => {
        if (other !== item) {
          other.classList.remove("active");
          const otherBtn = other.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      // Alterna item clicado
      item.classList.toggle("active");
      button.setAttribute("aria-expanded", !isExpanded ? "true" : "false");
    });
  });

  // ----------------------------------------------------------------------------
  // 8. MOBILE STICKY CTA SCROLL REVEAL (MANUS AI RECOMMENDATION)
  // ----------------------------------------------------------------------------
  const mobileStickyCta = document.getElementById("mobileStickyCta");
  if (mobileStickyCta) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 380) {
        mobileStickyCta.classList.add("visible");
      } else {
        mobileStickyCta.classList.remove("visible");
      }
    }, { passive: true });
  }

  // Adicionar classe reveal as secoes principais
  document.querySelectorAll(".section, .proof-strip, .hero-content, .hero-mockup-area, .comparison-card, .testimonial-card, .faq-item, .guest-flow-card").forEach(el => {
    el.classList.add("reveal");
  });

  observeMediaAndReveals();
});

