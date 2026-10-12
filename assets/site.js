
(function(){
  const modal=document.getElementById('contact-modal');
  if(!modal) return;
  const openers=document.querySelectorAll('[data-contact-open]');
  const closers=modal.querySelectorAll('[data-contact-close]');
  const open=()=>{modal.classList.add('open');document.body.style.overflow='hidden';setTimeout(()=>modal.querySelector('input')?.focus(),50)};
  const close=()=>{modal.classList.remove('open');document.body.style.overflow='';};
  openers.forEach(b=>b.addEventListener('click',e=>{e.preventDefault();open()}));
  closers.forEach(b=>b.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape') close()});
})();
