/* ============================================================
   BANGLOG HAIR MAGIC — script.js
   ============================================================ */

const WHATSAPP_NUMBER = '2348130831228';

/* ── HEADER SCROLL ─────────────────────────────────────────── */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── MOBILE NAV ─────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const overlay   = document.getElementById('mobile-nav-overlay');
const closeBtn  = document.getElementById('mobile-nav-close');

function openNav() {
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openNav);
closeBtn.addEventListener('click', closeNav);
overlay.addEventListener('click', e => { if (e.target === overlay) closeNav(); });
overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

/* ── SCROLL ANIMATIONS ──────────────────────────────────────── */
const animEls = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('in-view'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

animEls.forEach(el => observer.observe(el));

/* ── FLOATING WHATSAPP BUTTON ───────────────────────────────── */
const waFloat = document.getElementById('whatsapp-float');
window.addEventListener('scroll', () => {
  waFloat.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ── QUANTITY SELECTORS ─────────────────────────────────────── */
document.querySelectorAll('.product-qty').forEach(wrap => {
  const minus = wrap.querySelector('.qty-minus');
  const plus  = wrap.querySelector('.qty-plus');
  const val   = wrap.querySelector('.qty-val');
  let count = 1;

  minus.addEventListener('click', () => {
    if (count > 1) { count--; val.textContent = count; }
  });
  plus.addEventListener('click', () => {
    count++;
    val.textContent = count;
  });
});

/* ── ORDER SYSTEM ───────────────────────────────────────────── */
const orderDrawer  = document.getElementById('order-drawer');
const drawerItems  = document.getElementById('drawer-items');
const drawerClose  = document.getElementById('drawer-close');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerWaBtn  = document.getElementById('drawer-wa-btn');
const cart = {};

function openDrawer() {
  orderDrawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  drawerClose.focus();
}
function closeDrawer() {
  orderDrawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && orderDrawer.getAttribute('aria-hidden') === 'false') closeDrawer(); });

function renderCart() {
  const keys = Object.keys(cart);
  if (!keys.length) {
    drawerItems.innerHTML = '<p class="drawer-empty">No products added yet. Browse above and tap "Order on WhatsApp."</p>';
    return;
  }
  drawerItems.innerHTML = keys.map(k => `
    <div class="drawer-item">
      <div class="di-info">
        <strong>${k}</strong>
        <span>Qty: ${cart[k]}</span>
      </div>
      <button class="di-remove" data-product="${k}" aria-label="Remove ${k}">×</button>
    </div>
  `).join('');

  drawerItems.querySelectorAll('.di-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      delete cart[btn.dataset.product];
      renderCart();
    });
  });
}

/* "Order on WhatsApp" buttons — add to cart and open drawer */
document.querySelectorAll('.btn-order').forEach(btn => {
  btn.addEventListener('click', () => {
    const productName = btn.dataset.product;
    const card = btn.closest('.product-card');
    const qtyEl = card ? card.querySelector('.qty-val') : null;
    const qty = qtyEl ? parseInt(qtyEl.textContent) : 1;

    cart[productName] = (cart[productName] || 0) + qty;
    renderCart();
    openDrawer();
  });
});

/* Send order via WhatsApp */
drawerWaBtn.addEventListener('click', () => {
  const items = Object.keys(cart);
  if (!items.length) { alert('Please add products before ordering.'); return; }

  const lines = items.map(k => `- ${k} × ${cart[k]}`).join('\n');
  const msg = `Hello BANGLOG HAIR MAGIC. I would like to order:\n\n${lines}\n\nMy name:\nDelivery location:\nPreferred payment method:`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener');
  closeDrawer();
});

/* ── FAQ ACCORDION ──────────────────────────────────────────── */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answerId = btn.getAttribute('aria-controls');
    const answer   = document.getElementById(answerId);

    /* Close all others */
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      const id = b.getAttribute('aria-controls');
      const a  = document.getElementById(id);
      if (a) a.hidden = true;
    });

    /* Toggle current */
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      answer.hidden = false;
    }
  });

  /* Keyboard support */
  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
  });
});

/* ── SMOOTH ANCHOR SCROLL ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── COPYRIGHT YEAR ─────────────────────────────────────────── */
const yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();

/* ── DRAWER ITEM STYLES (injected) ─────────────────────────── */
const drawerStyle = document.createElement('style');
drawerStyle.textContent = `
  .drawer-item {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 0; border-bottom: 1px solid rgba(244,229,208,.6);
    gap: 12px;
  }
  .di-info strong { display: block; font-size: .9rem; color: #2A1F1A; margin-bottom: 2px; }
  .di-info span { font-size: .78rem; color: #5C4A3F; }
  .di-remove {
    width: 28px; height: 28px; border-radius: 50%;
    background: rgba(229,102,74,.1); color: #E5664A;
    font-size: 1.2rem; cursor: pointer; border: none;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; transition: background .2s;
  }
  .di-remove:hover { background: rgba(229,102,74,.25); }
`;
document.head.appendChild(drawerStyle);
