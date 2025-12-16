import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import type { SanityImageCrop, SanityImageHotspot } from '@/sanity/types';

// Components
import CourseHero from '@/components/CourseHero';
import CourseAbout from '@/components/CourseAbout';
import CourseProfessor from '@/components/CourseProfessor';
import CourseWhySection from '@/components/CourseWhySection';
import CourseStructureLocation from '@/components/CourseStructureLocation';
import CourseContactForm from '@/components/CourseContactForm';

// Types
interface StructureSection {
  title: string;
  items: string[];
}

interface SanityImage {
  asset?: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  _type: 'image';
}

interface LandingPage {
  _id: string;
  isActive: boolean;
  themeColor?: string;

  // Curso referenciado
  course: {
    title: string;
    slug: { current: string };
    paymentUrl?: string;
    description?: string;
  };

  // Hero
  heroTitle?: string;
  heroImage?: SanityImage;
  heroSubtitle?: string;
  heroLogo?: SanityImage;

  // Sobre o Curso
  aboutTitle?: string;
  aboutDescription?: string;
  aboutVideo?: string | null;
  aboutImage?: SanityImage;

  // Professor
  professorTitle?: string;
  professorDescription?: string;

  // Por que fazer
  whyTitle?: string;
  whyReasons?: string[];

  // Estrutura
  structureTitle?: string;
  structureSections?: StructureSection[];
  structurePhotos?: SanityImage[];

  // Localização
  locationTitle?: string;
  locationName?: string;
  locationAddress?: string;
  locationWhatsapp?: string;
  locationInstagram?: string;
  locationMapEmbed?: string;
}

// Query
const landingPageQuery = `*[_type == "courseLandingPage" && course->slug.current == $slug && isActive != false][0] {
  _id,
  isActive,
  themeColor,

  // Curso referenciado
  course-> {
    title,
    slug,
    paymentUrl,
    description
  },

  // Hero
  heroTitle,
  heroImage,
  heroSubtitle,
  heroLogo,

  // Sobre o Curso
  aboutTitle,
  aboutDescription,
  "aboutVideo": aboutVideo.asset->url,
  aboutImage,

  // Professor
  professorTitle,
  professorDescription,

  // Por que fazer
  whyTitle,
  whyReasons,

  // Estrutura
  structureTitle,
  structureSections,
  structurePhotos,

  // Localização
  locationTitle,
  locationName,
  locationAddress,
  locationWhatsapp,
  locationInstagram,
  locationMapEmbed
}`;

async function getLandingPage(slug: string): Promise<LandingPage | null> {
  return client.fetch(landingPageQuery, { slug });
}

export async function generateStaticParams() {
  const query = `*[_type == "courseLandingPage" && isActive != false] {
    "slug": course->slug.current
  }`;
  const landingPages = await client.fetch(query);

  return landingPages
    .filter((lp: { slug: string | null }) => lp.slug)
    .map((lp: { slug: string }) => ({
      slug: lp.slug,
    }));
}

export default async function CourseLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const landingPage = await getLandingPage(slug);

  if (!landingPage || !landingPage.course) {
    notFound();
  }

  const { course } = landingPage;
  const themeColor = landingPage.themeColor || '#9731C2';

  // Process images
  const heroImageUrl = landingPage.heroImage
    ? urlFor(landingPage.heroImage).width(800).height(600).url()
    : null;
  const heroLogoUrl = landingPage.heroLogo
    ? urlFor(landingPage.heroLogo).width(200).height(80).url()
    : null;
  const aboutImageUrl = landingPage.aboutImage
    ? urlFor(landingPage.aboutImage).width(800).height(600).url()
    : null;

  return (
    <main>
      {/* Hero */}
      <CourseHero
        title={landingPage.heroTitle || course.title}
        subtitle={landingPage.heroSubtitle || 'Cursos de Excelência para profissionais que buscam se destacar na medicina veterinária'}
        buttonText="Quero me matricular"
        imageUrl={heroImageUrl}
        logoUrl={heroLogoUrl}
        paymentUrl={course.paymentUrl}
        themeColor={themeColor}
      />

      {/* Sobre o Curso */}
      <CourseAbout
        title={landingPage.aboutTitle || 'SOBRE O CURSO'}
        description={landingPage.aboutDescription || course.description || ''}
        videoUrl={landingPage.aboutVideo ?? undefined}
        imageUrl={aboutImageUrl || heroImageUrl || undefined}
        paymentUrl={course.paymentUrl}
        themeColor={themeColor}
      />

      {/* Sobre o Professor */}
      {landingPage.professorDescription && (
        <CourseProfessor
          title={landingPage.professorTitle || 'SOBRE O PROFESSOR'}
          description={landingPage.professorDescription}
          paymentUrl={course.paymentUrl}
          themeColor={themeColor}
        />
      )}

      {/* Por que fazer */}
      {landingPage.whyReasons && landingPage.whyReasons.length > 0 && (
        <CourseWhySection
          title={landingPage.whyTitle || 'POR QUE DEVO FAZER ESSE CURSO?'}
          reasons={landingPage.whyReasons}
          themeColor={themeColor}
        />
      )}

      {/* Estrutura e Localização */}
      {(landingPage.structureSections || landingPage.locationAddress) && (
        <CourseStructureLocation
          structureTitle={landingPage.structureTitle || 'ESTRUTURA DO INSTAVET'}
          structureSections={landingPage.structureSections || []}
          structurePhotos={landingPage.structurePhotos?.map((photo) => urlFor(photo).width(600).height(400).url()) || []}
          locationTitle={landingPage.locationTitle || 'LOCALIZAÇÃO E CONTATOS'}
          locationName={landingPage.locationName}
          locationAddress={landingPage.locationAddress}
          locationWhatsapp={landingPage.locationWhatsapp}
          locationInstagram={landingPage.locationInstagram}
          locationMapEmbed={landingPage.locationMapEmbed}
          themeColor={themeColor}
        />
      )}

      {/* Formulário de Contato + Footer */}
      <CourseContactForm
        courseTitle={course.title}
        paymentUrl={course.paymentUrl}
        themeColor={themeColor}
      />
    </main>
  );
}
