/* ============================================
   HumanCentric Labs — Main JavaScript
   Interactions, scroll reveals, navigation
   ============================================ */
(function () {
  'use strict';
  // ---- NAVIGATION SCROLL STATE ----
  const nav = document.getElementById('main-nav');
  let lastScroll = 0;
  function handleNavScroll() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
    lastScroll = currentScroll;
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  // ---- MOBILE NAVIGATION ----
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMobile.classList.contains('is-open');
      navMobile.classList.toggle('is-open');
      navToggle.classList.toggle('is-active');
      navToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
    // Close mobile nav when clicking a link
    const mobileLinks = navMobile.querySelectorAll('.nav__mobile-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
  // ---- SCROLL REVEAL ----
  const revealElements = document.querySelectorAll('.reveal');
  function checkReveals() {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.88;
    revealElements.forEach(function (el) {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < triggerPoint) {
        el.classList.add('is-visible');
      }
    });
  }
  // Initial check
  checkReveals();
  // Throttled scroll handler
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        checkReveals();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  // ---- ACTIVE NAV LINK ----
  const navLinks = document.querySelectorAll('.nav__link');
  const currentPath = window.location.pathname;
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '/') {
      link.classList.add('is-active');
    }
    if (currentPath === '/' || currentPath === '/index.html') {
      // No active state on homepage nav
    }
  });
  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  // ---- INTERSECTION OBSERVER FOR STATS ANIMATION ----
  const statNumbers = document.querySelectorAll('.stat__number[data-value]');
  if (statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(function (stat) {
      statsObserver.observe(stat);
    });
  }
  function animateNumber(el) {
    const target = parseInt(el.getAttribute('data-value'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1500;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }
})();
