"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

interface HireMeFlipCardProps {
  imageSrc?: string
  summary?: string
  skills?: string[]
  stats?: Array<{ label: string; value: string }>
  ctaHref?: string
  ctaLabel?: string
}

export default function HireMeFlipCard({
  imageSrc = "public/myphoto.jpg",
  summary = "Full-stack developer focused on polished interfaces, fast product delivery, and practical business results.",
  skills = [
    "React + TypeScript",
    "Laravel + Livewire",
    "WordPress + Shopify",
  ],
  stats = [
    { label: "Focus", value: "Responsive UI" },
    { label: "Style", value: "Clean motion" },
    { label: "Delivery", value: "Client-ready" },
  ],
  ctaHref = "mailto:hsendeeb2@gmail.com",
  ctaLabel = "Hire Me",
}: HireMeFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_32%),linear-gradient(to_bottom,rgba(250,250,250,0.98),rgba(250,250,250,1))]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cta">
            Hire Me
          </p>
          <h2 className="mb-4 text-3xl font-heading font-bold tracking-tight text-text md:text-5xl">
            Let’s build something sharp
          </h2>
          <p className="text-secondary text-base leading-relaxed md:text-lg">
            Hover the card to reveal a power summary of what I bring to the table.
          </p>
        </div>

        <div className="mx-auto flex w-full justify-center">
          <motion.div
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.9 }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped((value) => !value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                setIsFlipped((value) => !value)
              }
            }}
            role="button"
            tabIndex={0}
            className="relative aspect-[4/5] w-full max-w-[22rem] cursor-pointer rounded-[1.75rem] p-0 text-left outline-none sm:max-w-[24rem] md:max-w-[26rem] lg:max-w-[28rem] xl:max-w-[30rem]"
            style={{ perspective: 1800, transformStyle: "preserve-3d" }}
            aria-label="Hire me 3D flip card"
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-[0_20px_46px_rgba(15,23,42,0.12)]"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.10),transparent_44%),linear-gradient(to_bottom,rgba(255,255,255,0.96),rgba(248,250,252,0.92))]" />
              <div className="relative flex h-full flex-col justify-between p-4 sm:p-5 md:p-6 lg:p-[1.45rem] pb-6 sm:pb-7">
                <div className="flex items-start justify-between gap-4">
                  <div />
                </div>

                <div className="mt-4 grid flex-1 place-items-center">
                  <div className="relative h-full w-full overflow-hidden rounded-[1rem] border border-white/70 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(226,232,240,0.75))] shadow-inner">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt="Hire me card portrait"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
                          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-cta">
                            IMG
                          </span>
                        </div>
                        <p className="text-base font-heading font-bold tracking-tight text-text">
                          Add your image path in code
                        </p>
                        <p className="mt-2 max-w-xs text-xs leading-5 text-secondary">
                          Set the `imageSrc` prop in App.tsx and place the file in `public/`.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-200 px-1 pt-3 pb-1">
                  <div>
                    <p className="text-xs font-semibold text-text sm:text-sm">Hsen Deeb</p>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-cta sm:text-xs">
                      Full-Stack Developer
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-gray-200 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_42%),linear-gradient(180deg,rgba(10,10,11,0.98),rgba(24,24,27,0.96))] shadow-[0_20px_46px_rgba(15,23,42,0.16)]"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="flex h-full flex-col justify-between p-4 text-white sm:p-5 md:p-6 lg:p-[1.45rem] pb-6 sm:pb-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100 sm:text-xs">
                    Power Card
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-zinc-200 sm:text-xs">
                    Ready to hire
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-2xl font-heading font-bold tracking-tight md:text-[2.15rem]">
                    Summary
                  </h3>
                  <p className="mt-3 max-w-none text-xs leading-6 text-zinc-200 sm:text-sm md:leading-7">
                    {summary}
                  </p>

                  <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {stats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-white/10 bg-white/5 p-3"
                      >
                        <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200">
                          {item.label}
                        </p>
                        <p className="mt-1.5 text-xs font-semibold text-white sm:text-sm">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-zinc-100 sm:text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-zinc-200 sm:text-sm">
                    Available for freelance work and product builds.
                  </p>
                  <a
                    href={ctaHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-zinc-950 transition-transform duration-200 hover:-translate-y-0.5 sm:text-sm"
                  >
                    {ctaLabel}
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
