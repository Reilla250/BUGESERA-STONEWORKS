import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { customers, edge } from "@/lib/content";

export const metadata: Metadata = { title: "Market and customers" };

export default function Market() {
  return (
    <>
      <PageHero title="Who we sell to, and where" intro="Construction and quarrying both grew in 2025 according to NISR: construction by 11% and mining and quarrying by 17%." />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Customers</h2>
          <ul className="mt-4 space-y-2 text-granite">{customers.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">Target markets</h2>
          <ul className="mt-4 space-y-2 text-granite">
            <li>Bugesera and other Eastern Province districts</li>
            <li>Kigali and surrounding districts</li>
            <li>Construction-material markets across Rwanda</li>
            <li>Regional markets, once cross-border trade and transport requirements are met</li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">How we compete</h2>
          <ul className="mt-4 space-y-2 text-granite">{edge.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </section>
    </>
  );
}
