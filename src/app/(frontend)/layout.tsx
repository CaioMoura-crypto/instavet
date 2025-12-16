import Navbar from '@/components/Navbar';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    navbarLogo
  }`;
  return client.fetch(query, {}, {
    next: { revalidate: 10 } // Revalidate every 10 seconds
  });
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const logoUrl = settings?.navbarLogo
    ? urlFor(settings.navbarLogo).width(200).height(80).url()
    : null;

  return (
    <>
      <Navbar logoUrl={logoUrl} />
      {children}
    </>
  );
}
