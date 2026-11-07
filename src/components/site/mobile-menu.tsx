"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import type { Locale } from "@/lib/i18n";

export function MobileMenu({
  links,
  locale,
  isLoggedIn,
  loginLabel,
  accountLabel,
}: {
  links: { href: string; label: string }[];
  locale: Locale;
  isLoggedIn: boolean;
  loginLabel: string;
  accountLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-quartz transition hover:bg-white/10"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-basalt/95 shadow-2xl backdrop-blur-sm">
          <div className="mx-auto max-w-7xl space-y-4 px-4 py-4">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <LanguageSwitcher locale={locale} />
              <Link href="/contact" className="text-sm font-medium text-hivis" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </div>

            <nav className="space-y-2" aria-label="Mobile menu">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-quartz/80 transition hover:bg-white/5 hover:text-quartz"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 border-t border-white/10 pt-3">
              {isLoggedIn ? (
                <Link href="/account" className="flex-1 rounded-xl border border-white/10 px-3 py-2 text-center text-sm font-medium text-quartz/80 hover:text-quartz" onClick={() => setOpen(false)}>
                  {accountLabel}
                </Link>
              ) : (
                <Link href="/login" className="flex-1 rounded-xl border border-white/10 px-3 py-2 text-center text-sm font-medium text-quartz/80 hover:text-quartz" onClick={() => setOpen(false)}>
                  {loginLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
