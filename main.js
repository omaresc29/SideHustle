/*
  Sagra Finish Carpentry & Remodel — main.js
  Minimal, framework‑free helpers for the landing page.
  - Dynamic copyright year
  - Mock form handlers (replace with real API / Formspree / Netlify Forms later)
  - Smooth scroll for same‑page anchors
*/

// Shorthand query helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// DOM ready
window.addEventListener('DOMContentLoaded', () => {
  // Dynamic footer year
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Wire forms if present
  const quoteForm = document.getElementById('quote');
  if (quoteForm) quoteForm.addEventListener('submit', handleQuoteSubmit);

  const contactForm = document.querySelector('#contact form');
  if (contactForm) contactForm.addEventListener('submit', handleContactSubmit);

  // Smooth scroll for on‑page anchors
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});

// --- Form handlers ---
function handleQuoteSubmit(e){
  e.preventDefault();
  const form = e.target;
  const name  = form.querySelector('#name')?.value.trim();
  const phone = form.querySelector('#phone')?.value.trim();
  const email = form.querySelector('#email')?.value.trim();
  const statusEl = document.getElementById('form-status');

  if(!name || !phone || !email){
    if (statusEl){
      statusEl.textContent = 'Please complete all required fields.';
      statusEl.style.color = '#b91c1c';
    }
    return false;
  }

  // TODO: replace with your real submission
  // Example: fetch('/api/lead', { method: 'POST', body: new FormData(form) })
  if (statusEl){
    statusEl.textContent = "Thanks! We'll be in touch shortly.";
    statusEl.style.color = '#16a34a';
  }
  form.reset();
  return false;
}

function handleContactSubmit(e){
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('#c-email')?.value.trim();
  const msg   = form.querySelector('#c-msg')?.value.trim();
  const statusEl = document.getElementById('contact-status');

  if(!email || !msg){
    if (statusEl){
      statusEl.textContent = 'Please fill out both fields.';
      statusEl.style.color = '#b91c1c';
    }
    return false;
  }

  // TODO: replace with your real submission
  if (statusEl){
    statusEl.textContent = 'Message sent — check your email for our reply.';
    statusEl.style.color = '#16a34a';
  }
  form.reset();
  return false;
}

// --- Optional: simple phone formatting (US) ---
// Uncomment to auto‑format (###) ###‑#### as users type
// const phoneInput = document.getElementById('phone');
// if (phoneInput) {
//   phoneInput.addEventListener('input', () => {
//     const digits = phoneInput.value.replace(/\D/g, '').slice(0, 10);
//     const parts = [];
//     if (digits.length > 0) parts.push('(' + digits.slice(0,3) + ')');
//     if (digits.length >= 4) parts.push(' ' + digits.slice(3,6));
//     if (digits.length >= 7) parts.push('-' + digits.slice(6,10));
//     phoneInput.value = parts.join('');
//   });
// }

// --- End of file ---