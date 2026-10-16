export const locales = ["en", "es"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

/** A string that exists in every supported language. */
export type Localized = Record<Locale, string>

const dictionaries = {
  en: {
    meta: {
      title: "Erick Solis Zamacona, AI Engineer | Backend Architect",
      description:
        "Portfolio of Erick Solis Zamacona: AI agents, multi-tenant backends and event-driven systems.",
    },
    hero: {
      name: "Erick Solis Zamacona",
      headline: ["AI Engineer", "Backend Architect"],
      intro:
        "I build AI agents and the backend systems behind them: typed tool-calling agents, multi-tenant APIs and event-driven services. I focus on the parts most devs skip: correctness, security and, above all, testing.",
      cta: "Building with AI agents or backend systems? Let's talk.",
    },
    contact: {
      github: "github",
      email: "email",
      copy: "copy",
      copied: "copied",
      copyLabel: "Copy email address",
    },
    projects: {
      heading: "projects",
      featured: "featured",
      openSource: "open source",
      closedSource: "closed source",
      viewSource: "View source on GitHub",
      closedNote: "Closed source. Media and details on request.",
      present: "present",
      mediaSoon: "media coming soon",
      workingTitle: "Working title.",
      technologies: "Technologies",
      goToSlide: "Go to slide",
      previous: "Previous slide",
      next: "Next slide",
    },
    footer: {
      backToTop: "Back to top",
    },
    language: {
      label: "Language",
    },
  },
  es: {
    meta: {
      title: "Erick Solis Zamacona, Ingeniero de IA | Arquitecto Backend",
      description:
        "Portafolio de Erick Solis Zamacona: agentes de IA, backends multi-tenant y sistemas orientados a eventos.",
    },
    hero: {
      name: "Erick Solis Zamacona",
      headline: ["Ingeniero de IA", "Arquitecto Backend"],
      intro:
        "Construyo agentes de IA y los sistemas backend que los sostienen: agentes con herramientas tipadas, APIs multi-tenant y servicios orientados a eventos. Me enfoco en lo que la mayoría de los devs omite: corrección, seguridad y, sobre todo, pruebas.",
      cta: "¿Trabajas con agentes de IA o sistemas backend? Hablemos.",
    },
    contact: {
      github: "github",
      email: "correo",
      copy: "copiar",
      copied: "copiado",
      copyLabel: "Copiar correo electrónico",
    },
    projects: {
      heading: "proyectos",
      featured: "destacado",
      openSource: "código abierto",
      closedSource: "código cerrado",
      viewSource: "Ver código en GitHub",
      closedNote: "Código cerrado. Material y detalles bajo solicitud.",
      present: "actual",
      mediaSoon: "material próximamente",
      workingTitle: "Nombre provisional.",
      technologies: "Tecnologías",
      goToSlide: "Ir a la diapositiva",
      previous: "Diapositiva anterior",
      next: "Siguiente diapositiva",
    },
    footer: {
      backToTop: "Volver arriba",
    },
    language: {
      label: "Idioma",
    },
  },
} satisfies Record<Locale, unknown>

export type Dictionary = (typeof dictionaries)["en"]

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale]
