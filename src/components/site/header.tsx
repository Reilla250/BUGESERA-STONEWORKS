import Link from "next/link";
import { MobileMenu } from "@/components/site/mobile-menu";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/server-i18n";

export async function SiteHeader() {
  const [session, locale] = await Promise.all([auth(), getLocale()]);
  const t = dictionary[locale];
  const links = [
    { href: "/products", label: t.nav.products },
    { href: "/process", label: t.nav.process },
    { href: "/about", label: t.nav.about },
    { href: "/career", label: t.nav.career },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-basalt text-quartz">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-5">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Bugesera Stoneworks home">
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M2 28 L11 8 L17 18 L21 12 L30 28 Z" fill="#f5b800" />
            <path d="M2 28 L30 28 L30 30 L2 30 Z" fill="#f5f6f3" />
          </svg>
          <span className="font-display text-sm font-bold leading-none tracking-wide">
            BUGESERA
            <br />
            <span className="font-medium text-hivis">STONEWORKS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main desktop navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-quartz/80 transition-colors hover:text-hivis">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} />
          </div>

          {session?.user ? (
            <>
              <Link href={session.user.role === "ADMIN" ? "/admin" : "/account"} className="hidden text-sm text-quartz/80 hover:text-hivis sm:block">
                {session.user.role === "ADMIN" ? t.actions.admin : t.actions.myAccount}
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
                className="hidden sm:block"
              >
                <Button variant="outline" size="sm" type="submit">{t.actions.signOut}</Button>
              </form>
            </>
          ) : (
            <Link href="/login" className="hidden text-sm text-quartz/80 hover:text-hivis sm:block">{t.actions.signIn}</Link>
          )}

          <div className="hidden sm:block">
            <Button asChild size="sm">
              <Link href="/contact">{t.nav.contact}</Link>
            </Button>
          </div>

          <MobileMenu
            links={links}
            locale={locale}
            isLoggedIn={Boolean(session?.user)}
            loginLabel={t.actions.signIn}
            accountLabel={session?.user?.role === "ADMIN" ? t.actions.admin : t.actions.myAccount}
          />
        </div>
      </div>
    </header>
  );
}
