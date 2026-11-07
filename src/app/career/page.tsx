import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { careerRoles, risks } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "Career" };

export default async function Career() {
  const locale = await getLocale();
  const t = dictionary[locale];
  return (
    <>
      <PageHero title={t.career.heroTitle} intro={t.career.heroText} />
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">{t.career.opportunities}</h2>
          <div className="mt-6 space-y-5">
            {careerRoles.map((role) => (
              <div key={role.title} className="rounded-2xl border border-granite/20 bg-white p-5 shadow-sm">
                <h3 className="font-display text-lg font-bold">{role.title}</h3>
                <p className="mt-2 text-granite">{role.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-granite">
            Our operations depend on reliable people who can work safely, learn quickly and deliver quality under real production pressure.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">{t.career.value}</h2>
          <dl className="mt-5 divide-y divide-granite/20 border-y border-granite/20">
            {risks.map((r) => (
              <div key={r.risk} className="grid gap-1 py-3 sm:grid-cols-2">
                <dt className="font-medium">{r.risk}</dt>
                <dd className="text-granite">{r.fix}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
