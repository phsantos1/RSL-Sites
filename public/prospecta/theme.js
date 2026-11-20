(() => {
 const root=document.documentElement,key='prospecta-theme';
 let theme='dark';
 try{const saved=localStorage.getItem(key);if(saved==='light'||saved==='dark')theme=saved;}catch{}
 function apply(value){
  theme=value;root.dataset.theme=value;
  document.querySelectorAll('[data-theme-toggle]').forEach(button=>{
   const label=value==='dark'?'Tema claro':'Tema escuro';
   button.setAttribute('aria-label','Usar '+label.toLowerCase());button.title='Usar '+label.toLowerCase();
   button.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true">${value==='dark'?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>':'<path d="M20.5 14a8.5 8.5 0 0 1-10.5-10.5A8.5 8.5 0 1 0 20.5 14Z"/>'}</svg><span>${label}</span>`;
  });
 }
 apply(theme);
 document.addEventListener('DOMContentLoaded',()=>apply(theme),{once:true});
 document.addEventListener('click',e=>{if(!e.target.closest('[data-theme-toggle]'))return;apply(theme==='dark'?'light':'dark');try{localStorage.setItem(key,theme);}catch{}});
 window.addEventListener('storage',e=>{if(e.key===key)apply(e.newValue==='light'?'light':'dark');});
})();
