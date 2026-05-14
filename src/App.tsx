import { useRef, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup, useScroll } from 'motion/react'
import AnimatedCardStack from '@/components/ui/animate-card-animation'
import { DottedSurface } from '@/components/ui/dotted-surface'
import { FallingPattern } from '@/components/ui/falling-pattern'
import { HandWrittenTitle } from '@/components/ui/hand-writing-text'
import OrbitingSkills from '@/components/ui/orbiting-skills'
import { ParticleTextEffect } from '@/components/ui/particle-text-effect'
import { SparklesText } from '@/components/ui/sparkles-text'
import { TextRotate } from '@/components/ui/text-rotate'
import { 
  Globe, 
  Briefcase,
  BookOpen,
  GraduationCap,
  BadgeCheck,
  Award,
  ShoppingBag, 
  Code2, 
  Download, 
  Mail, 
} from 'lucide-react'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

// Custom Brand Icons (since lucide-react removed them)
const Github = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const Linkedin = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const services = [
  {
    title: "WordPress Development",
    description: "Custom themes and plugins tailored to your brand's unique needs. Optimized for performance and SEO.",
    icon: Globe,
    color: "text-blue-600"
  },
  {
    title: "Shopify Solutions",
    description: "Expert store setup, theme customization, and app integration to scale your e-commerce business.",
    icon: ShoppingBag,
    color: "text-green-600"
  },
  {
    title: "Custom Web Apps",
    description: "Modern, scalable web applications built with React, Next.js, and high-performance backends.",
    icon: Code2,
    color: "text-purple-600"
  }
]

const projects = [
  {
    id: 1,
    title: "Tojjar",
    category: "Custom web app",
    image: assetUrl("logoTojjar.png"),
    description: "A premium marketplace for cars trading focused on speed, clarity, and user experience.",
    link: "https://github.com/hsendeeb/tojjar",
  },
  {
    id: 2,
    title: "AnsarEats",
    category: "Custom web app",
    image: assetUrl("ansareats-logo-v2.png"),
    description: "A delivery application for food ordering and management.",
    link: "https://github.com/hsendeeb/AnsarEats",
  }
]

const timelineEntries = [
  {
    year: 'Foundation',
    title: 'Learned at Sarafand High Institute',
    description: 'Built the technical foundation that started the path into software and digital product work.',
    icon: BookOpen,
    tone: 'from-cyan-500 to-sky-500',
  },
  {
    year: 'TS2',
    title: 'Earned my TS2 degree',
    description: 'Focused on the practical and academic skills that shaped my approach to structured learning.',
    icon: GraduationCap,
    tone: 'from-blue-500 to-indigo-500',
  },
  {
    year: 'LT',
    title: 'Earned my LT degree',
    description: 'Advanced into deeper specialization and broader technical confidence.',
    icon: Award,
    tone: 'from-indigo-500 to-violet-500',
  },
  {
    year: 'Internship',
    title: 'Internship at XpertBot',
    description: 'Gained real-world product experience by working inside a professional team environment.',
    icon: Briefcase,
    tone: 'from-violet-500 to-fuchsia-500',
  },
  {
    year: 'Certified',
    title: 'Got certified',
    description: 'Validated the journey with certification and a stronger professional baseline.',
    icon: BadgeCheck,
    tone: 'from-fuchsia-500 to-rose-500',
  },
]

function LearningTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.2'],
  })

  return (
    <section id="journey" className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_30%),linear-gradient(to_bottom,rgba(250,250,250,0.98),rgba(250,250,250,1))]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-4xl text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-cta">
            Timeline
          </p>
          <h2 className="mb-4 text-3xl font-heading font-bold tracking-tight text-text md:text-5xl">
            How I learned the craft
          </h2>
          <p className="text-secondary text-base leading-relaxed md:text-lg">
            A scroll-driven journey from education to professional experience, built with an alternating timeline layout.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-gray-200 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: scrollYProgress }}
            className="pointer-events-none absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-cyan-500 via-blue-500 to-fuchsia-500 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-10 md:space-y-16">
            {timelineEntries.map((entry, index) => {
              const Icon = entry.icon
              const isLeft = index % 2 === 0

              return (
                <div
                  key={entry.title}
                  className="relative grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[1fr_5rem_1fr] md:items-center md:gap-6"
                >
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className={`${isLeft ? 'md:col-start-1 md:justify-self-end md:text-right' : 'md:col-start-3 md:text-left'} col-start-2 w-full max-w-[34rem] md:max-w-[38rem]`}
                  >
                    <div className="rounded-[1.75rem] border border-gray-200 bg-white/90 p-7 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-8">
                      <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${entry.tone} px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-sm`}>
                        <Icon size={14} />
                        <span>{entry.year}</span>
                      </div>
                      <h3 className="mb-3 text-2xl font-heading font-bold tracking-tight text-text">
                        {entry.title}
                      </h3>
                      <p className="text-sm leading-7 text-secondary md:text-base">
                        {entry.description}
                      </p>
                    </div>
                  </motion.div>

                  <div className="row-start-1 flex h-5 w-5 items-center justify-center justify-self-center rounded-full border-4 border-background bg-white shadow-md md:static md:col-start-2 md:top-auto md:h-6 md:w-6">
                    <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${entry.tone}`} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [isDownloadHovered, setIsDownloadHovered] = useState(false)
  const [downloadHoverCycle, setDownloadHoverCycle] = useState(0)

  return (
    <div className="min-h-screen bg-background text-text font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-heading font-bold tracking-tight"
          >
            Hsen Deeb
          </motion.span>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#services" className="hover:text-cta transition-colors">Services</a>
            <a href="#skills" className="hover:text-cta transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cta transition-colors">Projects</a>
            <a href="#contact" className="hover:text-cta transition-colors">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/hsendeeb" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/hsendeeb/" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <FallingPattern
            className="h-full min-h-[42rem] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
            color="color-mix(in srgb, var(--primary) 28%, transparent)"
            backgroundColor="transparent"
            duration={110}
            blurIntensity="0.75em"
            density={1.15}
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_35%),linear-gradient(to_bottom,rgba(250,250,250,0.55),rgba(250,250,250,0.92))]" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-cta font-semibold tracking-wider uppercase text-sm mb-4"
          >
            Available for freelance projects
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-extrabold mb-6 tracking-tight"
          >
            Hi, I'm <span className="text-primary">Hsen deeb</span>
          </motion.h1>
          
          <div className="mb-10">
            <ParticleTextEffect
              words={[
                "WordPress Expert",
                "Shopify Developer",
                "Web Architect",
                "Full-stack Engineer",
              ]}
              width={1000}
              height={180}
              className="mx-auto"
              canvasClassName="opacity-95"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10"
          >
            <div
              className="group relative inline-flex"
              onMouseEnter={() => {
                setDownloadHoverCycle((value) => value + 1)
                setIsDownloadHovered(true)
              }}
              onMouseLeave={() => setIsDownloadHovered(false)}
            >
              <AnimatePresence>
                {isDownloadHovered && (
                  <div className="pointer-events-none absolute -inset-x-12 -inset-y-9 z-0">
                    <HandWrittenTitle
                      key={downloadHoverCycle}
                      hideText
                      className="h-full max-w-none py-0"
                      pathClassName="text-black"
                      strokeWidth={16}
                      pathData="M 1060 225 C 1130 345, 1055 485, 800 540 C 530 598, 215 560, 105 392 C 52 286, 103 132, 322 72 C 585 6, 968 58, 1060 225"
                    />
                  </div>
                )}
              </AnimatePresence>
              <a
                href={assetUrl("husseindeebCV.docx")}
                download="husseindeebCV.docx"
                className="btn-primary relative z-10 flex items-center gap-2 group-hover:shadow-lg"
                onFocus={() => {
                  setDownloadHoverCycle((value) => value + 1)
                  setIsDownloadHovered(true)
                }}
                onBlur={() => setIsDownloadHovered(false)}
              >
                Download CV <Download size={18} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </div>
            <a href="#projects" className="btn-secondary">
              View Projects
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <LayoutGroup>
              <motion.h2
                className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-3xl font-heading font-bold tracking-tight md:text-4xl"
                layout
              >
                <span>I build</span>
                <TextRotate
                  texts={[
                    'WordPress storefronts',
                    'Shopify storefronts',
                    'custom web apps',
                  ]}
                  mainClassName="justify-center overflow-hidden rounded-full bg-primary px-4 py-1 text-white shadow-sm"
                  splitLevelClassName="overflow-hidden pb-1"
                  staggerFrom="last"
                  staggerDuration={0.015}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={2200}
                />
              </motion.h2>
            </LayoutGroup>
            <p className="text-secondary text-base leading-relaxed md:text-lg">I help businesses grow by building premium digital experiences that convert and engage.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card flex flex-col items-center text-center group"
              >
                <div className={`p-4 rounded-2xl bg-white shadow-sm mb-6 ${service.color} group-hover:scale-110 transition-transform`}>
                  <service.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_30%),linear-gradient(to_bottom,rgba(250,250,250,0.98),rgba(250,250,250,1))]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-full max-w-4xl text-center lg:mx-0 lg:text-left"
            >
              <h2 className="mb-4 text-3xl font-heading font-bold tracking-tight text-text md:text-4xl">
                My Skills
              </h2>
              <p className="mb-8 text-secondary text-base leading-relaxed md:text-lg">
                The stack I use to build polished interfaces, solid backend systems, and fast-moving client products.
              </p>
              <div className="grid gap-4 text-left sm:grid-cols-2">
                {[
                  "Responsive interfaces with Tailwind and JavaScript",
                  "Laravel application architecture and delivery",
                  "Livewire workflows for fast product iteration",
                  "Filament admin panels and Git-based collaboration",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                    <p className="text-sm leading-6 text-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mx-auto flex w-full justify-center bg-transparent p-0 lg:max-w-[520px]"
            >
              <OrbitingSkills />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative isolate overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <DottedSurface className="z-0 opacity-100" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.05),transparent_32%),linear-gradient(to_bottom,rgba(250,250,250,0.38),rgba(250,250,250,0.52))]" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col items-center gap-6 text-center">
            <div className="mx-auto w-full max-w-5xl">
              <SparklesText
                text="My projects"
                className=" w-full text-center text-4xl font-heading font-bold tracking-tight md:text-5xl"
                sparklesCount={6}
                colors={{ first: "#2563EB", second: "#18181B" }}
              />
             
            </div>
            
          </div>
          <AnimatedCardStack projects={projects} />
        </div>
      </section>

      <LearningTimeline />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8">Ready to start your project?</h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:hsendeeb2@gmail.com" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
              <Mail size={20} /> hsendeeb2@gmail.com
            </a>
            <div className="flex gap-4">
               <a href="#" className="p-4 bg-secondary/50 rounded-full hover:bg-cta transition-colors"><Github size={24} /></a>
               <a href="#" className="p-4 bg-secondary/50 rounded-full hover:bg-cta transition-colors"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-secondary text-sm">© 2026 Hsen deeb. All rights reserved.</span>
          <div className="flex space-x-6 text-sm text-secondary">
            <a href="#" className="hover:text-cta transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cta transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
