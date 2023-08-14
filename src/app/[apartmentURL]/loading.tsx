export default function Loading() {
  return (
    <main className="md:justify-center">
      <section className="overflow-hidden -mx-[calc(50svw-50%)] w-[calc(100svw-9px)] animate-pulse">
        <section className="w-full h-[clamp(81svh,500px,calc(100svh-5rem))] bg-gray-400 dark:bg-slate-600 flex justify-center items-center">
          Loading...
        </section>
      </section>
      <header className="text-center mt-3 mb-14 max-md:px-5">
        <h1>
          <div className="h-8 bg-slate-700 rounded"></div>
        </h1>
        <h2>
          <div className="space-y-3">
            <div className="h-8 bg-slate-700 rounded"></div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-8 bg-slate-700 rounded col-span-2"></div>
              <div className="h-8 bg-slate-700 rounded col-span-1"></div>
            </div>
          </div>
        </h2>
      </header>
    </main>
  );
}
