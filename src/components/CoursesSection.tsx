'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Course {
  _id: string;
  title: string;
  subtitle: string;
  date: string;
  workload: string;
  duration?: string;
  description?: string;
  spots: number;
  price: number;
  imageUrl: string;
  detailsUrl?: string;
  paymentUrl?: string;
}

interface CoursesSectionProps {
  courses: Course[];
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

export default function CoursesSection({ courses }: CoursesSectionProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedCourses = [...courses].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <section id="cursos" className="scroll-mt-[72px]">
      <div className="w-full max-w-6xl mx-auto bg-gray-50 px-4 pt-24 pb-24 rounded-lg">
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
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-6 py-2 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Ordenar por data: <span className="font-semibold">{sortOrder === 'asc' ? 'Mais próximos' : 'Mais distantes'}</span>
          </button>
        </div>

        {/* Courses Grid */}
        {sortedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Course Image */}
                <div className="relative h-48 w-full">
                  {course.imageUrl ? (
                    <Image
                      src={course.imageUrl}
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
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors text-center"
                    >
                      Ver Detalhes
                    </button>
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

      {/* Course Details Popup */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative shadow-xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>

            {/* Course Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {selectedCourse.title}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {selectedCourse.subtitle}
            </p>

            {/* Course Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-900 font-bold">Data de início</p>
                  <p className="text-sm text-gray-600">{formatDate(selectedCourse.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-900 font-bold">Duração</p>
                  <p className="text-sm text-gray-600">{selectedCourse.duration || selectedCourse.workload}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-900 font-bold">Vagas</p>
                  <p className="text-sm text-gray-600">{selectedCourse.spots} disponíveis</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-900 font-bold">Investimento</p>
                  <p className="text-sm font-medium text-violet-600">{formatPrice(selectedCourse.price)}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {selectedCourse.description && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-900 mb-2">{selectedCourse.title}</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line">
                  {selectedCourse.description}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <a
                href={selectedCourse.paymentUrl || '#'}
                className="flex-1 px-4 py-3 bg-violet-800 hover:bg-violet-700 rounded-lg text-sm font-medium text-white transition-colors text-center"
              >
                Ir para pagamento
              </a>
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
