import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "Sign in" };

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string; next?: string }> }) {
  const locale = await getLocale();
  const { error, next } = await searchParams;
  const t = dictionary[locale];

  async function action(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: String(formData.get("email")),
        password: String(formData.get("password")),
        redirectTo: next && next.startsWith("/") ? next : "/account",
      });
    } catch (e) {
      if (e instanceof AuthError) redirect(`/login?error=1${next ? `&next=${encodeURIComponent(next)}` : ""}`);
      throw e;
    }
  }

  return (
    <div className="mx-auto max-w-md px-5 py-20">
      <h1 className="font-display text-3xl font-bold">{t.login.title}</h1>
      <form action={action} className="mt-8 space-y-5">
        <div><Label htmlFor="email">{t.login.email}</Label><Input id="email" name="email" type="email" required autoComplete="email" /></div>
        <div><Label htmlFor="password">{t.login.password}</Label><Input id="password" name="password" type="password" required autoComplete="current-password" /></div>
        {error && <p role="alert" className="text-sm font-medium text-laterite">{t.login.error}</p>}
        <Button type="submit" className="w-full" size="lg">{t.login.title}</Button>
      </form>
      <p className="mt-6 text-sm text-granite">
        {t.login.newHere} <Link className="font-medium text-basalt underline underline-offset-2" href="/register">{t.login.createAccount}</Link>
      </p>
    </div>
  );
}
