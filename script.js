(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Entrada suave dos cards de projeto ---------- */
  var revealEls = document.querySelectorAll('.project-card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (open) {
        open.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ---------- Modal de demonstração de projeto ---------- */
  var modal = document.getElementById('demoModal');
  var backdrop = document.getElementById('demoBackdrop');
  var closeBtn = document.getElementById('demoClose');
  var iframe = document.getElementById('demoIframe');
  var urlBar = document.getElementById('demoUrl');
  var loading = document.getElementById('demoLoading');
  var lastFocused = null;

  function openDemo(card) {
    var src = card.getAttribute('data-src');
    var url = card.getAttribute('data-url') || 'narifyweb.com';
    lastFocused = document.activeElement;
    loading.style.display = 'flex';
    iframe.src = src;
    urlBar.textContent = url;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeDemo() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { iframe.src = ''; }, 300);
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('click', function () { openDemo(card); });
  });

  iframe.addEventListener('load', function () {
    if (iframe.src) loading.style.display = 'none';
  });

  backdrop.addEventListener('click', closeDemo);
  closeBtn.addEventListener('click', closeDemo);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeDemo();
  });
})();
