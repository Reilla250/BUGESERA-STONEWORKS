import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { quoteSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const parsed = quoteSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const session = await auth();
  const { items, attachments, ...rest } = parsed.data;

  const products = await db.product.findMany({ where: { id: { in: items.map((i) => i.productId) }, active: true } });
  if (products.length !== new Set(items.map((i) => i.productId)).size) {
    return NextResponse.json({ error: "One of the selected products is no longer available." }, { status: 400 });
  }

  const quote = await db.quote.create({
    data: {
      ...rest,
      userId: session?.user?.id,
      items: { create: items },
      attachments: attachments ? { create: attachments } : undefined,
    },
  });
  return NextResponse.json({ id: quote.id }, { status: 201 });
}
