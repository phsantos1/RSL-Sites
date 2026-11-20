const $=s=>document.querySelector(s);
const setup=new URLSearchParams(location.hash.slice(1)).get('setup');
// The one-time key stays in memory, never in referrers, storage, or the address bar.
if(location.hash)history.replaceState(null,'',location.pathname);
let first=false;
async function api(path,body){const r=await fetch('/prospecta/api'+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json','X-Prospecta-Request':'1'},...(body?{body:JSON.stringify(body)}:{})});const data=await r.json();if(!r.ok)throw new Error(data.error||'Tente novamente.');return data;}
try{
 const state=await api('/auth');
 if(state.authenticated)location.replace('/prospecta/');
 else if(!state.configured&&!setup){$('#login-subtitle').textContent='O primeiro acesso precisa do link privado de ativação.';$('#access-help').textContent='Peça o link de primeiro acesso no chat em que este sistema foi publicado.';}
 else{
  first=!state.configured;
  $('#login-form').hidden=false;$('#confirmation').hidden=!first;$('#confirm-password').required=first;
  $('#password').minLength=first?12:1;$('#password').autocomplete=first?'new-password':'current-password';
  $('#login-title').textContent=first?'Crie seu acesso privado.':'Seu próximo cliente começa aqui.';
  $('#login-subtitle').textContent=first?'Escolha uma senha com pelo menos 12 caracteres. Guarde-a para acessar pelo celular e computador.':'Entre para pesquisar negócios e preparar propostas.';
  $('#login-button').textContent=first?'Criar meu acesso':'Entrar no Prospecta';
 }
}catch(e){$('#login-subtitle').textContent=e.message;}
$('#login-form').addEventListener('submit',async e=>{
 e.preventDefault();const button=$('#login-button');button.disabled=true;$('#login-error').textContent='';
 try{const password=$('#password').value;if(first){if(password!==$('#confirm-password').value)throw new Error('As senhas precisam ser iguais.');await api('/auth/setup',{password,setupKey:setup});first=false;}await api('/auth/login',{password});location.replace('/prospecta/');}
 catch(e){$('#login-error').textContent=e.message;}finally{button.disabled=false;}
});
