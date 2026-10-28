import { CheckCircle2, Target, HeartHandshake, Award } from 'lucide-react';
import { getWhatsAppUrl } from '../data/content';

export function About() {
  const highlights = [
    {
      title: 'Soluções Acessíveis e Reais',
      desc: 'Qualidade de agência premium com preços compatíveis com a realidade do empreendedor brasileiro.',
      icon: Award,
    },
    {
      title: 'Foco Total em Resultados',
      desc: 'Não criamos sites apenas para serem bonitos; criamos ferramentas ativas para gerar orçamentos e vendas.',
      icon: Target,
    },
    {
      title: 'Parceria e Atendimento Próximo',
      desc: 'Comunicação transparente pelo WhatsApp em todas as etapas, com suporte dedicado após a entrega.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-[#0a0a0a] border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Positioning (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>Sobre a RSL Sites</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
              Sites que impulsionam o seu negócio no mundo digital.
            </h2>

            <div className="space-y-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p>
                A <strong className="text-white font-semibold">RSL Sites</strong> é especializada
                na criação de sites profissionais, modernos e acessíveis para comércios e empresas
                de diversos segmentos.
              </p>
              <p>
                Nosso objetivo é fortalecer a presença digital de cada negócio, oferecendo soluções
                com qualidade, inovação e ótimo custo-benefício. Acreditamos firmemente que toda
                empresa, seja um comércio de bairro, um prestador de serviços autônomo ou uma média
                empresa, merece seu espaço de destaque na internet.
              </p>
            </div>

            {/* Target Audience checklist */}
            <div className="pt-2">
              <div className="text-sm font-semibold text-neutral-200 mb-3">
                Desenvolvemos soluções sob medida para:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Comércios locais e varejistas',
                  'Prestadores de serviços e autônomos',
                  'Clínicas, consultórios e saúde',
                  'Pequenas e médias empresas (PMEs)',
                  'Restaurantes, lanchonetes e bistrôs',
                  'Escritórios e consultorias empresariais'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <a
                href={getWhatsAppUrl('Olá! Li sobre a RSL Sites e gostaria de conversar sobre o site do meu negócio.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors group"
              >
                <span>Converse diretamente conosco pelo WhatsApp</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Pillars & Values (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-red-500/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1.5">
                        {h.title}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bottom Statement Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/40 via-[#111111] to-[#111111] border border-red-500/30 text-center sm:text-left">
              <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">
                Compromisso RSL Sites
              </div>
              <p className="text-sm text-neutral-200 font-medium">
                "Não entregamos apenas páginas na internet. Entregamos a porta de entrada para novos clientes conhecerem e confiarem no seu trabalho."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
