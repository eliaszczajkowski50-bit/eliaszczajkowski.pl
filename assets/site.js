(function(){
  if(location.protocol==='http:'){
    location.replace('https://'+location.host+location.pathname+location.search+location.hash);
    return;
  }

  const ADS_ID='AW-18228340848';
  const GA4_ID='G-BKQ3CZ5QM5';
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){dataLayer.push(arguments);};
  gtag('consent','default',{
    ad_storage:'denied',
    analytics_storage:'denied',
    ad_user_data:'denied',
    ad_personalization:'denied',
    wait_for_update:500
  });
  gtag('js',new Date());
  gtag('config',ADS_ID);
  gtag('config',GA4_ID);
  const googleTag=document.createElement('script');
  googleTag.async=true;
  googleTag.fetchPriority='low';
  googleTag.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ADS_ID);
  document.head.appendChild(googleTag);

  const applyConsent=(granted)=>{
    gtag('consent','update',{
      ad_storage:granted?'granted':'denied',
      analytics_storage:granted?'granted':'denied',
      ad_user_data:granted?'granted':'denied',
      ad_personalization:granted?'granted':'denied'
    });
    try{localStorage.setItem('privacy_optional',granted?'granted':'denied');}catch(e){}
  };
  let savedConsent=null;
  try{savedConsent=localStorage.getItem('privacy_optional');}catch(e){}
  if(savedConsent==='granted') applyConsent(true);
  if(savedConsent==='denied') applyConsent(false);


  // Responsive navigation
  const nav=document.querySelector('.main-nav');
  if(nav){
    nav.id='primary-nav';
    const toggle=document.createElement('button');
    toggle.className='nav-toggle';toggle.type='button';
    toggle.textContent='Menu';
    toggle.setAttribute('aria-label','Otwórz menu');
    toggle.setAttribute('aria-controls','primary-nav');
    toggle.setAttribute('aria-expanded','false');
    nav.before(toggle);
    const closeNav=()=>{nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Otwórz menu');};
    toggle.addEventListener('click',()=>{const shown=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(shown));toggle.setAttribute('aria-label',shown?'Zamknij menu':'Otwórz menu');});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav();});
  }

  // Track interest separately from confirmed enquiries; never send form contents.
  document.addEventListener('click',e=>{
    const link=e.target.closest('a[href]');if(!link)return;
    const href=link.getAttribute('href')||'';
    if(href.startsWith('tel:')) gtag('event','contact_phone_click',{page_path:location.pathname});
    if(href.startsWith('mailto:')) gtag('event','contact_email_click',{page_path:location.pathname});
  });
  if(location.pathname.endsWith('/dziekuje.html')){
    try{
      const sent=Number(sessionStorage.getItem('contact_submit_pending')||0);
      sessionStorage.removeItem('contact_submit_pending');
      if(sent && Date.now()-sent < 10*60*1000 && Date.now()>=sent){
        gtag('event','generate_lead',{method:'contact_form'});
      }
    }catch(e){}
  }
  // Preserve non-identifying UTM parameters when someone moves between pages.
  try{
    const params=new URLSearchParams(location.search);
    const keys=['utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
    const utm={};
    keys.forEach(k=>{const value=params.get(k);if(value)utm[k]=value.slice(0,180);});
    if(Object.keys(utm).length)sessionStorage.setItem('site_utm',JSON.stringify(utm));
  }catch(e){}

  const modal=document.getElementById('contact-modal');
  if(modal){
    const openers=document.querySelectorAll('[data-contact-open]');
    const closers=modal.querySelectorAll('[data-contact-close]');
    const open=()=>{gtag('event','contact_form_open',{page_path:location.pathname});modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>modal.querySelector('input:not([type="hidden"])')?.focus(),50)};
    const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
    openers.forEach(b=>b.addEventListener('click',e=>{e.preventDefault();open()}));
    closers.forEach(b=>b.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape') close()});

    const form=modal.querySelector('form');
    if(form){
      const params=new URLSearchParams(location.search);
      try{const stored=JSON.parse(sessionStorage.getItem('site_utm')||'{}');Object.entries(stored).forEach(([key,value])=>{if(!params.has(key))params.set(key,value);});}catch(e){}
      form.addEventListener('submit',()=>{if(!form.checkValidity())return;try{sessionStorage.setItem('contact_submit_pending',String(Date.now()));}catch(e){}gtag('event','contact_form_submit_attempt',{page_path:location.pathname});});
      const labels={utm_source:'Źródło kampanii',utm_medium:'Medium kampanii',utm_campaign:'Kampania',utm_term:'Hasło kampanii',utm_content:'Treść reklamy',gclid:'Google Click ID'};
      Object.entries(labels).forEach(([key,label])=>{
        const value=params.get(key);
        if(value){
          const input=document.createElement('input');
          input.type='hidden';input.name=label;input.value=value;form.appendChild(input);
        }
      });
    }
  }

  document.querySelectorAll('.consent span').forEach(span=>{
    span.innerHTML='Zapoznałem się z <a href="polityka-prywatnosci.html" target="_blank" rel="noopener" style="color:#2f75e8">Polityką prywatności</a>. Dane zostaną wykorzystane wyłącznie do obsługi mojego zgłoszenia.';
  });

  if(!document.getElementById('privacy-settings-button')){
    const button=document.createElement('button');
    button.id='privacy-settings-button';
    button.type='button';
    button.textContent='Ustawienia prywatności';
    button.setAttribute('aria-haspopup','dialog');
    button.style.cssText='position:fixed;left:14px;bottom:14px;z-index:9998;border:1px solid #d7dee8;background:#fff;color:#0a1c34;border-radius:999px;padding:9px 13px;font:600 13px/1.2 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 6px 24px rgba(10,28,52,.12);cursor:pointer';

    const panel=document.createElement('div');
    panel.id='privacy-settings-panel';
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-modal','true');
    panel.setAttribute('aria-labelledby','privacy-dialog-title');
    panel.setAttribute('aria-hidden','true');
    panel.style.cssText='display:none;position:fixed;inset:0;z-index:9999;background:rgba(10,28,52,.44);padding:20px;align-items:flex-end;justify-content:center';
    panel.innerHTML="<div style=\"width:min(480px,100%);max-height:calc(100dvh - 28px);overflow-y:auto;background:#fff;border-radius:18px;padding:20px;box-shadow:0 24px 70px rgba(10,28,52,.24);font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#172033\"><div style=\"display:flex;align-items:center;justify-content:space-between;gap:12px\"><h2 id=\"privacy-dialog-title\" style=\"margin:0;font-size:20px\">Ustawienia prywatności</h2><button type=\"button\" data-privacy-close aria-label=\"Zamknij\" style=\"border:0;background:#eef3f8;border-radius:10px;width:44px;height:44px;cursor:pointer;font-size:23px\">×</button></div><p style=\"font-size:14px;line-height:1.55;color:#596579;margin:12px 0 16px\">Używamy Google Analytics 4 i Google Ads do pomiaru ruchu i skuteczności reklam. Opcjonalne dane analityczne i reklamowe pozostają wyłączone, dopóki nie wyrazisz zgody. Wybór możesz zmienić później.</p><div style=\"display:flex;flex-wrap:wrap;gap:10px\"><button type=\"button\" data-consent-deny style=\"flex:1 1 180px;min-height:48px;border:1px solid #abb9cc;background:#fff;color:#172033;border-radius:10px;padding:10px 12px;font-weight:700;cursor:pointer\">Tylko niezbędne</button><button type=\"button\" data-consent-grant style=\"flex:1 1 180px;min-height:48px;border:1px solid #2f75e8;background:#2f75e8;color:#fff;border-radius:10px;padding:10px 12px;font-weight:700;cursor:pointer\">Wyrażam zgodę</button></div><p style=\"margin:14px 0 0;font-size:13px\"><a href=\"polityka-prywatnosci.html\" style=\"color:#1f5ec7;text-decoration:underline\">Polityka prywatności i cookies</a></p></div>";

    const openPrivacy=()=>{panel.style.display='flex';panel.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';};
    const closePrivacy=()=>{panel.style.display='none';panel.setAttribute('aria-hidden','true');document.body.style.overflow='';};
    button.addEventListener('click',openPrivacy);
    panel.addEventListener('click',e=>{
      if(e.target===panel||e.target.closest('[data-privacy-close]')) {applyConsent(false);closePrivacy();}
      if(e.target.closest('[data-consent-grant]')){applyConsent(true);closePrivacy();}
      if(e.target.closest('[data-consent-deny]')){applyConsent(false);closePrivacy();}
    });
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.getAttribute('aria-hidden')==='false'){applyConsent(false);closePrivacy();}});
    const footerRow=document.querySelector('.footer-row');
    if(footerRow) footerRow.appendChild(button);
    else document.body.appendChild(button);
    document.body.appendChild(panel);
    if(savedConsent!== 'granted' && savedConsent!=='denied') setTimeout(openPrivacy,500);
  }
})();
