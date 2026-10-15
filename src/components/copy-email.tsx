"use client"

import { useEffect, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { site } from "@/content/site"

const { user, domain, tld } = site.email

/** Shows the address in "[at] (dot)" form and copies the real one on tap. */
export function CopyEmail({
  copyLabel,
  copiedLabel,
  className,
}: {
  copyLabel: string
  copiedLabel: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  async function copy() {
    const address = `${user}@${domain}.${tld}`
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
    } catch {
      // Clipboard can be blocked (old browsers, insecure context): fall back to the mail app.
      window.location.href = `mailto:${address}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copyLabel}
      className={cn(
        "group inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-sm text-left underline-offset-4 hover:underline",
        className
      )}
    >
      <span>
        {user} [at] {domain} (dot) {tld}
      </span>
      <span className="inline-flex items-center gap-1 text-xs font-normal text-muted-foreground no-underline group-hover:text-foreground">
        {copied ? <CheckIcon className="size-3.5 text-primary" /> : <CopyIcon className="size-3.5" />}
        <span aria-live="polite">{copied ? copiedLabel : ""}</span>
      </span>
    </button>
  )
}
