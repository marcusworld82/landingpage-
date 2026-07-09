const topbar = document.getElementById('topbar');
const revealItems = document.querySelectorAll('.reveal');
const countItems = document.querySelectorAll('[data-count]');
const faqItems = document.querySelectorAll('.faq-item');
const magneticButtons = document.querySelectorAll('.magnetic');
const tiltCards = document.querySelectorAll('.tilt-card');
const orbs = document.querySelectorAll('.bg-orb');
const beams = document.querySelectorAll('.bg-beam');

window.addEventListener('scroll', () => {
  topbar.classList.toggle('is-scrolled', window.scrollY > 18);
  const y = window.scrollY;
  orbs.forEach((orb, i) => {
    const speed = [0.04, 0.06, 0.05][i] || 0.04;
    orb.style.transform = `translate3d(0, ${y * speed}px, 0)`;
  });
  beams.forEach((beam, i) => {
    const drift = i === 0 ? y * 0.025 : y * -0.02;
    beam.style.translate = `0 ${drift}px`;
  });
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealItems.forEach((item, i) => {
  item.style.transitionDelay = `${Math.min(i * 0.03, 0.22)}s`;
  revealObserver.observe(item);
});

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const duration = 1200;
    const startTime = performance.now();
    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
    countObserver.unobserve(el);
  });
}, { threshold: 0.55 });

countItems.forEach((item) => countObserver.observe(item));

faqItems.forEach((item) => {
  const trigger = item.querySelector('.faq-trigger');
  trigger.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    faqItems.forEach((faq) => {
      faq.classList.remove('is-open');
      faq.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

magneticButtons.forEach((button) => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.06}px, ${y * 0.06 - 4}px) scale(1.02)`;
  });
  button.addEventListener('mouseleave', () => { button.style.transform = ''; });
});

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 900) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 8;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const offset = topbar.offsetHeight + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});