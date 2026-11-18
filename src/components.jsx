import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from './router.jsx'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { EASE, formatPrice, site } from './data.js'

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

function Svg({ className, children }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">{children}</svg>
  )
}

export const Mountain = (p) => <Svg {...p}><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></Svg>
export const ArrowDown = (p) => <Svg {...p}><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></Svg>
export const ArrowUpRight = (p) => <Svg {...p}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></Svg>
export const ArrowRight = (p) => <Svg {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Svg>
export const ArrowLeft = (p) => <Svg {...p}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></Svg>
export const MapPin = (p) => (
  <Svg {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </Svg>
)
export const Sparkle = (p) => (
  <Svg {...p}>
    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
  </Svg>
)
export const Sunrise = (p) => (
  <Svg {...p}>
    <path d="M12 2v8" /><path d="m4.93 10.93 1.41 1.41" /><path d="M2 18h2" />
    <path d="M20 18h2" /><path d="m19.07 10.93-1.41 1.41" /><path d="M22 22H2" />
    <path d="m8 6 4-4 4 4" /><path d="M16 18a4 4 0 0 0-8 0" />
  </Svg>
)
export const Binoculars = (p) => (
  <Svg {...p}>
    <path d="M10 10h4" /><path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
    <path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z" />
    <path d="M 22 16 L 2 16" />
    <path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z" />
    <path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3" />
  </Svg>
)
export const Camera = (p) => (
  <Svg {...p}>
    <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
    <circle cx="12" cy="13" r="3" />
  </Svg>
)
export const Clock = (p) => <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Svg>
export const MessageCircle = (p) => (
  <Svg {...p}>
    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
  </Svg>
)
export const Mail = (p) => (
  <Svg {...p}>
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect x="2" y="4" width="20" height="16" rx="2" />
  </Svg>
)
export const Phone = (p) => (
  <Svg {...p}>
    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
  </Svg>
)
export const Menu = (p) => <Svg {...p}><path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" /></Svg>
export const X = (p) => <Svg {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Svg>
export const CalendarDays = (p) => (
  <Svg {...p}>
    <path d="M8 2v3" /><path d="M16 2v3" /><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" />
    <path d="M8 13h.01" /><path d="M12 13h.01" /><path d="M16 13h.01" />
    <path d="M8 17h.01" /><path d="M12 17h.01" /><path d="M16 17h.01" />
  </Svg>
)
export const Check = (p) => <Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>
export const Users = (p) => (
  <Svg {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <path d="M16 3.128a4 4 0 0 1 0 7.744" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" />
  </Svg>
)
export const Compass = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /></Svg>
)
export const Heart = (p) => (
  <Svg {...p}><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></Svg>
)
export const Languages = (p) => (
  <Svg {...p}>
    <path d="m5 8 6 6" /><path d="m4 14 6-6 2-3" /><path d="M2 5h12" /><path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" /><path d="M14 18h6" />
  </Svg>
)
export const Leaf = (p) => (
  <Svg {...p}>
    <path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20" />
    <path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13" />
  </Svg>
)
export const Timer = (p) => (
  <Svg {...p}>
    <line x1="10" x2="14" y1="2" y2="2" /><line x1="12" x2="15" y1="14" y2="11" /><circle cx="12" cy="14" r="8" />
  </Svg>
)
export const Send = (p) => (
  <Svg {...p}>
    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
    <path d="m21.854 2.147-10.94 10.939" />
  </Svg>
)
export const Minus = (p) => <Svg {...p}><path d="M5 12h14" /></Svg>
export const Plus = (p) => <Svg {...p}><path d="M5 12h14" /><path d="M12 5v14" /></Svg>
export const ChevronDown = (p) => <Svg {...p}><path d="m6 9 6 6 6-6" /></Svg>

export const PawPrint = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="4" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="20" cy="16" r="2" />
    <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
  </Svg>
)

/* ------------------------------------------------------------------ */
/* Button                                                              */
/* ------------------------------------------------------------------ */

const BTN_BASE =
  'group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4 gap-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2'

export function Button({ variant = 'primary', size, className = '', to, href, children, ...rest }) {
  let variantClass
  if (variant === 'primary') variantClass = 'bg-primary text-primary-foreground hover:bg-primary/80'
  else if (variant === 'secondary') variantClass = 'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground'
  else if (variant === 'ghost') variantClass = 'text-foreground hover:bg-muted'
  else if (variant === 'light') variantClass = 'bg-white/15 text-white backdrop-blur hover:bg-white/25'
  else variantClass = ''

  let sizeClass = ''
  if (size === 'sm') sizeClass = 'h-9 rounded-full px-5'
  else if (size === 'lg') sizeClass = 'h-12 rounded-full px-7 text-base'
  else if (size === 'icon') sizeClass = 'size-9 rounded-md'

  const cls = `${BTN_BASE} ${variantClass} ${sizeClass} ${className}`
  const content = <>{children}</>
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{content}</a>
  return <button type="button" className={cls} {...rest}>{content}</button>
}

/* ------------------------------------------------------------------ */
/* Scroll helpers                                                      */
/* ------------------------------------------------------------------ */

export function useScrollProgress(ref, offset) {
  const { scrollYProgress } = useScroll({ target: ref, offset })
  const [progress, setProgress] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', setProgress)
  return progress
}

export function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = inMax === inMin ? 0 : (value - inMin) / (inMax - inMin)
  const clamped = Math.max(0, Math.min(1, t))
  const lerp = (a, b) => {
    if (typeof a === 'number') return a + (b - a) * clamped
    return `${parseFloat(a) + (parseFloat(b) - parseFloat(a)) * clamped}%`
  }
  return lerp(outMin, outMax)
}

export function Reveal({ children, className = '', delay = 0, y = 40, duration = 0.9 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ eyebrow, title, className = '' }) {
  return (
    <Reveal className={`max-w-3xl ${className}`}>
      <p className="mb-4 text-sm font-medium tracking-[0.3em] text-accent uppercase">{eyebrow}</p>
      <h2 className="font-serif text-4xl leading-tight font-light text-balance md:text-6xl">{title}</h2>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/* Fog / clouds                                                        */
/* ------------------------------------------------------------------ */

export function FogLayer({ className, duration, reverse = false, opacity = 0.8 }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute flex w-[200%] ${className}`}
      style={{ opacity }}
      animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}
          className="-mx-[6%] h-full flex-1 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,250,240,0.75)_0%,rgba(255,250,240,0.3)_50%,transparent_72%)] blur-3xl"
          style={{ transform: `translateY(${(i % 3) * 18 - 18}px) scale(${1 + (i % 2) * 0.3})` }} />
      ))}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Page hero (used by all secondary pages)                             */
/* ------------------------------------------------------------------ */

export function PageHero({ eyebrow, title, description, image, children }) {
  return (
    <section className="relative flex min-h-[72vh] items-end overflow-hidden">
      <motion.img src={image} alt="" className="absolute inset-0 size-full object-cover"
        initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: EASE }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70" />
      <FogLayer className="bottom-10 h-40" duration={70} opacity={0.5} />
      <FogLayer className="-bottom-6 h-36" duration={50} reverse opacity={0.7} />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-40 pb-24 text-white md:px-8">
        <motion.p initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: EASE }}
          className="mb-4 text-sm font-medium tracking-[0.3em] text-primary uppercase">{eyebrow}</motion.p>
        <motion.h1 initial={{ y: 40 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="max-w-4xl font-serif text-5xl leading-[1.05] font-light text-balance md:text-7xl">{title}</motion.h1>
        {description && (
          <motion.p initial={{ y: 30 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="mt-6 max-w-xl text-lg text-white/80">{description}</motion.p>
        )}
        {children}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Header / Footer / Badge                                              */
/* ------------------------------------------------------------------ */

export function Header() {
  const location = useLocation()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const solid = scrolled || menuOpen

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid
      ? 'border-b border-border bg-background/85 py-3 shadow-sm backdrop-blur-xl' : 'py-6'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/" onClick={() => setMenuOpen(false)}
          className={`flex cursor-pointer items-center gap-2 transition-colors ${solid ? 'text-foreground' : 'text-white'}`}>
          <motion.span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground"
            whileHover={{ rotate: 20, scale: 1.08 }}>
            <Mountain className="size-5" />
          </motion.span>
          <span className="font-serif text-xl font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((link) => {
            const active = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to)
            return (
              <Link key={link.to} to={link.to}
                className={`group relative cursor-pointer text-sm transition-colors ${solid
                  ? 'text-foreground/70 hover:text-foreground data-[status=active]:text-foreground'
                  : 'text-white/75 hover:text-white data-[status=active]:text-white'}`}
                data-status={active ? 'active' : undefined}>
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 group-hover:w-full ${active ? 'w-full' : 'w-0'}`} />
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button to="/contact" size="sm" className="hidden rounded-full px-5 sm:inline-flex">Plan my trip</Button>
          <Button variant="ghost" size="icon" aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
            className={`md:hidden ${solid ? 'text-foreground' : 'text-white hover:bg-white/15 hover:text-white'}`}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="mx-auto flex max-w-7xl flex-col gap-1 px-5 pt-4 pb-2 md:hidden">
          {site.nav.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
              className="cursor-pointer rounded-xl px-3 py-3 font-serif text-2xl text-foreground/80 hover:bg-muted data-[status=active]:text-accent"
              data-status={location.pathname === link.to ? 'active' : undefined}>
              {link.label}
            </Link>
          ))}
        </motion.nav>
      )}
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted-foreground md:flex-row md:px-8">
        <p className="font-serif text-lg text-foreground">{site.name}</p>
        <p>Karibu Tanzania. Licensed tour operator, Arusha.</p>
        <p>© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  )
}

export function HerculesBadge() {
  return (
    <aside aria-label="Built with Hercules" style={{
      position: 'fixed', bottom: 16, right: 16, zIndex: 9999, display: 'flex', alignItems: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: 13, fontWeight: 500, pointerEvents: 'none', userSelect: 'none',
      backgroundColor: '#1a1a1a', color: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,.2)', overflow: 'hidden',
    }}>
      <a href="https://hercules.app" target="_blank" rel="noopener noreferrer" aria-label="Built with Hercules"
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', textDecoration: 'none', color: 'inherit', whiteSpace: 'nowrap', pointerEvents: 'auto' }}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
          <path d="m7.99 0-7.01 9.38 6.02-.42-4.96 7.04 12.96-10-7.01.47 7.01-6.47z" />
        </svg>
        <span>Built with <strong>Hercules</strong></span>
      </a>
    </aside>
  )
}

/* ------------------------------------------------------------------ */
/* Trip card                                                           */
/* ------------------------------------------------------------------ */

export function TripCard({ trip, index = 0 }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: EASE }} whileHover="hover">
      <Link to={`/safaris/${trip.slug}`}
        className="group relative block aspect-[3/4] cursor-pointer overflow-hidden rounded-3xl bg-card">
        <motion.img src={trip.image} alt={trip.title} loading="lazy"
          className="absolute inset-0 size-full object-cover"
          variants={{ hover: { scale: 1.1 } }} transition={{ duration: 0.9, ease: EASE }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <span className="absolute top-5 left-5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium tracking-wider text-white uppercase backdrop-blur-md">
          {trip.category}
        </span>
        <motion.span className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-primary text-primary-foreground"
          variants={{ hover: { rotate: 45, scale: 1.1 } }}>
          <ArrowUpRight className="size-5" />
        </motion.span>
        <div className="absolute inset-x-0 bottom-0 p-7 text-white">
          <div className="mb-3 flex items-center gap-4 text-sm text-white/75">
            <span className="flex items-center gap-1.5"><Clock className="size-4" />{trip.days} days</span>
            <span>from {formatPrice(trip.priceFrom)}</span>
          </div>
          <h3 className="font-serif text-3xl font-light">{trip.title}</h3>
          <p className="mt-2 text-sm text-white/75">{trip.blurb}</p>
        </div>
      </Link>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Simple "coming next" section                                        */
/* ------------------------------------------------------------------ */

export function ComingNext({ message }) {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-32 text-center">
      <p className="text-lg text-muted-foreground">{message}</p>
      <Button to="/safaris" size="lg" className="mt-8">Browse safaris</Button>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Count-up                                                            */
/* ------------------------------------------------------------------ */

export function CountUp({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const count = useMotionValue(0)
  const display = useTransform(count, (v) => `${Math.round(v)}${suffix}`)
  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration: 2.2, ease: 'easeOut' })
    return () => controls.stop()
  }, [inView, count, value])
  return <motion.span ref={ref}>{display}</motion.span>
}
