'use client';

import { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  photoUrl: string | null;
  testimonial: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Duplicar os itens para criar loop infinito
  const extendedTestimonials = [...testimonials, ...testimonials.slice(0, visibleCards)];

  // Número de cards visíveis por viewport
  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4; // lg
      if (window.innerWidth >= 768) return 2; // md
      return 1; // mobile
    }
    return 4;
  };

  // Atualiza visibleCards quando a janela redimensiona
  useEffect(() => {
    setVisibleCards(getVisibleCards());

    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play
  useEffect(() => {
    if (isPaused || testimonials.length <= visibleCards) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000); // Muda a cada 3 segundos

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length, visibleCards]);

  // Reset para criar loop infinito
  useEffect(() => {
    if (currentIndex === testimonials.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 1000); // Espera a transição terminar

      setTimeout(() => {
        setIsTransitioning(true);
      }, 1050);
    }
  }, [currentIndex, testimonials.length]);


  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Testimonials Grid with Slide Animation */}
      <div className="relative overflow-hidden px-2">
        {/* Fade effect on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#d49afd] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#d49afd] to-transparent z-10 pointer-events-none" />

        <div
          className={`flex ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }}
        >
          {extendedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial._id}-${index}`}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / visibleCards}%` }}
            >
              <TestimonialCard
                name={testimonial.name}
                role={testimonial.role}
                photoUrl={testimonial.photoUrl}
                testimonial={testimonial.testimonial}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {testimonials.length > visibleCards && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: testimonials.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex % testimonials.length ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
