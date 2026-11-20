import {test} from 'node:test';
import assert from 'node:assert/strict';
import {handleProspecta,setupKey} from '../netlify/prospecta/api.mjs';

class MemoryStore{
 data=new Map();version=0;
 async get(key){return structuredClone(this.data.get(key)?.data||null);}
 async getWithMetadata(key){return structuredClone(this.data.get(key)||null);}
 async setJSON(key,data,options={}){const old=this.data.get(key);if(options.onlyIfNew&&old||options.onlyIfMatch&&old?.etag!==options.onlyIfMatch)return {modified:false};const etag=String(++this.version);this.data.set(key,{data:structuredClone(data),etag});return {modified:true,etag};}
 async delete(key){this.data.delete(key);}
}
function fixture(researchImpl=async()=>({elements:[],source:'fixture'})){const store=new MemoryStore(),env={PROSPECTA_BRIDGE_KEY:'test-only-bridge-key-'.repeat(3)};let cookie='';
 const call=async(p,body,options={})=>{const r=await handleProspecta(new Request('https://example.test/prospecta/api'+p,{method:options.method||(body===undefined?'GET':'POST'),headers:{'Content-Type':'application/json','X-Prospecta-Request':'1',...(cookie?{Cookie:cookie}:{}),...options.headers},...(body!==undefined?{body:JSON.stringify(body)}:{})}),{store,env,ip:options.ip||'test-client',researchImpl});const data=await r.json();if(r.headers.get('set-cookie'))cookie=r.headers.get('set-cookie').split(';')[0];return {r,data};};
 return {store,env,call};}
test('online: bootstrap exclusivo, senha protegida, CSRF, sessão e saída',async()=>{
 const {store,env,call}=fixture();
 assert.equal((await call('/state')).r.status,401);
 assert.equal((await call('/auth/setup',{password:'long-test-password',setupKey:'wrong'})).r.status,403);
 const seed={leads:[{id:'a',name:'Empresa teste',phone:'351912345678',country:'PT',city:'Lisboa',source:'https://example.test',segment:'beleza',facts:{},status:'novo'}],profile:{sender:'Ana',business:'Estúdio'}};
 assert.equal((await call('/bootstrap',seed)).r.status,403);
 assert.equal((await call('/bootstrap',seed,{headers:{Authorization:`Bearer ${setupKey(env.PROSPECTA_BRIDGE_KEY)}`}})).r.status,200);
 assert.equal((await call('/bootstrap',seed,{headers:{Authorization:`Bearer ${setupKey(env.PROSPECTA_BRIDGE_KEY)}`}})).r.status,409);
 assert.equal((await call('/auth/setup',{password:'long-test-password',setupKey:setupKey(env.PROSPECTA_BRIDGE_KEY)})).r.status,200);
 assert.ok(!(JSON.stringify(await store.get('auth/owner'))).includes('long-test-password'));
 assert.equal((await call('/auth/login',{password:'incorrect'})).r.status,401);
 const login=await call('/auth/login',{password:'long-test-password'});assert.equal(login.r.status,200);assert.match(login.r.headers.get('set-cookie'),/HttpOnly; Secure; SameSite=Strict/);
 assert.equal((await call('/state')).data.leads.length,1);
 assert.equal((await call('/profile',{sender:'Evil'},{headers:{origin:'https://attacker.test'}})).r.status,403);
 assert.equal((await call('/profile',{sender:'Evil'},{headers:{'X-Prospecta-Request':''}})).r.status,403);
 assert.equal((await call('/leads/a/instagram',{instagram:'@negocio',lastPostAt:new Date().toISOString().slice(0,10)})).r.status,200);
 assert.equal((await call('/leads/a/instagram',{instagram:'@negocio',lastPostAt:'2099-01-01'})).r.status,400);
 assert.match((await call('/leads/a/draft')).data.text,/Empresa teste/);
 assert.equal((await call('/backup')).data.leads.length,1);
 assert.equal((await call('/auth/logout',{})).r.status,200);
 assert.equal((await call('/state')).r.status,401);
 assert.equal((await call('/auth/setup',{password:'other-password',setupKey:setupKey(env.PROSPECTA_BRIDGE_KEY)})).r.status,409);
});
test('online: limite de tentativas e gravações concorrentes preservam contatos',async()=>{
 const {call,env}=fixture();await call('/auth/setup',{password:'long-test-password',setupKey:setupKey(env.PROSPECTA_BRIDGE_KEY)});await call('/auth/login',{password:'long-test-password'});
 const rows=await Promise.all([1,2].map(n=>call('/leads',{name:'Empresa '+n,phone:'35191234567'+n,country:'PT',city:'Lisboa',source:'https://example.test',segment:'lojas'})));
 assert.deepEqual(rows.map(x=>x.r.status),[201,201]);assert.equal((await call('/state')).data.leads.length,2);
 const id=rows[0].data.id;await call('/leads/'+id+'/block',{});await call('/leads/'+id,{status:'novo'},{method:'PATCH'});assert.equal((await call('/state')).data.leads.find(x=>x.id===id).status,'bloqueado');
 for(let n=0;n<8;n++)assert.equal((await call('/auth/login',{password:'wrong'},{ip:'attacker'})).r.status,401);
 assert.equal((await call('/auth/login',{password:'wrong'},{ip:'attacker'})).r.status,429);
});
test('online: prospecção avança, prioriza celulares e salva conferência sem inventar WhatsApp',async()=>{
 let calls=0;
 const {call,env,store}=fixture(async({excludeIds})=>{calls++;if(calls===1)return {source:'teste',elements:[{type:'node',id:1,tags:{name:'Fixo',phone:'+351214714512'}},{type:'node',id:2,tags:{name:'Celular',phone:'+351912345678'}},{type:'node',id:3,tags:{name:'Inválido',phone:'123'}}]};assert.ok(excludeIds.includes('osm-node-1'));assert.ok(excludeIds.includes('osm-node-2'));return {source:'teste',elements:[{type:'node',id:4,tags:{name:'Outro',mobile:'+351913456789'}}]};});
 await call('/auth/setup',{password:'long-test-password',setupKey:setupKey(env.PROSPECTA_BRIDGE_KEY)});await call('/auth/login',{password:'long-test-password'});
 const first=await call('/search',{city:'lisboa',segment:'beleza'});assert.equal(first.data.added,1);assert.equal(first.data.skipped,2);
 let d=await store.get('crm/state');d.lastSearch=0;await store.setJSON('crm/state',d);
 assert.equal((await call('/search',{city:'lisboa',segment:'beleza'})).data.added,1);
 assert.equal((await call('/state')).data.leads.length,2);
 assert.equal((await call('/leads/osm-node-2/contact',{contactStatus:'confirmed'})).r.status,400);
 assert.equal((await call('/leads/osm-node-2/contact',{contactStatus:'unavailable'})).data.whatsappCheck.status,'unavailable');
 assert.equal((await call('/leads/osm-node-2/contact',{contactStatus:'confirmed',identityConfirmed:true})).data.whatsappCheck.status,'confirmed');
 assert.equal((await call('/leads/osm-node-2/contact',{phone:'+351214714512',contactStatus:'unknown'})).data.whatsapp,false);
});
