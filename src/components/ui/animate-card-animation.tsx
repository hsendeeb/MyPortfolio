"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

export interface AnimatedProjectCardItem {
  id: number
  title: string
  description: string
  image: string
  link: string
  category: string
}

interface StackCard {
  id: number
  projectIndex: number
}

interface AnimatedCardStackProps {
  projects: AnimatedProjectCardItem[]
}

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
]

const exitAnimation = {
  y: 340,
  scale: 1,
  zIndex: 10,
}

const enterAnimation = {
  y: -16,
  scale: 0.9,
}

function ProjectCardContent({ project }: { project: AnimatedProjectCardItem }) {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 bg-white">
      <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden rounded-xl outline outline-1 -outline-offset-1 outline-black/10">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full select-none object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
          {project.category}
        </span>
      </div>
      <div className="flex w-full items-center justify-between gap-3 px-3 pb-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-medium text-foreground">{project.title}</span>
          <span className="line-clamp-2 text-sm text-secondary">{project.description}</span>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 shrink-0 select-none items-center gap-1 rounded-full bg-foreground pl-4 pr-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
        >
          Visit
          <ExternalLink size={15} />
        </a>
      </div>
    </div>
  )
}

function AnimatedCard({
  card,
  index,
  isAnimating,
  projects,
}: {
  card: StackCard
  index: number
  isAnimating: boolean
  projects: AnimatedProjectCardItem[]
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2]
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index

  const exitAnim = index === 0 ? exitAnimation : undefined
  const initialAnim = index === 2 ? enterAnimation : undefined
  const project = projects[card.projectIndex]

  return (
    <motion.div
      key={card.id}
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0,
      }}
      style={{
        zIndex,
        left: "50%",
        x: "-50%",
        bottom: 0,
      }}
      className="absolute flex h-[360px] w-[324px] items-center justify-center overflow-hidden rounded-t-[1.4rem] border-x border-t border-black/10 bg-white p-1 shadow-lg will-change-transform sm:w-[560px]"
    >
      <ProjectCardContent project={project} />
    </motion.div>
  )
}

export default function AnimatedCardStack({ projects }: AnimatedCardStackProps) {
  const preparedProjects = useMemo(
    () => (projects.length > 0 ? projects : []),
    [projects]
  )

  const initialCards = useMemo<StackCard[]>(
    () =>
      preparedProjects.slice(0, 3).map((_, index) => ({
        id: index + 1,
        projectIndex: index,
      })),
    [preparedProjects]
  )

  const [cards, setCards] = useState(initialCards)
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextId, setNextId] = useState(initialCards.length + 1)

  const handleAnimate = () => {
    if (preparedProjects.length <= 1 || isAnimating) return

    setIsAnimating(true)

    const lastProjectIndex = cards[cards.length - 1]?.projectIndex ?? 0
    const nextProjectIndex = (lastProjectIndex + 1) % preparedProjects.length

    setCards((currentCards) => [
      ...currentCards.slice(1),
      { id: nextId, projectIndex: nextProjectIndex },
    ])
    setNextId((prev) => prev + 1)

    window.setTimeout(() => {
      setIsAnimating(false)
    }, 450)
  }

  if (preparedProjects.length === 0) {
    return null
  }

  return (
    <div className="flex w-full flex-col items-center justify-center pt-2">
      <div className="relative h-[460px] w-full overflow-hidden sm:w-[692px]">
        <AnimatePresence initial={false}>
          {cards.slice(0, 3).map((card, index) => (
            <AnimatedCard
              key={card.id}
              card={card}
              index={index}
              isAnimating={isAnimating}
              projects={preparedProjects}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 -mt-px flex w-full items-center justify-center border-t border-black/10 py-4">
        <button
          onClick={handleAnimate}
          className="flex h-10 cursor-pointer select-none items-center justify-center gap-1 overflow-hidden rounded-lg border border-black/10 bg-background px-4 font-medium text-primary transition-all hover:bg-secondary/20 active:scale-[0.98]"
        >
          Next Project
        </button>
      </div>
    </div>
  )
}
