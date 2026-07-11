const revealItems = document.querySelectorAll('.reveal');

const showReveal = el => {
  el.classList.add('visible');
};

const showRevealsIn = target => {
  if (target.matches('.reveal')) showReveal(target);
  target.querySelectorAll('.reveal').forEach(showReveal);
};

if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showReveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      showReveal(el);
    }
    observer.observe(el);
  });
} else {
  revealItems.forEach(showReveal);
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      showRevealsIn(target);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
