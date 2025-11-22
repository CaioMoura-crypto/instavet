import HeroSection from '@/components/HeroSection';
import CoursesSectionServer from '@/components/CoursesSectionServer';
import TestimonialsSection from '@/components/TestimonialsSection';
import VideosSectionServer from '@/components/VideosSectionServer';
import LocationSection from '@/components/LocationSection';
import ContactForm from '@/components/ContactForm';

export default function Page() {
  return (
    <main>
      <HeroSection />
      <CoursesSectionServer />
      <TestimonialsSection />
      <VideosSectionServer />
      <LocationSection />
      <ContactForm />
    </main>
  );
}