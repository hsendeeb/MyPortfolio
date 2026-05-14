"use client"

import { AnimatePresence, motion } from "motion/react"
import { useMemo, useState } from "react"

interface StackCardItem {
  src: string
  title?: string
  description?: string
}

interface StackCardGalleryProps {
  images?: string[]
  cards?: StackCardItem[]
  title?: string
  subtitle?: string
  visibleCount?: number
  dragThreshold?: number
  velocityThreshold?: number
  stackGap?: number
  scaleStep?: number
  borderRadius?: string
}

interface SwipeDirection {
  x: number
  y: number
}

interface LeavingCardState {
  card: StackCardItem
  direction: SwipeDirection
  key: number
}

const getLabelFromSrc = (src: string, index: number) => {
  const fileName = src.split("/").pop()?.split("?")[0]?.split("#")[0] ?? ""
  const baseName = fileName.replace(/\.[^/.]+$/, "")

  if (!baseName) {
    return `Image ${index + 1}`
  }

  return baseName
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (match) => match.toUpperCase())
}

const getSwipeDirection = (offsetX: number, offsetY: number): SwipeDirection => {
  if (Math.abs(offsetX) > Math.abs(offsetY)) {
    return {
      x: offsetX >= 0 ? 1 : -1,
      y: 0,
    }
  }

  return {
    x: 0,
    y: offsetY >= 0 ? 1 : -1,
  }
}

function DraggableStackCard({
  card,
  index,
  total,
  isTop,
  stackGap,
  scaleStep,
  borderRadius,
  dragThreshold,
  velocityThreshold,
  onAdvance,
}: {
  card: StackCardItem
  index: number
  total: number
  isTop: boolean
  stackGap: number
  scaleStep: number
  borderRadius: string
  dragThreshold: number
  velocityThreshold: number
  onAdvance: (direction: SwipeDirection) => void
}) {
  const scale = Math.max(1 - index * scaleStep, 0.86)
  const translateY = index * stackGap
  const rotate = index * -1.15

  return (
    <motion.button
      type="button"
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.18}
      whileTap={isTop ? { scale: scale * 0.98 } : undefined}
      animate={{
        scale,
        y: translateY,
        rotate,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 24,
        mass: 0.8,
      }}
      onDragEnd={(_, info) => {
        const shouldAdvance =
          Math.abs(info.offset.x) > dragThreshold ||
          Math.abs(info.offset.y) > dragThreshold ||
          Math.abs(info.velocity.x) > velocityThreshold ||
          Math.abs(info.velocity.y) > velocityThreshold

        if (!shouldAdvance) {
          return
        }

        onAdvance(getSwipeDirection(info.offset.x, info.offset.y))
      }}
      className="absolute inset-0 w-full overflow-hidden border border-gray-200 bg-white p-0 text-left shadow-[0_24px_60px_rgba(15,23,42,0.10)]"
      style={{
        borderRadius,
        zIndex: total - index,
        touchAction: isTop ? "none" : "auto",
        transformStyle: "preserve-3d",
      }}
      aria-label={card.title ?? "Draggable card"}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          borderRadius,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <img
          src={card.src}
          alt={card.title ?? "Card image"}
          className="h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
            Drag to send back
          </p>
          <h3 className="text-xl font-heading font-bold tracking-tight sm:text-2xl">
            {card.title}
          </h3>
          {card.description ? (
            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-200">
              {card.description}
            </p>
          ) : null}
        </div>
      </div>
    </motion.button>
  )
}

export default function FlipCardGallery({
  images,
  cards,
  title = "Services Gallery",
  subtitle = "Drag the top card away and the next one rises into place. Tap or swipe on mobile to cycle through the stack.",
  visibleCount = 4,
  dragThreshold = 120,
  velocityThreshold = 650,
  stackGap = 12,
  scaleStep = 0.05,
  borderRadius = "1.5rem",
}: StackCardGalleryProps) {
  const deck = useMemo<StackCardItem[]>(() => {
    if (cards?.length) {
      return cards
    }

    return (images ?? []).map((src, index) => ({
      src,
      title: getLabelFromSrc(src, index),
    }))
  }, [cards, images])

  const [activeIndex, setActiveIndex] = useState(0)
  const [leavingCard, setLeavingCard] = useState<LeavingCardState | null>(null)

  if (!deck.length) {
    return null
  }

  const orderedDeck = [
    ...deck.slice(activeIndex),
    ...deck.slice(0, activeIndex),
  ]

  const visibleDeck = orderedDeck.slice(0, Math.min(visibleCount, deck.length))

  const handleAdvance = (direction: SwipeDirection) => {
    if (leavingCard) {
      return
    }

    const currentCard = orderedDeck[0]
    const nextIndex = (activeIndex + 1) % deck.length

    setLeavingCard({
      card: currentCard,
      direction,
      key: Date.now(),
    })
    setActiveIndex(nextIndex)
  }

  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_30%),linear-gradient(to_bottom,rgba(250,250,250,0.98),rgba(250,250,250,1))]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cta">
            Gallery
          </p>
          <h2 className="mb-4 text-3xl font-heading font-bold tracking-tight text-text md:text-5xl">
            {title}
          </h2>
          <p className="text-secondary text-base leading-relaxed md:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[17rem] sm:max-w-[20rem] md:max-w-[24rem] lg:max-w-[28rem]">
            {visibleDeck.map((card, index) => (
              <DraggableStackCard
                key={`${card.src}-${index}`}
                card={card}
                index={index}
                total={visibleDeck.length}
                isTop={index === 0 && !leavingCard}
                stackGap={stackGap}
                scaleStep={scaleStep}
                borderRadius={borderRadius}
                dragThreshold={dragThreshold}
                velocityThreshold={velocityThreshold}
                onAdvance={handleAdvance}
              />
            ))}

            <AnimatePresence>
              {leavingCard ? (
                <motion.button
                  key={leavingCard.key}
                  type="button"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: leavingCard.direction.x * 1200,
                    y: leavingCard.direction.y * 900,
                    scale: 0.95,
                    rotate: leavingCard.direction.x * 18 + leavingCard.direction.y * 12,
                    opacity: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                    mass: 0.9,
                  }}
                  onAnimationComplete={() => setLeavingCard(null)}
                  className="absolute inset-0 w-full overflow-hidden border border-gray-200 bg-white p-0 text-left shadow-[0_18px_42px_rgba(15,23,42,0.10)]"
                  style={{
                    borderRadius,
                    zIndex: 999,
                    transformStyle: "preserve-3d",
                  }}
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      borderRadius,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={leavingCard.card.src}
                      alt={leavingCard.card.title ?? "Card image"}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                        Moving to back
                      </p>
                      <h3 className="text-xl font-heading font-bold tracking-tight sm:text-2xl">
                        {leavingCard.card.title}
                      </h3>
                    </div>
                  </div>
                </motion.button>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
