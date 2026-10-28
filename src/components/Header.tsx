import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { getWhatsAppUrl, INSTAGRAM_URL } from '../data/content';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Planos', href: '#planos' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/[0.08] shadow-xl shadow-black/60 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (4-6 single-line links) — Zone 3 (1 primary action) */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element with clean red monogram) */}
          <a
            href="#inicio"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-md py-1"
          >
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md shadow-red-600/30 group-hover:bg-red-700 transition-colors">
              RSL
            </div>
            <span className="font-display font-extrabold text-lg text-white">
              RSL <span className="text-red-500">Sites</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-red-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Social / Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da RSL Sites"
              className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors px-2 py-1.5"
            >
              <span>@rslsites</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>

            <a
              href={getWhatsAppUrl('Olá! Vim pelo site da RSL Sites e gostaria de solicitar um orçamento.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] rounded-lg shadow-md shadow-red-600/25 transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Pedir Orçamento
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/[0.08] px-5 py-6 mt-3 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-white/[0.05] hover:text-red-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-3">
            <a
              href={getWhatsAppUrl('Olá! Vim pelo site e gostaria de solicitar um orçamento para o meu negócio.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md shadow-red-600/30 transition-colors"
            >
              Solicitar Orçamento no WhatsApp
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2 px-4 text-xs font-medium text-slate-400 hover:text-white"
            >
              Siga no Instagram @rslsites
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
