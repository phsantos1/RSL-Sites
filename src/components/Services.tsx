import { Globe, Zap, Building2, ShoppingBag, Smartphone, Search, Check, MessageSquare } from 'lucide-react';
import { SERVICES, getWhatsAppUrl } from '../data/content';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Zap,
  Building2,
  ShoppingBag,
  Smartphone,
  Search,
};

export function Services() {
  return (
    <section id="servicos" className="py-24 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-red-500 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>O que fazemos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Serviços projetados para alavancar seu negócio
          </h2>
          <p className="text-base text-neutral-300">
            Soluções completas desde a concepção visual até a publicação final e
            integração com seus canais de vendas.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.iconName] || Globe;
            const isFeatured = index === 0 || index === 1;

            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 group ${
                  isFeatured
                    ? 'bg-[#0f0f0f] border border-red-500/35 hover:border-red-500/60 shadow-xl shadow-red-950/20'
                    : 'bg-[#0a0a0a] border border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div>
                  {/* Top Bar with Icon and Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-semibold text-red-400 bg-red-600/10 border border-red-500/25 px-2.5 py-1 rounded-md">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-red-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {service.fullDesc}
                  </p>

                  {/* Deliverables list */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-white/[0.06]">
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      O que está incluso:
                    </div>
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ideal For */}
                  <div className="text-xs text-neutral-400 mb-6 bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    <span className="text-neutral-200 font-medium">Ideal para: </span>
                    {service.idealFor}
                  </div>
                </div>

                {/* Direct Action Button */}
                <a
                  href={getWhatsAppUrl(service.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                    isFeatured
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border border-white/10'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Solicitar Orçamento deste Serviço</span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Global CTA callout below services */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-red-950/50 via-[#0e0e0e] to-red-950/50 border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white">
              Precisa de algo sob medida para o seu segmento?
            </h4>
            <p className="text-sm text-neutral-300">
              Conversamos sem compromisso para indicar a melhor solução para o momento do seu negócio.
            </p>
          </div>
          <a
            href={getWhatsAppUrl('Olá! Gostaria de conversar sobre um projeto sob medida para minha empresa.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs md:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg shadow-red-600/30 transition-all whitespace-nowrap shrink-0"
          >
            Falar com a RSL Sites
          </a>
        </div>
      </div>
    </section>
  );
}
