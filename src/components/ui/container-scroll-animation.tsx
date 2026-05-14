"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [0.74, 0.92] : [1.04, 1]
  }

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <div
      className="relative flex h-[54rem] items-center justify-center px-2 md:h-[72rem] md:p-12"
      ref={containerRef}
    >
      <div
        className="relative w-full py-10 md:py-28"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: string | React.ReactNode
}) {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

export function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #00000014, 0 10px 24px #00000014, 0 34px 44px #00000014, 0 92px 68px #0000000f",
      }}
      className="mx-auto -mt-8 h-[22rem] w-full max-w-5xl rounded-[30px] border-4 border-zinc-700 bg-zinc-900 p-2 shadow-2xl md:-mt-10 md:h-[34rem] md:p-5"
    >
      <div className="h-full w-full overflow-hidden rounded-[22px] bg-zinc-950 md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  )
}
