// Original, dependency-free interactions. No analytics, trackers or cookies.
document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Add scroll effects only if supported, preserving full content without JavaScript.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.body.classList.add('enhanced');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
});

// Interactive architectural walkthrough. This is intentionally illustrative.
document.addEventListener('DOMContentLoaded',()=> {
 const phases={
  ingest:{title:'01 / LOG INTEGRATION',file:'pipeline.yaml',lines:['<b>source</b>: customer telemetry','<b>destination</b>: SIEM workspace','<b>checks</b>: quality, parsing, coverage','<em># Make every signal usable.</em>']},
  detect:{title:'02 / DETECTION ENGINEERING',file:'analytics.kql',lines:['SecurityEvent','| where EventID == 4625','| summarize attempts=count() by Account','| where attempts > 8']},
  respond:{title:'03 / RESPONSE AUTOMATION',file:'workflow.yaml',lines:['<b>signal</b>: validated alert','<b>enrich</b>: identity + endpoint context','<b>route</b>: triage / ServiceNow','<em># Keep the human in control.</em>']}
 };
 const display=document.getElementById('cy-stage'),tabs=[...document.querySelectorAll('[data-cy-step]')];
 tabs.forEach(button=>button.addEventListener('click',()=>{
  const info=phases[button.dataset.cyStep];if(!info||!display)return;
  tabs.forEach(x=>{const active=x===button;x.classList.toggle('active',active);x.setAttribute('aria-pressed',String(active))});
  display.innerHTML='<div class="cy-code-head"><span>'+info.title+'</span><span>'+info.file+'</span></div><div class="cy-code-lines">'+info.lines.map((line,i)=>'<div><i>'+String(i+1).padStart(2,'0')+'</i>'+line+'</div>').join('')+'</div>';
 }));
});
