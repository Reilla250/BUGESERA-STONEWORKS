import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { company, staffing } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "About" };

export default async function About() {
  const locale = await getLocale();
  const t = dictionary[locale];
  const total = staffing.reduce((s, [, n]) => s + n, 0);
  return (
    <>
      <PageHero title={t.about.heroTitle} intro={t.about.heroText} />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">{t.about.vision}</h2>
          <p className="mt-3 text-granite">{company.vision}</p>
          <h2 className="font-display mt-10 text-2xl font-bold">{t.about.mission}</h2>
          <p className="mt-3 text-granite">{company.mission}</p>
          <h2 className="font-display mt-10 text-2xl font-bold">{t.about.locationTitle}</h2>
          <p className="mt-3 text-granite">{company.location}. Sector: mining, quarrying, stone processing and construction materials manufacturing.</p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">{t.about.commitmentTitle}</h2>
          <ul className="mt-3 space-y-3 text-granite">
            <li>Quarrying lawfully and protecting the environment.</li>
            <li>Producing dressed and undressed building stone.</li>
            <li>Processing stone with modern machines.</li>
            <li>Making gravel, aggregates and sand.</li>
            <li>Building a plant that makes products from stone.</li>
            <li>Serving contractors, builders, dealers and road companies.</li>
          </ul>
        </div>
      </section>
      <section className="bg-slate">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <h2 className="font-display text-2xl font-bold">{t.about.openingTeam}: {total} people</h2>
          <p className="mt-2 text-granite">{t.about.startingPlan}</p>
          <dl className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {staffing.map(([role, n]) => (
              <div key={role} className="flex items-baseline justify-between border-b border-granite/20 py-2">
                <dt>{role}</dt>
                <dd className="font-display text-lg font-bold">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
