import type { Metadata } from "next";
import { QuoteForm } from "@/components/site/quote-form";
import { company } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/server-i18n";

export const metadata: Metadata = { title: "Contact" };

export default async function Contact() {
  const locale = await getLocale();
  const t = dictionary[locale];
  return (
    <div className="bg-[#efeee9] px-5 py-10 text-basalt md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-sm text-granite">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span className="font-medium text-basalt">Contact</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <aside className="space-y-6 pt-8">
            <h1 className="font-display text-4xl font-bold leading-tight text-basalt">{company.name}</h1>

            <ul className="space-y-4 text-lg text-basalt/80">
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d9efe5] text-sm">📍</span>
                <span>{company.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d9efe5] text-sm">📦</span>
                <span>Registration Number: 1735</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d9efe5] text-sm">✉️</span>
                <a href={`mailto:${company.email}`} className="underline underline-offset-2">{company.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d9efe5] text-sm">📞</span>
                <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="underline underline-offset-2">{company.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d9efe5] text-sm">💬</span>
                <a href={`https://wa.me/${company.whatsapp}`} className="underline underline-offset-2">{t.contact.message}</a>
              </li>
            </ul>

            <div className="rounded-2xl border border-[#d8d5d0] bg-[#f0efe8] p-4 text-sm leading-7 text-granite">
              {t.contact.heroText}
            </div>
          </aside>

          <div className="lg:pt-2">
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
