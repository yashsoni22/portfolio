/* script.js - Advanced Animations & Utilities */

/* -------- NAV TOGGLE -------- */
function toggleNav(){
  const nav = document.querySelector('.main-nav');
  if(!nav) return;
  nav.style.display = (nav.style.display === 'flex') ? '' : 'flex';
}

/* -------- SET YEARS -------- */
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  ['year','year2','year3','year4','year5','year6'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });
});

/* -------- PAGE TRANSITION OVERLAY -------- */
(function(){
  const overlay = document.getElementById('page-overlay');
  
  // show overlay briefly on page load
  if(overlay){
    overlay.classList.add('show');
    setTimeout(()=> overlay.classList.remove('show'), 420);
  }

  // animate page navigation
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href]');
    if(!a) return;

    const href = a.getAttribute('href');

    // ignore external links, pdf, mail, anchors
    if(
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.endsWith('.pdf') ||
      a.target === '_blank' ||
      href.startsWith('#')
    ) return;

    e.preventDefault();
    overlay.classList.add('show');
    setTimeout(()=> window.location = href, 420);
  });
})();

/* -------- SCROLL REVEAL WITH STAGGER -------- */
(function(){
  const revealSelectors = [
    '.reveal-fade',
    '.reveal-up',
    '.reveal-zoom',
    '.reveal-right'
  ];

  const revealEls = document.querySelectorAll(revealSelectors.join(','));

  const inView = (el, offset = 120) => {
    const rect = el.getBoundingClientRect();
    return rect.top < (window.innerHeight - offset);
  };

  const runReveal = () => {
    revealEls.forEach(el => {
      if(el.classList.contains('active')) return;

      if(inView(el, 100)){
        el.classList.add('active');

        // For skill bars inside reveal items
        const bar = el.querySelectorAll('.bar-fill');
        bar.forEach(b => {
          const pct = parseInt(b.getAttribute('data-percent') || '0', 10);
          setTimeout(()=> b.style.width = pct + '%', 160);
        });
      }
    });
  };

  document.addEventListener('DOMContentLoaded', runReveal);
  window.addEventListener('load', runReveal);
  window.addEventListener('scroll', runReveal, {passive:true});
  window.addEventListener('resize', runReveal);
})();

/* -------- PARALLAX (for .parallax) -------- */
(function(){
  const parallaxEls = document.querySelectorAll('.parallax');
  if(!parallaxEls.length) return;

  const onMove = () => {
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.speed || '0.08');
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height/2;
      const dist = (window.innerHeight/2 - centerY) * speed;
      el.style.transform = `translateY(${dist}px)`;
    });
  };

  window.addEventListener('scroll', onMove, {passive:true});
  window.addEventListener('resize', onMove);
  document.addEventListener('DOMContentLoaded', onMove);
})();

/* -------- MAGNETIC BUTTON INTERACTION -------- */
(function(){
  const magnets = document.querySelectorAll('.btn-magnetic');
  if(!magnets.length) return;

  magnets.forEach(btn => {

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width/2;
      const my = e.clientY - rect.top - rect.height/2;

      btn.style.transform = `translate(${mx * 0.06}px, ${my * 0.06}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => btn.style.transform = '');

    btn.addEventListener('mousedown', () => {
      btn.style.transform = 'scale(.95)';
    });

    btn.addEventListener('mouseup', () => {
      btn.style.transform = '';
    });

  });

})();

/* -------- ACCESSIBILITY: REDUCE MOTION SUPPORT -------- */
(function(){
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(mq && mq.matches){
    document.documentElement.classList.add('reduced-motion');
  }
})();

/* ==========================================================
   ⭐ FORM HANDLER — FORMSPREE INTEGRATION
   ========================================================== */

(function(){
  const form = document.getElementById("contactForm");
  if(!form) return;

  form.addEventListener("submit", async function(e){
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if(response.ok){
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert("Something went wrong. Please try again later.");
      }

    } catch (err) {
      alert("Network error — check your connection.");
    }
  });

})();

/* ==========================================================
   ⭐ ENHANCED FORMSPREE HANDLER — WITH UI FEEDBACK
   ========================================================== */
(function(){
  const form = document.getElementById("contactForm");
  if(!form) return;

  const toast = document.getElementById("toast");
  const modal = document.getElementById("successModal");
  const slidePanel = document.getElementById("slidePanel");
  const closeModal = document.getElementById("closeModal");

  const btn = form.querySelector("button[type='submit']");

  function showToast(){
    toast.classList.add("show");
    setTimeout(()=> toast.classList.remove("show"), 3000);
  }

  function showModal(){
    modal.classList.add("show");
  }
  if(closeModal){
    closeModal.addEventListener("click", ()=> modal.classList.remove("show"));
  }

  function showSlidePanel(){
    slidePanel.classList.add("show");
    setTimeout(()=> slidePanel.classList.remove("show"), 4000);
  }

  form.addEventListener("submit", async function(e){
    e.preventDefault();

    const formData = new FormData(form);

    // Start loading effect
    btn.classList.add("btn-loading");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if(response.ok){
        form.reset();

        // Show all success effects 🔥
        showToast();
        showModal();
        showSlidePanel();
      } else {
        alert("Something went wrong. Please try again.");
      }

    } catch (err) {
      alert("Network error — check your connection.");
    }

    // End loading effect
    btn.classList.remove("btn-loading");
  });

})();
