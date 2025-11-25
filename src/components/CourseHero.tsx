'use client';

import Image from 'next/image';

interface CourseHeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string | null;
  logoUrl?: string | null;
  paymentUrl?: string;
  themeColor?: string;
}

export default function CourseHero({
  title,
  subtitle,
  buttonText,
  imageUrl,
  logoUrl,
  paymentUrl,
  themeColor = '#9731C2',
}: CourseHeroProps) {
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
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 relative" style={{backgroundColor: themeColor}}>
          {/* Overlay escuro sobre o background */}
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight mb-6 tracking-tight relative z-10">
            {title}
          </h1>

          {/* Descrição do curso */}
          <p className="text-white/90 text-base md:text-lg mb-8 max-w-md relative z-10">
            {subtitle}
          </p>

          {/* Botão de matrícula */}
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-[#7ed321] to-[#5a9e1a] hover:from-[#6bc11a] hover:to-[#4a8a15] text-white/80 font-semibold py-3 px-8 rounded-xl transition-all w-fit relative z-10"
          >
            {buttonText}
          </button>
        </div>

        {/* Imagem do curso (mobile) */}
        <div className="md:hidden absolute top-0 left-0 w-full h-48">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
}
