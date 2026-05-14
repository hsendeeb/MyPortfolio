"use client"

import React, { memo, useEffect, useState } from "react"
import { CodeXml, GitBranch } from "lucide-react"

type IconType =
  | "html"
  | "css"
  | "javascript"
  | "tailwind"
  | "laravel"
  | "livewire"
  | "filament"
  | "git"

type GlowColor = "cyan" | "purple"

interface SkillIconProps {
  type: IconType
}

interface SkillConfig {
  id: string
  orbitRadius: number
  size: number
  speed: number
  iconType: IconType
  phaseShift: number
  glowColor: GlowColor
  label: string
}

interface OrbitingSkillProps {
  config: SkillConfig
  angle: number
}

interface GlowingOrbitPathProps {
  radius: number
  glowColor?: GlowColor
  animationDelay?: number
}

const LaravelIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden="true">
    <path
      fill="#FF2D20"
      d="M17.62 2.19 22 4.72v14.56l-4.38 2.53-4.36-2.53v-5.05l-4.37 2.53L2 14.23V9.2l4.89-2.84 4.38 2.53 4.35-2.52V2.19h2ZM8.02 8.13 4.4 10.22v3.96l3.62 2.09 3.62-2.09v-3.96L8.02 8.13Zm8.84-3.96-3.62 2.1v3.96l3.62 2.09 3.63-2.09V6.27l-3.63-2.1Zm-2.13 9.96v3.96l3.13 1.81 3.13-1.81v-3.96l-3.13-1.82-3.13 1.82Z"
    />
  </svg>
)

const LivewireIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" aria-hidden="true">
    <path
      d="M6.2 6.4C7.86 4.35 9.74 3.32 12 3.32c2.22 0 4.08.96 5.78 2.86l-2.1 1.73C14.52 6.62 13.35 6 12 6c-1.39 0-2.58.64-3.79 1.95L6.2 6.4Zm11.56 11.2C16.1 19.65 14.24 20.68 12 20.68c-2.26 0-4.14-1.03-5.8-3.08l2.02-1.56C9.42 17.36 10.61 18 12 18c1.35 0 2.52-.62 3.68-1.91l2.08 1.51Z"
      fill="#FB70A9"
    />
    <path
      d="M3 12c1.92-2.5 4.14-3.75 6.67-3.75 2.48 0 4.67 1.22 6.58 3.67L9.67 18.5C7.14 18.5 4.92 17.33 3 15v-3Zm18 0c-1.92 2.5-4.14 3.75-6.67 3.75-2.48 0-4.67-1.22-6.58-3.67L14.33 5.5C16.86 5.5 19.08 6.67 21 9v3Z"
      fill="#8B5CF6"
    />
  </svg>
)

const FilamentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-full w-full" aria-hidden="true">
    <path
      d="M4 17.5c3.2-6.93 7.77-10.4 13.72-10.4h2.28c-2.6 5.17-6.76 8.6-12.47 10.27L4 17.5Z"
      fill="#F59E0B"
    />
    <path
      d="M6.05 12.25c1.96-4.07 4.9-6.1 8.83-6.1h1.47c-1.67 3.02-4.27 5.16-7.8 6.42l-2.5-.32Z"
      fill="#FDBA74"
    />
    <path
      d="M6.1 18.35c4.44-.4 8.47-1.97 12.1-4.72-1.62 3.55-4.5 5.32-8.62 5.32-1.14 0-2.3-.2-3.48-.6Z"
      fill="#FB7185"
    />
  </svg>
)

const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden="true">
        <path
          d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
          fill="#E34F26"
        />
      </svg>
    ),
    color: "#E34F26",
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden="true">
        <path
          d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z"
          fill="#1572B6"
        />
      </svg>
    ),
    color: "#1572B6",
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden="true">
        <rect width="24" height="24" fill="#F7DF1E" />
        <path
          d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
          fill="#323330"
        />
      </svg>
    ),
    color: "#F7DF1E",
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden="true">
        <path
          d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
          fill="#06B6D4"
        />
      </svg>
    ),
    color: "#06B6D4",
  },
  laravel: {
    component: LaravelIcon,
    color: "#FF2D20",
  },
  livewire: {
    component: LivewireIcon,
    color: "#8B5CF6",
  },
  filament: {
    component: FilamentIcon,
    color: "#F59E0B",
  },
  git: {
    component: () => <GitBranch className="h-full w-full text-[#F05032]" strokeWidth={2} aria-hidden="true" />,
    color: "#F05032",
  },
}

const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component
  return IconComponent ? <IconComponent /> : null
})

SkillIcon.displayName = "SkillIcon"

const skillsConfig: SkillConfig[] = [
  {
    id: "html",
    orbitRadius: 96,
    size: 44,
    speed: 0.9,
    iconType: "html",
    phaseShift: 0,
    glowColor: "cyan",
    label: "HTML5",
  },
  {
    id: "css",
    orbitRadius: 96,
    size: 44,
    speed: 0.9,
    iconType: "css",
    phaseShift: Math.PI / 2,
    glowColor: "cyan",
    label: "CSS3",
  },
  {
    id: "javascript",
    orbitRadius: 96,
    size: 42,
    speed: 0.9,
    iconType: "javascript",
    phaseShift: Math.PI,
    glowColor: "cyan",
    label: "JavaScript",
  },
  {
    id: "tailwind",
    orbitRadius: 96,
    size: 42,
    speed: 0.9,
    iconType: "tailwind",
    phaseShift: (3 * Math.PI) / 2,
    glowColor: "cyan",
    label: "Tailwind CSS",
  },
  {
    id: "laravel",
    orbitRadius: 176,
    size: 52,
    speed: -0.55,
    iconType: "laravel",
    phaseShift: 0,
    glowColor: "purple",
    label: "Laravel",
  },
  {
    id: "livewire",
    orbitRadius: 176,
    size: 48,
    speed: -0.55,
    iconType: "livewire",
    phaseShift: Math.PI / 2,
    glowColor: "purple",
    label: "Livewire",
  },
  {
    id: "filament",
    orbitRadius: 176,
    size: 48,
    speed: -0.55,
    iconType: "filament",
    phaseShift: Math.PI,
    glowColor: "purple",
    label: "Filament",
  },
  {
    id: "git",
    orbitRadius: 176,
    size: 48,
    speed: -0.55,
    iconType: "git",
    phaseShift: (3 * Math.PI) / 2,
    glowColor: "purple",
    label: "Git",
  },
]

const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { orbitRadius, size, iconType, label } = config

  const x = Math.cos(angle) * orbitRadius
  const y = Math.sin(angle) * orbitRadius

  return (
    <div
      className="absolute left-1/2 top-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative flex h-full w-full cursor-pointer items-center justify-center rounded-full border border-white/10 bg-zinc-900/90 p-2 backdrop-blur-sm transition-all duration-300 ${
          isHovered ? "scale-125" : "hover:scale-105"
        }`}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType].color}40, 0 0 60px ${iconComponents[iconType].color}20`
            : "none",
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered ? (
          <div className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 rounded bg-zinc-950/95 px-2 py-1 text-xs whitespace-nowrap text-white">
            {label}
          </div>
        ) : null}
      </div>
    </div>
  )
})

OrbitingSkill.displayName = "OrbitingSkill"

const GlowingOrbitPath = memo(({ radius, glowColor = "cyan", animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: "rgba(6, 182, 212, 0.35)",
      secondary: "rgba(6, 182, 212, 0.16)",
      border: "rgba(6, 182, 212, 0.25)",
    },
    purple: {
      primary: "rgba(147, 51, 234, 0.3)",
      secondary: "rgba(147, 51, 234, 0.14)",
      border: "rgba(147, 51, 234, 0.22)",
    },
  }

  const colors = glowColors[glowColor]

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 45%, ${colors.secondary} 72%, ${colors.primary} 100%)`,
          boxShadow: `0 0 50px ${colors.primary}, inset 0 0 40px ${colors.secondary}`,
          animationDelay: `${animationDelay}s`,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  )
})

GlowingOrbitPath.displayName = "GlowingOrbitPath"

export default function OrbitingSkills() {
  const [time, setTime] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    let animationFrameId = 0
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime
      setTime((prevTime) => prevTime + deltaTime)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isPaused])

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 96, glowColor: "cyan", delay: 0 },
    { radius: 176, glowColor: "purple", delay: 1.5 },
  ]

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden bg-transparent">

      <div
        className="relative flex h-[280px] w-[280px] items-center justify-center sm:h-[360px] sm:w-[360px] md:h-[420px] md:w-[420px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-transparent">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-transparent">
            <CodeXml className="h-7 w-7 text-cyan-300" strokeWidth={1.75} />
          </div>
        </div>

        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {skillsConfig.map((config) => {
          const angle = time * config.speed + config.phaseShift

          return <OrbitingSkill key={config.id} config={config} angle={angle} />
        })}
      </div>
    </div>
  )
}
