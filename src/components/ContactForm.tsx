import { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Mail, Instagram, PhoneCall, Clock } from 'lucide-react';
import {
  WHATSAPP_DISPLAY,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  EMAIL_CONTACT,
  getWhatsAppUrl,
} from '../data/content';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    whatsapp: '',
    siteType: 'site-profissional',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPhoneNumber = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 11);
    if (clean.length <= 2) return clean;
    if (clean.length <= 7) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'whatsapp') {
      setFormData((prev) => ({ ...prev, [name]: formatPhoneNumber(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Por favor, informe seu nome completo.';
    if (!formData.whatsapp.trim() || formData.whatsapp.replace(/\D/g, '').length < 10) {
      newErrors.whatsapp = 'Informe um número de WhatsApp válido com DDD.';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const formattedWhatsAppDirect = getWhatsAppUrl(
    `Olá! Meu nome é ${formData.name || 'Cliente'}${formData.company ? ` da empresa ${formData.company}` : ''}.\n` +
      `Gostaria de solicitar um orçamento para: ${formData.siteType}.\n` +
      (formData.message ? `Detalhes: ${formData.message}` : '')
  );

  return (
    <section id="contato" className="py-24 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-red-500 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>Vamos Conversar</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Solicite seu orçamento sem compromisso
              </h2>
              <p className="text-base text-neutral-300 mt-3 leading-relaxed">
                Dê o próximo passo para levar seu negócio ao digital. Respondemos com agilidade e apresentamos uma proposta transparente para sua empresa.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              {/* WhatsApp direct card */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#0f0f0f] border border-white/[0.08] hover:border-emerald-500/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">
                    WhatsApp Comercial
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors font-mono">
                    {WHATSAPP_DISPLAY}
                  </div>
                  <div className="text-[11px] text-emerald-400/90 mt-0.5">
                    Atendimento ágil em poucos minutos
                  </div>
                </div>
              </a>

              {/* Instagram Card */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#0f0f0f] border border-white/[0.08] hover:border-pink-500/40 transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">
                    Instagram Oficial
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                    {INSTAGRAM_HANDLE}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Acompanhe dicas de presença digital
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-[#0f0f0f] border border-white/[0.08] flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-medium">
                    E-mail Corporativo
                  </div>
                  <div className="text-sm font-semibold text-white break-all">
                    {EMAIL_CONTACT}
                  </div>
                </div>
              </div>
            </div>

            {/* Business hours */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 pt-2">
              <Clock className="w-4 h-4 text-neutral-500" />
              <span>Horário de atendimento: Segunda a Sábado, das 08h às 19h</span>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">
                      Mensagem Recebida com Sucesso!
                    </h3>
                    <p className="text-sm text-neutral-300 max-w-md mx-auto">
                      Obrigado pelo contato, <strong>{formData.name}</strong>. Já recebemos seus dados e entraremos em contato pelo seu WhatsApp em breve.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] max-w-md mx-auto text-left text-xs text-neutral-300 space-y-1">
                    <div><strong>WhatsApp informado:</strong> {formData.whatsapp}</div>
                    {formData.company && <div><strong>Empresa:</strong> {formData.company}</div>}
                    <div><strong>Interesse:</strong> {formData.siteType}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={formattedWhatsAppDirect}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Agilizar Atendimento no WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          company: '',
                          whatsapp: '',
                          siteType: 'site-profissional',
                          message: '',
                        });
                      }}
                      className="w-full sm:w-auto px-5 py-3 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
                    >
                      Enviar Outra Mensagem
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                      >
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex: Carlos Silva"
                        className={`w-full px-4 py-3 rounded-xl bg-[#050505] border text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors ${
                          errors.name ? 'border-rose-500' : 'border-white/10'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                      >
                        Nome da Empresa ou Negócio
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Ex: Padaria Central / Consultoria"
                        className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* WhatsApp */}
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                      >
                        WhatsApp para Retorno *
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="(DDD) 99999-9999"
                        className={`w-full px-4 py-3 rounded-xl bg-[#050505] border text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors ${
                          errors.whatsapp ? 'border-rose-500' : 'border-white/10'
                        }`}
                      />
                      {errors.whatsapp && (
                        <p className="text-[11px] text-rose-400 mt-1">{errors.whatsapp}</p>
                      )}
                    </div>

                    {/* Service / Plan Type */}
                    <div>
                      <label
                        htmlFor="siteType"
                        className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                      >
                        Plano ou Tipo de Projeto
                      </label>
                      <select
                        id="siteType"
                        name="siteType"
                        value={formData.siteType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors"
                      >
                        <option value="Plano Essencial (R$ 600 - 24 a 36h)">Plano Essencial — R$ 600 (Mais Escolhido)</option>
                        <option value="Plano Simples (R$ 300 - 12 a 24h)">Plano Simples — R$ 300 (Entrada Rápida)</option>
                        <option value="Plano Premium (R$ 800 - 24 a 36h)">Plano Premium — R$ 800 (Máxima Conversão)</option>
                        <option value="Projeto Sob Medida (A Negociar)">Projeto Sob Medida (A Negociar)</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2"
                    >
                      Conte um pouco sobre o que sua empresa precisa
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ex: Quero um site para divulgar meus serviços de marcenaria e receber pedidos pelo WhatsApp."
                      className="w-full px-4 py-3 rounded-xl bg-[#050505] border border-white/10 text-sm text-white placeholder-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.99] rounded-xl shadow-lg shadow-red-600/30 transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                    >
                      {isSubmitting ? (
                        <span>Enviando proposta...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Solicitar Orçamento Gratuito</span>
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-neutral-500 mt-3">
                      Seus dados estão 100% seguros. Não enviamos spam.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
