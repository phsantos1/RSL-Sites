import { useState } from 'react';
import { Check, Clock, Sparkles, MessageSquare, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { PRICING_PLANS, getWhatsAppUrl } from '../data/content';

export function Pricing() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section id="planos" className="py-24 bg-[#080808] border-y border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-red-500 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>Planos Transparentes · RSL Sites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Projetos que geram resultado com entrega em{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">
              12 a 36 horas
            </span>
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed">
            Sem mensalidades forçadas, sem enrolação e com valores que cabem no seu bolso.
            Escolha o plano certo para colocar sua empresa no digital com agilidade máxima.
          </p>

          {/* Speed Guarantee Callout */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-200 mt-2">
            <Clock className="w-4 h-4 text-red-400 shrink-0" />
            <span>Entrega expressa garantida em 12 a 36 horas após envio do material!</span>
          </div>
        </div>

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isEssential = plan.isPopular;
            const isPremium = plan.id === 'plano-premium';

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                  isEssential
                    ? 'bg-[#111111] border-2 border-red-500 shadow-2xl shadow-red-950/40 lg:-translate-y-2'
                    : 'bg-[#0d0d0d] border border-white/[0.08] hover:border-red-500/40'
                }`}
              >
                {/* Popular / Recommended Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md ${
                        isEssential
                          ? 'bg-red-600 text-white shadow-red-600/30'
                          : isPremium
                          ? 'bg-neutral-800 text-red-400 border border-red-500/30'
                          : 'bg-neutral-800 text-neutral-300 border border-white/10'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Classification */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-neutral-400 min-h-[32px] leading-relaxed">
                      {plan.shortDesc}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="py-4 border-y border-white/[0.06] mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums">
                        {plan.price}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">
                      {plan.period}
                    </div>

                    {/* Delivery Time Badge */}
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-600/10 px-2.5 py-1 rounded-md border border-red-500/20 w-fit">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Prazo: {plan.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Ideal for */}
                  <div className="text-xs text-neutral-400 mb-5 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                    <span className="text-neutral-200 font-semibold">Para quem é: </span>
                    {plan.idealFor}
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-2.5 mb-6">
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                      O que está incluso:
                    </div>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="pt-4 border-t border-white/[0.06] mt-auto">
                  <a
                    href={getWhatsAppUrl(plan.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 text-center ${
                      isEssential
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30'
                        : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>
                      {plan.id === 'plano-sob-medida'
                        ? 'Negociar Projeto'
                        : `Escolher ${plan.name}`}
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle Detailed Comparison Table Button */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111111] hover:bg-[#161616] border border-white/10 text-xs font-semibold text-neutral-200 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <Sparkles className="w-4 h-4 text-red-500" />
            <span>
              {showComparison
                ? 'Ocultar Comparativo Detalhado de Recursos'
                : 'Ver Comparativo Detalhado entre os 4 Planos'}
            </span>
          </button>
        </div>

        {/* Detailed Comparison Table */}
        {showComparison && (
          <div className="mt-8 rounded-2xl bg-[#0f0f0f] border border-white/10 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-6 bg-[#0a0a0a] border-b border-white/[0.08]">
              <h4 className="text-base font-bold text-white">
                Tabela Comparativa de Recursos
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Entenda exatamente o que muda em cada faixa de investimento.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02] text-neutral-300 font-semibold">
                    <th className="p-4 min-w-[200px]">Recurso / Diferencial</th>
                    <th className="p-4 text-center">Plano Simples (R$ 300)</th>
                    <th className="p-4 text-center bg-red-950/20 text-red-300">Plano Essencial (R$ 600)</th>
                    <th className="p-4 text-center">Plano Premium (R$ 800)</th>
                    <th className="p-4 text-center">Sob Medida (A Negociar)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-neutral-300">
                  <tr>
                    <td className="p-4 font-medium text-white">Prazo de Entrega</td>
                    <td className="p-4 text-center font-mono font-semibold text-neutral-200">12 a 24 horas</td>
                    <td className="p-4 text-center font-mono font-semibold text-red-400 bg-red-950/10">24 a 36 horas</td>
                    <td className="p-4 text-center font-mono font-semibold text-neutral-200">24 a 36 horas</td>
                    <td className="p-4 text-center font-mono text-neutral-400">A combinar</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Estrutura de Páginas/Seções</td>
                    <td className="p-4 text-center">One-Page direta</td>
                    <td className="p-4 text-center bg-red-950/10">Até 4 seções/páginas</td>
                    <td className="p-4 text-center">Até 6 seções/páginas</td>
                    <td className="p-4 text-center">Ilimitadas sob demanda</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">100% Responsivo no Celular</td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-950/10"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Botão WhatsApp Flutuante Direto</td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-950/10"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Otimização SEO para Google Local</td>
                    <td className="p-4 text-center text-neutral-500">—</td>
                    <td className="p-4 text-center bg-red-950/10"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Formulário Dinâmico de Orçamento</td>
                    <td className="p-4 text-center text-neutral-500">—</td>
                    <td className="p-4 text-center bg-red-950/10"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Catálogo de Produtos / Cardápio Digital</td>
                    <td className="p-4 text-center text-neutral-500">—</td>
                    <td className="p-4 text-center text-neutral-500 bg-red-950/10">—</td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Pixel de Anúncios (Meta e Google Ads)</td>
                    <td className="p-4 text-center text-neutral-500">—</td>
                    <td className="p-4 text-center text-neutral-500 bg-red-950/10">—</td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-4 h-4 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Ação Imediata</td>
                    <td className="p-4 text-center">
                      <a
                        href={getWhatsAppUrl('Olá! Quero o Plano Simples de R$ 300.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-400 hover:underline font-semibold"
                      >
                        Pedir Simples
                      </a>
                    </td>
                    <td className="p-4 text-center bg-red-950/10">
                      <a
                        href={getWhatsAppUrl('Olá! Quero o Plano Essencial de R$ 600.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-400 hover:underline font-semibold"
                      >
                        Pedir Essencial
                      </a>
                    </td>
                    <td className="p-4 text-center">
                      <a
                        href={getWhatsAppUrl('Olá! Quero o Plano Premium de R$ 800.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-400 hover:underline font-semibold"
                      >
                        Pedir Premium
                      </a>
                    </td>
                    <td className="p-4 text-center">
                      <a
                        href={getWhatsAppUrl('Olá! Gostaria de negociar um Projeto Sob Medida.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-400 hover:underline font-semibold"
                      >
                        Negociar
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Security & Peace of Mind Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0d0d0d] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-red-500 shrink-0" />
            <div>
              <div className="text-sm font-bold text-white">
                Garantia de Qualidade RSL Sites
              </div>
              <div className="text-xs text-neutral-400">
                Acompanhamento direto pelo WhatsApp até a aprovação final do seu site.
              </div>
            </div>
          </div>

          <a
            href={getWhatsAppUrl('Olá! Gostaria de tirar dúvidas sobre as formas de pagamento dos planos.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
          >
            <span>Dúvidas sobre pagamento? Fale no WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
