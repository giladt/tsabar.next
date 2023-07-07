export default function Loading() {
  return (
    <main className="md:justify-center animate-pulse">
      <section className="flex flex-col items-center my-14 max-md:px-5">
        <div className="mb-7 w-[50vw] max-w-md h-16 bg-black/50 dark:bg-white/50 rounded-sm" />
        <div className="h-8 w-full bg-black/50 dark:bg-white/50 rounded-sm" />
      </section>
      <section className="flex flex-col py-5 max-md:px-5 gap-2">
        <div className="h-8 bg-black/50 dark:bg-white/50 rounded-sm" />
        <div className="h-4 bg-black/50 dark:bg-white/50 rounded-sm" />
        <div className="h-4 bg-black/50 dark:bg-white/50 rounded-sm" />
        <div className="h-4 bg-black/50 dark:bg-white/50 rounded-sm" />
        <br />
        <div className="h-4 bg-black/50 dark:bg-white/50 rounded-sm" />
        <div className="h-4 bg-black/50 dark:bg-white/50 rounded-sm" />
        <br />
        <div className="h-4 bg-black/50 dark:bg-white/50 rounded-sm" />
        <div className="h-4 bg-black/50 dark:bg-white/50 rounded-sm" />
        <div className="h-4 bg-black/50 dark:bg-white/50 rounded-sm" />
        <div className="h-4 bg-black/50 dark:bg-white/50 rounded-sm" />
      </section>
      <div className="flex gap-8 flex-wrap justify-center">
        <div className="w-[320px] h-[320px] bg-black/50 dark:bg-white/50 rounded-sm"></div>
        <div className="w-[320px] h-[320px] bg-black/50 dark:bg-white/50 rounded-sm"></div>
      </div>
      <section className="flex flex-col py-5 max-md:px-5 gap-2">
        <div className="h-[50vh] bg-black/50 dark:bg-white/50 rounded-sm" />
        <div className="w-52 h-4 bg-black/50 dark:bg-white/50 rounded-sm" />
      </section>
    </main>
  );
}
