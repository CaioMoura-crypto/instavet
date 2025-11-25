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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 uppercase tracking-tight" style={{color: themeColor}}>
          {title}
        </h2>

        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-8">
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
