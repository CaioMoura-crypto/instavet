'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface CourseGalleryProps {
  photos: string[];
}

export default function CourseGallery({ photos }: CourseGalleryProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 3; // Mostra 3 imagens por vez

  // Carrossel automático
  useEffect(() => {
    if (photos.length <= itemsPerView) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [scrollPosition, photos.length]);

  // Bloquear scroll quando modal estiver aberto
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImageIndex]);

  const handlePrev = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / photos.length;
      const newPosition = Math.max(0, scrollPosition - itemWidth);
      setScrollPosition(newPosition);
      scrollRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / photos.length;
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const newPosition = scrollPosition + itemWidth;

      if (newPosition >= maxScroll) {
        setScrollPosition(0);
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        setScrollPosition(newPosition);
        scrollRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      }
    }
  };

  // Funções do modal
  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const handleModalPrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? photos.length - 1 : selectedImageIndex - 1);
    }
  };

  const handleModalNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === photos.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };

  // Fechar modal com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') handleModalPrev();
        if (e.key === 'ArrowRight') handleModalNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto py-4 px-2">
        <div className="relative">
          {/* Container do carrossel */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-hidden"
          >
            {photos.map((photo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-32 md:w-48 md:h-40 overflow-hidden cursor-pointer transition-transform hover:scale-105"
                onClick={() => openModal(index)}
              >
                <Image
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  width={192}
                  height={160}
                  className="w-full h-full object-cover"
                  priority={index < 3}
                />
              </div>
            ))}
          </div>

          {/* Botões de navegação */}
          {photos.length > itemsPerView && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white/70 hover:text-white rounded-full p-1.5 transition-all shadow-md z-10"
                aria-label="Anterior"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white/70 hover:text-white rounded-full p-1.5 transition-all shadow-md z-10"
                aria-label="Próximo"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal de Imagem */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Container da imagem */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Imagem */}
            <div
              className="relative max-w-7xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selectedImageIndex]}
                alt={`Foto ${selectedImageIndex + 1}`}
                width={1920}
                height={1080}
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
              />
            </div>

            {/* Botão Fechar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-all shadow-lg"
              aria-label="Fechar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Botão Anterior */}
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleModalPrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-all shadow-lg"
                aria-label="Anterior"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Botão Próximo */}
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleModalNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full p-3 transition-all shadow-lg"
                aria-label="Próximo"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Contador de imagens */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
              {selectedImageIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
