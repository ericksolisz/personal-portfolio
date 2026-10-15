import { notFound } from "next/navigation"
import { Hero } from "@/components/hero"
import { ProjectCard } from "@/components/project-card"
import { SiteFooter } from "@/components/site-footer"
import { getDictionary, hasLocale } from "@/content/i18n"
import { sortedProjects } from "@/content/projects"

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const t = getDictionary(lang)
  const projects = sortedProjects()
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => p !== featured)

  return (
    <>
      <Hero lang={lang} t={t} />

      <main id="projects" className="page-x mx-auto max-w-6xl py-12 sm:py-16">
        <h2 className="mb-6 text-sm text-muted-foreground">
          <span className="text-primary">{"//"}</span> {t.projects.heading}
        </h2>

        <div className="flex flex-col gap-5 sm:gap-6">
          {featured && (
            <ProjectCard project={featured} lang={lang} t={t} variant="featured" />
          )}

          {rest.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} lang={lang} t={t} />
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter lang={lang} t={t} />
    </>
  )
}
