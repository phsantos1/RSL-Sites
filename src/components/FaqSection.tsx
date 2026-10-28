import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS, getWhatsAppUrl } from '../data/content';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 bg-[#0a0a0a] border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-red-500">
            <HelpCircle className="w-4 h-4" />
            <span>Dúvidas Frequentes</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Tudo o que você precisa saber antes de começar
          </h2>
          <p className="text-sm text-neutral-300">
            Transparência total desde o primeiro contato. Sem letras miúdas.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.08] bg-[#111111] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ml-4 ${
                      isOpen ? 'rotate-180 text-red-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-neutral-300 leading-relaxed border-t border-white/[0.04] pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#111111] border border-white/[0.08]">
          <p className="text-sm text-neutral-300 mb-4">
            Ainda tem alguma dúvida específica sobre o seu segmento?
          </p>
          <a
            href={getWhatsAppUrl('Olá! Tenho uma dúvida sobre a criação de site com a RSL Sites.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md shadow-red-600/20 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tirar Dúvidas no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
