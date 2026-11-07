// Flutterwave Standard (hosted checkout). Supports cards, MTN MoMo and Airtel Money in Rwanda.
// Docs: https://developer.flutterwave.com/docs
export async function createCheckout(args: {
  reference: string;
  amountRwf: number;
  email: string;
  name: string;
  phone?: string | null;
}) {
  const secret = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secret) throw new Error("Online payments are not configured yet.");
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const res = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      tx_ref: args.reference,
      amount: args.amountRwf,
      currency: "RWF",
      redirect_url: `${site}/account?paid=${args.reference}`,
      payment_options: "card,mobilemoneyrwanda",
      customer: { email: args.email, name: args.name, phonenumber: args.phone ?? undefined },
      customizations: { title: "Bugesera Stoneworks", description: `Order ${args.reference}` },
    }),
  });
  const json = (await res.json()) as { status?: string; data?: { link?: string }; message?: string };
  if (!res.ok || json.status !== "success" || !json.data?.link) {
    throw new Error(json.message ?? "The payment provider rejected the request.");
  }
  return { link: json.data.link };
}

export async function verifyTransaction(transactionId: string) {
  const secret = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secret) throw new Error("Online payments are not configured yet.");
  const res = await fetch(`https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transactionId)}/verify`, {
    headers: { Authorization: `Bearer ${secret}` },
  });
  return (await res.json()) as {
    status?: string;
    data?: { status?: string; tx_ref?: string; amount?: number; currency?: string; id?: number };
  };
}
