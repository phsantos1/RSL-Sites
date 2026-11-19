import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {handleGateway,verificationProof} from '../netlify/functions/webhook.mjs';

const env={PROSPECTA_APP_SECRET:'test-app-secret',PROSPECTA_VERIFY_TOKEN:'test-verify-token-long',PROSPECTA_PHONE_NUMBER_ID:'1234567890',PROSPECTA_BRIDGE_KEY:'test-bridge-key-at-least-thirty-two-characters'};
function storage(){const values=new Map();return {values,get:async k=>values.get(k)||null,setJSON:async(k,v,opts)=>{if(opts?.onlyIfNew&&values.has(k))return;values.set(k,v);},delete:async k=>values.delete(k),list:async function*({prefix}){yield {blobs:[...values.keys()].filter(k=>k.startsWith(prefix)).map(key=>({key}))};}};}
test('Netlify: handshake real, assinatura, isolamento por número, fila protegida e ACK',async()=>{
 const store=storage(),run=req=>handleGateway(req,{store,env});
 let response=await run(new Request('https://example.com/.netlify/functions/webhook?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=123'));assert.equal(response.status,403);assert.equal(store.values.size,0);
 response=await run(new Request('https://example.com/.netlify/functions/webhook?hub.mode=subscribe&hub.verify_token=test-verify-token-long&hub.challenge=123'));assert.equal(await response.text(),'123');assert.equal(store.values.get('meta/verification').proof,verificationProof(env.PROSPECTA_APP_SECRET,env.PROSPECTA_VERIFY_TOKEN,env.PROSPECTA_PHONE_NUMBER_ID));
 const body=JSON.stringify({object:'whatsapp_business_account',entry:[{changes:[{value:{metadata:{phone_number_id:'1234567890'},messages:[{id:'message-1',text:{body:'SAIR'}}]}}]}]});
 const signature='sha256='+createHmac('sha256',env.PROSPECTA_APP_SECRET).update(body).digest('hex');
 const incoming=(sig=signature,text=body)=>new Request('https://example.com/.netlify/functions/webhook',{method:'POST',headers:{'x-hub-signature-256':sig},body:text});
 assert.equal((await run(incoming('sha256=wrong'))).status,403);
 assert.equal((await run(incoming())).status,200);assert.equal((await run(incoming())).status,200);assert.equal(store.values.size,2);
 const poll=auth=>new Request('https://example.com/.netlify/functions/webhook?bridge=poll',{headers:{Authorization:auth}});
 assert.equal((await run(poll(''))).status,401);
 const results=await (await run(poll('Bearer '+env.PROSPECTA_BRIDGE_KEY))).json();assert.equal(results.events.length,1);assert.equal(Buffer.from(results.events[0].body,'base64').toString(),body);assert.equal(results.events[0].signature,signature);
 const ack=keys=>new Request('https://example.com/.netlify/functions/webhook?bridge=ack',{method:'POST',headers:{Authorization:'Bearer '+env.PROSPECTA_BRIDGE_KEY},body:JSON.stringify({keys})});
 assert.equal((await run(ack(['meta/verification']))).status,400);
 assert.equal((await run(ack([results.events[0].key]))).status,200);assert.equal(store.values.size,1);
 const other=body.replace('1234567890','9999999999'),otherSignature='sha256='+createHmac('sha256',env.PROSPECTA_APP_SECRET).update(other).digest('hex');assert.equal((await (await run(incoming(otherSignature,other))).json()).ignored,true);
});
test('Netlify: falha de armazenamento pede retry em vez de perder evento',async()=>{
 const store=storage();store.setJSON=async()=>{throw new Error('Simulated unavailable storage');};
 const req=new Request('https://example.com/webhook?hub.mode=subscribe&hub.verify_token=test-verify-token-long&hub.challenge=abc');assert.equal((await handleGateway(req,{store,env})).status,503);
});
