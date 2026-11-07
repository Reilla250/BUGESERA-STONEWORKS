"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(f)),
    });
    if (res.ok) {
      router.push("/login?registered=1");
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.error ?? "Could not create the account. Try again.");
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <h1 className="font-display text-3xl font-bold">Create an account</h1>
      <p className="mt-2 text-granite">Track quotes and place paid orders.</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <div><Label htmlFor="name">Full name</Label><Input id="name" name="name" required autoComplete="name" /></div>
        <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required autoComplete="email" /></div>
        <div><Label htmlFor="phone">Phone (optional)</Label><Input id="phone" name="phone" type="tel" autoComplete="tel" /></div>
        <div><Label htmlFor="company">Company (optional)</Label><Input id="company" name="company" autoComplete="organization" /></div>
        <div><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" /></div>
        {error && <p role="alert" className="text-sm font-medium text-laterite">{error}</p>}
        <Button type="submit" className="w-full" size="lg" disabled={busy}>{busy ? "Creating account…" : "Create account"}</Button>
      </form>
      <p className="mt-6 text-sm text-granite">
        Already registered? <Link className="font-medium text-basalt underline underline-offset-2" href="/login">Sign in</Link>
      </p>
    </div>
  );
}
