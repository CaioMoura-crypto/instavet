'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de envio do formulário
    console.log('Form submitted:', formData);
    setShowPopup(true);
    setFormData({ name: '', email: '', phone: '', course: '' });
  };

  return (
    <>
      <section id="contato" className="scroll-mt-[72px] py-16">
        <div className="w-full max-w-6xl mx-auto px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-black mb-4">
              Se interessou por qual curso?
            </h2>
            <p className="text-gray-500/70 text-base">
              Preencha o formulário e dê o próximo passo na sua carreira veterinária
            </p>
          </div>

          {/* Form Card */}
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome Completo */}
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

              {/* Email */}
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

              {/* Telefone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Telefone
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

              {/* Curso de Interesse */}
              <div>
                <label htmlFor="course" className="block text-sm font-semibold text-gray-900 mb-2">
                  Curso de Interesse
                </label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="Nome do curso"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-violet-800 hover:bg-violet-700 text-white font-medium rounded-lg transition-colors"
              >
                Enviar cadastro
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-violet-800 py-4">
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
                Em breve entraremos em contato pelo whatsapp
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
