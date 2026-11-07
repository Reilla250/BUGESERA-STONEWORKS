import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { orderSchema } from "@/lib/validation";
import { createCheckout } from "@/lib/payments";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in to place an order." }, { status: 401 });
  }
  const parsed = orderSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { items, deliveryAddr } = parsed.data;

  const products = await db.product.findMany({ where: { id: { in: items.map((i) => i.productId) }, active: true } });
  const byId = new Map(products.map((p) => [p.id, p]));

  // Prices come from the database, never from the browser.
  let total = 0;
  const lines: { productId: string; quantity: number; unitPrice: number }[] = [];
  for (const item of items) {
    const p = byId.get(item.productId);
    if (!p) return NextResponse.json({ error: "A selected product is no longer available." }, { status: 400 });
    if (p.priceRwf == null) {
      return NextResponse.json({ error: `${p.name} is priced on request. Please contact us for a custom price.` }, { status: 400 });
    }
    total += p.priceRwf * item.quantity;
    lines.push({ productId: p.id, quantity: item.quantity, unitPrice: p.priceRwf });
  }

  const reference = `BSW-${Date.now().toString(36).toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}`;
  const user = await db.user.findUniqueOrThrow({ where: { id: session.user.id } });

  const order = await db.order.create({
    data: {
      reference,
      userId: user.id,
      deliveryAddr,
      totalRwf: total,
      items: { create: lines },
      payments: { create: { provider: "flutterwave", amountRwf: total } },
    },
  });

  try {
    const { link } = await createCheckout({ reference, amountRwf: total, email: user.email, name: user.name, phone: user.phone });
    return NextResponse.json({ reference: order.reference, paymentUrl: link }, { status: 201 });
  } catch (err) {
    // The order exists and is unpaid; the customer can pay later from their account.
    return NextResponse.json(
      { reference: order.reference, error: err instanceof Error ? err.message : "Could not start payment." },
      { status: 502 }
    );
  }
}
