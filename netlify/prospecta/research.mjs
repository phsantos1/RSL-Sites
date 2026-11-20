import {cities,makeQuery} from './lib.mjs';
export const providers={
 europe:{name:'Overpass Europa',url:'https://ovp.dresel.systems/api/interpreter',countries:['PT']},
 main:{name:'Overpass OSM',url:'https://overpass-api.de/api/interpreter',countries:['BR']},
 coffee:{name:'Overpass Private.coffee',url:'https://overpass.private.coffee/api/interpreter',countries:['BR','PT']},
 vk:{name:'Overpass VK Maps',url:'https://maps.mail.ru/osm/tools/overpass/api/interpreter',countries:['BR','PT']}
};
const cooloffs=new Map(),cache=new Map();
export async function research({city,segment,whatsappOnly=false,excludeIds=[]},{fetchImpl=fetch,now=Date.now,timeout=16000,endpoint=process.env.OVERPASS_URL}={}){
 const key=JSON.stringify([city,segment,whatsappOnly,excludeIds,endpoint||'auto']);
 const cached=cache.get(key);if(cached&&now()-cached.at<10*60000)return {...cached.result,cached:true};
 const country=cities[city].country;
 let sources=Object.values(providers).filter(p=>p.countries.includes(country));
 if(endpoint){const match=Object.values(providers).find(p=>p.url===endpoint);if(!match)sources=[{name:'Fonte configurada',url:endpoint},...sources];else if(country!=='PT'&&match.countries.includes(country))sources=[match,...sources.filter(p=>p.url!==endpoint)];}
 const diagnostics=[];
 for(const source of sources){
  if((cooloffs.get(source.url)||0)>now()){diagnostics.push({source:source.name,kind:'cooldown',message:'Fonte em intervalo após falha recente.'});continue;}
  try{
   const res=await fetchImpl(source.url,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json','User-Agent':'Prospecta/1.1 (+http://localhost:4317; interactive local CRM)'},body:new URLSearchParams({data:makeQuery(city,segment,whatsappOnly,excludeIds)}),signal:AbortSignal.timeout(timeout)});
   if(!res.ok){cooloffs.set(source.url,now()+60000);diagnostics.push({source:source.name,kind:'http',status:res.status,message:res.status===429||res.status===406?'Fonte recusou ou limitou a consulta.':'Fonte indisponível.'});continue;}
   let data;try{data=await res.json();}catch{throw Object.assign(new Error('Fonte respondeu em formato inválido.'),{kind:'format'});}
   if(!Array.isArray(data.elements))throw Object.assign(new Error('Resposta sem lista de resultados.'),{kind:'format'});
   if(data.remark)throw Object.assign(new Error('Fonte não concluiu a consulta dentro dos recursos disponíveis.'),{kind:'query'});
   const result={elements:data.elements,source:source.name,diagnostics,cached:false,dataAt:data.osm3s?.timestamp_osm_base||null};
   cache.set(key,{at:now(),result});return result;
  }catch(e){cooloffs.set(source.url,now()+60000);const kind=['TimeoutError','AbortError'].includes(e.name)?'timeout':e.kind||'network';diagnostics.push({source:source.name,kind,message:kind==='timeout'?'Fonte excedeu o tempo de resposta.':kind==='network'?'Conexão com a fonte falhou (rede, DNS ou TLS).':e.message});}
 }
 const detail=diagnostics.map(d=>`${d.source}: ${d.status?'HTTP '+d.status:d.message}`).join(' ');
 throw Object.assign(new Error(`As fontes disponíveis para ${country==='BR'?'o Brasil':'Portugal'} não responderam. ${detail} Aguarde um minuto e tente novamente; você também pode configurar uma instância Overpass própria no servidor.`),{status:503,code:'RESEARCH_SOURCES_UNAVAILABLE',diagnostics});
}
