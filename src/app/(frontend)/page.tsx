import Link from "next/link";

export default async function Page() {
  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold">Home</h1>
      <p className="font-bold">This is a bold text.</p>
      <p className="font-sans">This is a sans-serif text.</p>
      <p className="font-serif">This is a serif text.</p>
      <hr />
      <Link href="/posts">Posts index &rarr;</Link>
    </section>
  );
}