export const cities = {
  lisboa: { name: 'Lisboa', country: 'PT', bbox: '38.69,-9.24,38.81,-9.08' },
  porto: { name: 'Porto', country: 'PT', bbox: '41.13,-8.70,41.20,-8.55' },
  braga: { name: 'Braga', country: 'PT', bbox: '41.51,-8.47,41.58,-8.37' },
  coimbra: { name: 'Coimbra', country: 'PT', bbox: '40.17,-8.48,40.25,-8.38' },
  sao_paulo: { name: 'São Paulo', country: 'BR', bbox: '-23.65,-46.76,-23.48,-46.55' },
  rio: { name: 'Rio de Janeiro', country: 'BR', bbox: '-23.02,-43.32,-22.86,-43.16' },
  belo_horizonte: { name: 'Belo Horizonte', country: 'BR', bbox: '-19.98,-44.04,-19.84,-43.89' },
  curitiba: { name: 'Curitiba', country: 'BR', bbox: '-25.51,-49.34,-25.37,-49.20' },
  brasilia: { name: 'Brasília', country: 'BR', bbox: '-15.86,-47.95,-15.72,-47.83' },
  salvador: { name: 'Salvador', country: 'BR', bbox: '-13.02,-38.54,-12.90,-38.43' }
};
export const segments = {
  beleza: { name: 'Beleza e estética', filters: ['["shop"~"^(hairdresser|beauty|massage)$"]'], benefit: 'apresentar os serviços, valorizar o portfólio e receber pedidos de agendamento' },
  saude: { name: 'Clínicas e saúde', filters: ['["amenity"~"^(dentist|clinic|doctors)$"]'], benefit: 'apresentar a equipa e os serviços, informar a localização e receber pedidos de marcação' },
  restaurantes: { name: 'Restaurantes e cafés', filters: ['["amenity"~"^(restaurant|cafe|bar)$"]'], benefit: 'mostrar o menu, os horários e a localização e receber pedidos de reserva' },
  oficinas: { name: 'Oficinas e automóveis', filters: ['["shop"~"^(car_repair|car_parts|tyres)$"]'], benefit: 'apresentar os serviços e facilitar pedidos de orçamento e agendamento' },
  lojas: { name: 'Lojas e comércio', filters: ['["shop"]["shop"!~"^(hairdresser|beauty|massage|car_repair|car_parts|tyres)$"]'], benefit: 'mostrar os produtos e os serviços e facilitar pedidos pelo WhatsApp' },
  todos: { name: 'Todos os segmentos', filters: ['["shop"]', '["amenity"~"^(restaurant|cafe|dentist|clinic|doctors)$"]'], benefit: 'apresentar os serviços e facilitar pedidos e agendamentos pelo WhatsApp' }
};
export function instagramURL(value) {
  let raw=String(value||'').trim();if(!raw)return '';
  if (/^@?[a-zA-Z0-9._]{1,30}$/.test(raw)) raw='https://www.instagram.com/'+raw.replace(/^@/,'');
  try {const u=new URL(raw);const parts=u.pathname.split('/').filter(Boolean);
    if(!['instagram.com','www.instagram.com'].includes(u.hostname)||!['http:','https:'].includes(u.protocol)||parts.length!==1||! /^[a-zA-Z0-9._]{1,30}$/.test(parts[0])||['p','reel','reels','stories','explore','accounts','direct'].includes(parts[0].toLowerCase()))return '';
    return 'https://www.instagram.com/'+parts[0]+'/';
  }catch{return '';}
}
export function phone(raw, country) {
  if (!raw) return '';
  let s = String(raw).trim();
  try { if (/wa\.me|api\.whatsapp\.com/.test(s)) { const u = new URL(s); s = u.searchParams.get('phone') || u.pathname.slice(1); } } catch { return ''; }
  s = s.split(/[;,]/)[0].replace(/[^\d+]/g, '');
  if (s.startsWith('00')) s = s.slice(2);
  if (s.startsWith('+')) s = s.slice(1);
  if (country === 'PT' && /^\d{9}$/.test(s)) s = '351' + s;
  if (country === 'BR' && /^\d{10,11}$/.test(s)) s = '55' + s;
  return /^(55\d{10,11}|351\d{9})$/.test(s) ? s : '';
}
export function makeQuery(city, segment, whatsappOnly = false) {
  const contact = whatsappOnly ? '["contact:whatsapp"]' : '[~"^(contact:whatsapp|contact:phone|phone)$"~"."]';
  return `[out:json][timeout:25];(${segments[segment].filters.map(f => `nwr${f}["name"][!"website"][!"contact:website"]${contact}(${cities[city].bbox});`).join('')});out tags center 60;`;
}
export function fromOSM(element, cityKey, segment) {
  const t = element.tags || {}, city = cities[cityKey];
  const whatsapp = phone(t['contact:whatsapp'], city.country);
  return { id: `osm-${element.type}-${element.id}`, name: t.name, country: city.country, city: t['addr:city'] || city.name, searchArea:city.name, segment,
    phone: whatsapp || phone(t['contact:phone'] || t.phone, city.country), whatsapp: !!whatsapp,
    whatsappEvidence: whatsapp ? `https://www.openstreetmap.org/${element.type}/${element.id}` : '',
    websiteStatus: 'not_listed', websiteEvidence: '', source: `https://www.openstreetmap.org/${element.type}/${element.id}`,
    sourceKind: 'OpenStreetMap', researchedAt: new Date().toISOString(), status: 'novo', consent: null,
    facts: { address: [t['addr:street'], t['addr:housenumber'], t['addr:suburb']].filter(Boolean).join(', '),
      category: t.shop || t.amenity || '', hours: t.opening_hours || '', instagram: instagramURL(t['contact:instagram'] || t.instagram),
      wheelchair: t.wheelchair || '', description: t.description || '', cuisine: t.cuisine || '' }, notes: '' };
}
export function analyze(lead) {
  const benefit = (segments[lead.segment] || segments.todos).benefit;
  return { summary: `${lead.name}, em ${lead.city}. ${lead.websiteStatus === 'confirmed_absent' ? 'Ausência de site revista manualmente.' : lead.websiteStatus === 'has_site' ? 'Site existente identificado: avaliar atualização.' : 'A fonte consultada não informa site; isto não comprova que a empresa não tenha um.'}`,
    opportunity: `Uma landing page pode ${benefit}.`,
    suggestions: ['Página de serviços com fotos e informações claras', lead.segment === 'restaurantes' ? 'Menu e formulário de pedido de reserva' : 'Formulário de pedido de agendamento', 'Botão de WhatsApp e localização', 'Design responsivo e estrutura básica para busca'],
    missing: [!lead.whatsapp && 'Confirmar WhatsApp em fonte da empresa', lead.websiteStatus === 'not_listed' && 'Pesquisar se já existe site próprio', !lead.consent && 'Obter autorização para receber a proposta'].filter(Boolean) };
}
export function draft(lead, profile) {
  const pt = lead.country === 'PT';
  const benefit = (segments[lead.segment] || segments.todos).benefit.replace('equipa', pt ? 'equipa' : 'equipe').replace('marcação', pt ? 'marcação' : 'agendamento');
  const context = String(lead.facts?.description || '').trim().slice(0, 600);
  const intro = `Pensei numa ideia para a ${lead.name}, em ${lead.city}.`;
  const detail = context ? ` Pelo que está informado sobre a empresa: ${context.replace(/[.!?]+$/, '')}.` : '';
  const feature = lead.segment === 'restaurantes' ? 'menu, fotos dos pratos e pedidos de reserva' : lead.segment === 'lojas' ? 'catálogo de produtos e pedidos pelo WhatsApp' : lead.segment === 'oficinas' ? 'serviços, pedidos de orçamento e agendamento' : `serviços, portfólio e pedidos de ${pt ? 'marcação' : 'agendamento'}`;
  const site = lead.websiteStatus === 'has_site' ? 'uma atualização do site' : 'uma página profissional';
  return `Olá, ${pt ? 'equipa' : 'equipe'} ${lead.name}! Sou ${profile.sender || '[seu nome]'}, da ${profile.business || '[sua empresa]'}. ${intro}${detail}\n\nTrabalho com sites e landing pages. Para o vosso negócio, ${site} pode ${benefit}. A ideia é reunir ${feature}, localização e botão de WhatsApp numa página que funciona bem no ${pt ? 'telemóvel' : 'celular'}, facilitando o contacto de quem procura ${pt ? 'os vossos' : 'seus'} serviços.\n\n${pt ? 'Posso enviar-vos' : 'Posso enviar'} um exemplo de como poderia ficar para a ${lead.name}, sem compromisso?\n\nSe preferir não receber mais mensagens, responda SAIR.`.replace('Para o vosso negócio', pt ? 'Para o vosso negócio' : 'Para o seu negócio').replace('o contacto', pt ? 'o contacto' : 'o contato');
}
export function eligibility(lead) {
  if (lead.status === 'bloqueado') return 'Contato descadastrado; envio bloqueado.';
  if (!lead.phone || !lead.whatsapp) return 'Confirme o número de WhatsApp e sua fonte.';
  if (!lead.consent?.evidence || !lead.consent?.at) return 'Registre a autorização recebida antes de enviar.';
  return '';
}
export function withinWindow(lead, now = Date.now()) {
  const ts = Date.parse(lead.lastInbound || '');
  return Number.isFinite(ts) && ts <= now && now - ts < 24 * 60 * 60 * 1000;
}
export function optOut(text) {
  return /^(sair|parar|pare|stop|cancelar|remover|remova|nao quero|nao quero mais|nao receber mais|nao desejo receber|cancelar mensagens|nao me contacte|nao me contate|descadastrar)[.!\s]*$/.test(String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim());
}
export function renderTemplate(template, values = []) {
  const body = template.components?.find(c => c.type === 'BODY')?.text;
  if (!body || template.status !== 'APPROVED' || template.category !== 'MARKETING') throw new Error('Selecione um template MARKETING aprovado.');
  const dynamic = template.components.some(c => {
    if (c.type === 'BUTTONS') return c.buttons?.some(b => !['QUICK_REPLY','URL','PHONE_NUMBER'].includes(b.type) || /\{\{/.test(b.url || ''));
    return c.type === 'HEADER' && (c.format !== 'TEXT' || /\{\{/.test(c.text || ''));
  });
  if (dynamic) throw new Error('Este template exige cabeçalho ou botão dinâmico não suportado nesta versão.');
  if (/\{\{\s*[a-zA-Z_]/.test(body)) throw new Error('Use um template com parâmetros numéricos no corpo.');
  const slots = [...new Set([...body.matchAll(/\{\{(\d+)\}\}/g)].map(m => Number(m[1])))].sort((a,b) => a-b);
  if (slots.some((n,i) => n !== i+1) || values.length !== slots.length || values.some(v => typeof v !== 'string' || !v.trim() || /[\r\n\t]/.test(v) || v.length > 500)) throw new Error('Preencha todos os parâmetros do template, em ordem, sem quebras de linha.');
  const parts = template.components;
  const buttons = parts.find(c => c.type === 'BUTTONS')?.buttons || [];
  return [parts.find(c => c.type === 'HEADER')?.text, body.replace(/\{\{(\d+)\}\}/g, (_, n) => values[Number(n)-1]), parts.find(c => c.type === 'FOOTER')?.text, ...buttons.map(b => `${b.text}${b.url || b.phone_number ? ` (${b.url || b.phone_number})` : ''}`)].filter(Boolean).join('\n\n');
}
