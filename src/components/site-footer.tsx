import { CopyEmail } from "@/components/copy-email"
import type { Dictionary, Locale } from "@/content/i18n"
import { site } from "@/content/site"

export function SiteFooter({ t }: { lang: Locale; t: Dictionary }) {
  return (
    <footer className="page-x border-t pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-x-4 gap-y-1 text-sm md:flex-row md:flex-wrap">
        <span className="inline-flex items-center gap-2">
          <span className="text-muted-foreground">GitHub:</span>
          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center rounded-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            @{site.github.handle}
          </a>
        </span>
        <span aria-hidden className="hidden text-muted-foreground md:inline">
          ·
        </span>
        <span className="inline-flex flex-wrap items-center justify-center gap-x-2">
          <span className="text-muted-foreground">{t.contact.email}:</span>
          <CopyEmail
            copyLabel={t.contact.copyLabel}
            copiedLabel={t.contact.copied}
            className="font-semibold max-[374px]:text-[13px]"
          />
        </span>
        <span aria-hidden className="hidden text-muted-foreground md:inline">
          ·
        </span>
        <a
          href="#top"
          className="inline-flex min-h-9 items-center rounded-sm text-primary underline-offset-4 hover:underline"
        >
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  )
}
