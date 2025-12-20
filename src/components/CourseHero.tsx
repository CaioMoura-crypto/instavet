'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CourseHeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string | null;
  logoUrl?: string | null;
  paymentUrl?: string;
  themeColor?: string;
}

const MAX_CHARS = 120;

export default function CourseHero({
  title,
  subtitle,
  buttonText,
  imageUrl,
  logoUrl,
  paymentUrl,
  themeColor = '#9731C2',
}: CourseHeroProps) {
  const [showFullText, setShowFullText] = useState(false);

  const needsTruncation = subtitle.length > MAX_CHARS;
  const truncatedText = needsTruncation
    ? subtitle.slice(0, MAX_CHARS) + '...'
    : subtitle;

  const handleClick = () => {
    const formulario = document.getElementById('contato-formulario');
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section>
      <div className="w-full max-w-6xl mx-auto min-h-[500px] md:min-h-[600px] flex relative overflow-hidden">
        {/* Imagem lado esquerdo */}
        <div className="hidden md:block w-1/2 relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-300" />
          )}
        </div>

        {/* Painel direito com background colorido */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 pt-[380px] md:pt-12 pb-12 relative" style={{backgroundColor: themeColor}}>
          {/* Overlay escuro sobre o background */}
          <div className="absolute inset-0 bg-black/50 pointer-events-none md:bg-black/50" />

          {/* Faixa superior com logo e gradiente */}
          <div className="absolute top-0 left-0 right-0 h-20 flex items-center px-8 md:px-14 z-10">
            {/* Gradiente branco para cor do tema */}
            <div className="absolute inset-0 bg-gradient-to-r from-white" style={{backgroundImage: `linear-gradient(to right, white, ${themeColor})`}} />
            {/* Overlay escuro no lado direito do gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50" />
            <Image
              src={logoUrl || "/logo.png"}
              alt="InstaVet"
              width={180}
              height={60}
              className="h-14 w-auto relative z-10"
            />
          </div>

          {/* Título do curso */}
          <h1 className="font-roboto-condensed font-bold text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-tight mb-6 tracking-tight relative z-10" style={{ fontFamily: 'var(--font-roboto-condensed)', fontWeight: 700, letterSpacing: '-0.02em', fontStretch: 'condensed', transform: 'scaleY(1.2)' }}>
            {title}
          </h1>

          {/* Descrição do curso */}
          <p className="text-white/90 text-lg md:text-xl mb-4 max-w-md relative z-10 whitespace-pre-line break-words" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
            {truncatedText}
          </p>
          {needsTruncation && (
            <button
              onClick={() => setShowFullText(true)}
              className="text-white underline text-sm hover:text-white/80 mb-6 text-left relative z-10"
            >
              Ler mais
            </button>
          )}
          {!needsTruncation && <div className="mb-4" />}

          {/* Botão de matrícula */}
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-[#7ed321] to-[#5a9e1a] hover:from-[#6bc11a] hover:to-[#4a8a15] text-white/80 font-semibold py-3 px-8 rounded-xl transition-all w-fit relative z-10"
          >
            {buttonText}
          </button>
        </div>

        {/* Imagem do curso (mobile) */}
        <div className="md:hidden absolute top-0 left-0 w-full" style={{ height: '350px' }}>
          {imageUrl && (
            <>
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            </>
          )}
        </div>
      </div>

      {/* Modal: descrição completa */}
      {showFullText && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 rounded-lg p-6 max-w-md w-full mx-4 relative shadow-xl">
            <button
              onClick={() => setShowFullText(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            <div className={`mb-4 ${subtitle.length > 300 ? 'max-h-48 overflow-y-auto' : ''}`}>
              <p className="text-gray-700 leading-relaxed break-words whitespace-pre-line" style={{ wordBreak: 'break-word' }}>
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
