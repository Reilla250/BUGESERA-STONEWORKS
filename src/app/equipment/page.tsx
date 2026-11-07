import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { equipment } from "@/lib/content";

export const metadata: Metadata = { title: "Equipment" };

export default function Equipment() {
  return (
    <>
      <PageHero title="The machines behind the stone" intro="We start with the machines that produce the most: crusher, screen, loader and cutting machine. The rest are added as the market grows." />
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {equipment.map((e) => (
            <div key={e.name} className="overflow-hidden rounded-3xl border border-granite/15 bg-quartz shadow-sm">
              <div className="relative h-56 w-full overflow-hidden">
                <img src={e.image} alt={e.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <dt className="font-display text-lg font-bold">{e.name}</dt>
                <dd className="mt-1 text-granite">{e.job}</dd>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
