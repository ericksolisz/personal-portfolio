import { ArrowUpRightIcon } from "lucide-react"
import { ProjectMedia, type Slide } from "@/components/project-media"
import { TechTag } from "@/components/tech-tag"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Dictionary, Locale } from "@/content/i18n"
import type { Project } from "@/content/projects"
import { cn } from "@/lib/utils"

function formatMonth(iso: string, lang: Locale) {
  const [year, month] = iso.split("-").map(Number)
  // Fixed UTC date so server and browser always agree.
  return new Intl.DateTimeFormat(lang === "es" ? "es-MX" : "en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)))
}

function formatPeriod(project: Project, lang: Locale, t: Dictionary) {
  const start = formatMonth(project.start, lang)
  if (project.end === undefined) return start
  const end = project.end === null ? t.projects.present : formatMonth(project.end, lang)
  return `${start} — ${end}`
}

export function ProjectCard({
  project,
  lang,
  t,
  variant = "default",
}: {
  project: Project
  lang: Locale
  t: Dictionary
  variant?: "default" | "featured"
}) {
  const featured = variant === "featured"
  const isOpen = project.source === "open"

  const slides: Slide[] = project.media.map((m) => ({
    ...m,
    alt: m.alt[lang],
    caption: m.caption?.[lang],
  }))

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className={cn(
        "grid grid-cols-1 overflow-hidden rounded-xl border bg-card/85 shadow-[0_0_0_1px_oklch(0_0_0/40%)] backdrop-blur-sm",
        "[grid-template-areas:'head'_'media'_'body']",
        featured &&
          "border-primary/30 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:[grid-template-areas:'media_head'_'media_body']"
      )}
    >
      {/* Header */}
      <div className={cn("p-4 pb-3 [grid-area:head] sm:p-5 sm:pb-3", featured && "lg:p-6 lg:pb-3")}>
        <div className="flex items-start justify-between gap-3">
          <h3 id={`${project.slug}-title`} className={cn("font-bold", featured ? "text-lg sm:text-xl" : "text-base")}>
            {project.name}
          </h3>
          <Badge
            variant="outline"
            className={cn(
              "h-6 shrink-0 rounded-full px-2.5 text-[11px] font-normal",
              isOpen
                ? "border-emerald-400/35 bg-emerald-400/10 text-emerald-300"
                : "border-primary/35 bg-primary/10 text-primary"
            )}
          >
            {isOpen ? t.projects.openSource : t.projects.closedSource}
          </Badge>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {featured && <span className="text-primary">★ {t.projects.featured}</span>}
          <span>{formatPeriod(project, lang, t)}</span>
          {project.badge && <span className="text-primary">{project.badge[lang]}</span>}
        </div>
      </div>

      {/* Media */}
      <div className={cn("px-4 [grid-area:media] sm:px-5", featured && "lg:self-center lg:py-6 lg:pr-0 lg:pl-6")}>
        <ProjectMedia
          slides={slides}
          title={project.name}
          preloadFirst={featured}
          sizes={featured ? "(min-width: 1024px) 560px, 100vw" : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"}
          labels={{
            goToSlide: t.projects.goToSlide,
            previous: t.projects.previous,
            next: t.projects.next,
            mediaSoon: t.projects.mediaSoon,
          }}
        />
      </div>

      {/* Body */}
      <div className={cn("flex flex-col p-4 pt-4 [grid-area:body] sm:p-5", featured && "lg:p-6 lg:pt-1")}>
        <p className="text-sm text-muted-foreground">
          {project.tagline[lang]}
          {project.workingTitle && <> {t.projects.workingTitle}</>}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-pretty">{project.description[lang]}</p>

        {featured && project.highlights && (
          <ul className="mt-4 space-y-2 text-sm leading-relaxed">
            {project.highlights.map((h) => (
              <li key={h.en} className="flex gap-2">
                <span aria-hidden className="text-primary">
                  ›
                </span>
                <span className="text-pretty text-muted-foreground">{h[lang]}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t.projects.technologies}>
          {project.tags.map((tag) => (
            <li key={tag}>
              <TechTag id={tag} />
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          {isOpen && project.repo ? (
            <Button
              asChild
              variant="outline"
              className="h-10 gap-1.5 rounded-lg border-emerald-400/30 bg-emerald-400/5 px-3.5 text-emerald-300 hover:bg-emerald-400/15 hover:text-emerald-200"
            >
              <a href={project.repo} target="_blank" rel="noopener noreferrer">
                {t.projects.viewSource}
                <ArrowUpRightIcon />
              </a>
            </Button>
          ) : (
            <p className="text-sm text-primary">{t.projects.closedNote}</p>
          )}
        </div>
      </div>
    </article>
  )
}
