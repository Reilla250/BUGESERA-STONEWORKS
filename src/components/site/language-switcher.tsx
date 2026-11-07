"use client";

import { Globe } from "lucide-react";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n";

const options: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "rw", label: "RW" },
];

const setCookie = (name: string, value: string) => {
  Reflect.set(document, "cookie", `${name}=${value}; path=/; max-age=31536000; SameSite=Lax`);
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const setLocale = (nextLocale: Locale) => {
    setCookie(LOCALE_COOKIE, nextLocale);
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1">
      <Globe className="h-4 w-4 text-quartz/70" aria-hidden="true" />
      <div className="flex items-center gap-1">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-label={`Switch language to ${option.label}`}
            onClick={() => setLocale(option.value)}
            className={`rounded-full px-2 py-1 text-[10px] font-semibold tracking-[0.12em] transition-colors ${
              locale === option.value ? "bg-hivis text-basalt" : "text-quartz/70 hover:text-quartz"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
