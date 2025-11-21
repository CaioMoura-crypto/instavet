import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import TestimonialsCarousel from './TestimonialsCarousel';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  photo: any;
  testimonial: string;
  fullTestimonialUrl?: string;
}

async function getTestimonials(): Promise<Testimonial[]> {
  const query = `*[_type == "testimonial"] | order(_createdAt asc) [0...20] {
    _id,
    name,
    role,
    photo,
    testimonial,
    fullTestimonialUrl
  }`;

  return client.fetch(query);
}

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <section id="depoimentos" className="py-16">
      <div className="w-full max-w-6xl mx-auto bg-[#d49afd] py-12 px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-white text-2xl mb-2">Depoimentos</p>
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-white mb-4">
            O que acham dos nossos cursos...
          </h2>
          <p className="text-purple-1000 text-base md:text-base">
            Confira um pouco o que acham dos nossos cursos
          </p>
        </div>

        {/* Testimonials Carousel */}
        {testimonials.length > 0 ? (
          <TestimonialsCarousel
            testimonials={testimonials.map((t) => ({
              _id: t._id,
              name: t.name,
              role: t.role,
              photoUrl: t.photo ? urlFor(t.photo).width(200).height(200).url() : null,
              testimonial: t.testimonial,
            }))}
          />
        ) : (
          <div className="text-center py-10 text-white/80">
            <p>Nenhum depoimento disponível no momento.</p>
          </div>
        )}
      </div>
    </section>
  );
}
