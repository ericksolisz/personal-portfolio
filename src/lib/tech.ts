/** Display label and tag color for each technology, tuned for the dark background. */
export const tech: Record<string, { label: string; color: string }> = {
  typescript: { label: "typescript", color: "#6aa6ff" },
  javascript: { label: "javascript", color: "#f0db4f" },
  nextjs: { label: "next.js", color: "#e6e6e6" },
  react: { label: "react", color: "#61dafb" },
  vite: { label: "vite", color: "#b18cff" },
  vue: { label: "vue", color: "#42b883" },
  "ai-sdk": { label: "ai sdk", color: "#d4d4d4" },
  openai: { label: "openai", color: "#3fc79f" },
  langfuse: { label: "langfuse", color: "#f07ca8" },
  postgres: { label: "postgres", color: "#7aa7e0" },
  supabase: { label: "supabase", color: "#3ecf8e" },
  drizzle: { label: "drizzle", color: "#c5f74f" },
  stripe: { label: "stripe", color: "#9b93ff" },
  meta: { label: "meta api", color: "#5b9bff" },
  vitest: { label: "vitest", color: "#fcc72b" },
  playwright: { label: "playwright", color: "#5cc962" },
  java: { label: "java", color: "#f89820" },
  "spring-boot": { label: "spring boot", color: "#7cc24e" },
  "spring-security": { label: "spring security", color: "#9ad36a" },
  kafka: { label: "kafka", color: "#ff9e6b" },
  grpc: { label: "grpc", color: "#4fc6c6" },
  "aws-cdk": { label: "aws cdk", color: "#ffad33" },
  docker: { label: "docker", color: "#4aa8f5" },
  jwt: { label: "jwt", color: "#e077ff" },
  h2: { label: "h2", color: "#9fb6cf" },
  "chrome-extension": { label: "chrome extension", color: "#ffd04a" },
}

export function getTech(key: string) {
  return tech[key] ?? { label: key, color: "#b3aa9c" }
}
