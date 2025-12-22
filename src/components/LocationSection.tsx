'use client';

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface GalleryImage {
  _key: string;
  asset: {
    _ref: string;
  };
  alt?: string;
}

interface Location {
  _id: string;
  title: string;
  subtitle: string;
  address: string;
  whatsappUrl?: string;
  instagramUrl?: string;
  googleMapsEmbed?: string;
  gallery?: GalleryImage[];
}

async function getLocation(): Promise<Location | null> {
  const query = `*[_type == "location"][0] {
    _id,
    title,
    subtitle,
    address,
    whatsappUrl,
    instagramUrl,
    googleMapsEmbed,
    gallery[] {
      _key,
      asset,
      alt
    }
  }`;

  return client.fetch(query);
}

export default function LocationSection() {
  const [location, setLocation] = useState<Location | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    getLocation().then(setLocation);
  }, []);

  const currentImageIndex = selectedImage && location?.gallery
    ? location.gallery.findIndex((img) => img._key === selectedImage._key)
    : -1;

  const handlePrevImage = () => {
    if (location?.gallery && currentImageIndex > 0) {
      setSelectedImage(location.gallery[currentImageIndex - 1]);
    }
  };

  const handleNextImage = () => {
    if (location?.gallery && currentImageIndex < location.gallery.length - 1) {
      setSelectedImage(location.gallery[currentImageIndex + 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage, currentImageIndex]);

  if (!location) {
    return null;
  }

  return (
    <section id="localizacao" className="scroll-mt-[72px]">
      <div className="w-full max-w-6xl mx-auto bg-[#e8edf5] pt-20 pb-20 px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-black mb-4">
            {location.title}
          </h2>
          <p className="text-gray-600/60 text-base">
            {location.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Address Card */}
          <div className="flex-1 flex flex-col gap-4 md:max-w-[50%]">
            {/* Address */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Nosso endereço</h3>
                  <p className="text-gray-600 text-xs md:text-sm whitespace-pre-line">
                    {location.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <a
                href={location.whatsappUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-white border border-gray-300 rounded-lg text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Whatsapp
              </a>
              <a
                href={location.instagramUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-violet-800 hover:bg-violet-700 rounded-lg text-xs md:text-sm font-medium text-white transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </a>
            </div>

            {/* Mini Gallery */}
            {location.gallery && location.gallery.length > 0 && (
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="grid grid-cols-3 gap-2">
                  {location.gallery.slice(0, 6).map((image) => (
                    <div
                      key={image._key}
                      className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <Image
                        src={urlFor(image.asset).width(200).height(200).url()}
                        alt={image.alt || 'Imagem da localização'}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 33vw, 150px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Fechar"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Previous Button */}
              {currentImageIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
                  aria-label="Imagem anterior"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Next Button */}
              {location?.gallery && currentImageIndex < location.gallery.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
                  aria-label="Próxima imagem"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              <div className="relative max-w-2xl max-h-[70vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
                <Image
                  src={urlFor(selectedImage.asset).width(600).height(600).url()}
                  alt={selectedImage.alt || 'Imagem da localização'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </div>
          )}

          {/* Google Maps */}
          <div className="flex-1 rounded-xl overflow-hidden shadow-sm min-h-[400px] md:min-h-[300px]">
            {location.googleMapsEmbed ? (
              <iframe
                src={location.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                className="md:min-h-[300px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center min-h-[400px] md:min-h-[300px]">
                <p className="text-gray-500">Mapa não configurado</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
