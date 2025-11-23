'use client';

import Image from 'next/image';

interface CourseHeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string | null;
  logoUrl?: string | null;
  paymentUrl?: string;
}

export default function CourseHero({
  title,
  subtitle,
  buttonText,
  imageUrl,
  logoUrl,
  paymentUrl,
}: CourseHeroProps) {
  const handleClick = () => {
    if (paymentUrl) {
      window.open(paymentUrl, '_blank');
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

        {/* Conteúdo lado direito */}
        <div className="w-full md:w-1/2 bg-[#281435] flex flex-col justify-center px-8 md:px-16 py-12 relative">
          {/* Faixa gradiente com logo - esquerda para direita, branco para roxo */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-white to-[#281435] flex items-center px-8 md:px-14">
            <Image
              src={logoUrl || "/logo.png"}
              alt="InstaVet"
              width={180}
              height={60}
              className="h-14 w-auto"
            />
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase leading-tight mb-6 tracking-tight">
            {title}
          </h1>

          {/* Subtítulo */}
          <p className="text-white/90 text-base md:text-lg mb-8 max-w-md">
            {subtitle}
          </p>

          {/* Botão */}
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-[#7ed321] to-[#5a9e1a] hover:from-[#6bc11a] hover:to-[#4a8a15] text-white/80 font-semibold py-3 px-8 rounded-xl transition-all w-fit"
          >
            {buttonText}
          </button>
        </div>

        {/* Imagem mobile (aparece em cima no mobile) */}
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
