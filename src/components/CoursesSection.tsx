import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Course {
  _id: string;
  title: string;
  subtitle: string;
  date: string;
  workload: string;
  spots: number;
  price: number;
  image: any;
  detailsUrl?: string;
  paymentUrl?: string;
}

async function getCourses(): Promise<Course[]> {
  const query = `*[_type == "course"] | order(date asc) [0...12] {
    _id,
    title,
    subtitle,
    date,
    workload,
    spots,
    price,
    image,
    detailsUrl,
    paymentUrl
  }`;

  return client.fetch(query);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  });
}

export default async function CoursesSection() {
  const courses = await getCourses();

  return (
    <section id="cursos" className="py-16 px-4 bg-gray-50">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-800 mb-4">
            Cursos de Especialização Veterinária
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Aprimore suas habilidades com nossos cursos especializados
          </p>
        </div>

        {/* Filter */}
        <div className="flex justify-center mb-10">
          <button className="px-6 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors">
            Ordenar por data: <span className="font-semibold">Mais próximos</span>
          </button>
        </div>

        {/* Courses Grid */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Course Image */}
                <div className="relative h-48 w-full">
                  {course.image ? (
                    <Image
                      src={urlFor(course.image).width(400).height(200).url()}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500" />
                  )}
                </div>

                {/* Course Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-violet-800 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {course.subtitle}
                  </p>

                  {/* Course Details */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{formatDate(course.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Carga horária: {course.workload}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{course.spots} vagas disponíveis</span>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-2xl font-bold text-gray-800 mb-4">
                    {formatPrice(course.price)}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <a
                      href={course.detailsUrl || '#'}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors text-center"
                    >
                      Ver Detalhes
                    </a>
                    <a
                      href={course.paymentUrl || '#'}
                      className="flex-1 px-4 py-2 bg-violet-800 hover:bg-violet-700 rounded-lg text-sm font-medium text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Pagar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>Nenhum curso disponível no momento.</p>
            <p className="text-sm mt-2">Adicione cursos no painel do Sanity.</p>
          </div>
        )}
      </div>
    </section>
  );
}
