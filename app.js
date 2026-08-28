// ==============================================================================
// APP.JS - CONTROLLER DA VITRINE, PREVIEW & CHECKOUT (ATELIER DOS NOIVOS)
// ==============================================================================

import { TEMPLATES_DATA, PLANOS_DATA } from "./src/data/templates.js";

document.addEventListener("DOMContentLoaded", () => {
  let selectedModeloId = "royal-gold";
  let selectedPlanoId = "silver";
  let currentPaymentMethod = "PIX";

  // ----------------------------------------------------------------------------
  // 0. PRELOADER SPLASH SCREEN (ALIANCAS ENTRELACADAS)
  // ----------------------------------------------------------------------------
  const preloader = document.getElementById("sitePreloader");
  const progressFill = document.getElementById("preloaderProgress");

  if (preloader && progressFill) {
    let progress = 10;
    progressFill.style.width = `${progress}%`;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 1200) {
        progress = Math.min(65, progress + 6);
      } else if (elapsed < 2200) {
        progress = Math.min(90, progress + 3);
      }
      progressFill.style.width = `${progress}%`;
    }, 100);

    const finishPreloader = async () => {
      // Aguarda fontes renderizarem para evitar FOUT / textos pulando
      if (document.fonts) {
        await document.fonts.ready;
      }
      
      const elapsed = Date.now() - startTime;
      const minDuration = 2200; // Garante que todos os elementos e videos da pagina estejam prontos
      const remaining = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        clearInterval(interval);
        progressFill.style.width = "100%";
        setTimeout(() => {
          preloader.classList.add("loaded");
        }, 350);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finishPreloader();
    } else {
      window.addEventListener("load", finishPreloader);
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
  }

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
  // 2. RENDERIZAR VITRINE DE MODELOS (MOCKUPS VERTICAIS COM VIDEO ATIVO)
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
          <video class="lazy-video" src="${template.video}" autoplay muted loop playsinline preload="auto" aria-hidden="true"></video>
        </div>
        <div class="template-info">
          <span class="template-tagline">${template.tagline}</span>
          <h3 class="template-name">${template.name}</h3>
          <p class="template-desc">${template.description}</p>
          <div class="template-actions">
            <button type="button" class="btn btn-outline btn-sm btn-open-demo" data-url="${template.demoUrl}" data-title="${template.name}">
              Testar Modelo
            </button>
            <button type="button" class="btn btn-primary btn-sm btn-select-model" data-id="${template.id}" data-name="${template.name}">
              Escolher Este
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
  // 3. RENDERIZAR TABELA DE PRECOS (4 PLANOS COM DESTAQUE NO SILVER)
  // ----------------------------------------------------------------------------
  const pricingGrid = document.getElementById("pricingGrid");

  function renderPricing() {
    if (!pricingGrid) return;
    pricingGrid.innerHTML = "";

    PLANOS_DATA.forEach(plano => {
      const card = document.createElement("div");
      card.className = `pricing-card ${plano.popular ? "popular" : ""} reveal`;

      const featuresHtml = plano.features.map(f => `<li>${f}</li>`).join("");

      card.innerHTML = `
        ${plano.popular ? '<span class="pricing-badge-popular">Mais Escolhido pelos Noivos</span>' : ''}
        <div class="pricing-card-header">
          <h3 class="plan-name">${plano.name}</h3>
          <p class="plan-tagline">${plano.tagline}</p>
          <div class="plan-price">${plano.formattedPrice} <small>/ unico</small></div>
        </div>
        <ul class="plan-features">
          ${featuresHtml}
        </ul>
        <button type="button" class="btn ${plano.popular ? "btn-gold" : "btn-primary"} btn-block btn-select-plano" data-id="${plano.id}">
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

  // Adicionar classe reveal as secoes principais
  document.querySelectorAll(".section, .proof-strip, .hero-content, .hero-mockup-area").forEach(el => {
    el.classList.add("reveal");
  });

  observeMediaAndReveals();
});
