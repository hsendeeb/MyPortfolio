"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronDown, MapPin } from "lucide-react"

interface DynamicInfoNotchProps {
  name?: string
  role?: string
  status?: string
  location?: string
}

export default function DynamicInfoNotch({
  name = "Hsen Deeb",
  role = "Frontend and Full-Stack Developer",
  status = "Available for freelance work",
  location = "Beirut",
}: DynamicInfoNotchProps) {
  const [time, setTime] = useState(() => new Date())
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const interval = window.setInterval(() => setTime(new Date()), 60_000)
    return () => window.clearInterval(interval)
  }, [])

  const timeString = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Beirut",
  }).format(time)

  return (
    <div className="relative px-4">
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-5xl"
      >
        <div className="absolute left-1/2 top-0 h-10 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background blur-2xl" />
        <div
          className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-md transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          tabIndex={0}
          role="button"
          aria-label="Open dynamic info notch"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="relative px-4 py-4 sm:px-6">
            <div className="absolute left-1/2 top-0 h-12 w-24 -translate-x-1/2 -translate-y-1/2 rounded-b-[2rem] border-x border-b border-gray-200 bg-white shadow-[0_10px_20px_rgba(15,23,42,0.06)]">
              <div className="absolute inset-x-0 bottom-2 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),rgba(255,255,255,0.96))] shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-cta">
                    Info
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 pt-10 md:grid-cols-[1.2fr_0.8fr] md:items-center md:gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {status}
                </div>
                <h1 className="mt-4 text-3xl font-heading font-bold tracking-tight text-text sm:text-4xl">
                  {name}
                </h1>
                <p className="mt-2 text-sm leading-6 text-secondary sm:text-base">
                  {role}
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-[1.5rem] border border-gray-200 bg-gray-50/90 p-4 sm:flex-row sm:items-center sm:justify-between md:min-h-[92px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cta">
                      Location
                    </p>
                    <p className="text-sm font-medium text-text">{location}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-center shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cta">
                    Beirut Time
                  </p>
                  <p className="mt-1 text-lg font-heading font-bold tracking-tight text-text">
                    {timeString}
                  </p>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isHovered ? (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 rounded-[1.5rem] border border-gray-200 bg-white/95 p-4 shadow-sm sm:p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cta">
                        Hover details
                      </p>
                      <p className="mt-1 text-sm leading-6 text-secondary">
                        WordPress, Shopify, React, Laravel, responsive systems, and client-ready delivery.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-text">
                      <ChevronDown size={14} />
                      More info
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
