import Link from "next/link";
import { company } from "@/lib/content";
import { dictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/server-i18n";

export async function SiteFooter() {
  const locale = await getLocale();
  const t = dictionary[locale];

  return (
    <footer className="strata bg-basalt text-quartz">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-5 lg:grid-cols-3 lg:py-16">
        <div className="max-w-sm">
          <p className="font-display text-xl font-bold">{company.name}</p>
          <p className="mt-3 text-quartz/70">{company.slogan}.</p>
          <p className="mt-6 text-sm text-quartz/60">{company.location}</p>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-hivis">{t.footer.explore}</p>
          <ul className="mt-4 space-y-2 text-sm text-quartz/80">
            <li><Link href="/products" className="transition hover:text-hivis">{t.nav.products}</Link></li>
            <li><Link href="/equipment" className="transition hover:text-hivis">Equipment</Link></li>
            <li><Link href="/process" className="transition hover:text-hivis">{t.nav.process}</Link></li>
            <li><Link href="/market" className="transition hover:text-hivis">Market and customers</Link></li>
            <li><Link href="/career" className="transition hover:text-hivis">{t.nav.career}</Link></li>
            <li><Link href="/investors" className="transition hover:text-hivis">Investors</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-hivis">{t.footer.talk}</p>
          <ul className="mt-4 space-y-3 text-sm text-quartz/80">
            <li>
              <a href={`tel:${company.phone.replace(/\s+/g, "")}`} className="inline-flex transition hover:text-hivis">{company.phone}</a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="inline-flex transition hover:text-hivis">{company.email}</a>
            </li>
            <li>
              <a className="inline-flex transition hover:text-hivis" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">{locale === "rw" ? "Uhamagare kuri WhatsApp" : "WhatsApp Business"}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-quartz/50 sm:px-5">
        © {new Date().getFullYear()} {company.name}. {t.footer.allRights}
      </div>
    </footer>
  );
}
