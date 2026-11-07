export function PageHero({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="strata bg-basalt text-quartz">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
        <h1 className="font-display max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-quartz/75">{intro}</p>}
      </div>
    </section>
  );
}
