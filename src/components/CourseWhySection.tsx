interface CourseWhySectionProps {
  title: string;
  reasons: string[];
  themeColor?: string;
}

export default function CourseWhySection({
  title,
  reasons,
  themeColor = '#9731C2',
}: CourseWhySectionProps) {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto py-16 px-6" style={{backgroundColor: themeColor}}>
        <h2 className="font-bebas-neue text-3xl md:text-4xl lg:text-5xl text-white text-center mb-12 uppercase tracking-tight">
          {title}
        </h2>

        <div className="space-y-8">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Ícone de check */}
              <div className="flex-shrink-0">
                <svg
                  className="w-12 h-12 md:w-14 md:h-14 text-[#7ed321]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <p className="font-bebas-neue text-white text-xl md:text-2xl uppercase">
                {reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
