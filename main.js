const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const revealElements = document.querySelectorAll('.reveal');

if (navToggle && header) {
  navToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.querySelectorAll('.site-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.16,
});

revealElements.forEach((element) => revealObserver.observe(element));
