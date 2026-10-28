import { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { getWhatsAppUrl } from '../data/content';

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show welcoming balloon after 3 seconds if not dismissed
    const timer = setTimeout(() => {
      if (!dismissed) setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const defaultUrl = getWhatsAppUrl(
    'Olá! Estava navegando no site da RSL Sites e gostaria de tirar uma dúvida sobre criação de sites.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
      {/* Welcoming Tooltip Card */}
      {showTooltip && !dismissed && (
        <div className="pointer-events-auto max-w-xs p-3.5 rounded-2xl bg-[#0c1220] border border-emerald-500/30 text-white shadow-2xl animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">RSL Sites</span>
            </div>
            <button
              onClick={() => {
                setShowTooltip(false);
                setDismissed(true);
              }}
              className="text-slate-400 hover:text-white p-0.5"
              aria-label="Fechar mensagem"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-snug">
            Olá! Quer levar seu negócio ao próximo nível? Estamos online no WhatsApp para tirar suas dúvidas.
          </p>
          <a
            href={defaultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>Iniciar conversa agora</span>
            <span>→</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={defaultUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a RSL Sites no WhatsApp"
        className="pointer-events-auto relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/40"
      >
        <MessageSquare className="w-7 h-7 fill-white stroke-none" />
        <span className="sr-only">Falar no WhatsApp (37) 99830-4238</span>

        {/* Pulse ring indicator */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-[#07090e]" />
      </a>
    </div>
  );
}
