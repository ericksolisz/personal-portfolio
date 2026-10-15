import { Badge } from "@/components/ui/badge"
import { getTech } from "@/lib/tech"

export function TechTag({ id }: { id: string }) {
  const { label, color } = getTech(id)

  return (
    <Badge
      variant="outline"
      className="h-6 rounded-md px-2 font-mono text-[11px] font-normal"
      style={{
        color,
        borderColor: `color-mix(in oklch, ${color} 35%, transparent)`,
        backgroundColor: `color-mix(in oklch, ${color} 9%, transparent)`,
      }}
    >
      {label}
    </Badge>
  )
}
