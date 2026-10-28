import { useState } from 'react';
import { Calculator, Check, MessageSquare, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { getWhatsAppUrl } from '../data/content';

interface SiteTypeOption {
  id: string;
  name: string;
  desc: string;
  baseEstimate: string;
  days: string;
}

const SITE_TYPES: SiteTypeOption[] = [
  {
    id: 'simples',
    name: 'Plano Simples (R$ 300)',
    desc: 'Landing page direta e objetiva de 1 página. Ideal para presença imediata com baixo investimento.',
    baseEstimate: 'R$ 300 à vista',
    days: '12 a 24 horas',
  },
  {
    id: 'essencial',
    name: 'Plano Essencial (R$ 600)',
    desc: 'Site institucional corporativo ou página avançada até 4 seções com SEO e formulário dinâmico.',
    baseEstimate: 'R$ 600 à vista',
    days: '24 a 36 horas',
  },
  {
    id: 'premium',
    name: 'Plano Premium (R$ 800)',
    desc: 'Alta conversão ou catálogo comercial/cardápio digital até 6 seções com checkout no WhatsApp e Pixel.',
    baseEstimate: 'R$ 800 à vista',
    days: '24 a 36 horas',
  },
  {
    id: 'sob-medida',
    name: 'Projeto Sob Medida',
    desc: 'Estruturas especiais, portais corporativos maiores ou integrações específicas sob demanda.',
    baseEstimate: 'A Negociar',
    days: 'A combinar',
  },
];

const EXTRA_FEATURES = [
  { id: 'whatsapp', label: 'Botão Flutuante e Rastreamento WhatsApp', checked: true },
  { id: 'seo', label: 'Otimização para Busca do Google (SEO Local)', checked: true },
  { id: 'social', label: 'Integração de Instagram e Redes Sociais', checked: true },
  { id: 'form', label: 'Formulário Inteligente de Proposta/Contato', checked: false },
  { id: 'pixel', label: 'Configuração de Pixel (Facebook/Meta e Google Ads)', checked: false },
];

export function ProjectSimulator() {
  const [selectedType, setSelectedType] = useState<string>('essencial');
  const [features, setFeatures] = useState<string[]>([
    'whatsapp',
    'seo',
    'social',
  ]);
  const [urgency, setUrgency] = useState<'normal' | 'turbo'>('normal');

  const currentType = SITE_TYPES.find((t) => t.id === selectedType) || SITE_TYPES[1];

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const generateWhatsAppMessage = () => {
    const featureLabels = EXTRA_FEATURES.filter((f) => features.includes(f.id))
      .map((f) => `• ${f.label}`)
      .join('\n');

    return (
      `Olá! Fiz uma simulação de site na RSL Sites:\n\n` +
      `📌 Plano Escolhido: ${currentType.name}\n` +
      `💰 Estimativa: ${currentType.baseEstimate}\n` +
      `⏱️ Prazo de Entrega: ${urgency === 'turbo' ? 'Urgência Turbo (12 a 24 horas)' : currentType.days}\n` +
      `⚙️ Recursos selecionados:\n${featureLabels}\n\n` +
      `Gostaria de fechar o projeto e enviar as informações da minha empresa!`
    );
  };

  return (
    <section className="py-20 bg-[#0a0a0a] border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-500">
            <Calculator className="w-4 h-4" />
            <span>Simulador Interativo de Planos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Descubra o formato ideal para o seu negócio
          </h2>
          <p className="text-sm text-neutral-300">
            Selecione o plano da sua empresa e receba a confirmação com entrega de 12 a 36 horas
            direto no seu WhatsApp, sem burocracia.
          </p>
        </div>

        {/* Simulator Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Options (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
                  1. Qual é o plano que você deseja?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SITE_TYPES.map((type) => {
                    const isSelected = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`p-4 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'bg-red-600/15 border-red-500 text-white shadow-md'
                            : 'bg-white/[0.03] border-white/[0.08] text-neutral-300 hover:border-white/20'
                        }`}
                      >
                        <div className="text-sm font-bold text-white mb-1">
                          {type.name}
                        </div>
                        <div className="text-xs text-neutral-400 leading-snug">
                          {type.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Extra features */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
                  2. Recursos e integrações necessárias
                </label>
                <div className="space-y-2">
                  {EXTRA_FEATURES.map((feat) => {
                    const isChecked = features.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => toggleFeature(feat.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                          isChecked
                            ? 'bg-red-600/10 border-red-500/50 text-white'
                            : 'bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <span>{feat.label}</span>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-red-600 border-red-600 text-white'
                              : 'border-white/20 bg-transparent'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Urgency */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                  3. Prazo de entrega
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUrgency('normal')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                      urgency === 'normal'
                        ? 'bg-red-600/20 border-red-500 text-white'
                        : 'bg-white/[0.02] border-white/[0.08] text-neutral-400'
                    }`}
                  >
                    Entrega Padrão ({currentType.days})
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('turbo')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                      urgency === 'turbo'
                        ? 'bg-red-500/25 border-red-500 text-red-200 font-semibold'
                        : 'bg-white/[0.02] border-white/[0.08] text-neutral-400'
                    }`}
                  >
                    Prioridade Turbo (12 a 24h)
                  </button>
                </div>
              </div>
            </div>

            {/* Right Summary Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl bg-[#050505] border border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-500 mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Resumo da sua Simulação</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-neutral-400">Plano Selecionado</div>
                    <div className="text-base font-bold text-white">
                      {currentType.name}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08]">
                    <div className="text-xs text-neutral-400">Investimento</div>
                    <div className="text-2xl sm:text-3xl font-black text-red-500 font-mono tabular-nums">
                      {currentType.baseEstimate}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1">
                      Pagamento facilitado via Pix ou cartão em até 12x. Sem mensalidades ocultas.
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08]">
                    <div className="text-xs text-neutral-400">Prazo de Conclusão</div>
                    <div className="text-sm font-semibold text-neutral-200 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-4 h-4 text-red-400" />
                      <span>
                        {urgency === 'turbo'
                          ? 'Prioridade Turbo (12 a 24 horas)'
                          : currentType.days}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08]">
                    <div className="text-xs text-neutral-400 mb-1">
                      Recursos inclusos na simulação:
                    </div>
                    <div className="text-xs text-neutral-300 space-y-1">
                      {features.length === 0 ? (
                        <span className="text-neutral-500 italic">Estrutura essencial</span>
                      ) : (
                        features.map((id) => {
                          const item = EXTRA_FEATURES.find((f) => f.id === id);
                          return (
                            <div key={id} className="flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-red-500 shrink-0" />
                              <span>{item?.label}</span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Send CTA */}
              <div className="pt-6 mt-6 border-t border-white/[0.08]">
                <a
                  href={getWhatsAppUrl(generateWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-xl shadow-lg shadow-red-600/30 transition-all text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enviar Simulação no WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-[11px] text-neutral-400 text-center mt-2.5">
                  Atendimento ágil em poucos minutos com a RSL Sites.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
