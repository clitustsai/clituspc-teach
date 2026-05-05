// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// EmailJS config
const EMAILJS_SERVICE_ID  = 'service_c9ymomg';
const EMAILJS_TEMPLATE_ID = 'template_ijjdyma';
const EMAILJS_PUBLIC_KEY  = 'Rg4WUf0eDWXIAhPW_';

emailjs.init(EMAILJS_PUBLIC_KEY);

// Contact form
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type=submit]');
  const inputs = form.querySelectorAll('input');
  const [nameEl, companyEl, phoneEl, emailEl] = inputs;
  const serviceEl = form.querySelector('select');
  const messageEl = form.querySelector('textarea');

  btn.textContent = 'Đang gửi...';
  btn.disabled = true;

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name:    nameEl.value,
      company:      companyEl.value,
      phone:        phoneEl.value,
      reply_to:     emailEl.value,
      service:      serviceEl.value,
      message:      messageEl.value,
    });

    btn.textContent = '✓ Đã gửi thành công!';
    btn.style.background = '#16a34a';
    form.reset();
    setTimeout(() => {
      btn.textContent = 'Gửi yêu cầu tư vấn';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  } catch (err) {
    btn.textContent = '✗ Gửi thất bại, thử lại';
    btn.style.background = '#dc2626';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = 'Gửi yêu cầu tư vấn';
      btn.style.background = '';
    }, 3000);
  }
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .project-card, .tech-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
