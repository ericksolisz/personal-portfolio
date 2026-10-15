import type { Localized } from "./i18n"

/**
 * One slide in a project's media carousel.
 *
 * Put files in `public/projects/<slug>/` and reference them as
 * `/projects/<slug>/<file>`. See README.md for how to export short clips.
 */
export type ProjectMedia =
  | {
      type: "image"
      src: string
      alt: Localized
      caption?: Localized
      /** How long the slide stays before auto-advancing, in ms. Default 4500. */
      duration?: number
      /** `contain` for diagrams, `cover` for screenshots. Default `cover`. */
      fit?: "cover" | "contain"
    }
  | {
      type: "video"
      /** H.264 MP4. Required, plays everywhere including iPhone Safari. */
      src: string
      /** Optional VP9/AV1 WebM, usually smaller. Browsers pick the first they support. */
      webm?: string
      /** First-frame image shown while the clip loads. Strongly recommended. */
      poster?: string
      alt: Localized
      caption?: Localized
      fit?: "cover" | "contain"
    }

export type Project = {
  slug: string
  name: string
  /** Shown as "Working title." after the tagline. */
  workingTitle?: boolean
  /** Rendered as the wide card at the top of the list. */
  featured?: boolean
  source: "open" | "closed"
  repo?: string
  /** ISO month, used for chronological sorting (newest first). */
  start: string
  /** ISO month, or `null` while still in progress. Omit for single-month projects. */
  end?: string | null
  tagline: Localized
  description: Localized
  /** Extra bullet points, only shown on the featured card. */
  highlights?: Localized[]
  /** Small badge such as an award. */
  badge?: Localized
  /** Keys from `src/lib/tech.ts`. */
  tags: string[]
  media: ProjectMedia[]
}

export const projects: Project[] = [
  {
    slug: "lead-chat-app",
    name: "Lead Chat App",
    workingTitle: true,
    featured: true,
    source: "closed",
    start: "2026-09",
    end: null,
    badge: { en: "deployed · private beta", es: "desplegado · beta privada" },
    tagline: {
      en: "AI sales assistant for real-estate agents.",
      es: "Asistente de ventas con IA para agentes inmobiliarios.",
    },
    description: {
      en: "A multi-tenant AI sales chatbot for real-estate salespeople. It answers customers on Facebook Messenger and Instagram from the salesperson's own inventory, qualifies leads and hands the conversation to a human when a visit is requested. The tool-calling agent never writes SQL or sees secrets: every action goes through Zod-validated tools over a PostgreSQL schema with row-level security. Includes an admin console, prepaid AI credits and 305 automated tests. Deployed to production on Vercel and now in a private beta with a small group of invited users, with every conversation traced and evaluated in Langfuse.",
      es: "Chatbot de ventas con IA, multi-tenant, para vendedores inmobiliarios. Responde a clientes en Facebook Messenger e Instagram con el inventario propio del vendedor, califica prospectos y pasa la conversación a una persona cuando el cliente pide una visita. El agente nunca escribe SQL ni ve secretos: cada acción pasa por herramientas validadas con Zod sobre un esquema PostgreSQL con row-level security. Incluye consola de administración, créditos de IA prepagados y 305 pruebas automatizadas. Desplegado en producción en Vercel y ya en beta privada con un grupo pequeño de usuarios invitados; cada conversación se traza y evalúa en Langfuse.",
    },
    highlights: [
      {
        en: "LLM → typed tool → Zod → query layer. The model chooses among actions; it never writes SQL.",
        es: "LLM → herramienta tipada → Zod → capa de consultas. El modelo elige acciones; nunca escribe SQL.",
      },
      {
        en: "Observability in Langfuse via OpenTelemetry: per-session traces of every model and tool call, datasets and experiments, and LLM-as-a-judge scores calibrated against human review.",
        es: "Observabilidad en Langfuse con OpenTelemetry: trazas por sesión de cada llamada al modelo y a herramientas, datasets y experimentos, y evaluaciones LLM-as-a-judge calibradas con revisión humana.",
      },
      {
        en: "Signed Meta webhooks acknowledged in under 5 s, with idempotent retries keyed on message id.",
        es: "Webhooks de Meta firmados, respondidos en menos de 5 s, con reintentos idempotentes por id de mensaje.",
      },
      {
        en: "Usage metered in nano-USD on an append-only, trigger-protected ledger; Stripe top-ups credited exactly once (test mode).",
        es: "Consumo medido en nano-USD en un libro contable append-only protegido con triggers; recargas de Stripe acreditadas una sola vez (modo prueba).",
      },
      {
        en: "305 Vitest tests running real migrations on PGlite, plus Playwright on desktop, iPhone and Android.",
        es: "305 pruebas en Vitest sobre migraciones reales en PGlite, y Playwright en escritorio, iPhone y Android.",
      },
    ],
    tags: [
      "typescript",
      "nextjs",
      "ai-sdk",
      "openai",
      "langfuse",
      "postgres",
      "supabase",
      "drizzle",
      "stripe",
      "meta",
      "vitest",
      "playwright",
    ],
    media: [
      {
        type: "video",
        src: "/projects/lead-chat-app/bot-in-action.mp4",
        poster: "/projects/lead-chat-app/bot-in-action.jpg",
        alt: {
          en: "Test chat: a customer asks for houses in Boca del Río; the bot searches the inventory, replies with listings and updates the lead's details live in the side panel.",
          es: "Chat de prueba: un cliente pide casas en Boca del Río; el bot consulta el inventario, responde con propiedades y actualiza en vivo los datos del prospecto en el panel lateral.",
        },
        caption: { en: "demo · bot in action", es: "demo · el bot en acción" },
      },
      {
        type: "image",
        src: "/projects/lead-chat-app/langfuse-trace.png",
        fit: "contain",
        alt: {
          en: "Langfuse trace of one chatbot turn: agent steps with model calls and the saveLeadInfo and requestHandoff tool calls, with latency, tokens and cost.",
          es: "Traza en Langfuse de un turno del chatbot: pasos del agente con llamadas al modelo y a las herramientas saveLeadInfo y requestHandoff, con latencia, tokens y costo.",
        },
        caption: { en: "observability · Langfuse trace", es: "observabilidad · traza en Langfuse" },
      },
      {
        type: "image",
        src: "/projects/lead-chat-app/message-flow.svg",
        fit: "contain",
        alt: {
          en: "Diagram: a Meta webhook reaches the API, which plans the turn, checks credits, runs the agent with typed tools over Postgres, and replies through the Send API.",
          es: "Diagrama: un webhook de Meta llega a la API, que planifica el turno, verifica créditos, ejecuta el agente con herramientas tipadas sobre Postgres y responde por la Send API.",
        },
        caption: { en: "architecture · message flow", es: "arquitectura · flujo de mensajes" },
      },
      {
        type: "image",
        src: "/projects/lead-chat-app/credits-ledger.svg",
        fit: "contain",
        alt: {
          en: "Diagram: model usage is metered per run and written to an append-only ledger together with Stripe top-ups.",
          es: "Diagrama: el uso del modelo se mide por ejecución y se escribe en un libro contable append-only junto con las recargas de Stripe.",
        },
        caption: { en: "architecture · AI credits ledger", es: "arquitectura · libro de créditos de IA" },
      },
    ],
  },
  {
    slug: "ironsmith",
    name: "Ironsmith",
    source: "open",
    repo: "https://github.com/ericksolisz/gym-membership-management-system",
    start: "2026-07",
    tagline: {
      en: "Event-driven gym membership platform.",
      es: "Plataforma de membresías de gimnasio orientada a eventos.",
    },
    description: {
      en: "A portfolio architecture project: five Spring Boot services behind a JWT-validating Spring Cloud Gateway. New members are stored over REST, billing accounts open through a synchronous gRPC contract, and lifecycle events reach analytics over Kafka. Each stateful service owns its own PostgreSQL database. AWS infrastructure (VPC, RDS, MSK, ECS Fargate, ALB) is written in Java AWS CDK and exercised locally with LocalStack. Vue 3 admin console and 41 automated tests.",
      es: "Proyecto de arquitectura para portafolio: cinco servicios Spring Boot detrás de un Spring Cloud Gateway que valida JWT. Los miembros se guardan vía REST, las cuentas de facturación se abren con un contrato gRPC síncrono y los eventos de ciclo de vida llegan a analítica por Kafka. Cada servicio con estado tiene su propia base PostgreSQL. La infraestructura AWS (VPC, RDS, MSK, ECS Fargate, ALB) está escrita en AWS CDK con Java y se ejecuta localmente con LocalStack. Consola de administración en Vue 3 y 41 pruebas automatizadas.",
    },
    tags: ["java", "spring-boot", "kafka", "grpc", "postgres", "aws-cdk", "docker", "vue"],
    media: [
      {
        type: "video",
        src: "/projects/ironsmith/live-microservices.mp4",
        poster: "/projects/ironsmith/live-microservices.jpg",
        fit: "contain",
        alt: {
          en: "Creating a member in the Vue console while the service logs show the gRPC call to billing and the Kafka event consumed by analytics.",
          es: "Creación de un miembro en la consola Vue mientras los logs muestran la llamada gRPC a billing y el evento de Kafka consumido por analytics.",
        },
        caption: { en: "demo · services live", es: "demo · servicios en vivo" },
      },
      {
        type: "image",
        src: "/projects/ironsmith/architecture.svg",
        fit: "contain",
        alt: {
          en: "Diagram: the Vue console calls the gateway, which routes to auth and member services; member-service calls billing over gRPC and publishes to analytics over Kafka.",
          es: "Diagrama: la consola Vue llama al gateway, que enruta a los servicios de auth y miembros; member-service llama a billing por gRPC y publica a analytics por Kafka.",
        },
        caption: { en: "architecture · services", es: "arquitectura · servicios" },
      },
    ],
  },
  {
    slug: "task-management-system",
    name: "Task Management System",
    source: "open",
    repo: "https://github.com/ericksolisz/task-management-system",
    start: "2026-06",
    end: "2026-07",
    tagline: {
      en: "Stateless task API with JWT authentication.",
      es: "API de tareas sin estado con autenticación JWT.",
    },
    description: {
      en: "A layered Spring Boot 4 monolith with nine REST endpoints for registration, tasks, assignment, status changes and comments. HTTP Basic credentials are exchanged for RSA-2048-signed JWTs validated by Spring Security's OAuth2 Resource Server, with no server-side sessions. Authorization lives in the service layer (only authors assign; authors or assignees change status), and Java records keep entities and password hashes out of every response.",
      es: "Monolito por capas en Spring Boot 4 con nueve endpoints REST para registro, tareas, asignación, cambios de estado y comentarios. Las credenciales HTTP Basic se intercambian por JWT firmados con RSA-2048 y validados por el OAuth2 Resource Server de Spring Security, sin sesiones en el servidor. La autorización vive en la capa de servicio (solo el autor asigna; autor o asignado cambian el estado) y los records de Java evitan que entidades y hashes de contraseñas lleguen a una respuesta.",
    },
    tags: ["java", "spring-boot", "spring-security", "jwt", "h2"],
    media: [
      {
        type: "image",
        src: "/projects/task-management-system/auth-flow.svg",
        fit: "contain",
        alt: {
          en: "Diagram: the client exchanges Basic credentials for a signed JWT, then calls task endpoints with a bearer token validated by Spring Security.",
          es: "Diagrama: el cliente intercambia credenciales Basic por un JWT firmado y luego llama a los endpoints de tareas con un bearer token validado por Spring Security.",
        },
        caption: { en: "architecture · auth flow", es: "arquitectura · flujo de autenticación" },
      },
    ],
  },
  {
    slug: "trusty-web",
    name: "Trusty-Web",
    source: "open",
    repo: "https://github.com/DaWaildHorse/TrustyWeb",
    start: "2024-06",
    badge: { en: "3rd place · hackathon", es: "3.er lugar · hackathon" },
    tagline: {
      en: "AI source-credibility browser extension.",
      es: "Extensión de navegador que evalúa la credibilidad de fuentes con IA.",
    },
    description: {
      en: "A Chrome extension that estimates how trustworthy a web page is. A content script collects the page text, selected text and metadata; the extension weighs signals such as author, references, date and domain, and a prompt-based OpenAI classifier returns the evaluation inline. Team hackathon project that placed third; I owned the OpenAI integration and the analysis logic.",
      es: "Extensión de Chrome que estima qué tan confiable es una página web. Un content script recopila el texto de la página, el texto seleccionado y los metadatos; la extensión pondera señales como autor, referencias, fecha y dominio, y un clasificador basado en prompts de OpenAI muestra la evaluación en la misma página. Proyecto de equipo que obtuvo el tercer lugar en un hackathon; yo me encargué de la integración con OpenAI y la lógica de análisis.",
    },
    tags: ["react", "typescript", "vite", "openai", "chrome-extension"],
    media: [
      {
        type: "video",
        src: "/projects/trusty-web/web-check.mp4",
        poster: "/projects/trusty-web/web-check.jpg",
        alt: {
          en: "The extension checks AP News, then flags The Onion as an unreliable satire site.",
          es: "La extensión revisa AP News y luego marca The Onion como un sitio satírico no confiable.",
        },
        caption: { en: "demo · page check", es: "demo · revisión de página" },
      },
      {
        type: "video",
        src: "/projects/trusty-web/fact-check.mp4",
        poster: "/projects/trusty-web/fact-check.jpg",
        alt: {
          en: "Selecting paragraphs of a news article and fact-checking them; the extension returns supporting sources.",
          es: "Selección de párrafos de una noticia para verificarlos; la extensión devuelve fuentes que los respaldan.",
        },
        caption: { en: "demo · fact-check a passage", es: "demo · verificar un pasaje" },
      },
      {
        type: "image",
        src: "/projects/trusty-web/flow.svg",
        fit: "contain",
        alt: {
          en: "Diagram: a content script extracts page signals, the extension sends them to OpenAI, and the trust evaluation is shown in the popup.",
          es: "Diagrama: un content script extrae señales de la página, la extensión las envía a OpenAI y la evaluación se muestra en el popup.",
        },
        caption: { en: "architecture · evaluation flow", es: "arquitectura · flujo de evaluación" },
      },
    ],
  },
  // Fifth project: not chosen yet. Add it here when decided.
]

/** Featured project first, then the rest newest first. */
export function sortedProjects(list: Project[] = projects): Project[] {
  return [...list].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return b.start.localeCompare(a.start)
  })
}
