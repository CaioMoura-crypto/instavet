'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';

// TODO: Configure suas credenciais do EmailJS
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

interface CourseContactFormProps {
  courseTitle: string;
  paymentUrl?: string;
}

export default function CourseContactForm({
  courseTitle,
  paymentUrl,
}: CourseContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          course: courseTitle,
        },
        EMAILJS_PUBLIC_KEY
      );

      setShowPopup(true);
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Erro ao enviar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentClick = () => {
    if (paymentUrl) {
      window.open(paymentUrl, '_blank');
    }
  };

  return (
    <>
      <section className="w-full">
        <div className="max-w-6xl mx-auto bg-white py-12 px-6">
          {/* Botão de matrícula */}
          <div className="text-center mb-22">
            <button
              onClick={handlePaymentClick}
              className="bg-gradient-to-r from-[#7ed321] to-[#5a9e1a] hover:from-[#6bc11a] hover:to-[#4a8a15] text-white/80 font-semibold py-2 px-6 text-sm rounded-xl transition-all uppercase"
            >
              Quero minha matrícula
            </button>
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
              Quer novidades? Deixe seu contato
            </h2>
            <p className="text-gray-500">
              Preencha o formulário e dê o próximo passo na sua carreira veterinária
            </p>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Seu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Telefone (WhatsApp)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#7ed321] hover:bg-[#6bc11a] disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
              >
                {isLoading ? 'Enviando...' : 'Enviar cadastro'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#9731C2] py-4">
        <div className="text-center text-white text-sm">
          © 2025 Todos os direitos reservados.
        </div>
      </footer>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4 relative shadow-xl">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Seu cadastro foi enviado!
              </h3>
              <p className="text-gray-500 text-sm">
                Em breve entraremos em contato pelo WhatsApp
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
