import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { useOfFunds } from "@/lib/content";

export const metadata: Metadata = { title: "Investors" };

export default function Investors() {
  return (
    <>
      <PageHero title="Investing in Bugesera Stoneworks" intro="Several revenue lines from one quarry, built in three phases. Financial figures will be published once the stone survey is complete." />
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">Where funds will go</h2>
          <dl className="mt-5 divide-y divide-granite/20 border-y border-granite/20">
            {useOfFunds.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-2">
                <dt className="font-medium">{k}</dt>
                <dd className="text-granite">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold">What the numbers will cover</h2>
          <p className="mt-3 text-granite">
            We will not present profit estimates until we know the volume and type of stone, the quarry area and machine prices. The full model will include:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-granite">
            <li>Five-year cash flow projection</li>
            <li>Profit and loss statement</li>
            <li>Break-even analysis</li>
            <li>Return on investment and payback period</li>
            <li>Best-case, base-case and worst-case scenarios</li>
          </ul>
          <Button asChild className="mt-8">
            <Link href="/contact">Contact us about investing</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
