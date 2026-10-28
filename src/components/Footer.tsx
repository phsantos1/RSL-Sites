import { ArrowUpRight, Instagram, Phone, Mail, ShieldCheck } from 'lucide-react';
import {
  WHATSAPP_DISPLAY,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  EMAIL_CONTACT,
  getWhatsAppUrl,
} from '../data/content';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020202] border-t border-white/[0.08] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md shadow-red-600/30">
                RSL
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                RSL <span className="text-red-500">Sites</span>
              </span>
            </div>

            <p className="text-neutral-300 text-sm leading-relaxed max-w-sm">
              Especializada na criação de sites profissionais, modernos e acessíveis
              para comércios e empresas de diversos segmentos. Sites que impulsionam o seu negócio.
            </p>

            <div className="text-xs text-red-500 font-semibold">
              "Seu negócio merece estar no próximo nível."
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:border-red-500/50 flex items-center justify-center text-neutral-300 hover:text-red-400 transition-colors"
                aria-label="Instagram da RSL Sites"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:border-emerald-500/50 flex items-center justify-center text-neutral-300 hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp da RSL Sites"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Navegação
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="hover:text-red-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#planos" className="hover:text-red-400 text-red-400 font-medium transition-colors">
                  Planos & Preços (12 a 36h)
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-red-400 transition-colors">
                  Nossos Serviços
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-red-400 transition-colors">
                  Sobre a RSL Sites
                </a>
              </li>
              <li>
                <a href="#diferenciais" className="hover:text-red-400 transition-colors">
                  Diferenciais Competitivos
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-red-400 transition-colors">
                  Portfólio & Casos
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-red-400 transition-colors">
                  Fale Conosco
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Canais Oficiais
            </div>
            <div className="space-y-2.5">
              <div>
                <span className="block text-neutral-500 text-[11px]">WhatsApp</span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-emerald-400 transition-colors font-mono font-medium text-sm inline-flex items-center gap-1.5"
                >
                  <span>{WHATSAPP_DISPLAY}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <span className="block text-neutral-500 text-[11px]">Instagram</span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-pink-400 transition-colors font-medium text-sm inline-flex items-center gap-1.5"
                >
                  <span>{INSTAGRAM_HANDLE}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <span className="block text-neutral-500 text-[11px]">E-mail</span>
                <span className="text-neutral-300 font-mono text-xs">{EMAIL_CONTACT}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-neutral-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>Desenvolvimento seguro com certificado SSL e código limpo</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © {currentYear} RSL Sites. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Brasil</span>
            <span>·</span>
            <span>Sites Profissionais & Alta Conversão</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
