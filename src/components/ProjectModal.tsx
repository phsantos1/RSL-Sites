import { useEffect } from 'react';
import { X, CheckCircle, TrendingUp, MessageSquare, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';
import { getWhatsAppUrl } from '../data/content';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const quoteMessage = `Olá! Vi o projeto "${project.title}" no portfólio da RSL Sites e gostaria de um site semelhante para o meu negócio.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0a0a0a]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-red-500">
              {project.categoryLabel}
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400 font-mono">{project.client}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            aria-label="Fechar detalhes do projeto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Title */}
          <div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Project Image Frame */}
          <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-[16/9] bg-[#050505]">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
              }}
            />
          </div>

          {/* Metrics Spotlight */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-red-950/40 to-neutral-900 border border-red-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-600/15 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono tabular-nums">
                {project.metric}
              </div>
              <div className="text-xs sm:text-sm text-neutral-300">
                {project.metricLabel}
              </div>
            </div>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
                O Desafio
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                A Solução da RSL Sites
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Key Deliverables & Features */}
          <div>
            <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
              Recursos Implementados neste Projeto
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.06]">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[11px] font-medium text-neutral-400 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with CTA */}
        <div className="px-6 py-4 bg-[#0a0a0a] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-neutral-400 text-center sm:text-left">
            Gostou deste estilo? Podemos criar algo sob medida para o seu segmento.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
            >
              Fechar
            </button>
            <a
              href={getWhatsAppUrl(quoteMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md shadow-red-600/30 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Quero um Site Assim</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
