import { Star, Quote, TrendingUp } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';

export function Testimonials() {
  return (
    <section className="py-24 bg-[#050505] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-red-500 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>Depoimentos Reais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            O que nossos clientes dizem sobre o trabalho
          </h2>
          <p className="text-base text-neutral-300">
            A satisfação e o crescimento dos negócios que atendemos são nossa maior credencial.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((dep) => (
            <div
              key={dep.id}
              className="p-7 rounded-2xl bg-[#0d0d0d] border border-white/[0.08] hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(dep.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-red-600/40" />
                </div>

                {/* Quantitative outcome highlight */}
                <div className="mb-4 p-3 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-xs font-semibold text-white font-mono">
                    {dep.highlightMetric}
                  </span>
                </div>

                {/* Quote text */}
                <p className="text-sm text-neutral-300 leading-relaxed mb-6 italic">
                  "{dep.quote}"
                </p>
              </div>

              {/* Author info with avatar monogram */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm shadow-red-600/20">
                  {dep.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">
                    {dep.name}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {dep.role} · {dep.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
