import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PageHero } from "@/components/site/page-hero";
import { OrderForm } from "@/components/site/order-form";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "Order online" };

export default async function Order() {
  const [session, locale] = await Promise.all([auth(), getLocale()]);
  const t = dictionary[locale];
  if (!session?.user) redirect("/login?next=/order");
  return (
    <>
      <PageHero title={t.actions.orderOnline} intro={locale === "rw" ? "Hitamo ibicuruzwa, wandike aho uzatanga, maze wishyure mobile money cyangwa card." : "Pick priced products, enter your delivery address and pay by mobile money or card."} />
      <div className="mx-auto max-w-3xl px-5 py-16"><OrderForm /></div>
    </>
  );
}
