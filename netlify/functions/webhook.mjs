import {createHash,createHmac,timingSafeEqual} from 'node:crypto';

const equal=(a,b)=>{const x=Buffer.from(String(a||'')),y=Buffer.from(String(b||''));return x.length===y.length&&timingSafeEqual(x,y);};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export const verificationProof=(secret,verifyToken,phoneId)=>createHmac('sha256',secret).update(`prospecta-webhook-v1:${verifyToken}:${phoneId}`).digest('hex');

export async function handleGateway(request,{store,env,now=Date.now}){
 const secret=env.PROSPECTA_APP_SECRET,verifyToken=env.PROSPECTA_VERIFY_TOKEN,phoneId=env.PROSPECTA_PHONE_NUMBER_ID,bridgeKey=env.PROSPECTA_BRIDGE_KEY;
 if(!secret||!verifyToken||!phoneId||!bridgeKey||bridgeKey.length<32)return json({error:'Webhook not configured'},503);
 const url=new URL(request.url),bridge=url.searchParams.get('bridge');
 try{
  if(bridge){
   if(!equal(request.headers.get('Authorization'),`Bearer ${bridgeKey}`))return json({error:'Unauthorized'},401);
   if(bridge==='poll'&&request.method==='GET'){
    const verification=await store.get('meta/verification',{type:'json'});
    const events=[];let bytes=0,visited=0;
    for await(const page of store.list({prefix:'events/',paginate:true})){
     for(const blob of page.blobs){
      if(++visited>50)break;
      const event=await store.get(blob.key,{type:'json'});if(!event)continue;
      if(now()-event.receivedAt>7*86400000){await store.delete(blob.key);continue;}
      if(events.length>=5||bytes+event.body.length>1500000)break;
      events.push({key:blob.key,...event});bytes+=event.body.length;
     }
     if(events.length>=5||visited>50||bytes>1000000)break;
    }
    return json({verification,events});
   }
   if(bridge==='ack'&&request.method==='POST'){
    const body=await request.text();if(body.length>8192)return json({error:'Too large'},413);
    let data;try{data=JSON.parse(body);}catch{return json({error:'Invalid JSON'},400);}
    if(!Array.isArray(data.keys)||data.keys.length>5||data.keys.some(k=>typeof k!=='string'||!/^events\/[a-f0-9]{64}$/.test(k)))return json({error:'Invalid acknowledgments'},400);
    for(const key of data.keys)await store.delete(key);
    return json({ok:true});
   }
   return json({error:'Method not allowed'},405);
  }
  if(request.method==='GET'){
   const challenge=url.searchParams.get('hub.challenge');
   if(url.searchParams.get('hub.mode')!=='subscribe'||!challenge||challenge.length>1000||!equal(url.searchParams.get('hub.verify_token'),verifyToken))return json({error:'Verification denied'},403);
   await store.setJSON('meta/verification',{at:new Date(now()).toISOString(),proof:verificationProof(secret,verifyToken,phoneId)});
   return new Response(challenge,{status:200,headers:{'Content-Type':'text/plain','Cache-Control':'no-store'}});
  }
  if(request.method!=='POST')return json({error:'Method not allowed'},405);
  if(Number(request.headers.get('content-length')||0)>1048576)return json({error:'Payload too large'},413);
  const chunks=[];let size=0;
  if(request.body)for await(const chunk of request.body){size+=chunk.length;if(size>1048576)return json({error:'Payload too large'},413);chunks.push(chunk);}
  const body=Buffer.concat(chunks),signature=request.headers.get('x-hub-signature-256');
  const expected='sha256='+createHmac('sha256',secret).update(body).digest('hex');
  if(!equal(signature,expected))return json({error:'Invalid signature'},403);
  let payload;try{payload=JSON.parse(body.toString());}catch{return json({error:'Invalid JSON'},400);}
  if(payload.object!=='whatsapp_business_account')return json({error:'Unsupported object'},400);
  const entries=(payload.entry||[]).flatMap(e=>e.changes||[]);
  // Keep events only for this account's selected phone. Other app accounts stay isolated.
  if(!entries.some(c=>c.value?.metadata?.phone_number_id===phoneId))return json({ok:true,ignored:true});
  const key='events/'+createHash('sha256').update(body).digest('hex');
  await store.setJSON(key,{body:body.toString('base64'),signature,receivedAt:now()},{onlyIfNew:true});
  return json({ok:true});
 }catch{
  // Return failure so Meta retries. Never acknowledge an event that was not durably saved.
  return json({error:'Webhook storage temporarily unavailable'},503);
 }
}

import {getStore} from '@netlify/blobs';
export default async request=>handleGateway(request,{store:getStore({name:'prospecta-whatsapp-events',consistency:'strong'}),env:process.env});
