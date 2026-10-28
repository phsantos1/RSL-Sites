import { useState } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { PROJECTS, getWhatsAppUrl } from '../data/content';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'local', label: 'Comércio Local & Gastronomia' },
    { id: 'health', label: 'Clínicas & Saúde' },
    { id: 'catalog', label: 'Vitrines & Catálogos' },
    { id: 'institutional', label: 'Institucional' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-24 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-red-500 flex items-center justify-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-600" />
            <span>Casos de Sucesso</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Projetos que Geram Resultados Reais
          </h2>
          <p className="text-base text-neutral-300">
            Conheça alguns dos trabalhos desenvolvidos pela RSL Sites. Cada
            projeto é pensado estrategicamente para a realidade do cliente.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-xl bg-[#111111] border border-white/[0.08]">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-[#0c0c0c] border border-white/[0.08] hover:border-red-500/40 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-red-950/30"
            >
              <div>
                {/* Project Image Showcase with Click to View Modal */}
                <div
                  onClick={() => setActiveProject(project)}
                  className="relative aspect-[16/10] overflow-hidden bg-[#050505] cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                    }}
                  />
                  {/* Scrim overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-85" />

                  {/* Top-right quick inspect indicator */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                    <span>Ver Estudo Completo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>

                  {/* Quantitative Badge attached to image */}
                  <div className="absolute bottom-4 left-4 bg-[#050505]/95 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-white font-mono tabular-nums">
                      {project.metric}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      impacto comprovado
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 space-y-4">
                  {/* Category and Client */}
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-semibold text-red-500 uppercase tracking-wider">
                      {project.categoryLabel}
                    </span>
                    <span className="font-mono">{project.client}</span>
                  </div>

                  <h3
                    onClick={() => setActiveProject(project)}
                    className="text-xl font-bold text-white group-hover:text-red-400 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">
                    {project.overview}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-neutral-400 bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => setActiveProject(project)}
                  className="flex-1 text-center py-2.5 px-4 text-xs font-medium text-neutral-200 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border border-white/10 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  Ver Detalhes do Projeto
                </button>
                <a
                  href={getWhatsAppUrl(
                    `Olá! Gostei do projeto "${project.title}" e quero um site com proposta parecida.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center p-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 shadow-md shadow-red-600/20"
                  title="Pedir orçamento com este estilo"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Inspection Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
