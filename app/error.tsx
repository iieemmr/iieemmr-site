"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-white px-6 py-24 text-center sm:px-10">
      <p className="font-heading text-sm font-semibold uppercase tracking-widest text-brand-blue">
        Error
      </p>
      <h1 className="font-heading text-3xl font-bold text-navy-950 sm:text-4xl">
        Something went wrong
      </h1>
      <p className="max-w-md text-slate-600">
        Sorry about that — please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-navy-950 px-8 py-3 text-base font-semibold text-white transition hover:bg-navy-900"
      >
        Try again
      </button>
    </main>
  );
}
