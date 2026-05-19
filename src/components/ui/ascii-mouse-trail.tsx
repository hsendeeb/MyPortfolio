"use client"

import { createPortal } from "react-dom"
import { useEffect, useRef, useState } from "react"

type TrailParticle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  char: string
  hue: number
}

type AsciiMouseTrailProps = {
  className?: string
  enabled?: boolean
}

const ASCII_CHARS = ["@", "#", "$", "%", "&", "8", "B", "M", "W", "*", "+", "=", ":", ".", ","]

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function AsciiMouseTrail({ className, enabled = true }: AsciiMouseTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const pointerRef = useRef({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    isActive: false,
    hasMoved: false,
  })
  const particlesRef = useRef<TrailParticle[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reducedMotion.matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = "600 14px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
    }

    const spawnParticle = (x: number, y: number, velocityX: number, velocityY: number, strength: number) => {
      const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY)
      const hue = clamp(205 + speed * 2.5, 195, 235)
      const charIndex = Math.min(
        ASCII_CHARS.length - 1,
        Math.floor((strength + Math.random() * 0.45) * (ASCII_CHARS.length - 1))
      )

      particlesRef.current.push({
        x,
        y,
        vx: velocityX + (Math.random() - 0.5) * 0.55,
        vy: velocityY + (Math.random() - 0.5) * 0.55,
        life: 1,
        maxLife: 42 + Math.random() * 26,
        size: 11 + Math.random() * 8,
        char: ASCII_CHARS[charIndex],
        hue,
      })
    }

    const emitTrail = (fromX: number, fromY: number, toX: number, toY: number) => {
      const dx = toX - fromX
      const dy = toY - fromY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const steps = Math.max(1, Math.floor(distance / 12))

      for (let i = 0; i <= steps; i += 1) {
        const progress = i / Math.max(steps, 1)
        const x = fromX + dx * progress
        const y = fromY + dy * progress
        const tangentX = dx * 0.018
        const tangentY = dy * 0.018
        spawnParticle(x, y, tangentX, tangentY, progress)
      }
    }

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      const particles = particlesRef.current
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]
        particle.life += 1
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.965
        particle.vy *= 0.965
        particle.vy += 0.01

        const alpha = 1 - particle.life / particle.maxLife
        if (alpha <= 0) {
          particles.splice(index, 1)
          continue
        }

        const wobble = Math.sin((particle.life + index) * 0.12) * 0.65
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate(wobble * 0.1)
        ctx.globalAlpha = alpha * 0.9
        ctx.shadowBlur = 16
        ctx.shadowColor = `hsla(${particle.hue}, 90%, 64%, ${alpha})`
        ctx.fillStyle = `hsla(${particle.hue}, 92%, 68%, ${alpha})`
        ctx.font = `${particle.size}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
        ctx.fillText(particle.char, 0, 0)
        ctx.restore()
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const pointer = pointerRef.current
      const nextX = event.clientX
      const nextY = event.clientY

      if (!pointer.hasMoved) {
        pointer.lastX = nextX
        pointer.lastY = nextY
        pointer.hasMoved = true
      }

      pointer.x = nextX
      pointer.y = nextY
      pointer.isActive = true

      emitTrail(pointer.lastX, pointer.lastY, nextX, nextY)
      pointer.lastX = nextX
      pointer.lastY = nextY
    }

    const handlePointerLeave = () => {
      pointerRef.current.isActive = false
    }

    const handlePointerDown = (event: PointerEvent) => {
      pointerRef.current.x = event.clientX
      pointerRef.current.y = event.clientY
      pointerRef.current.lastX = event.clientX
      pointerRef.current.lastY = event.clientY
      pointerRef.current.isActive = true
      emitTrail(event.clientX, event.clientY, event.clientX, event.clientY)
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerdown", handlePointerDown, { passive: true })
    window.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("pointerleave", handlePointerLeave)

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [enabled])

  if (!enabled || !mounted) return null

  return createPortal(
    <div
      className={className}
      aria-hidden="true"
      style={{
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          pointerEvents: "none",
        }}
      />
    </div>,
    document.body
  )
}
