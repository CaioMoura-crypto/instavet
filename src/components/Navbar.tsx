import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl bg-gradient-to-r from-white/90 to-black/90 p-0.1 shadow-md z-50 backdrop-blur-sm">
      <div className="flex justify-between items-center px-10">
        {/* Logo da empresa */}
        <div className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Logo da Empresa"
            width={101}
            height={33}
            priority
          />
        </div>

        {/* Menu de navegação */}
        <ul className="flex space-x-8 text-sm">
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

