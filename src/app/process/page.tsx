import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { process, phases } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "How we work" };

export default async function Process() {
  const locale = await getLocale();
  const t = dictionary[locale];
  return (
    <>
      <PageHero title={t.process.heroTitle} intro={t.process.heroText} />
      <section className="mx-auto max-w-4xl px-5 py-20">
        <ol className="space-y-0 border-l-4 border-hivis">
          {process.map((p, i) => (
            <li key={p.title} className="relative pb-10 pl-8 last:pb-0">
              <span className="font-display-narrow absolute -left-[22px] top-0 flex h-10 w-10 items-center justify-center bg-basalt text-lg font-bold text-hivis">{i + 1}</span>
              <h2 className="font-display text-xl font-bold">{p.title}</h2>
              <p className="mt-1 text-granite">{p.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-slate">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="font-display text-3xl font-bold">{t.process.rolloutPlan}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {phases.map((p) => (
              <div key={p.title}>
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <ul className="mt-3 space-y-2 text-granite">
                  {p.points.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
