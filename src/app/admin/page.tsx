import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatRwf } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login?next=/admin");
}

async function updatePrice(formData: FormData) {
  "use server";
  await requireAdmin();
  const raw = String(formData.get("price") ?? "").trim();
  const price = raw === "" ? null : Math.max(0, Math.floor(Number(raw)));
  if (price !== null && Number.isNaN(price)) return;
  await db.product.update({ where: { id: String(formData.get("id")) }, data: { priceRwf: price } });
  revalidatePath("/admin");
  revalidatePath("/products");
}

async function setQuoteStatus(formData: FormData) {
  "use server";
  await requireAdmin();
  const status = String(formData.get("status"));
  if (!["NEW", "CONTACTED", "QUOTED", "WON", "LOST"].includes(status)) return;
  await db.quote.update({ where: { id: String(formData.get("id")) }, data: { status: status as "NEW" } });
  revalidatePath("/admin");
}

export default async function Admin() {
  await requireAdmin();
  const [quotes, orders, products] = await Promise.all([
    db.quote.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { items: { include: { product: true } }, attachments: true } }),
    db.order.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { user: true } }),
    db.product.findMany({ orderBy: { name: "asc" } }),
  ]);
  const paidTotal = orders.filter((o) => o.status === "PAID" || o.status === "PROCESSING" || o.status === "DELIVERED").reduce((s, o) => s + o.totalRwf, 0);

  return (
    <>
      <PageHero title="Admin" />
      <div className="mx-auto max-w-7xl space-y-16 px-5 py-14">
        <dl className="grid gap-6 sm:grid-cols-3">
          <div className="border-l-4 border-hivis pl-4"><dd className="font-display text-3xl font-extrabold">{quotes.filter((q) => q.status === "NEW").length}</dd><dt className="text-sm text-granite">New quote requests</dt></div>
          <div className="border-l-4 border-hivis pl-4"><dd className="font-display text-3xl font-extrabold">{orders.length}</dd><dt className="text-sm text-granite">Orders (latest 50)</dt></div>
          <div className="border-l-4 border-hivis pl-4"><dd className="font-display text-3xl font-extrabold">{formatRwf(paidTotal)}</dd><dt className="text-sm text-granite">Paid orders value</dt></div>
        </dl>

        <section>
          <h2 className="font-display text-2xl font-bold">Quote requests</h2>
          <ul className="mt-4 divide-y divide-granite/20 border-y border-granite/20">
            {quotes.map((q) => (
              <li key={q.id} className="grid gap-3 py-4 lg:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-medium">{q.name}{q.company ? `, ${q.company}` : ""}</p>
                  <p className="text-sm text-granite">{q.phone} · {q.email} · {q.location}</p>
                  <p className="mt-1 text-sm">{q.items.map((i) => `${i.quantity} × ${i.product.name}`).join(", ")}</p>
                  {q.message && <p className="mt-1 text-sm text-granite">{q.message}</p>}
                  {q.attachments.length > 0 && (
                    <p className="mt-1 text-sm">{q.attachments.map((a) => <a key={a.id} className="mr-3 underline" href={a.url}>{a.filename}</a>)}</p>
                  )}
                </div>
                <form action={setQuoteStatus} className="flex items-start gap-2">
                  <input type="hidden" name="id" value={q.id} />
                  <select name="status" defaultValue={q.status} aria-label="Quote status" className="h-10 border border-granite/30 bg-white px-2 text-sm">
                    {["NEW", "CONTACTED", "QUOTED", "WON", "LOST"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <Button size="sm" variant="dark" type="submit">Save</Button>
                </form>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Orders</h2>
          <ul className="mt-4 divide-y divide-granite/20 border-y border-granite/20">
            {orders.map((o) => (
              <li key={o.id} className="flex flex-wrap justify-between gap-2 py-3">
                <span>{o.reference} · {o.user.name}</span>
                <span className="text-granite">{o.status.replaceAll("_", " ").toLowerCase()} · {formatRwf(o.totalRwf)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Product prices</h2>
          <p className="mt-1 text-sm text-granite">Leave a price empty to show “Price on request”. Only priced products can be ordered online.</p>
          <ul className="mt-4 divide-y divide-granite/20 border-y border-granite/20">
            {products.map((p) => (
              <li key={p.id}>
                <form action={updatePrice} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <input type="hidden" name="id" value={p.id} />
                  <span>{p.name} <span className="text-sm text-granite">per {p.unit}</span></span>
                  <span className="flex items-center gap-2">
                    <Input name="price" type="number" min={0} defaultValue={p.priceRwf ?? ""} aria-label={`Price of ${p.name} in RWF`} className="h-10 w-36" />
                    <Button size="sm" variant="dark" type="submit">Save</Button>
                  </span>
                </form>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
