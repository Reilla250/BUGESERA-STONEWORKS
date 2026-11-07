import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CartSummary, ProductDetailsCart } from "@/components/site/cart";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/content";
import { db } from "@/lib/db";
import { formatRwf } from "@/lib/utils";

export default async function ProductDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await db.product.findUnique({
    where: { slug },
  });

  if (!product || !product.active) notFound();

  const related = await db.product.findMany({
    where: { active: true, category: product.category, id: { not: product.id } },
    take: 3,
    orderBy: { name: "asc" },
  });

  const imageUrl = product.imageUrl || "/hero/stone-1.webp";

  return (
    <main className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-granite/15 bg-white shadow-sm">
          <div className="flex h-full min-h-[420px] items-center justify-center bg-gradient-to-br from-slate to-granite/15 p-8">
            <Image src={imageUrl} alt={product.name} width={1200} height={900} className="h-full w-full rounded-2xl object-cover" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.14em] text-granite">{product.category.replaceAll("_", " ").toLowerCase()}</p>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight">{product.name}</h1>
          </div>

          <div className="rounded-2xl border border-granite/15 bg-white p-5 shadow-sm">
            <p className="text-3xl font-display font-bold">{product.priceRwf ? `${formatRwf(product.priceRwf)} / ${product.unit}` : "Price on request"}</p>
            <p className="mt-2 text-granite">{product.summary}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="inline-flex items-center justify-center rounded-md bg-basalt px-5 py-3 text-sm font-semibold text-white transition hover:bg-basalt/90">Call for price</a>
            <Button asChild size="lg" variant="dark">
              <Link href="/products">Back to products</Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-granite/15 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-granite">Order</p>
            <ProductDetailsCart product={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              unit: product.unit,
              priceRwf: product.priceRwf,
              category: product.category,
              summary: product.summary,
              imageUrl: product.imageUrl || imageUrl,
            }} />
          </div>

          <div className="rounded-2xl border border-granite/15 bg-white p-4 shadow-sm">
            <CartSummary />
          </div>

          <dl className="grid gap-4 rounded-2xl border border-granite/15 bg-white p-5 text-sm shadow-sm sm:grid-cols-2">
            <div>
              <dt className="text-granite">Uses</dt>
              <dd className="mt-1 font-medium">{product.uses}</dd>
            </div>
            {product.sizeSpec && (
              <div>
                <dt className="text-granite">Size</dt>
                <dd className="mt-1 font-medium">{product.sizeSpec}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <section className="mt-16 rounded-3xl border border-granite/15 bg-white p-6 shadow-sm">
        <h2 className="font-display text-2xl font-bold">Why buyers choose this product</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-slate/60 p-4">
            <h3 className="font-display text-lg font-bold">Quality</h3>
            <p className="mt-2 text-sm text-granite">Curated and checked for consistency before delivery to site.</p>
          </div>
          <div className="rounded-2xl bg-slate/60 p-4">
            <h3 className="font-display text-lg font-bold">Fast delivery</h3>
            <p className="mt-2 text-sm text-granite">Prepared for site delivery, bulk orders and predictable scheduling.</p>
          </div>
          <div className="rounded-2xl bg-slate/60 p-4">
            <h3 className="font-display text-lg font-bold">Built for Rwanda</h3>
            <p className="mt-2 text-sm text-granite">Suitable for roads, houses, drainage, foundations and general construction.</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold">More from this range</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.id} href={`/products/${item.slug}`} className="rounded-2xl border border-granite/15 bg-white p-4 shadow-sm transition-transform hover:-translate-y-1">
                <p className="font-display text-xl font-bold">{item.name}</p>
                <p className="mt-2 text-sm text-granite">{item.summary}</p>
                <p className="mt-3 font-medium">{item.priceRwf ? formatRwf(item.priceRwf) : "Price on request"}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
