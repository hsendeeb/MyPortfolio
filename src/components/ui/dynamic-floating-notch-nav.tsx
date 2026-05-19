"use client"

import { useEffect, useState, type ComponentType } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Home, Layers3, Sparkles, BriefcaseBusiness, Mail } from "lucide-react"

type NavIcon = ComponentType<{ className?: string; size?: number }>

interface NavItem {
  id: string
  label: string
  href: string
  icon: NavIcon
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "services", label: "Services", href: "#services", icon: BriefcaseBusiness },
  { id: "skills", label: "Skills", href: "#skills", icon: Sparkles },
  { id: "projects", label: "Projects", href: "#projects", icon: Layers3 },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail },
]

const trackedIds = navItems.map((item) => item.id)

export default function DynamicFloatingNotchNav() {
  const [activeId, setActiveId] = useState("home")
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const elements = trackedIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]?.target.id) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-12% 0px -55% 0px",
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (item: NavItem) => {
    setActiveId(item.id)

    if (navigator.vibrate) {
      navigator.vibrate(8)
    }

    const target = document.getElementById(item.id)
    if (target) {
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-3 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+0.25rem)] md:hidden">
      <div className="mx-auto w-full max-w-[30rem] pointer-events-auto">
        <div className="relative overflow-visible rounded-[2rem] border border-white/10 bg-zinc-950/75 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02)),radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_55%)]" />
          <div className="relative grid grid-cols-5 gap-1 px-2 pb-3 pt-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeId === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item)}
                  className="relative flex min-h-[4.25rem] flex-col items-center justify-end gap-1 rounded-[1.5rem] px-1 py-2 text-center outline-none transition-colors duration-200"
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                >
                  <AnimatePresence>
                    {isActive ? (
                      <motion.div
                        layoutId="dynamic-notch-bubble"
                        initial={false}
                        animate={{
                          y: 0,
                          scale: 1,
                          opacity: 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                          mass: 0.72,
                        }}
                        className="absolute -top-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-[1.8rem] border border-emerald-400/30 bg-emerald-400/12 px-4 py-2.5 text-emerald-100 shadow-[0_0_0_1px_rgba(16,185,129,0.14),0_20px_45px_rgba(16,185,129,0.22)] backdrop-blur-xl"
                      >
                        <div className="absolute inset-0 rounded-[1.8rem] bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.32),transparent_65%)]" />
                        <div className="relative flex items-center gap-2">
                          <Icon size={16} className="shrink-0" />
                          <span className="text-sm font-semibold tracking-tight">
                            {item.label}
                          </span>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      y: isActive ? -1 : 0,
                      scale: isActive ? 1.08 : 1,
                      opacity: isActive ? 1 : 0.72,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 360,
                      damping: 30,
                      mass: 0.72,
                    }}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                      isActive
                        ? "border-emerald-400/35 bg-emerald-400/15 text-emerald-200 shadow-[0_0_22px_rgba(16,185,129,0.22)]"
                        : "border-white/10 bg-white/5 text-zinc-300"
                    }`}
                  >
                    <Icon size={16} />
                  </motion.div>

                  <span
                    className={`text-[11px] font-medium tracking-wide transition-colors duration-200 ${
                      isActive ? "text-emerald-200" : "text-zinc-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
