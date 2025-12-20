import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import CoursesSection from './CoursesSection';
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
  image: SanityImage;
  slug: { current: string };
  detailsUrl?: string;
  paymentUrl?: string;
}

async function getCourses(): Promise<Course[]> {
  const query = `*[_type == "course" && isActive != false] | order(date asc) [0...12] {
    _id,
    title,
    subtitle,
    date,
    workload,
    duration,
    description,
    spots,
    price,
    image,
    slug,
    detailsUrl,
    paymentUrl
  }`;

  return client.fetch(query, {}, {
    next: { revalidate: 10 } // Revalidate every 10 seconds
  });
}

export default async function CoursesSectionServer() {
  const courses = await getCourses();

  const formattedCourses = courses.map((course) => ({
    _id: course._id,
    title: course.title,
    subtitle: course.subtitle,
    date: course.date,
    workload: course.workload,
    duration: course.duration,
    description: course.description,
    spots: course.spots,
    price: course.price,
    imageUrl: course.image ? urlFor(course.image).width(400).height(200).url() : '',
    slug: course.slug?.current,
    detailsUrl: course.detailsUrl,
    paymentUrl: course.paymentUrl,
  }));

  return <CoursesSection courses={formattedCourses} />;
}
