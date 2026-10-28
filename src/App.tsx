import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Differentials } from './components/Differentials';
import { Portfolio } from './components/Portfolio';
import { ProjectSimulator } from './components/ProjectSimulator';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactForm } from './components/ContactForm';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col font-sans selection:bg-red-600/30 selection:text-red-200">
      {/* Top Bar Navigation */}
      <Header />

      <main className="flex-1">
        {/* 1. Seção inicial impactante */}
        <Hero />

        {/* 2. Sobre / Quem somos */}
        <About />

        {/* 3. Serviços */}
        <Services />

        {/* Planos Transparentes (R$ 300, R$ 600, R$ 800 e Sob Medida - Entrega em 12 a 36h) */}
        <Pricing />

        {/* Diferenciais Competitivos */}
        <Differentials />

        {/* 4. Portfólio / Projetos */}
        <Portfolio />

        {/* Simulador Interativo de Orçamento */}
        <ProjectSimulator />

        {/* 5. Depoimentos */}
        <Testimonials />

        {/* Dúvidas Frequentes (FAQ) */}
        <FaqSection />

        {/* 6. Formulário de Contato */}
        <ContactForm />
      </main>

      {/* 7. WhatsApp Flutuante */}
      <FloatingWhatsApp />

      {/* Rodapé Oficial */}
      <Footer />
    </div>
  );
}
