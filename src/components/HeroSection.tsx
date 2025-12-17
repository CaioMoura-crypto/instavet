import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import type { SanityImageCrop, SanityImageHotspot } from '@/sanity/types';

interface SanityImage {
  asset?: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  _type: 'image';
}

interface HeroData {
  titulo: string;
  subtitulo: string;
  textoBotao: string;
  backgroundImage: SanityImage;
  imageAlt: string;
}

async function getHero(): Promise<HeroData | null> {
  const query = `*[_type == "hero"][0] {
    titulo,
    subtitulo,
    textoBotao,
    backgroundImage,
    imageAlt
  }`;

  return client.fetch(query, {}, {
    next: { revalidate: 10 } // Revalidate every 10 seconds
  });
}

export default async function HeroSection() {
  const hero = await getHero();

  const backgroundImageUrl = hero?.backgroundImage
    ? urlFor(hero.backgroundImage).width(1200).quality(80).url()
    : null;

  return (
    <section className="w-full pt-0">
      <div className="max-w-6xl mx-auto px-6 md:px-10 pt-48 pb-40 text-center relative overflow-hidden">
        {/* Background Image - Extended to cover navbar area */}
        {backgroundImageUrl && (
          <div
            className="absolute inset-0 -top-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
        )}

        {/* Gradient Overlay - Only on Hero, not extending to navbar */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/75 via-purple-800/75 to-purple-950/75" />

        {/* Content */}
        <div className="relative z-10">
          <h1 className="font-roboto-condensed text-white mb-4 tracking-tight font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-roboto-condensed)', fontWeight: 700, letterSpacing: '-0.02em', fontStretch: 'condensed', transform: 'scaleY(1.2)' }}>
            {hero?.titulo || 'ESPECIALIZAÇÃO VETERINÁRIA'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-7 leading-relaxed max-w-3xl mx-auto font-medium whitespace-pre-line">
            {hero?.subtitulo || 'Cursos de Excelência para profissionais que buscam\nse destacar na medicina veterinária'}
          </p>

          <a
            href="#cursos"
            className="bg-gradient-to-r from-blue-600/65 to-purple-700/65 hover:from-blue-700/90 hover:to-purple-800/90 text-white/80 font-semibold px-5 py-1.5 rounded-md text-sm transition-all duration-300 shadow-lg inline-block"
          >
            {hero?.textoBotao || 'Conheça nossos cursos'}
          </a>
        </div>
      </div>
    </section>
  );
}
