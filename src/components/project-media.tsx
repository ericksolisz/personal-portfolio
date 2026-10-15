"use client"

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

type Fit = "cover" | "contain"

export type Slide =
  | { type: "image"; src: string; alt: string; caption?: string; duration?: number; fit?: Fit }
  | { type: "video"; src: string; webm?: string; poster?: string; alt: string; caption?: string; fit?: Fit }

type Labels = { goToSlide: string; previous: string; next: string; mediaSoon: string }

const IMAGE_DURATION = 4500

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"
function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(reducedMotionQuery)
  mql.addEventListener("change", onChange)
  return () => mql.removeEventListener("change", onChange)
}
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false
  )
}

/**
 * Auto-advancing slideshow of images and short clips.
 *
 * - Images stay for `duration` ms; clips advance when they end.
 * - Only the visible slide plays, and only while the card is on screen.
 * - Pauses while hovered or focused; swipe on touch, arrows on desktop.
 * - With reduced motion: no auto-advance, clips show native controls.
 */
export function ProjectMedia({
  slides,
  title,
  labels,
  sizes,
  preloadFirst = false,
}: {
  slides: Slide[]
  title: string
  labels: Labels
  sizes: string
  preloadFirst?: boolean
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [api, setApi] = useState<CarouselApi>()
  const [index, setIndex] = useState(0)
  const [inView, setInView] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const multiple = slides.length > 1
  const autoplay = multiple && inView && !hovered && !focused && !reducedMotion
  const autoplayRef = useRef(autoplay)
  useEffect(() => {
    autoplayRef.current = autoplay
  }, [autoplay])

  useEffect(() => {
    if (!api) return
    const onSelect = () => setIndex(api.selectedScrollSnap())
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Play only the selected clip while visible; rewind the others.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return
      if (i === index && inView && !reducedMotion) {
        video.play().catch(() => {
          // Autoplay refused (e.g. iOS Low Power Mode): the poster stays visible.
        })
      } else {
        video.pause()
        if (i !== index) video.currentTime = 0
      }
    })
  }, [index, inView, reducedMotion])

  // Timer for image slides. Clips advance from their `ended` event instead.
  const current = slides[index]
  useEffect(() => {
    if (!autoplay || !api || current?.type !== "image") return
    const id = setTimeout(() => api.scrollNext(), current.duration ?? IMAGE_DURATION)
    return () => clearTimeout(id)
  }, [autoplay, api, current, index])

  const onVideoEnded = useCallback(
    (video: HTMLVideoElement) => {
      if (autoplayRef.current && api) api.scrollNext()
      else video.play().catch(() => {}) // Paused on hover/focus: keep looping in place.
    },
    [api]
  )

  if (slides.length === 0) {
    return (
      <div className="relative flex aspect-video flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border bg-[radial-gradient(oklch(0.8_0.155_72/18%)_1px,transparent_1px)] [background-size:14px_14px]">
        <span className="text-lg font-bold">{title}</span>
        <span className="text-xs text-muted-foreground">{labels.mediaSoon}</span>
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className="group/media"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
      }}
    >
      <div className="relative">
        <Carousel
          setApi={setApi}
          opts={{ loop: multiple, watchDrag: multiple }}
          aria-label={title}
          className="overflow-hidden rounded-lg border bg-[oklch(0.13_0.006_70)]"
        >
          <CarouselContent className="ml-0">
            {slides.map((slide, i) => (
              <CarouselItem
                key={slide.src}
                className="pl-0"
                aria-label={`${i + 1} / ${slides.length}`}
              >
                <div
                  className={cn(
                    "relative aspect-video",
                    slide.fit === "contain" &&
                      "bg-[radial-gradient(oklch(0.8_0.155_72/10%)_1px,transparent_1px)] [background-size:16px_16px]"
                  )}
                >
                  {slide.type === "image" ? (
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes={sizes}
                      preload={preloadFirst && i === 0}
                      unoptimized={slide.src.endsWith(".svg")}
                      draggable={false}
                      className={cn(
                        "select-none",
                        slide.fit === "contain" ? "object-contain p-2 sm:p-3" : "object-cover"
                      )}
                    />
                  ) : (
                    <video
                      ref={(el) => {
                        videoRefs.current[i] = el
                      }}
                      // muted + playsInline are what allow inline autoplay on iPhone.
                      muted
                      playsInline
                      loop={!multiple}
                      preload={i === 0 ? "metadata" : "none"}
                      poster={slide.poster}
                      controls={reducedMotion}
                      disablePictureInPicture
                      disableRemotePlayback
                      aria-label={slide.alt}
                      onEnded={(e) => onVideoEnded(e.currentTarget)}
                      className={cn(
                        "absolute inset-0 size-full",
                        slide.fit === "contain" ? "object-contain" : "object-cover"
                      )}
                    >
                      {slide.webm && <source src={slide.webm} type="video/webm" />}
                      <source src={slide.src} type="video/mp4" />
                    </video>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {multiple && (
          <>
            {/* Arrows: desktop only, shown on hover or keyboard focus. Touch users swipe. */}
            {(["previous", "next"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                aria-label={labels[dir]}
                onClick={() => (dir === "previous" ? api?.scrollPrev() : api?.scrollNext())}
                className={cn(
                  "absolute top-1/2 hidden size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border bg-background/80 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover/media:opacity-100 focus-visible:opacity-100 pointer-fine:inline-flex",
                  dir === "previous" ? "left-2" : "right-2"
                )}
              >
                {dir === "previous" ? <ChevronLeftIcon className="size-4" /> : <ChevronRightIcon className="size-4" />}
              </button>
            ))}
          </>
        )}
      </div>

      {(current?.caption || multiple) && (
        <div className="mt-1 flex min-h-7 items-center justify-between gap-3">
          <span className="truncate text-[11px] text-muted-foreground">{current?.caption}</span>
          {multiple && (
            <div className="-mr-2 flex shrink-0">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`${labels.goToSlide} ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => api?.scrollTo(i)}
                  // 28px hit area around a small visible dot.
                  className="flex size-7 cursor-pointer items-center justify-center"
                >
                  <span
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-4 bg-primary" : "w-1.5 bg-foreground/40"
                    )}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
