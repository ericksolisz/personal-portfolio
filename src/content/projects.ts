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
    badge: { en: "deployed - private beta", es: "desplegado - beta privada" },
    tagline: {
      en: "AI sales assistant for real-estate agents.",
      es: "Asistente de ventas con IA para agentes inmobiliarios.",
    },
    description: {
      en: "A multi-tenant AI sales chatbot I'm building for real-estate salespeople. It answers customers on Facebook Messenger and Instagram using the seller's own listings, qualifies leads, and hands the chat to a human when someone wants a visit. The model never writes SQL. It doesn't see secrets either: every action goes through Zod-validated tools over a PostgreSQL schema with row-level security. There's also an admin console, prepaid AI credits and 305 automated tests. It's live on Vercel in a private beta with a small group of invited users. I trace and evaluate every conversation in Langfuse.",
      es: "Chatbot de ventas con IA, multi-tenant, que estoy construyendo para vendedores inmobiliarios. Atiende a los clientes en Facebook Messenger e Instagram con el inventario del propio vendedor, califica prospectos y le pasa la conversación a una persona cuando alguien quiere una visita. El modelo no escribe SQL. Tampoco ve secretos: cada acción pasa por herramientas validadas con Zod sobre un esquema PostgreSQL con row-level security. Tiene consola de administración, créditos de IA prepagados y 305 pruebas automatizadas. Ya está en producción en Vercel, en beta privada con un grupo pequeño de usuarios invitados. Trazo y evalúo cada conversación en Langfuse.",
    },
    highlights: [
      {
        en: "LLM -> typed tool -> Zod -> query layer. The model picks an action. It doesn't write SQL.",
        es: "LLM -> herramienta tipada -> Zod -> capa de consultas. El modelo elige una acción. No escribe SQL.",
      },
      {
        en: "I watch it in Langfuse through OpenTelemetry: per-session traces of every model and tool call, datasets, experiments, and LLM-as-a-judge scores I calibrate against human review.",
        es: "Lo monitoreo en Langfuse con OpenTelemetry: trazas por sesión de cada llamada al modelo y a herramientas, datasets, experimentos y evaluaciones LLM-as-a-judge que calibro con revisión humana.",
      },
      {
        en: "Signed Meta webhooks get a 200 in under 5 s, and a retried message isn't answered twice: it's keyed on the message id.",
        es: "Los webhooks firmados de Meta reciben un 200 en menos de 5 s, y un mensaje reintentado no se responde dos veces: se identifica por su id.",
      },
      {
        en: "I meter usage in nano-USD on an append-only ledger that database triggers protect. Stripe top-ups get credited exactly once (test mode).",
        es: "Mido el consumo en nano-USD en un libro contable append-only que protegen triggers de la base de datos. Las recargas de Stripe se acreditan una sola vez (modo prueba).",
      },
      {
        en: "There are 305 Vitest tests, and they run every real migration on PGlite. Playwright covers desktop, iPhone and Android.",
        es: "Son 305 pruebas en Vitest, y corren cada migración real sobre PGlite. Playwright cubre escritorio, iPhone y Android.",
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
          en: "Test chat. A customer asks for houses in Boca del Río; the bot searches the inventory, replies with listings and fills in the lead's details live in the side panel.",
          es: "Chat de prueba. Un cliente pide casas en Boca del Río; el bot busca en el inventario, responde con propiedades y llena en vivo los datos del prospecto en el panel lateral.",
        },
        caption: { en: "demo - bot in action", es: "demo - el bot en acción" },
      },
      {
        type: "image",
        src: "/projects/lead-chat-app/langfuse-trace.png",
        fit: "contain",
        alt: {
          en: "One chatbot turn in Langfuse. You can see each model call, the saveLeadInfo and requestHandoff tool calls, and the latency, tokens and cost of the whole run.",
          es: "Un turno del chatbot en Langfuse. Se ve cada llamada al modelo, las herramientas saveLeadInfo y requestHandoff, y la latencia, los tokens y el costo de toda la ejecución.",
        },
        caption: { en: "observability - Langfuse trace", es: "observabilidad - traza en Langfuse" },
      },
      {
        type: "image",
        src: "/projects/lead-chat-app/message-flow.svg",
        fit: "contain",
        alt: {
          en: "Diagram: a Meta webhook hits the API, which plans the turn, checks credits, runs the agent with typed tools over Postgres and replies through the Send API.",
          es: "Diagrama: un webhook de Meta llega a la API, que planifica el turno, revisa créditos, corre el agente con herramientas tipadas sobre Postgres y responde por la Send API.",
        },
        caption: { en: "architecture - message flow", es: "arquitectura - flujo de mensajes" },
      },
      {
        type: "image",
        src: "/projects/lead-chat-app/credits-ledger.svg",
        fit: "contain",
        alt: {
          en: "Diagram: each run's model usage is metered and written to an append-only ledger, next to Stripe top-ups.",
          es: "Diagrama: el uso del modelo en cada ejecución se mide y se escribe en un libro contable append-only, junto a las recargas de Stripe.",
        },
        caption: { en: "architecture - AI credits ledger", es: "arquitectura - libro de créditos de IA" },
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
      en: "A portfolio architecture project I built to practice microservices end to end. Five Spring Boot services sit behind a Spring Cloud Gateway that checks JWTs. Members come in over REST, billing accounts open through a synchronous gRPC call, and lifecycle events reach analytics over Kafka. Every stateful service owns its PostgreSQL database. I wrote the AWS side (VPC, RDS, MSK, ECS Fargate, ALB) in Java CDK and ran it locally with LocalStack. It's got a Vue 3 admin console and 41 automated tests.",
      es: "Proyecto de arquitectura para portafolio que construí para practicar microservicios de punta a punta. Cinco servicios Spring Boot están detrás de un Spring Cloud Gateway que valida JWT. Los miembros entran por REST, las cuentas de facturación se abren con una llamada gRPC síncrona y los eventos de ciclo de vida llegan a analítica por Kafka. Cada servicio con estado tiene su propia base PostgreSQL. Escribí la parte de AWS (VPC, RDS, MSK, ECS Fargate, ALB) con CDK en Java y la corrí en local con LocalStack. Incluye una consola en Vue 3 y 41 pruebas automatizadas.",
    },
    tags: ["java", "spring-boot", "kafka", "grpc", "postgres", "aws-cdk", "docker", "vue"],
    media: [
      {
        type: "video",
        src: "/projects/ironsmith/live-microservices.mp4",
        poster: "/projects/ironsmith/live-microservices.jpg",
        fit: "contain",
        alt: {
          en: "A new member, created live. On the right, the service logs show the gRPC call to billing and then the Kafka event that analytics consumes.",
          es: "Un miembro nuevo, creado en vivo. A la derecha, los logs de los servicios muestran la llamada gRPC a billing y luego el evento de Kafka que consume analytics.",
        },
        caption: { en: "demo - services live", es: "demo - servicios en vivo" },
      },
      {
        type: "image",
        src: "/projects/ironsmith/architecture.svg",
        fit: "contain",
        alt: {
          en: "Diagram: the Vue console calls the gateway, which routes to the auth and member services. member-service calls billing over gRPC and publishes to analytics over Kafka.",
          es: "Diagrama: la consola Vue llama al gateway, que enruta a los servicios de auth y miembros. member-service llama a billing por gRPC y publica a analytics por Kafka.",
        },
        caption: { en: "architecture - services", es: "arquitectura - servicios" },
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
      en: "I built a layered Spring Boot 4 monolith with nine REST endpoints: registration, tasks, assignment, status changes and comments. You trade HTTP Basic credentials for an RSA-2048-signed JWT, which Spring Security's OAuth2 Resource Server validates. There are no server sessions. Authorization lives in the service layer, so only authors assign and only authors or assignees change status. Java records keep entities and password hashes out of every response, so a hash can't leak by accident.",
      es: "Construí un monolito por capas en Spring Boot 4 con nueve endpoints REST: registro, tareas, asignación, cambios de estado y comentarios. Las credenciales HTTP Basic se cambian por un JWT firmado con RSA-2048, que valida el OAuth2 Resource Server de Spring Security. Sin sesiones en el servidor. La autorización vive en la capa de servicio: solo el autor asigna, y solo el autor o el asignado cambian el estado. Los records de Java evitan que entidades y hashes de contraseñas lleguen a una respuesta, así que un hash no se puede filtrar por accidente.",
    },
    tags: ["java", "spring-boot", "spring-security", "jwt", "h2"],
    media: [
      {
        type: "image",
        src: "/projects/task-management-system/auth-flow.svg",
        fit: "contain",
        alt: {
          en: "Diagram: the client trades Basic credentials for a signed JWT, then calls the task endpoints with a bearer token that Spring Security validates.",
          es: "Diagrama: el cliente cambia credenciales Basic por un JWT firmado y luego llama a los endpoints de tareas con un bearer token que valida Spring Security.",
        },
        caption: { en: "architecture - auth flow", es: "arquitectura - flujo de autenticación" },
      },
    ],
  },
  {
    slug: "trusty-web",
    name: "Trusty-Web",
    source: "open",
    repo: "https://github.com/DaWaildHorse/TrustyWeb",
    start: "2024-06",
    badge: { en: "3rd place - hackathon", es: "3.er lugar - hackathon" },
    tagline: {
      en: "AI source-credibility browser extension.",
      es: "Extensión de navegador que evalúa la credibilidad de fuentes con IA.",
    },
    description: {
      en: "A Chrome extension that tells you how far to trust a web page. A content script grabs the page text, your selection and the metadata. The extension weighs author, references, date and domain, and a prompt-based OpenAI classifier shows its verdict right on the page. We built it as a team for a hackathon. It placed third. I owned the OpenAI integration and the analysis logic.",
      es: "Extensión de Chrome que te dice qué tanto confiar en una página web. Un content script toma el texto de la página, lo que seleccionaste y los metadatos. La extensión pondera autor, referencias, fecha y dominio, y un clasificador de OpenAI basado en prompts muestra el veredicto en la misma página. La hicimos en equipo para un hackathon. Quedó en tercer lugar. Yo me encargué de la integración con OpenAI y de la lógica de análisis.",
    },
    tags: ["react", "typescript", "vite", "openai", "chrome-extension"],
    media: [
      {
        type: "video",
        src: "/projects/trusty-web/web-check.mp4",
        poster: "/projects/trusty-web/web-check.jpg",
        alt: {
          en: "AP News checks out. The Onion gets flagged as an unreliable satire site.",
          es: "AP News sale confiable. The Onion queda marcado como sitio satírico no confiable.",
        },
        caption: { en: "demo - page check", es: "demo - revisión de página" },
      },
      {
        type: "video",
        src: "/projects/trusty-web/fact-check.mp4",
        poster: "/projects/trusty-web/fact-check.jpg",
        alt: {
          en: "Fact-checking a few paragraphs of a news story. The extension finds sources that back them up.",
          es: "Verificación de unos párrafos de una noticia. La extensión encuentra fuentes que los respaldan.",
        },
        caption: { en: "demo - fact-check a passage", es: "demo - verificar un pasaje" },
      },
      {
        type: "image",
        src: "/projects/trusty-web/flow.svg",
        fit: "contain",
        alt: {
          en: "Diagram: a content script pulls signals from the page, the extension sends them to OpenAI and the popup shows the verdict.",
          es: "Diagrama: un content script saca señales de la página, la extensión las manda a OpenAI y el popup muestra el veredicto.",
        },
        caption: { en: "architecture - evaluation flow", es: "arquitectura - flujo de evaluación" },
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
