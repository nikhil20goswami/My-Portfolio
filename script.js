// Small interactivity: theme toggle and contact form handler
/* Theme selector + form handling */
(function(){
  const html = document.documentElement;
  const select = document.getElementById('themeSelect');
  const year = document.getElementById('year');
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if(year) year.textContent = new Date().getFullYear();

  // Apply a theme: only 'dark' (default) or 'blue'
  function applyTheme(name){
    html.classList.remove('blue');
    if(name === 'blue') html.classList.add('blue');
  }

  // initialize (default to dark)
  const saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);
  if(select) select.value = saved;

  // listen for selector changes
  if(select){
    select.addEventListener('change', (e)=>{
      const v = e.target.value;
      localStorage.setItem('theme', v);
      applyTheme(v);
    });
  }

  // fake submit handler (unchanged behavior)
  form && form.addEventListener('submit', (e)=>{
    e.preventDefault();
    status.textContent = 'Sending…';
    setTimeout(()=>{
      status.textContent = 'Thanks — your message was sent (simulated).';
      form.reset();
    }, 800);
  });

  // mobile nav toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  if(navToggle && nav){
    navToggle.addEventListener('click', ()=>{
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    // close nav when a link is clicked (mobile)
    nav.addEventListener('click', (e)=>{
      if(e.target.tagName === 'A'){
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      }
    });
  }

  // back-to-top button
  const backBtn = document.getElementById('backToTop');
  const showOn = 320;
  if(backBtn){
    window.addEventListener('scroll', ()=>{
      if(window.scrollY > showOn) backBtn.classList.add('show');
      else backBtn.classList.remove('show');
    });
    backBtn.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
  }

})();