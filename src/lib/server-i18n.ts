import { cookies } from "next/headers";
import { DEFAULT_LOCALE, getLocaleFromValue, type Locale } from "@/lib/i18n";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return getLocaleFromValue(cookieStore.get("locale")?.value ?? DEFAULT_LOCALE);
}
