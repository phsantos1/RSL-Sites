import { MessageSquare, ArrowRight, ShieldCheck, Zap, Smartphone, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '../data/content';

export function Hero() {
  const whatsappHeroUrl = getWhatsAppUrl(
    'Olá! Quero dar o próximo passo e solicitar um orçamento com a RSL Sites para levar meu negócio ao digital.'
  );

  return (
    <section
      id="inicio"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern radial-glow bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline / Subtitle as clean unboxed kicker */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide text-red-500">
              <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
              <span>RSL SITES · CRIAÇÃO DE SITES PROFISSIONAIS</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12] text-balance">
              Seu negócio merece estar no{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">
                próximo nível.
              </span>
            </h1>

            {/* High-conversion Subheadline */}
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed max-w-2xl">
              Desenvolvemos sites modernos, responsivos e de alto padrão para
              comércios locais, empresas, empreendedores e autônomos. Fortaleça sua
              marca, conquiste a confiança dos clientes e receba contatos diretos
              no seu WhatsApp todos os dias.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={whatsappHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-sm md:text-base font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-xl shadow-lg shadow-red-600/30 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                <MessageSquare className="w-5 h-5 text-white transition-transform group-hover:scale-110" />
                <span>Solicitar Orçamento no WhatsApp</span>
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm md:text-base font-medium text-neutral-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] active:scale-[0.98] rounded-xl transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <span>Ver Nossos Projetos</span>
                <ArrowRight className="w-4 h-4 text-neutral-400 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Quantitative Proof Strip */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  12 a 36h
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Entrega recorde do site</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  R$ 300
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Plano inicial acessível</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  100%
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Adaptado para Celular</div>
              </div>
            </div>

            {/* Micro guarantees */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-neutral-400 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-red-500" />
                Sem mensalidades abusivas
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                Carregamento ultrarrápido
              </span>
              <span className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-red-400" />
                Focado em gerar conversões
              </span>
            </div>
          </div>

          {/* Right Column: High-Fidelity Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/10 via-red-950/20 to-white/5 border border-white/10 shadow-2xl shadow-red-950/30">
              {/* Browser bar */}
              <div className="px-4 py-3 bg-[#0d0d0d] rounded-t-xl border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-600/90" />
                  <div className="w-3 h-3 rounded-full bg-neutral-600" />
                  <div className="w-3 h-3 rounded-full bg-neutral-600" />
                </div>
                <div className="text-[11px] font-mono text-neutral-400 bg-[#050505] px-3 py-1 rounded-md border border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span>rslsites.com.br</span>
                </div>
                <div className="w-12" />
              </div>

              {/* Image Frame */}
              <div className="relative aspect-[16/10] bg-[#0a0a0a] overflow-hidden rounded-b-xl">
                <img
                  src="/src/assets/images/hero_agency_workspace_1793191786766.jpg"
                  alt="Ambiente profissional da RSL Sites desenvolvendo sites responsivos de alta qualidade"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                  }}
                />

                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/85 via-transparent to-transparent pointer-events-none" />

                {/* Micro-floating highlight card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0d0d0d]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-600/15 border border-red-500/30 flex items-center justify-center text-red-500">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">
                        Presença Digital Estratégica
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Design moderno & integração com WhatsApp
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">
                    100% Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
