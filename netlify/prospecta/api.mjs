import {randomBytes,randomUUID,createHash,createHmac,scryptSync,timingSafeEqual} from 'node:crypto';
import {cities,segments,phone,fromOSM,analyze,draft,eligibility,instagramURL} from './lib.mjs';
import {research} from './research.mjs';

const now=()=>new Date().toISOString();
const clean=(v,n=500)=>typeof v==='string'?v.trim().slice(0,n):'';
const equal=(a,b)=>{const x=Buffer.from(String(a||'')),y=Buffer.from(String(b||''));return x.length===y.length&&timingSafeEqual(x,y);};
const hash=v=>createHash('sha256').update(v).digest('hex');
const fail=(status,message)=>{throw Object.assign(new Error(message),{status});};
const json=(value,status=200,headers={})=>new Response(JSON.stringify(value),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
const validURL=v=>{try{const u=new URL(v);return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}};
export const setupKey=key=>createHmac('sha256',key).update('prospecta-owner-setup-v1').digest('hex');
const empty=()=>({leads:[],profile:{sender:'',business:'',offer:'Sites profissionais, landing pages e pedidos de agendamento'},activity:[],messages:[],suppression:[],lastSearch:0});
const cookie=(token,age=43200)=>`__Secure-prospecta=${token}; Path=/prospecta; Max-Age=${age}; HttpOnly; Secure; SameSite=Strict`;
const log=(d,text)=>{d.activity.unshift({id:randomUUID(),at:now(),text});d.activity=d.activity.slice(0,100);};

// Conditional writes prevent concurrent requests from silently overwriting leads.
async function mutate(store,key,initial,fn){
 for(let i=0;i<5;i++){
  const current=await store.getWithMetadata(key,{type:'json'});
  const value=current?.data||initial();const result=fn(value);
  const saved=await store.setJSON(key,value,current?{onlyIfMatch:current.etag}:{onlyIfNew:true});
  if(saved.modified)return result;
 }
 fail(409,'Outro dispositivo está salvando. Tente novamente.');
}
async function rate(store,key){
 await mutate(store,key,()=>({since:Date.now(),count:0}),d=>{
  if(Date.now()-d.since>15*60000){d.since=Date.now();d.count=0;}
  if(d.count>=8)fail(429,'Muitas tentativas. Aguarde 15 minutos antes de tentar novamente.');d.count++;
 });
}
const passwordHash=(password,salt)=>scryptSync(password,salt,64).toString('hex');
function instagramInput(b){
 const url=instagramURL(b.instagram),post=clean(b.lastPostAt,10);
 if(clean(b.instagram)&&!url)fail(400,'Informe um @usuário ou link de perfil válido do Instagram.');
 if(post&&(!url||!/^\d{4}-\d{2}-\d{2}$/.test(post)||!Number.isFinite(Date.parse(post))||new Date(post).toISOString().slice(0,10)!==post||post>now().slice(0,10)))fail(400,'Informe uma data válida de publicação, até hoje, e o perfil correspondente.');
 return {url,review:url?{lastPostAt:post||null,checkedAt:now()}:null};
}
export async function handleProspecta(request,{store,env,ip='unknown',researchImpl=research}){
 try{
  // Production secrets are deliberately absent from branch previews.
  if(!env.PROSPECTA_BRIDGE_KEY||env.PROSPECTA_BRIDGE_KEY.length<32)return json({error:'O sistema está disponível apenas no endereço de produção.'},503);
  const u=new URL(request.url),p=u.pathname.replace(/^\/(?:prospecta\/api|\.netlify\/functions\/prospecta)/,'')||'/';
  const method=request.method;
  if(!['GET','POST','PATCH'].includes(method))fail(405,'Método não permitido.');
  if(method!=='GET'){
   if(request.headers.get('origin')&&request.headers.get('origin')!==u.origin)fail(403,'Origem não autorizada.');
   if(request.headers.get('X-Prospecta-Request')!=='1'||!request.headers.get('content-type')?.startsWith('application/json'))fail(403,'Solicitação não autorizada.');
  }
  const auth=await store.get('auth/owner',{type:'json'});
  const token=request.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('__Secure-prospecta='))?.split('=')[1];
  const session=token&&/^[a-f0-9]{64}$/.test(token)?await store.get('sessions/'+hash(token),{type:'json'}):null;
  const authenticated=!!auth&&session?.expires>Date.now();
  if(p==='/auth'&&method==='GET')return json({configured:!!auth,authenticated});
  let b={};if(method!=='GET'){
   if(Number(request.headers.get('content-length')||0)>1500000)fail(413,'Arquivo muito grande.');
   const raw=await request.text();if(Buffer.byteLength(raw)>1500000)fail(413,'Arquivo muito grande.');
   try{b=JSON.parse(raw);}catch{fail(400,'JSON inválido.');}
   if(!b||typeof b!=='object'||Array.isArray(b))fail(400,'Dados inválidos.');
  }
  if(p==='/auth/setup'&&method==='POST'){
   if(auth)fail(409,'O acesso já foi configurado. Entre com sua senha.');
   await rate(store,'limits/setup/'+hash(ip));
   if(!equal(b.setupKey,setupKey(env.PROSPECTA_BRIDGE_KEY)))fail(403,'Link de primeiro acesso inválido.');
   const password=typeof b.password==='string'?b.password:'';
   if(password.length<12||password.length>200)fail(400,'Crie uma senha com 12 a 200 caracteres.');
   const salt=randomBytes(32).toString('hex');
   const saved=await store.setJSON('auth/owner',{salt,passwordHash:passwordHash(password,salt),createdAt:now()},{onlyIfNew:true});
   if(!saved.modified)fail(409,'O acesso já foi configurado.');
   return json({ok:true});
  }
  if(p==='/auth/login'&&method==='POST'){
   await rate(store,'limits/login/'+hash(ip));
   const password=typeof b.password==='string'&&b.password.length<=200?b.password:'';
   if(!auth||!equal(passwordHash(password,auth.salt),auth.passwordHash))fail(401,'Senha incorreta ou acesso ainda não configurado.');
   const sid=randomBytes(32).toString('hex');await store.setJSON('sessions/'+hash(sid),{expires:Date.now()+43200000});
   return json({ok:true},200,{'Set-Cookie':cookie(sid)});
  }
  // Bootstrap import is authenticated, one-time, and disabled after setup.
  if(p==='/bootstrap'&&method==='POST'){
   if(auth||!equal(request.headers.get('authorization'),`Bearer ${setupKey(env.PROSPECTA_BRIDGE_KEY)}`))fail(403,'Importação inicial não autorizada.');
   if(!Array.isArray(b.leads)||b.leads.length>2000||b.leads.some(l=>!l.id||!clean(l.name)||!phone(l.phone,l.country)||!['BR','PT'].includes(l.country)||!validURL(l.source)))fail(400,'Base inválida.');
   const d=empty();d.leads=b.leads;d.profile={sender:clean(b.profile?.sender,100),business:clean(b.profile?.business,100),offer:clean(b.profile?.offer,500)};
   d.suppression=d.leads.filter(l=>l.status==='bloqueado').map(l=>l.phone);log(d,`${d.leads.length} contatos transferidos do Prospecta local.`);
   const saved=await store.setJSON('crm/state',d,{onlyIfNew:true});if(!saved.modified)fail(409,'Já existe uma base online. A importação não sobrescreveu os dados.');
   return json({ok:true,imported:d.leads.length});
  }
  if(!authenticated)fail(401,'Entre para acessar seu Prospecta.');
  if(p==='/auth/logout'&&method==='POST'){await store.delete('sessions/'+hash(token));return json({ok:true},200,{'Set-Cookie':cookie('',0)});}
  const read=async()=>await store.get('crm/state',{type:'json'})||empty();
  if(p==='/state'&&method==='GET'){
   const d=await read();return json({leads:d.leads,profile:d.profile,activity:d.activity,messages:d.messages,cities,segments,integration:{configured:false,connected:false,method:'manual',cloud:true}});
  }
  if(p==='/backup'&&method==='GET')return json(await read(),200,{'Content-Disposition':'attachment; filename="prospecta-backup.json"'});
  if(p==='/profile'&&method==='POST')return json(await mutate(store,'crm/state',empty,d=>{d.profile={sender:clean(b.sender,100),business:clean(b.business,100),offer:clean(b.offer,500)};return d.profile;}));
  if(p==='/search'&&method==='POST'){
   if(!cities[b.city]||!segments[b.segment])fail(400,'Selecione cidade e segmento válidos.');
   await mutate(store,'crm/state',empty,d=>{if(Date.now()-d.lastSearch<15000)fail(429,'Aguarde alguns segundos antes de pesquisar novamente.');d.lastSearch=Date.now();});
   const data=await researchImpl({city:b.city,segment:b.segment,whatsappOnly:b.whatsappOnly===true},{timeout:8000});
   return json(await mutate(store,'crm/state',empty,d=>{
    let added=0,duplicates=0;for(const e of data.elements||[]){const l=fromOSM(e,b.city,b.segment);if(!l.name||!l.phone)continue;if(d.leads.some(k=>k.id===l.id||k.phone===l.phone)){duplicates++;continue;}if(d.leads.length>=2000)fail(409,'Limite de 2.000 contatos atingido. Exporte um backup antes de ampliar a base.');if(d.suppression.includes(l.phone))l.status='bloqueado';d.leads.push(l);added++;}
    log(d,`Pesquisa em ${cities[b.city].name}: ${added} novos contatos.`);return {added,duplicates,scanned:data.elements?.length||0,source:data.source,cached:data.cached};
   }));
  }
  if(p==='/leads'&&method==='POST')return json(await mutate(store,'crm/state',empty,d=>{
   const number=phone(b.phone,b.country),source=validURL(b.source),ig=instagramInput(b);
   if(!['BR','PT'].includes(b.country)||!clean(b.name)||!clean(b.city)||!number||!source)fail(400,'Preencha empresa, cidade, número válido e URL da fonte.');
   if(d.leads.some(l=>l.phone===number))fail(409,'Este número já está cadastrado.');if(d.leads.length>=2000)fail(409,'Limite de 2.000 contatos atingido.');
   const l={id:randomUUID(),name:clean(b.name,150),country:b.country,city:clean(b.city,100),phone:number,segment:segments[b.segment]?b.segment:'todos',source,sourceKind:'Cadastro manual',whatsapp:false,whatsappEvidence:'',websiteStatus:'not_listed',researchedAt:now(),status:d.suppression.includes(number)?'bloqueado':'novo',consent:null,facts:{description:clean(b.description,600),instagram:ig.url},notes:''};
   d.leads.push(l);log(d,`Contato cadastrado: ${l.name}.`);return l;
  }),201);
  const match=p.match(/^\/leads\/([^/]+)(?:\/(analysis|draft|verify|consent|block|instagram))?$/);
  if(match){
   const id=decodeURIComponent(match[1]),action=match[2];
   if(method==='GET'){const d=await read(),l=d.leads.find(x=>x.id===id);if(!l)fail(404,'Lead não encontrado.');
    if(action==='analysis')return json(analyze(l));if(action==='draft')return json({text:l.draft||draft(l,d.profile),eligible:false,reason:eligibility(l),windowOpen:false});
   }else return json(await mutate(store,'crm/state',empty,d=>{
    const l=d.leads.find(x=>x.id===id);if(!l)fail(404,'Lead não encontrado.');
    if(!action&&method==='PATCH'){
     if(b.notes!==undefined)l.notes=clean(b.notes,4000);if(b.draft!==undefined)l.draft=clean(b.draft,4000);
     if(['novo','analisado','proposta','ganho'].includes(b.status)&&l.status!=='bloqueado')l.status=b.status;
    }else if(action==='instagram'&&method==='POST'){const ig=instagramInput(b);l.facts={...l.facts,instagram:ig.url};l.instagramReview=ig.review;
    }else if(action==='verify'&&method==='POST'){
     if(b.whatsapp===true){const evidence=validURL(b.whatsappEvidence);if(!evidence)fail(400,'Informe a URL da evidência do WhatsApp.');l.whatsapp=true;l.whatsappEvidence=evidence;}if(b.whatsapp===false){l.whatsapp=false;l.whatsappEvidence='';}
     if(['confirmed_absent','has_site','not_listed'].includes(b.websiteStatus)){if(b.websiteStatus!=='not_listed'&&!clean(b.websiteEvidence))fail(400,'Registre a evidência da revisão do site.');l.websiteStatus=b.websiteStatus;l.websiteEvidence=clean(b.websiteEvidence,1000);}
    }else if(action==='block'&&method==='POST'){l.status='bloqueado';l.consent=null;if(!d.suppression.includes(l.phone))d.suppression.push(l.phone);
    }else if(action==='consent'&&method==='POST'){
     if(l.status==='bloqueado'||d.suppression.includes(l.phone))fail(409,'Contato descadastrado.');const at=Date.parse(b.at);
     if(!clean(b.evidence)||!Number.isFinite(at)||at>Date.now()||!['formulario','presencial','mensagem','outro'].includes(b.channel))fail(400,'Informe data passada, canal e evidência da autorização.');
     l.consent={at:new Date(at).toISOString(),recordedAt:now(),evidence:clean(b.evidence,2000),channel:b.channel};
    }else fail(405,'Método não permitido.');
    log(d,`Informações atualizadas: ${l.name}.`);return l;
   }));
  }
  fail(404,'Rota não encontrada.');
 }catch(e){return json({error:e.status?e.message:'Não foi possível concluir. Tente novamente.',...(e.code?{code:e.code}:{})},e.status||503);}
}
