(function(){
  if(location.protocol==='http:'){
    location.replace('https://'+location.host+location.pathname+location.search+location.hash);
    return;
  }

  const ADS_ID='AW-18228340848';
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
  const googleTag=document.createElement('script');
  googleTag.async=true;
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

  const modal=document.getElementById('contact-modal');
  if(modal){
    const openers=document.querySelectorAll('[data-contact-open]');
    const closers=modal.querySelectorAll('[data-contact-close]');
    const open=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>modal.querySelector('input')?.focus(),50)};
    const close=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
    openers.forEach(b=>b.addEventListener('click',e=>{e.preventDefault();open()}));
    closers.forEach(b=>b.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape') close()});

    const form=modal.querySelector('form');
    if(form){
      const params=new URLSearchParams(location.search);
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

  const seoLinks={
    'uslugi.html#wycena-firmy':'wycena-firmy.html',
    'uslugi.html#aktywa-niematerialne':'wycena-znaku-towarowego.html',
    'uslugi.html#analiza-finansowa':'analiza-finansowa.html',
    'uslugi.html#finanse-w-sporcie':'finanse-w-sporcie.html',
    'uslugi.html#wycena-klubow-sportowych':'wycena-klubow-sportowych.html'
  };
  document.querySelectorAll('a[href]').forEach(a=>{if(seoLinks[a.getAttribute('href')]) a.setAttribute('href',seoLinks[a.getAttribute('href')]);});

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
    panel.setAttribute('aria-hidden','true');
    panel.style.cssText='display:none;position:fixed;inset:0;z-index:9999;background:rgba(10,28,52,.44);padding:20px;align-items:flex-end;justify-content:center';
    panel.innerHTML='<div style="width:min(620px,100%);background:#fff;border-radius:18px;padding:22px;box-shadow:0 24px 70px rgba(10,28,52,.24);font-family:system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;color:#172033"><div style="display:flex;gap:18px;align-items:flex-start;justify-content:space-between"><div><h2 style="margin:0 0 8px;font-size:22px">Ustawienia prywatności</h2><p style="margin:0;color:#596579;line-height:1.55">Strona korzysta z Google Ads do pomiaru skuteczności reklam. Opcjonalne przechowywanie danych analitycznych i marketingowych pozostaje wyłączone do czasu Twojej zgody.</p></div><button type="button" data-privacy-close aria-label="Zamknij" style="border:0;background:#eef3f8;border-radius:10px;width:36px;height:36px;font-size:22px;cursor:pointer">×</button></div><div style="margin-top:18px;padding:14px 16px;border:1px solid #e3e8ef;border-radius:12px"><strong>Niezbędne technologie</strong><div style="margin-top:4px;color:#596579;font-size:14px">Aktywne — obsługa strony, formularza i bezpieczeństwa.</div></div><div style="margin-top:10px;padding:14px 16px;border:1px solid #e3e8ef;border-radius:12px"><strong>Analityka i marketing</strong><div style="margin-top:4px;color:#596579;font-size:14px">Google Ads / Consent Mode. Możesz wyrazić zgodę albo pozostać przy ustawieniu bez opcjonalnego przechowywania danych.</div></div><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><button type="button" data-consent-deny style="border:1px solid #cfd8e4;background:#fff;color:#172033;border-radius:10px;padding:10px 14px;font-weight:700;cursor:pointer">Tylko niezbędne</button><button type="button" data-consent-grant style="border:0;background:#2f75e8;color:#fff;border-radius:10px;padding:10px 14px;font-weight:700;cursor:pointer">Zgadzam się</button></div><p style="margin:16px 0 0;font-size:14px"><a href="polityka-prywatnosci.html" style="color:#2f75e8">Zobacz pełną Politykę prywatności i cookies</a></p></div>';

    const openPrivacy=()=>{panel.style.display='flex';panel.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';};
    const closePrivacy=()=>{panel.style.display='none';panel.setAttribute('aria-hidden','true');document.body.style.overflow='';};
    button.addEventListener('click',openPrivacy);
    panel.addEventListener('click',e=>{
      if(e.target===panel||e.target.closest('[data-privacy-close]')) closePrivacy();
      if(e.target.closest('[data-consent-grant]')){applyConsent(true);closePrivacy();}
      if(e.target.closest('[data-consent-deny]')){applyConsent(false);closePrivacy();}
    });
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel.getAttribute('aria-hidden')==='false') closePrivacy();});
    document.body.append(button,panel);
    if(savedConsent!== 'granted' && savedConsent!=='denied') setTimeout(openPrivacy,500);
  }
})();
