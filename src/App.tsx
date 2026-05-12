import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import AnimatedCardStack from '@/components/ui/animate-card-animation'
import { DottedSurface } from '@/components/ui/dotted-surface'
import { FallingPattern } from '@/components/ui/falling-pattern'
import { HandWrittenTitle } from '@/components/ui/hand-writing-text'
import { SparklesText } from '@/components/ui/sparkles-text'
import { TextRotate } from '@/components/ui/text-rotate'
import { 
  Globe, 
  ShoppingBag, 
  Code2, 
  Download, 
  Mail, 
} from 'lucide-react'

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

const roles = [
  "Wordpress Expert",
  "Shopify Developer",
  "Custom Web Architect",
  "Full-stack Engineer"
]

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
    image: "/logoTojjar.png",
    description: "A premium marketplace for cars trading focused on speed, clarity, and user experience.",
    link: "https://github.com/hsendeeb/tojjar",
  },
  {
    id: 2,
    title: "AnsarEats",
    category: "Custom web app",
    image: "/ansareats-logo-v2.png",
    description: "A delivery application for food ordering and management.",
    link: "https://github.com/hsendeeb/AnsarEats",
  },
  {
    id: 3,
    title: "Project Gamma",
    category: "Custom App",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    description: "A bespoke web application built for performance, flexibility, and polished client workflows.",
    link: "https://example.com/project-gamma",
  },
  {
    id: 4,
    title: "Project Delta",
    category: "WordPress",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "A content-rich WordPress build designed around SEO structure and editorial ease of use.",
    link: "https://example.com/project-delta",
  },
]

export default function App() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDownloadHovered, setIsDownloadHovered] = useState(false)
  const [downloadHoverCycle, setDownloadHoverCycle] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

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
            PORTFOLIO.
          </motion.span>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <a href="#services" className="hover:text-cta transition-colors">Services</a>
            <a href="#projects" className="hover:text-cta transition-colors">Projects</a>
            <a href="#contact" className="hover:text-cta transition-colors">Contact</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Github size={20} /></a>
            <a href="#" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Linkedin size={20} /></a>
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
            Hi, I'm <span className="text-primary">Your Name</span>
          </motion.h1>
          
          <div className="mb-10 flex h-12 items-center justify-center overflow-hidden md:h-16">
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-2xl md:text-4xl text-secondary font-medium"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
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
                href="/husseindeebCV.docx"
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
            <button className="btn-secondary">
              View Projects
            </button>
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

      {/* Projects Section */}
      <section id="projects" className="relative isolate overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <DottedSurface className="opacity-60" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_35%),linear-gradient(to_bottom,rgba(250,250,250,0.9),rgba(250,250,250,0.98))]" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-12 flex flex-col items-center gap-6 text-center">
            <div className="mx-auto w-full max-w-5xl">
              <SparklesText
                text="Featured Work"
                className="mb-4 w-full text-center text-4xl font-heading font-bold tracking-tight md:text-5xl"
                sparklesCount={12}
                colors={{ first: "#2563EB", second: "#18181B" }}
              />
             
            </div>
            
          </div>
          <AnimatedCardStack projects={projects} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8">Ready to start your project?</h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400">
            Whether you need a full-scale Shopify store or a custom web app, I'm here to help you build it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="mailto:hello@example.com" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
              <Mail size={20} /> hello@example.com
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
