// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// ===== COUNTDOWN =====
const launchDate = new Date('2026-12-31T00:00:00').getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = launchDate - now;

  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = '<p style="color:var(--gold);font-size:1.5rem;font-family:var(--font-serif)">We are Live!</p>';
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent    = String(d).padStart(2, '0');
  document.getElementById('hours').textContent   = String(h).padStart(2, '0');
  document.getElementById('minutes').textContent = String(m).padStart(2, '0');
  document.getElementById('seconds').textContent = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== EMAIL FORM =====
document.getElementById('notifyForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('emailInput').value.trim();
  if (!email) return;

  // Store in localStorage
  const list = JSON.parse(localStorage.getItem('bhumivista_emails') || '[]');
  if (!list.includes(email)) {
    list.push(email);
    localStorage.setItem('bhumivista_emails', JSON.stringify(list));
  }

  document.getElementById('emailInput').value = '';
  showToast('You\'re on the list! We\'ll notify you at launch.');
});

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== SCROLL ANIMATIONS =====
const scrollEls = document.querySelectorAll('.fade-in-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

scrollEls.forEach(el => observer.observe(el));
