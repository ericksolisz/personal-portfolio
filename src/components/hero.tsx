import { CopyEmail } from "@/components/copy-email"
import { DotNetwork } from "@/components/dot-network"
import { LangToggle } from "@/components/lang-toggle"
import type { Dictionary, Locale } from "@/content/i18n"
import { site } from "@/content/site"

export function Hero({ lang, t }: { lang: Locale; t: Dictionary }) {
  const [role, specialty] = t.hero.headline

  return (
    <header id="top" className="relative isolate overflow-hidden border-b">
      <DotNetwork className="absolute inset-0 -z-20 size-full [mask-image:linear-gradient(to_bottom,black_65%,transparent)]" />
      {/* Darkens the middle so the text stays readable over the dots. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_50%_at_50%_55%,color-mix(in_oklch,var(--background)_88%,transparent),transparent)]"
      />

      <div className="page-x mx-auto max-w-6xl">
        <div className="flex items-center justify-between pt-[max(1rem,env(safe-area-inset-top))]">
          <a
            href="#top"
            className="rounded-sm text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
          >
            <span className="text-primary">~/</span>erick
          </a>
          <LangToggle lang={lang} label={t.language.label} />
        </div>

        <div className="mx-auto max-w-5xl py-14 text-center sm:py-24">
          <p className="text-sm text-primary">{t.hero.name}</p>
          <h1 className="mt-3 text-[1.65rem] leading-tight font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            <span className="block lg:inline">{role}</span>
            <span aria-hidden className="mx-4 hidden text-primary lg:inline">
              |
            </span>
            <span className="sr-only lg:hidden"> | </span>
            <span className="block lg:inline">{specialty}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
            {t.hero.intro}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-semibold text-pretty sm:text-base">{t.hero.cta}</p>

          <dl className="mt-8 flex flex-col items-center gap-2 text-sm sm:text-base">
            <div className="flex flex-wrap items-center justify-center gap-x-2">
              <dt className="text-muted-foreground">{t.contact.github}:</dt>
              <dd>
                <a
                  href={site.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center rounded-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  @{site.github.handle}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-2">
              <dt className="text-muted-foreground">{t.contact.email}:</dt>
              <dd>
                <CopyEmail
                  copiedLabel={t.contact.copied}
                  copyLabel={t.contact.copyLabel}
                  className="font-semibold text-primary max-[374px]:text-[13px]"
                />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </header>
  )
}
