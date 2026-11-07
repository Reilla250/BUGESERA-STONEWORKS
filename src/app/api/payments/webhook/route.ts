import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyTransaction } from "@/lib/payments";

// Flutterwave calls this when a payment completes. We trust the header hash only to
// filter noise, then re-verify the transaction with Flutterwave before marking anything paid.
export async function POST(req: Request) {
  const expected = process.env.FLUTTERWAVE_WEBHOOK_HASH;
  if (!expected || req.headers.get("verif-hash") !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const event = (await req.json().catch(() => null)) as { data?: { id?: number; tx_ref?: string } } | null;
  const id = event?.data?.id;
  const ref = event?.data?.tx_ref;
  if (!id || !ref) return NextResponse.json({ ok: true });

  const verified = await verifyTransaction(String(id));
  const order = await db.order.findUnique({ where: { reference: ref } });
  if (!order) return NextResponse.json({ ok: true });

  const good =
    verified.data?.status === "successful" &&
    verified.data.tx_ref === ref &&
    verified.data.currency === "RWF" &&
    (verified.data.amount ?? 0) >= order.totalRwf;

  await db.$transaction([
    db.payment.updateMany({
      where: { orderId: order.id },
      data: { status: good ? "SUCCESSFUL" : "FAILED", providerRef: String(id) },
    }),
    db.order.update({ where: { id: order.id }, data: { status: good ? "PAID" : "PENDING_PAYMENT" } }),
  ]);
  return NextResponse.json({ ok: true });
}
