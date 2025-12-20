'use client';

interface CourseProfessorProps {
  title: string;
  description: string;
  paymentUrl?: string;
  themeColor?: string;
}

export default function CourseProfessor({
  title,
  description,
  paymentUrl,
  themeColor = '#9731C2',
}: CourseProfessorProps) {
  const handleButtonClick = () => {
    const formulario = document.getElementById('contato-formulario');
    if (formulario) {
      formulario.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto bg-[#f5f5f5] py-16 px-6 text-center">
        <h2 className="font-roboto-condensed font-bold text-4xl md:text-5xl lg:text-6xl mb-8 uppercase tracking-tight" style={{color: themeColor, fontFamily: 'var(--font-roboto-condensed)', fontWeight: 700, letterSpacing: '-0.02em', fontStretch: 'condensed', transform: 'scaleY(1.2)'}}>
          {title}
        </h2>

        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
          {description}
        </p>

        <button
          onClick={handleButtonClick}
          className="bg-gradient-to-r from-[#7ed321] to-[#5a9e1a] hover:from-[#6bc11a] hover:to-[#4a8a15] text-white/80 font-semibold py-3 px-8 rounded-xl transition-all"
        >
          Quero me matricular
        </button>
      </div>
    </section>
  );
}
