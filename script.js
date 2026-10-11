/* ============================================================
   AutoShine — Estética Automotiva
   script.js
   ============================================================ */
(function () {
  "use strict";

  const header    = document.getElementById("header");
  const hamburger = document.getElementById("hamburger");
  const nav       = document.getElementById("nav");
  const navLinks  = document.querySelectorAll(".nav__link, .nav__cta");

  /* ------------------------------------------------------------
     1. MENU MOBILE (abrir / fechar)
     ------------------------------------------------------------ */
  function openMenu() {
    nav.classList.add("is-open");
    hamburger.classList.add("is-active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    nav.classList.remove("is-open");
    hamburger.classList.remove("is-active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    if (nav.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  hamburger.addEventListener("click", toggleMenu);

  // Fecha o menu ao clicar em qualquer link de navegação
  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Fecha o menu se a janela for redimensionada para desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) closeMenu();
  });

  // Fecha o menu com a tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ------------------------------------------------------------
     2. SMOOTH SCROLL para os links internos (#âncoras)
        (o CSS já define scroll-behavior, mas o JS garante o
        comportamento e respeita o header fixo)
     ------------------------------------------------------------ */
  const HEADER_OFFSET = 76;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.length < 2) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top +
                  window.pageYOffset - HEADER_OFFSET;

      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ------------------------------------------------------------
     3. HEADER com fundo sólido ao rolar
     ------------------------------------------------------------ */
  function handleHeaderScroll() {
    if (window.pageYOffset > 30) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* ------------------------------------------------------------
     4. Ano dinâmico no rodapé
     ------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
