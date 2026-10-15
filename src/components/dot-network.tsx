"use client"

import { useEffect, useRef } from "react"

const ACCENT = "242, 169, 59" // amber, matches --primary
const LINK_DISTANCE = 120
const SPEED = 0.22

type Point = { x: number; y: number; vx: number; vy: number; r: number }

/**
 * Slowly drifting dots joined by faint lines when they come close.
 * Pauses off screen and in background tabs; draws one still frame
 * when the user prefers reduced motion.
 */
export function DotNetwork({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = 0
    let height = 0
    let points: Point[] = []
    let frame = 0
    let running = false
    let onScreen = true

    function seed() {
      // Fewer dots on phones keeps it light and less busy.
      const count = Math.round(Math.min(110, Math.max(26, (width * height) / 11000)))
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
        r: Math.random() * 1.1 + 0.7,
      }))
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const widthChanged = Math.abs(rect.width - width) > 1
      width = rect.width
      height = rect.height
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (widthChanged || points.length === 0) seed()
      draw()
    }

    function step() {
      for (const p of points) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)
      ctx!.lineWidth = 0.6
      for (let i = 0; i < points.length; i++) {
        const a = points[i]
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist > LINK_DISTANCE) continue
          ctx!.strokeStyle = `rgba(${ACCENT}, ${(1 - dist / LINK_DISTANCE) * 0.32})`
          ctx!.beginPath()
          ctx!.moveTo(a.x, a.y)
          ctx!.lineTo(b.x, b.y)
          ctx!.stroke()
        }
      }
      ctx!.fillStyle = `rgba(${ACCENT}, 0.75)`
      for (const p of points) {
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function loop() {
      step()
      draw()
      frame = requestAnimationFrame(loop)
    }

    function start() {
      if (running || reduceMotion) return
      running = true
      frame = requestAnimationFrame(loop)
    }

    function stop() {
      running = false
      cancelAnimationFrame(frame)
    }

    function sync() {
      if (onScreen && !document.hidden) start()
      else stop()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      sync()
    })
    visibilityObserver.observe(canvas)
    document.addEventListener("visibilitychange", sync)

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener("visibilitychange", sync)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
