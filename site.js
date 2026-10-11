const cfg=window.SITE_CONFIG||{};const current=location.pathname.replace(/\/$/,'')||'/';
const metaTitle=document.querySelector('meta[property="og:title"]')?.content||document.title;const metaDescription=document.querySelector('meta[property="og:description"]')?.content||document.querySelector('meta[name="description"]')?.content||'';for(const [name,content] of [['twitter:card','summary_large_image'],['twitter:title',metaTitle],['twitter:description',metaDescription]]){let tag=document.querySelector(`meta[name="${name}"]`);if(!tag){tag=document.createElement('meta');tag.name=name;document.head.appendChild(tag)}tag.content=content}
const links=[['Home','/'],['About Me','/about/'],['Services','/services/'],['Blog','/blog/'],['Contact','/contact/']];
const nav=document.querySelector('[data-nav]');if(nav){nav.innerHTML=`<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="wrap nav-inner"><a class="brand" href="/" aria-label="Sumit Karmacharya home"><img src="/public/brand-mark.svg" alt=""><span class="brand-wordmark"><span class="brand-name">${cfg.name||'Sumit Karmacharya'}</span><br><small>AI MARKETING FREELANCER</small></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="primary-nav">Menu</button><nav id="primary-nav" class="nav-links" aria-label="Main navigation">${links.map(([n,u])=>`<a href="${u}" ${current===u.replace(/\/$/,'')||current==='/'&&u==='/'?'aria-current="page"':''}>${n}</a>`).join('')}<a class="btn nav-cta" href="/contact/#booking">Book My Free Consultation <span class="arrow">↗</span></a></nav></div></header>`;const b=nav.querySelector('.menu-toggle'),m=nav.querySelector('.nav-links');b.addEventListener('click',()=>{let open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!open));b.textContent=open?'Menu':'Close';m.classList.toggle('open',!open)});m.addEventListener('click',e=>{if(e.target.closest('a')){b.setAttribute('aria-expanded','false');b.textContent='Menu';m.classList.remove('open')}})}
const foot=document.querySelector('[data-footer]');if(foot){const socials=Object.entries(cfg.social||{}).map(([name,url])=>url?`<a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>`:`<span>${name}: [${name.toUpperCase()} URL]</span>`).join('');foot.innerHTML=`<footer class="site-footer"><div class="wrap"><div class="footer-grid"><div><a class="brand footer-brand" href="/"><img src="/public/brand-mark.svg" alt=""><span class="brand-wordmark"><span class="brand-name">${cfg.name||'Sumit Karmacharya'}</span><br><small>AI MARKETING FREELANCER</small></span></a><p>AI-powered digital marketing to reach the right people, get more enquiries, and turn interest into sales.</p><div class="social-placeholder">${cfg.location||'[YOUR LOCATION]'} · ${cfg.email||'[YOUR EMAIL]'}</div></div><div><h4>Explore</h4><div class="footer-links"><a href="/about/">About Me</a><a href="/services/">Services</a><a href="/blog/">Blog</a><a href="/contact/">Contact</a></div></div><div><h4>Services</h4><div class="footer-links"><a href="/services/">Digital Marketing</a><a href="/services/meta-ads/">Meta Ads</a><a href="/services/email-marketing/">Email Marketing</a><a href="/services/">Marketing Plan</a></div></div><div><h4>Get in touch</h4><div class="footer-links"><a href="/contact/">Book My Free Consultation</a>${cfg.email&&cfg.email[0]!=='['?`<a href="mailto:${cfg.email}">${cfg.email}</a>`:`<span>[YOUR EMAIL]</span>`}${socials}</div></div></div><div class="footer-bottom"><span>© <span data-year></span> ${cfg.name||'Sumit Karmacharya'}. All rights reserved.</span><span><a href="/privacy/">Privacy Policy</a> &nbsp;·&nbsp; <a href="/terms/">Terms</a></span></div></div></footer>`;foot.querySelector('[data-year]').textContent=new Date().getFullYear()}
document.querySelectorAll('[data-booking]').forEach(a=>{if(cfg.bookingUrl){a.href=cfg.bookingUrl;a.target='_blank';a.rel='noopener noreferrer'}else a.href='/contact/#booking'});
const booking=document.querySelector('[data-booking-box]');if(booking&&cfg.bookingUrl){booking.classList.add('booking-ready');booking.querySelector('.booking-link').href=cfg.bookingUrl;booking.querySelector('.booking-link').target='_blank';booking.querySelector('.booking-link').rel='noopener noreferrer'}
document.querySelectorAll('.profile-placeholder').forEach(el=>{if(cfg.photo){el.innerHTML=`<img src="${cfg.photo}" alt="Portrait of ${cfg.name||'Sumit Karmacharya'}" style="width:100%;height:100%;min-height:390px;object-fit:cover;border-radius:26px">`}});
document.querySelectorAll('[data-email]').forEach(el=>{if(cfg.email)el.textContent=cfg.email});document.querySelectorAll('[data-phone]').forEach(el=>{if(cfg.phone)el.textContent=cfg.phone});document.querySelectorAll('[data-location]').forEach(el=>{if(cfg.location)el.textContent=cfg.location});
const form=document.querySelector('#contact-form');
if(form){
  const endpoint=form.dataset.endpoint||'https://formsubmit.co/ajax/sumit.karmacharya87@gmail.com';
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    form.querySelectorAll('[aria-invalid="true"]').forEach(el=>el.removeAttribute('aria-invalid'));
    form.querySelectorAll('.field-error').forEach(el=>el.textContent='');
    const status=form.querySelector('.form-status');status.className='form-status';status.textContent='';
    let first=null;
    for(const field of form.querySelectorAll('[required]')){
      let message='';
      if(!field.value.trim())message='Please complete this field.';
      else if(field.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()))message='Enter a valid email address.';
      else if(field.type==='url'&&field.value&&!/^https?:\/\//i.test(field.value))message='Enter a full URL starting with https://.';
      if(message){field.setAttribute('aria-invalid','true');const err=form.querySelector(`[data-error="${field.name}"]`);if(err)err.textContent=message;if(!first)first=field}
    }
    if(first){first.focus();return}
    const data=Object.fromEntries(new FormData(form).entries());
    const submit=form.querySelector('[type=submit]');submit.disabled=true;submit.textContent='Sending request…';
    try{
      const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({...data,_replyto:data.email,_subject:'New consultation request'})});
      const result=await response.json().catch(()=>({}));
      if(!response.ok||result.success===false)throw new Error(result.message||'We could not send your request right now. Please try again or email '+(cfg.email||'me')+'.');
      status.className='form-status success show';
      status.textContent='Your consultation request was submitted. If this is your first submission, check your inbox for FormSubmit’s activation email and confirm it to receive submissions.';
      form.reset();
    }catch(error){
      status.className='form-status error show';
      status.textContent=error.message||'We could not send your request right now. Please try again or email '+(cfg.email||'me')+'.';
    }finally{submit.disabled=false;submit.textContent='Request My Free Consultation'}
  });
}

// Reveal useful page sections as they enter view. If motion is reduced or
// IntersectionObserver is unavailable, leave all content visible immediately.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
  const revealTargets=document.querySelectorAll('.hero-grid > *, .section-head, .problem, .service-card, .step, .feature-card, .blog-card, .service-detail, .cta-inner, .contact-grid > *, .profile-placeholder, .article-cover, .article-content > *');
  revealTargets.forEach((el,index)=>{el.classList.add('scroll-reveal');el.style.setProperty('--motion-delay',`${(index%4)*65}ms`)});
  document.body.classList.add('motion-ready');
  const revealObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}},{threshold:.12,rootMargin:'0px 0px -4% 0px'});
  revealTargets.forEach(el=>revealObserver.observe(el));
}
