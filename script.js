// Burger menu
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
if (burger) burger.addEventListener('click', () => menu.classList.toggle('open'));

// Active link in top nav
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.menu a').forEach(a=>{
  const target = a.getAttribute('href');
  if ((here === '' && target.endsWith('index.html')) || here === target) a.classList.add('active');
});

// Subnav section highlighter (IntersectionObserver)
const subnavLinks = document.querySelectorAll('.subnav a[href^="#"]');
if (subnavLinks.length){
  const map = new Map();
  subnavLinks.forEach(a=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) map.set(el, a);
  });
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      const link = map.get(e.target);
      if (!link) return;
      if (e.isIntersecting) {
        subnavLinks.forEach(l=>l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {rootMargin: "-40% 0px -55% 0px", threshold: .01});
  map.forEach((_,section)=>io.observe(section));
}
