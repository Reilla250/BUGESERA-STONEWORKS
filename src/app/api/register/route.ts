import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const parsed = registerSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }
  const { name, email, phone, company, password } = parsed.data;
  const normalized = email.toLowerCase();
  const exists = await db.user.findUnique({ where: { email: normalized } });
  if (exists) {
    return NextResponse.json({ error: "An account with this email already exists. Sign in instead." }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await db.user.create({ data: { name, email: normalized, phone, company, passwordHash } });
  return NextResponse.json({ ok: true }, { status: 201 });
}
