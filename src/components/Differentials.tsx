import {
  MonitorCheck,
  Coins,
  Smartphone,
  Palette,
  Zap,
  HeartHandshake,
  CheckCircle,
} from 'lucide-react';

export function Differentials() {
  const differentials = [
    {
      icon: MonitorCheck,
      title: 'Sites modernos e profissionais',
      description:
        'Layouts elegantes, sofisticados e pensados nos mínimos detalhes. Seu negócio passa credibilidade imediata ao primeiro clique.',
      benefit: 'Maior autoridade perante a concorrência',
    },
    {
      icon: Coins,
      title: 'Preços acessíveis e ótimo custo-benefício',
      description:
        'Soluções de nível agência com valores justos e transparentes. Sem taxas surpresas ou custos exorbitantes.',
      benefit: 'Retorno real sobre cada real investido',
    },
    {
      icon: Smartphone,
      title: 'Design responsivo para celular e computador',
      description:
        'Mais de 80% dos acessos acontecem pelo smartphone. Adaptamos cada botão, texto e imagem para uma leitura confortável.',
      benefit: 'Experiência impecável em qualquer tela',
    },
    {
      icon: Palette,
      title: 'Projetos personalizados para cada negócio',
      description:
        'Não usamos modelos prontos genéricos. Seu projeto é construído respeitando as cores e a essência da sua marca.',
      benefit: 'Identidade visual única e memorável',
    },
    {
      icon: Zap,
      title: 'Agilidade no desenvolvimento',
      description:
        'Processo claro, enxuto e sem burocracias. Seu site pronto para receber clientes em tempo recorde.',
      benefit: 'Entrega ágil a partir de 3 a 7 dias úteis',
    },
    {
      icon: HeartHandshake,
      title: 'Atendimento próximo e personalizado',
      description:
        'Você fala diretamente com a gente pelo WhatsApp. Tira dúvidas, sugere ideias e acompanha a evolução em tempo real.',
      benefit: 'Suporte humanizado e atencioso',
    },
  ];

  return (
    <section id="diferenciais" className="py-24 bg-[#0a0a0a] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-red-500 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>Por que escolher a RSL Sites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Nossos Diferenciais Competitivos
          </h2>
          <p className="text-base text-neutral-300">
            Combinamos estética moderna, código veloz e foco total no crescimento do seu negócio.
          </p>
        </div>

        {/* Differentials 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-black/50"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-medium text-red-400">
                  <CheckCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{item.benefit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
