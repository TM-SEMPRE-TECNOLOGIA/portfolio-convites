// ==========================================================================
// PORTFÓLIO DE CONVITES - INTERATIVIDADE & ANIMAÇÕES GSAP
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar Modal de Prévia Interativa (Simulador Mobile)
  const modal = document.getElementById('previewModal');
  const modalIframe = document.getElementById('modalIframe');
  const modalClose = document.getElementById('modalClose');
  const previewBtns = document.querySelectorAll('.btn-preview');

  previewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const src = btn.getAttribute('data-src');
      if (src) {
        modalIframe.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Travar scroll do fundo
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => {
      modalIframe.src = '';
    }, 300);
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 2. Animações GSAP 3 & ScrollTrigger
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Entry Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    heroTl
      .from('.hero-badge', { y: -20, opacity: 0, delay: 0.2 })
      .from('.hero-title', { y: 30, opacity: 0 }, '-=0.6')
      .from('.hero-description', { y: 20, opacity: 0 }, '-=0.7')
      .from('.hero-actions', { y: 20, opacity: 0 }, '-=0.7')
      .from('.hero-metrics', { y: 20, opacity: 0 }, '-=0.6');

    // Cards Showcase Animation (Stagger Reveal)
    gsap.utils.toArray('.template-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: (i % 3) * 0.15
      });
    });

    // Benefits Cards Animation
    gsap.utils.toArray('.benefit-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.1
      });
    });

    // Steps Cards Animation
    gsap.utils.toArray('.step-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.15
      });
    });
  }
});
