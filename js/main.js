/* ============================================================
   EMPOSSIBLE — main.js
   Scroll reveals · Nav shrink · FAQ · Counter · Cursor glow
   ============================================================ */

'use strict';

/* ── CURSOR GLOW ─────────────────────────────────────────── */
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top  = glowY + 'px';
  requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

document.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursorGlow.style.opacity = '1'; });

/* ── NAV SCROLL STATE ────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── SCROLL REVEAL (Intersection Observer) ───────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach((el, i) => {
  // stagger cards inside grids
  const parent = el.closest('.loss-grid, .cases-grid, .solution-list, .steps-track');
  if (parent && !el.style.transitionDelay) {
    const siblings = Array.from(parent.querySelectorAll('.reveal'));
    const idx = siblings.indexOf(el);
    el.style.transitionDelay = (idx * 0.08) + 's';
  }
  revealObserver.observe(el);
});

/* ── COUNTER ANIMATION ───────────────────────────────────── */
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNums.forEach((el) => counterObserver.observe(el));

/* ── FAQ ACCORDION ───────────────────────────────────────── */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const btn = item.querySelector('.faq-q');
  const ans = item.querySelector('.faq-a');

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // close all
    faqItems.forEach((i) => {
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      i.querySelector('.faq-a').classList.remove('open');
    });

    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      ans.classList.add('open');
    }
  });
});

/* ── SMOOTH ANCHOR SCROLL ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── PARALLAX HERO GRID ──────────────────────────────────── */
const heroGrid = document.querySelector('.hero-grid-lines');
if (heroGrid) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroGrid.style.transform = `translateY(${y * 0.15}px)`;
  }, { passive: true });
}

/* ── ORB PARALLAX ────────────────────────────────────────── */
const orbs = document.querySelectorAll('.orb');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  orbs.forEach((orb, i) => {
    const speed = [0.06, 0.04, 0.03][i] || 0.05;
    orb.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });

/* ── HERO ENTRANCE SEQUENCE ──────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    document.body.style.overflow = '';
  }, 850);
});
