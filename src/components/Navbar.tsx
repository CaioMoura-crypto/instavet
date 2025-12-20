'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface NavbarProps {
  logoUrl?: string | null;
}

export default function Navbar({ logoUrl }: NavbarProps) {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsBlurred(heroBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const navbarHeight = 72; // Altura da navbar alinhada com scroll-mt das seções
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 flex justify-center`}>
      <div className={`relative w-full max-w-6xl shadow-md ${isBlurred ? '[backdrop-filter:blur(2px)]' : ''}`}>
        <div className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-300 ${isBlurred ? 'from-blue-100/90 via-purple-700/65 to-purple-900/50' : 'from-blue-100/70 via-purple-700/45 to-purple-900/30'}`}></div>
        <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${isBlurred ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className="flex justify-between items-center px-3 py-2 md:px-10 md:py-0 relative z-10">
          {/* Logo da empresa */}
          <div className="flex-shrink-0">
            <Image
              src={logoUrl || "/logo.png"}
              alt="Logo da Empresa"
              width={101}
              height={33}
              priority
              className="w-16 h-auto sm:w-20 md:w-[101px]"
            />
          </div>

          {/* Menu de navegação */}
          <ul className="flex space-x-1.5 sm:space-x-3 md:space-x-4 text-[9px] sm:text-xs md:text-xs">
            <li>
              <a
                href="#cursos"
                onClick={(e) => handleSmoothScroll(e, '#cursos')}
                className="text-white uppercase hover:text-gray-300 transition-all duration-300 hover:scale-105 font-bold cursor-pointer"
              >
                CURSOS
              </a>
            </li>
            <li>
              <a
                href="#depoimentos"
                onClick={(e) => handleSmoothScroll(e, '#depoimentos')}
                className="text-white uppercase hover:text-gray-300 transition-all duration-300 hover:scale-105 font-bold cursor-pointer"
              >
                DEPOIMENTOS
              </a>
            </li>
            <li>
              <a
                href="#videos"
                onClick={(e) => handleSmoothScroll(e, '#videos')}
                className="text-white uppercase hover:text-gray-300 transition-all duration-300 hover:scale-105 font-bold cursor-pointer"
              >
                VÍDEO
              </a>
            </li>
            <li>
              <a
                href="#localizacao"
                onClick={(e) => handleSmoothScroll(e, '#localizacao')}
                className="text-white uppercase hover:text-gray-300 transition-all duration-300 hover:scale-105 font-bold cursor-pointer"
              >
                LOCALIZAÇÃO
              </a>
            </li>
            <li>
              <a
                href="#contato"
                onClick={(e) => handleSmoothScroll(e, '#contato')}
                className="text-white uppercase hover:text-gray-300 transition-all duration-300 hover:scale-105 font-bold cursor-pointer"
              >
                CONTATO
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

