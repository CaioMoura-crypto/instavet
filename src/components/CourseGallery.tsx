'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface CourseGalleryProps {
  photos: string[];
}

export default function CourseGallery({ photos }: CourseGalleryProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
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
                className="flex-shrink-0 w-40 h-32 md:w-48 md:h-40 overflow-hidden"
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
    </section>
  );
}
