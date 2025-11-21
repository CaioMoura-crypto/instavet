import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface HeroData {
  backgroundImage: any;
  imageAlt: string;
}

async function getHero(): Promise<HeroData | null> {
  const query = `*[_type == "hero"][0] {
    backgroundImage,
    imageAlt
  }`;

  return client.fetch(query);
}

export default async function HeroSection() {
  const hero = await getHero();

  const backgroundImageUrl = hero?.backgroundImage
    ? urlFor(hero.backgroundImage).width(1200).quality(80).url()
    : null;

  return (
    <section className="pt-18">
      <div
        className="w-full max-w-6xl mx-auto px-10 py-30 text-center relative overflow-hidden"
      >
        {/* Background Image */}
        {backgroundImageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-purple-400/90" />

        {/* Content */}
        <div className="relative z-10">
          <h1 className="font-roboto-condensed text-white mb-4 tracking-tight font-bold" style={{ fontFamily: 'var(--font-roboto-condensed)', fontWeight: 700, letterSpacing: '-0.02em', fontStretch: 'condensed', transform: 'scaleY(1.2)', fontSize: '3.5rem', whiteSpace: 'nowrap' }}>
            ESPECIALIZAÇÃO VETERINÁRIA
          </h1>

          <p className="text-lg md:text-2xl lg:text-2xl text-white mb-7 leading-relaxed max-w-3xl mx-auto font-medium">
            Cursos de Excelência para profissionais que buscam
            <br />
            se destacar na medicina veterinária
          </p>

          <a
            href="#cursos"
            className="bg-gradient-to-r from-blue-600/65 to-purple-700/65 hover:from-blue-700/90 hover:to-purple-800/90 text-white/80 font-semibold px-5 py-1.5 rounded-md text-sm transition-all duration-300 shadow-lg inline-block"
          >
            Conheça nossos cursos
          </a>
        </div>
      </div>
    </section>
  );
}
