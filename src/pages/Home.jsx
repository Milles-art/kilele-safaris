import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
} from 'framer-motion'
import { IMG, animals, places, stats, EASE, trips } from '../data.js'
import {
  ArrowDown, ArrowRight, Binoculars, Camera, CountUp,
  FogLayer, MapPin, SectionHeading, Sparkle, Sunrise, TripCard, Button,
  Mail as MailIcon, MessageCircle, Phone as PhoneIcon,
  useScrollProgress, mapRange,
} from '../components.jsx'
import { Link } from '../router.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Wildlife />
      <Summit />
      <GameDrives />
      <Journeys />
      <Stats />
      <Contact />
    </>
  )
}

/* ---------------- Hero ---------------- */

function Hero() {
  const ref = useRef(null)
  const progress = useScrollProgress(ref, ['start start', 'end start'])
  const scale = mapRange(progress, 0, 1, 1.05, 1.35)
  const imgY = mapRange(progress, 0, 1, '0%', '18%')
  const textY = mapRange(progress, 0, 1, '0%', '60%')
  const textOpacity = mapRange(progress, 0, 0.7, 1, 0)
  const cloudY = mapRange(progress, 0, 1, '0%', '-40%')

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-background">
      <motion.div className="absolute inset-0" style={{ scale, y: imgY }}>
        <motion.img src={IMG.kilimanjaro}
          alt="Mount Kilimanjaro rising above a sea of clouds at dawn"
          className="size-full object-cover"
          initial={{ scale: 1.25 / 1.05 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: EASE }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-background" />
      <div style={{ transform: `translateY(${cloudY})` }} className="absolute inset-x-0 bottom-0 h-72">
        <FogLayer className="bottom-10 h-40" duration={60} opacity={0.55} />
        <FogLayer className="bottom-0 h-48" duration={40} reverse opacity={0.7} />
        <FogLayer className="-bottom-10 h-40" duration={28} opacity={0.85} />
      </div>

      <motion.div style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pt-20 text-white md:px-8">
        <motion.p initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md">
          <MapPin className="size-4 text-primary" />
          Tanzania · Safaris · Summits · Islands
        </motion.p>

        <h1 className="max-w-5xl font-serif text-6xl leading-[0.95] font-light tracking-tight text-balance sm:text-7xl md:text-8xl lg:text-9xl">
          {['Above', 'the', 'clouds,'].map((word, i) => (
            <span key={word} className="inline-block overflow-hidden pr-[0.25em] align-bottom">
              <motion.span className="inline-block" initial={{ y: '40%', rotate: 4 }} animate={{ y: '0%', rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}>{word}</motion.span>
            </span>
          ))}
          <br />
          <span className="inline-block overflow-hidden align-bottom">
            <motion.em className="inline-block font-normal text-primary" initial={{ y: '40%', rotate: 4 }}
              animate={{ y: '0%', rotate: 0 }} transition={{ duration: 1.1, delay: 0.55, ease: EASE }}>
              into the wild.
            </motion.em>
          </span>
        </h1>

        <motion.div initial={{ y: 24 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.8, ease: EASE }}
          className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
          <p className="max-w-md text-lg text-white/80">
            Handcrafted journeys through the Serengeti, up Kilimanjaro and onto Zanzibar's white sand, led by guides born here.
          </p>
          <a href="#journeys" className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary px-7 text-base font-medium whitespace-nowrap text-primary-foreground transition-all hover:bg-primary/80 h-12 w-fit">
            Explore journeys
          </a>
        </motion.div>
      </motion.div>

      <motion.a href="#wildlife" aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer text-white/80"
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
        <ArrowDown className="size-6" />
      </motion.a>
    </section>
  )
}

/* ---------------- Marquee ---------------- */

function Marquee() {
  const items = [...places, ...places]
  return (
    <div className="relative -rotate-1 overflow-hidden border-y border-border bg-primary py-5 text-primary-foreground">
      <motion.div className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
        {items.map((place, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-3xl italic md:text-5xl">
            {place}<Sparkle className="size-6 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ---------------- Wildlife ---------------- */

function AnimalCard({ animal, index, progress }) {
  const x = mapRange(progress, 0, 1, '-8%', '8%')
  return (
    <motion.article whileHover="hover"
      className="group relative h-[62vh] w-[78vw] shrink-0 cursor-pointer overflow-hidden rounded-3xl sm:w-[48vw] lg:w-[30vw]"
      style={{ rotate: index % 2 === 0 ? -1.5 : 1.5 }}>
      <div className="absolute inset-y-0 left-[-10%] w-[120%] max-w-none" style={{ transform: `translateX(${x})` }}>
        <motion.img src={animal.image} alt={animal.name} loading="lazy" className="size-full object-cover"
          variants={{ hover: { scale: 1.08 } }} transition={{ duration: 0.8, ease: EASE }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <span className="absolute top-5 left-5 rounded-full bg-black/40 px-3 py-1 font-mono text-xs text-white backdrop-blur">
        0{index + 1}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="font-serif text-lg text-primary italic">{animal.swahili}</p>
        <h3 className="font-serif text-4xl font-light md:text-5xl">{animal.name}</h3>
        <motion.p className="mt-2 max-w-xs text-sm text-white/80" initial={{ opacity: 0.7, y: 0 }}
          variants={{ hover: { opacity: 1, y: -4 } }}>{animal.fact}</motion.p>
      </div>
    </motion.article>
  )
}

function Wildlife() {
  const ref = useRef(null)
  const progress = useScrollProgress(ref)
  const x = mapRange(progress, 0, 1, '2%', '-68%')
  const progressWidth = mapRange(progress, 0, 1, '0%', '100%')

  return (
    <section id="wildlife" ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden">
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-5 md:px-8">
          <SectionHeading eyebrow="The Big Five & friends" title="Meet the locals." />
          <div className="hidden h-px w-48 bg-border md:block">
            <div className="h-full bg-primary" style={{ width: progressWidth }} />
          </div>
        </div>
        <div className="flex gap-6 pl-5 md:gap-10 md:pl-8" style={{ transform: `translateX(${x})` }}>
          {animals.map((animal, i) => <AnimalCard key={animal.name} animal={animal} index={i} progress={progress} />)}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Summit ---------------- */

function Summit() {
  const ref = useRef(null)
  const progress = useScrollProgress(ref, ['start start', 'end end'])
  const width = mapRange(progress, 0, 0.6, '38%', '100%')
  const height = mapRange(progress, 0, 0.6, '45%', '100%')
  const radius = mapRange(progress, 0, 0.6, 32, 0)
  const scale = mapRange(progress, 0, 1, 1.4, 1)
  const contentOpacity = mapRange(progress, 0.5, 0.75, 0, 1)
  const contentY = mapRange(progress, 0.5, 0.75, 60, 0)
  const introOpacity = mapRange(progress, 0, 0.25, 1, 0)

  return (
    <section id="summit" ref={ref} className="relative h-[250vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <p style={{ opacity: introOpacity }}
          className="absolute top-[12%] px-5 text-center font-serif text-2xl text-muted-foreground italic md:text-3xl">
          5,895 metres. One sunrise you'll never forget.
        </p>
        <div style={{ width, height, borderRadius: radius }} className="relative overflow-hidden">
          <div className="absolute inset-0" style={{ transform: `scale(${scale})` }}>
            <img src={IMG.savanna} alt="Giraffes silhouetted on the Serengeti at sunset" loading="lazy" className="size-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/35" />
          <div style={{ opacity: contentOpacity, transform: `translateY(${contentY}px)` }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <p className="mb-4 text-sm tracking-[0.3em] text-primary uppercase">Sunset on the Serengeti</p>
            <h2 className="max-w-4xl font-serif text-5xl leading-tight font-light text-balance md:text-7xl">
              Some views can't be photographed. Only lived.
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Game drives ---------------- */

function GameDriveImages() {
  const [index, setIndex] = useState(0)
  const slides = [IMG.gameDrive1, IMG.gameDrive2]
  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 8000)
    return () => window.clearInterval(id)
  }, [slides.length])
  return (
    <AnimatePresence initial={false}>
      <motion.img key={index} src={slides[index]}
        alt="Travellers in a safari vehicle watching animals graze on the savanna"
        className="absolute inset-0 size-full object-cover"
        initial={{ opacity: 0, scale: 1.18, x: index % 2 === 0 ? '-2%' : '2%' }}
        animate={{ opacity: 1, scale: 1.04, x: index % 2 === 0 ? '2%' : '-2%' }}
        exit={{ opacity: 0 }}
        transition={{ opacity: { duration: 1.8, ease: 'easeInOut' }, scale: { duration: 10, ease: 'linear' }, x: { duration: 10, ease: 'linear' } }} />
    </AnimatePresence>
  )
}

const perks = [
  { Icon: Sunrise, label: 'Dawn & dusk drives' },
  { Icon: Binoculars, label: 'Expert spotters' },
  { Icon: Camera, label: 'Photo-ready open roofs' },
]

function GameDrives() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  return (
    <section id="game-drives" className="px-3 py-3 md:px-5">
      <div ref={ref} className="relative flex min-h-[92vh] items-end overflow-hidden rounded-[2rem] bg-[#2a2118]">
        <GameDriveImages />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent" />
        <motion.span className="absolute top-6 left-6 flex items-center gap-2 rounded-full bg-black/40 px-4 py-1.5 text-xs tracking-widest text-white uppercase backdrop-blur-md md:top-8 md:left-8"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}>
          <motion.span className="size-2 rounded-full bg-red-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
          Live from the Serengeti
        </motion.span>

        <div className="relative z-10 w-full px-6 pt-32 pb-12 text-white md:px-14 md:pb-16">
          <motion.p className="mb-4 text-sm tracking-[0.3em] text-primary uppercase"
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: EASE }}>
            The game drive
          </motion.p>
          <motion.h2 className="max-w-4xl font-serif text-5xl leading-[1.02] font-light text-balance md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.1, delay: 0.1, ease: EASE }}>
            Quiet engines. Grazing herds. <em className="text-primary">Front-row seats.</em>
          </motion.h2>
          <motion.div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.3, ease: EASE }}>
            <div className="max-w-lg space-y-6">
              <p className="text-lg text-white/85">
                Our guides switch off the engine and let the wild come to you. Zebras crop the grass a few metres away, elephants stroll past, and all you hear is the wind.
              </p>
              <ul className="flex flex-wrap gap-3">
                {perks.map(({ Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                    <Icon className="size-4 text-primary" />{label}
                  </li>
                ))}
              </ul>
            </div>
            <a href="#contact" className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary px-7 text-base font-medium whitespace-nowrap text-primary-foreground transition-all hover:bg-primary/80 h-12 w-fit">
              Book a game drive
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Journeys ---------------- */

function Journeys() {
  return (
    <section id="journeys" className="mx-auto max-w-7xl px-5 py-28 md:px-8 md:py-40">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading eyebrow="Signature journeys" title="Choose your kind of wild." />
        <p className="max-w-sm text-muted-foreground">
          Every trip is private and tailor-made. Prices are per person and include park fees, lodges and your own guide.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {trips.slice(0, 3).map((trip, i) => <TripCard key={trip.slug} trip={trip} index={i} />)}
      </div>

      <div className="mt-12 flex justify-center">
        <Button to="/safaris" size="lg" variant="secondary">
          See all {trips.length} safaris <ArrowRight className="size-5" />
        </Button>
      </div>
    </section>
  )
}

/* ---------------- Stats ---------------- */

function Stats() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-5 py-20 md:grid-cols-4 md:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-5xl font-light text-accent md:text-6xl">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm tracking-widest text-muted-foreground uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------------- Contact ---------------- */

function Contact() {
  const ref = useRef(null)
  const progress = useScrollProgress(ref, ['start end', 'end end'])
  const imageY = mapRange(progress, 0, 1, '-20%', '0%')
  const items = [
    { Icon: MailIcon, label: 'hello@kilelesafaris.com', href: 'mailto:hello@kilelesafaris.com' },
    { Icon: PhoneIcon, label: '+255 768 641 810', href: 'tel:+255768641810' },
    { Icon: MapPin, label: 'Njiro Road, Arusha, Tanzania' },
  ]
  return (
    <section id="contact" ref={ref} className="relative overflow-hidden">
      <img src={IMG.camp} alt="Safari tents glowing under the Milky Way" loading="lazy"
        style={{ transform: `translateY(${imageY})` }} className="absolute inset-0 h-[120%] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-black/45 to-black/70" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 py-36 text-center text-white md:px-8 md:py-48">
        <motion.h2 initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="max-w-4xl font-serif text-5xl leading-tight font-light text-balance md:text-7xl">
          Your tent under the stars is <em className="text-primary">waiting.</em>
        </motion.h2>
        <p className="mt-6 max-w-lg text-lg text-white/80">Tell us your dates and dreams. A local trip designer replies within 24 hours.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="https://wa.me/255768641810" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-7 text-base font-medium whitespace-nowrap text-primary-foreground transition-all hover:bg-primary/80 h-12">
            <MessageCircle className="size-5" /> Chat on WhatsApp
          </a>
          <a href="mailto:hello@kilelesafaris.com"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-7 text-base font-medium whitespace-nowrap text-white backdrop-blur transition-all hover:bg-white/25 h-12">
            <MailIcon className="size-5" /> Email us
          </a>
        </div>
        <ul className="mt-14 flex flex-col gap-4 text-sm text-white/75 md:flex-row md:gap-10">
          {items.map(({ Icon, label, href }) => (
            <li key={label} className="flex items-center justify-center gap-2">
              <Icon className="size-4 text-primary" />
              {href ? <a href={href} className="cursor-pointer hover:text-white">{label}</a> : label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
