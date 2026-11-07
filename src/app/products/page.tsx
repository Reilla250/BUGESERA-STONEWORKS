import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { CartSummary, ProductCartControl } from "@/components/site/cart";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories, company } from "@/lib/content";
import { db } from "@/lib/db";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/server-i18n";
import { formatRwf } from "@/lib/utils";

export const metadata: Metadata = { title: "Products" };
export const dynamic = "force-dynamic";

async function loadProducts() {
  try {
    return await db.product.findMany({ where: { active: true }, orderBy: { name: "asc" } });
  } catch {
    return [];
  }
}

function getProductImage(productCategory: string, index: number) {
  const images = ["/hero/stone-1.webp", "/hero/stone-2.jpg", "/hero/stone-3.jpg", "/hero/stone-4.jpg", "/hero/stone-5.jpg"];
  return images[index % images.length] ?? "/hero/stone-1.webp";
}

function CategoryGallery({ category, index, gallery }: { category: string; index: number; gallery?: string[] }) {
  const images = gallery && gallery.length > 0 ? gallery : [
    getProductImage(category, index),
    getProductImage(category, index + 1),
    getProductImage(category, index + 2),
  ];

  return (
    <div className="mt-5 grid grid-cols-3 gap-3">
      {images.map((src, imageIndex) => (
        <div key={`${category}-${imageIndex}`} className="relative h-28 overflow-hidden rounded-2xl border border-granite/10 bg-slate shadow-sm sm:h-32">
          <Image src={src} alt={`${category} product ${imageIndex + 1}`} fill className="object-cover" />
        </div>
      ))}
    </div>
  );
}

export default async function Products() {
  const [products, locale] = await Promise.all([loadProducts(), getLocale()]);
  const t = dictionary[locale];
  const productPageTitle = locale === "rw" ? "Ibicuruzwa by'amabuye" : "Stone products";
  const productPageIntro = locale === "rw"
    ? "Kuragiza ibicuruzwa bigenzuwe online, kandi ubone ibikoresho byihuse, by’ingenzi, n’itangwa ku rubuga rwawe."
    : "Order priced products online and get the materials you need for delivery, volume supply and construction work.";

  return (
    <>
      <PageHero title={productPageTitle} intro={productPageIntro} />
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex justify-end">
          <div className="w-full max-w-sm">
            <CartSummary />
          </div>
        </div>

        {categories.map((c, index) => {
          const priced = products.filter((p) => p.category === c.key);
          return (
            <section key={c.key} id={c.key} className="scroll-mt-28 border-b border-granite/20 py-12 first:pt-0 last:border-0">
              <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
                <div>
                  <h2 className="font-display text-2xl font-bold">{locale === "rw" ? c.label.replace("Building stones", "Amabuye y’ubwubatsi").replace("Machine-cut stones", "Amabuye yacishijwe").replace("Aggregates", "Imfubyi").replace("Manufactured sand", "Umusenyi w’ubwubatsi").replace("Finished stone products", "Ibicuruzwa by’amabuye byumwimerere").replace("Concrete products", "Ibicuruzwa by’ubutaka") : c.label}</h2>
                  <p className="mt-3 max-w-md text-granite">{c.blurb}</p>
                  {c.phase > 1 && <Badge className="mt-4">{locale === "rw" ? `Bihari kuva ku cyiciro ${c.phase}` : `Available from phase ${c.phase}`}</Badge>}
                  <CategoryGallery category={c.label} index={index} gallery={c.gallery} />
                </div>
                <div>
                  {priced.length > 0 ? (
                    <ul className="divide-y divide-granite/15">
                      {priced.map((p, index) => {
                        const imageUrl = p.imageUrl || getProductImage(p.category, index);
                        return (
                          <li key={p.id} className="grid gap-4 py-4 md:grid-cols-[150px_1fr_auto] md:items-center">
                            <Link href={`/products/${p.slug}`} className="block relative h-28 overflow-hidden rounded-2xl bg-slate" aria-label={`View details for ${p.name}`}>
                              <Image src={imageUrl} alt={p.name} fill className="object-cover" />
                            </Link>
                            <div>
                              <p className="font-display text-lg font-bold">{p.name}</p>
                              <p className="mt-1 text-sm text-granite">{p.summary || p.uses}</p>
                              {p.sizeSpec && <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-granite">{p.sizeSpec}</p>}
                            </div>
                            <div className="flex flex-col items-start gap-2 md:items-end">
                              <p className="font-display font-bold">{p.priceRwf ? `${formatRwf(p.priceRwf)} / ${p.unit}` : locale === "rw" ? "Igiciro gitangwa ku mbuzi" : "Price on request"}</p>
                              <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="text-sm font-medium text-basalt underline underline-offset-2">{company.phone}</a>
                              <ProductCartControl product={{
                                id: p.id,
                                name: p.name,
                                slug: p.slug,
                                unit: p.unit,
                                priceRwf: p.priceRwf,
                                category: p.category,
                                summary: p.summary,
                                imageUrl: p.imageUrl || getProductImage(p.category, index),
                              }} />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <ul className="grid gap-x-8 gap-y-2 text-granite sm:grid-cols-2">
                      {c.items.map((i) => <li key={i}>{i}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          );
        })}
        <div className="mt-6 flex flex-wrap gap-4">
          <Button asChild size="lg"><Link href="/order">{t.actions.orderOnline}</Link></Button>
          <Button asChild size="lg" variant="dark"><Link href="/contact">{t.nav.contact}</Link></Button>
        </div>
      </div>
    </>
  );
}
