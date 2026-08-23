import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-6 py-24 text-center sm:px-10">
      <p className="font-heading text-sm font-semibold uppercase tracking-widest text-brand-blue">
        404
      </p>
      <h1 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl md:text-5xl">
        Page not found
      </h1>
      <p className="max-w-md text-base text-slate-600">
        The page you&rsquo;re looking for doesn&rsquo;t exist, or may have
        moved.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-navy-950 px-8 py-3 text-base font-semibold text-white transition hover:bg-navy-900"
      >
        Back to the Recap
      </Link>
    </main>
  );
}
