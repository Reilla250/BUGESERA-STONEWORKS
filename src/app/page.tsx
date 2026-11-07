import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartSummary, ProductCartControl } from "@/components/site/cart";
import { HeroSlideshow } from "@/components/site/hero-slideshow";
import { PromoSlideshow } from "@/components/site/promo-slideshow";
import { Sieve } from "@/components/site/sieve";
import { categories, aggregates, company, process, phases } from "@/lib/content";
import { db } from "@/lib/db";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/server-i18n";
import { formatRwf } from "@/lib/utils";

function getProductImage(productCategory: string, index: number) {
  const images = ["/hero/stone-1.webp", "/hero/stone-2.jpg", "/hero/stone-3.jpg", "/hero/stone-4.jpg", "/hero/stone-5.jpg"];
  return images[index % images.length] ?? "/hero/stone-1.webp";
}

export default async function Home() {
  const locale = await getLocale();
  const t = dictionary[locale];
  const featuredProducts = await db.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <>
      <section className="relative overflow-hidden bg-basalt text-quartz">
        <HeroSlideshow />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <div>
            <p className="text-sm text-hivis">{t.home.location}</p>
            <h1 className="font-display mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              {t.home.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-quartz/75">{t.home.heroText}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/order">{t.actions.orderOnline}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/products">{t.actions.browseProducts}</Link>
              </Button>
            </div>
          </div>
          <div className="md:pl-6">
            <Sieve />
          </div>
        </div>
      </section>

      <PromoSlideshow />

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="flex justify-end">
          <div className="w-full max-w-sm">
            <CartSummary />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-granite">{locale === "rw" ? "Guhitamo vuba" : "Quick selection"}</p>
            <h2 className="font-display mt-2 text-3xl font-bold sm:text-4xl">{locale === "rw" ? "Hitamo ibicuruzwa byiza" : "Choose the right product"}</h2>
          </div>
          <Link href="/products" className="text-sm font-medium underline underline-offset-2">{locale === "rw" ? "Reba byose" : "See all"}</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product, index) => {
            const imageUrl = product.imageUrl || getProductImage(product.category, index);
            return (
              <div key={product.id} className="group overflow-hidden rounded-3xl border border-granite/15 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <Link href={`/products/${product.slug}`} className="block">
                  <div className="relative h-40 overflow-hidden">
                    <Image src={imageUrl} alt={product.name} fill className="object-cover transition duration-300 group-hover:scale-105" />
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-granite">{product.category.replaceAll("_", " ").toLowerCase()}</p>
                  <h3 className="mt-2 font-display text-xl font-bold">{product.name}</h3>
                  <p className="mt-2 text-sm text-granite">{product.summary}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="font-display font-bold">{product.priceRwf ? formatRwf(product.priceRwf) : locale === "rw" ? "Igiciro ku cyiciro" : "Price on request"}</span>
                    <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="text-sm font-medium text-basalt underline underline-offset-2">{company.phone}</a>
                  </div>
                  <div className="mt-4">
                    <ProductCartControl product={{
                      id: product.id,
                      name: product.name,
                      slug: product.slug,
                      unit: product.unit,
                      priceRwf: product.priceRwf,
                      category: product.category,
                      summary: product.summary,
                      imageUrl: product.imageUrl || getProductImage(product.category, index),
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.productsTitle}</h2>
            <p className="mt-4 max-w-md text-granite">{t.home.productsText}</p>
          </div>
          <ul className="divide-y divide-granite/20 border-y border-granite/20">
            {categories.map((c) => (
              <li key={c.key}>
                <Link href={`/products#${c.key}`} className="group flex items-start justify-between gap-6 py-6">
                  <div>
                    <h3 className="font-display text-xl font-bold">{locale === "rw" ? c.label.replace("Building stones", "Amabuye yubwubatsi").replace("Machine-cut stones", "Amabuye yacishijwe").replace("Aggregates", "Imfubyi").replace("Manufactured sand", "Umusenyi w'ubwubatsi").replace("Finished stone products", "Ibicuruzwa by'amabuye byumwimerere").replace("Concrete products", "Ibicuruzwa by'ubutaka") : c.label}</h3>
                    <p className="mt-1 max-w-lg text-sm text-granite">{c.blurb}</p>
                  </div>
                  <ArrowRight className="mt-1 shrink-0 text-granite transition-transform group-hover:translate-x-1 group-hover:text-basalt" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-slate">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <h2 className="font-display max-w-2xl text-3xl font-bold sm:text-4xl">{t.home.gradingTitle}</h2>
          <p className="mt-4 max-w-xl text-granite">{t.home.gradingText}</p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse bg-white text-left">
              <thead>
                <tr className="bg-basalt text-quartz">
                  <th className="px-5 py-3 font-display text-sm font-semibold">{locale === "rw" ? "Ibicuruzwa" : "Product"}</th>
                  <th className="px-5 py-3 font-display text-sm font-semibold">{locale === "rw" ? "Ingano" : "Size"}</th>
                  <th className="px-5 py-3 font-display text-sm font-semibold">{locale === "rw" ? "Byakoreshejwe" : "Used for"}</th>
                </tr>
              </thead>
              <tbody>
                {aggregates.map((a) => (
                  <tr key={a.name} className="border-b border-granite/15">
                    <td className="px-5 py-3 font-medium">{a.name}</td>
                    <td className="px-5 py-3 text-granite">{a.size}</td>
                    <td className="px-5 py-3 text-granite">{a.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.processTitle}</h2>
        <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <li key={p.title} className="flex gap-4">
              <span className="font-display-narrow text-4xl font-extrabold text-hivis" aria-hidden>{i + 1}</span>
              <div>
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-granite">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl text-granite">{t.home.processText}</p>
      </section>

      <section className="strata bg-basalt text-quartz">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.marketTitle}</h2>
            <p className="mt-4 max-w-md text-quartz/70">{t.home.marketText}</p>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/market">{locale === "rw" ? "Reba gahunda y' isoko" : "See our market plan"}</Link>
            </Button>
          </div>
          <dl className="grid grid-cols-2 gap-6 self-center">
            <div className="border-l-4 border-hivis pl-5">
              <dd className="font-display text-5xl font-extrabold">+11%</dd>
              <dt className="mt-1 text-sm text-quartz/70">{t.home.stats.activity}</dt>
            </div>
            <div className="border-l-4 border-hivis pl-5">
              <dd className="font-display text-5xl font-extrabold">+17%</dd>
              <dt className="mt-1 text-sm text-quartz/70">{t.home.stats.mining}</dt>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.home.roadmapTitle}</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {phases.map((p, i) => (
            <div key={p.title} className={i === 0 ? "border-t-4 border-hivis pt-5" : "border-t-4 border-granite/30 pt-5"}>
              <h3 className="font-display text-lg font-bold">{p.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-granite">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-hivis">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center">
          <h2 className="font-display max-w-xl text-2xl font-extrabold text-basalt sm:text-3xl">{t.home.ctaTitle}</h2>
          <Button asChild variant="dark" size="lg">
            <Link href="/order">{t.actions.orderOnline}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
