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

  return (
    <nav className={`fixed top-0 w-full shadow-md z-50 transition-all duration-300 ${isBlurred ? '[backdrop-filter:blur(2px)]' : ''}`}>
      <div className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-300 ${isBlurred ? 'from-blue-100/40 via-purple-700/40 to-purple-900/40' : 'from-blue-100/20 via-purple-700/20 to-purple-900/20'}`}></div>
      <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${isBlurred ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 md:px-10 relative z-10">
        {/* Logo da empresa */}
        <div className="flex-shrink-0">
          <Image
            src={logoUrl || "/logo.png"}
            alt="Logo da Empresa"
            width={101}
            height={33}
            priority
          />
        </div>

        {/* Menu de navegação */}
        <ul className="flex space-x-4 md:space-x-8 text-xs md:text-sm">
          <li>
            <a href="#cursos" className="text-white uppercase hover:text-gray-300 transition-colors duration-200 font-bold">
              CURSOS
            </a>
          </li>
          <li>
            <a href="#depoimentos" className="text-white uppercase hover:text-gray-300 transition-colors duration-200 font-bold">
              DEPOIMENTOS
            </a>
          </li>
          <li>
            <a href="#videos" className="text-white uppercase hover:text-gray-300 transition-colors duration-200 font-bold">
              VÍDEO
            </a>
          </li>
          <li>
            <a href="#localizacao" className="text-white uppercase hover:text-gray-300 transition-colors duration-200 font-bold">
              LOCALIZAÇÃO
            </a>
          </li>
          <li>
            <a href="#contato" className="text-white uppercase hover:text-gray-300 transition-colors duration-200 font-bold">
              CONTATO
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

