'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TestimonialCardProps {
  name: string;
  role: string;
  photoUrl: string | null;
  testimonial: string;
}

export default function TestimonialCard({ name, role, photoUrl, testimonial }: TestimonialCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modal = isOpen && mounted ? createPortal(
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto overflow-x-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-[#818cf8] p-1 flex-shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-purple-200" />
              )}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>

        {/* Full Testimonial */}
        <div className={`mb-4 ${testimonial.length > 300 ? 'max-h-48 overflow-y-auto' : ''}`}>
          <p className="text-gray-700 leading-relaxed break-words" style={{ wordBreak: 'break-word' }}>
            {testimonial}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
        {/* Photo */}
        <div className="w-24 h-24 mb-4 rounded-full bg-[#818cf8] p-1.5">
          <div className="w-full h-full rounded-full overflow-hidden relative">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-purple-200" />
            )}
          </div>
        </div>

        {/* Name and Role */}
        <h3 className="text-sm font-bold text-gray-800 mb-3">
          {name} | {role}
        </h3>

        {/* Testimonial Text */}
        <p
          className="text-xs text-gray-600 leading-relaxed mb-4 flex-grow overflow-hidden break-words"
          style={{ display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', wordBreak: 'break-word' }}
        >
          {testimonial}
        </p>

        {/* Read More Link */}
        <button
          onClick={() => setIsOpen(true)}
          className="text-purple-600 text-sm font-semibold hover:text-purple-800 transition-colors"
        >
          Ler mais...
        </button>
      </div>

      {modal}
    </>
  );
}
