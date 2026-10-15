import Link from "next/link"
import { cn } from "@/lib/utils"
import { locales, type Locale } from "@/content/i18n"

export function LangToggle({ lang, label }: { lang: Locale; label: string }) {
  return (
    <nav aria-label={label} className="flex rounded-md border bg-background/60 p-0.5 backdrop-blur-sm">
      {locales.map((locale) => {
        const active = locale === lang
        return (
          <Link
            key={locale}
            href={`/${locale}`}
            hrefLang={locale}
            lang={locale}
            scroll={false}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex min-h-9 min-w-10 items-center justify-center rounded-[5px] px-2 text-xs uppercase transition-colors",
              active
                ? "bg-primary font-semibold text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {locale}
          </Link>
        )
      })}
    </nav>
  )
}
