import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { PageHero } from "@/components/site/page-hero";
import { OrderTracker } from "@/components/site/order-tracker";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatRwf } from "@/lib/utils";

export default async function OrderDetails({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = await params;
  const session = await auth();
  if (!session?.user) redirect(`/login?next=/account/orders/${reference}`);

  const order = await db.order.findUnique({
    where: { reference },
    include: {
      items: { include: { product: true } },
      payments: true,
    },
  });

  if (!order || order.userId !== session.user.id) notFound();

  return (
    <>
      <PageHero title={`Order ${order.reference}`} intro="Track your product from payment through processing and final delivery." />
      <div className="mx-auto max-w-5xl space-y-10 px-5 py-16">
        <div className="rounded-2xl border border-granite/15 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.12em] text-granite">Current status</p>
              <p className="mt-2 font-display text-2xl font-bold">{order.status.replaceAll("_", " ").toLowerCase()}</p>
            </div>
            <p className="font-display text-3xl font-bold">{formatRwf(order.totalRwf)}</p>
          </div>
          <div className="mt-6">
            <OrderTracker status={order.status} />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-granite/15 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-bold">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm text-granite">
              <div className="flex justify-between gap-4 border-b border-granite/10 pb-2"><dt>Placed</dt><dd>{new Date(order.createdAt).toLocaleDateString("en-GB")}</dd></div>
              <div className="flex justify-between gap-4 border-b border-granite/10 pb-2"><dt>Delivery address</dt><dd className="text-right">{order.deliveryAddr}</dd></div>
              <div className="flex justify-between gap-4 border-b border-granite/10 pb-2"><dt>Payment status</dt><dd>{order.payments.some((p) => p.status === "SUCCESSFUL") ? "Paid" : order.status === "PENDING_PAYMENT" ? "Pending" : "Processing"}</dd></div>
            </dl>
          </section>

          <section className="rounded-2xl border border-granite/15 bg-white p-6 shadow-sm">
            <h2 className="font-display text-2xl font-bold">Items</h2>
            <ul className="mt-5 space-y-4">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-4 border-b border-granite/10 pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-granite">{item.quantity} × {item.product.unit}</p>
                  </div>
                  <p className="font-display font-bold">{formatRwf(item.unitPrice * item.quantity)}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/account" className="rounded-md border border-granite/20 bg-white px-4 py-2 font-medium">
            Back to my account
          </Link>
          {order.status === "PENDING_PAYMENT" && (
            <Link href="/order" className="rounded-md bg-hivis px-4 py-2 font-medium text-basalt">
              Pay now
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
