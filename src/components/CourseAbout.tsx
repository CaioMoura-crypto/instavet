'use client';

import Image from 'next/image';
import { useState } from 'react';

interface CourseAboutProps {
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  paymentUrl?: string;
  themeColor?: string;
}

const MAX_CHARS = 200;

export default function CourseAbout({
  title,
  description,
  videoUrl,
  imageUrl,
  paymentUrl,
  themeColor = '#9731C2',
}: CourseAboutProps) {
  const [showFullText, setShowFullText] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const hasVideo = !!videoUrl;
  const needsTruncation = description.length > MAX_CHARS;
  const truncatedText = needsTruncation
    ? description.slice(0, MAX_CHARS) + '...'
    : description;

  const handleButtonClick = () => {
    const formulario = document.getElementById('contato-formulario');
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className="w-full">
        {/* Seção "Sobre o Curso" */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row" style={{backgroundColor: themeColor}}>
          {/* Painel esquerdo: título e descrição */}
          <div className="w-full md:w-1/2 py-12 px-6 md:px-12 flex flex-col justify-center overflow-hidden">
              <h2 className="font-bebas-neue text-4xl md:text-5xl text-white mb-6 uppercase tracking-tight">
                {title}
              </h2>
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4 break-words">
                {truncatedText}
              </p>
              {needsTruncation && (
                <button
                  onClick={() => setShowFullText(true)}
                  className="text-white underline text-sm hover:text-white/80 mb-6 text-left"
                >
                  Ler mais
                </button>
              )}
              <div className="mt-4">
                <button
                  onClick={handleButtonClick}
                  className="bg-gradient-to-r from-[#7ed321] to-[#5a9e1a] hover:from-[#6bc11a] hover:to-[#4a8a15] text-white/80 font-semibold py-3 px-6 rounded-xl transition-all text-sm"
                >
                  Quero me matricular
                </button>
              </div>
            </div>

            {/* Painel direito: mídia */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full">
                {hasVideo ? (
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    onClick={() => setShowVideoPopup(true)}
                  >
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    )}
                    {/* Botão de play */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <svg
                          className="w-8 h-8 md:w-10 md:h-10 ml-1"
                          style={{color: themeColor}}
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">Sem mídia</span>
                  </div>
                )}
            </div>
        </div>
      </section>

      {/* Modal: descrição completa */}
      {showFullText && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative shadow-xl">
            <button
              onClick={() => setShowFullText(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            <div className={`mb-4 ${description.length > 300 ? 'max-h-48 overflow-y-auto' : ''}`}>
              <p className="text-gray-700 leading-relaxed break-words" style={{ wordBreak: 'break-word' }}>
                {description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: player de vídeo */}
      {showVideoPopup && videoUrl && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowVideoPopup(false)}
        >
          <div
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoPopup(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
            <video
              src={videoUrl}
              className="w-full rounded-lg"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </>
  );
}
