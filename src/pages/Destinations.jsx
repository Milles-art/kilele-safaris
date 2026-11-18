import { useRef } from 'react'
import { motion } from 'framer-motion'
import { destinations, months, IMG, getTrip, EASE } from '../data.js'
import { ArrowUpRight, PageHero, PawPrint, useScrollProgress, mapRange } from '../components.jsx'
import { useSearchParams, Link } from '../router.jsx'

const SEASON_COLORS = { 2: 'bg-primary', 1: 'bg-primary/40', 0: 'bg-foreground/10' }
const SEASON_LABELS = ['Quiet season', 'Good time to go', 'Peak season']

function SeasonGrid({ seasons, selectedMonth }) {
  return (
    <div className="grid grid-cols-12 gap-1">
      {seasons.map((rating, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <span className={`h-2.5 w-full rounded-full transition-all ${SEASON_COLORS[rating]} ${selectedMonth === i ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''}`} />
          <span className={`text-[10px] text-muted-foreground ${selectedMonth === i ? 'font-semibold text-accent' : ''}`}>
            {months[i][0]}
          </span>
        </div>
      ))}
    </div>
  )
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
      {[{ label: 'Peak', rating: 2 }, { label: 'Good', rating: 1 }, { label: 'Quiet / rainy', rating: 0 }].map(({ label, rating }) => (
        <span key={label} className="flex items-center gap-2">
          <span className={`h-2 w-5 rounded-full ${SEASON_COLORS[rating]}`} />{label}
        </span>
      ))}
    </div>
  )
}

function MonthPills({ selectedMonth, onSelect }) {
  const options = [undefined, ...months.map((_, i) => i)]
  return (
    <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none]">
      <div className="flex w-max gap-1 rounded-full bg-muted p-1">
        {options.map((m) => {
          const active = m === selectedMonth
          return (
            <button key={m ?? 'any'} type="button" onClick={() => onSelect(m)}
              className={`relative cursor-pointer rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${active
                ? 'text-primary-foreground' : 'text-foreground/65 hover:text-foreground'}`}>
              {active && (
                <motion.span layoutId="month-pill" className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{m === undefined ? 'Any month' : months[m]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function DestinationBody({ destination, index, selectedMonth }) {
  const ref = useRef(null)
  const progress = useScrollProgress(ref, ['start end', 'end start'])
  const imageY = mapRange(progress, 0, 1, '-8%', '8%')
  const reverse = index % 2 === 1
  const rating = selectedMonth === undefined ? undefined : destination.seasons[selectedMonth]
  const relatedTrips = destination.tripSlugs.map(getTrip).filter(Boolean)

  return (
    <section id={destination.slug} ref={ref}
      className={`grid scroll-mt-28 items-center gap-10 transition-opacity duration-500 md:gap-16 lg:grid-cols-2 ${rating === 0 ? 'opacity-45' : ''}`}>
      <motion.div
        initial={{ clipPath: 'inset(12% 12% 12% 12% round 2rem)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2, ease: EASE }}
        className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] ${reverse ? 'lg:order-2' : ''}`}>
        <motion.img src={destination.image} alt={destination.name} loading="lazy"
          style={{ y: imageY }} className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <p className="font-serif text-4xl font-light">{destination.fact.value}</p>
          <p className="text-sm text-white/75">{destination.fact.label}</p>
        </div>
        {rating !== undefined && (
          <span className={`absolute top-5 right-5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md ${rating === 2 ? 'bg-primary text-primary-foreground' : 'bg-black/40 text-white'}`}>
            {SEASON_LABELS[rating]} in {months[selectedMonth]}
          </span>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
        className="min-w-0">
        <p className="text-sm font-medium tracking-[0.3em] text-accent uppercase">
          {String(index + 1).padStart(2, '0')} · {destination.region}
        </p>
        <h2 className="mt-3 font-serif text-5xl font-light md:text-6xl">{destination.name}</h2>
        <p className="mt-2 font-serif text-xl text-muted-foreground italic">{destination.tagline}</p>
        <p className="mt-6 text-foreground/80">{destination.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {destination.wildlife.map((w) => (
            <li key={w} className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm">
              <PawPrint className="size-3.5 text-accent" />{w}
            </li>
          ))}
        </ul>
        <div className="mt-8 rounded-2xl bg-card p-5 shadow-sm">
          <p className="mb-4 text-xs font-medium tracking-wider text-muted-foreground uppercase">When to go</p>
          <SeasonGrid seasons={destination.seasons} selectedMonth={selectedMonth} />
          <p className="mt-4 text-sm text-muted-foreground">{destination.seasonNote}</p>
        </div>
        {relatedTrips.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {relatedTrips.map((trip) => (
              <Link key={trip.slug} to={`/safaris/${trip.slug}`}
                className="group flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:bg-primary/10">
                {trip.title}<ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}

export default function Destinations() {
  const [params, setParam] = useSearchParams()
  const rawMonth = params.get('month')
  const selectedMonth = rawMonth === null || rawMonth === '' ? undefined : Number(rawMonth)
  const best = selectedMonth === undefined ? [] : destinations.filter((d) => d.seasons[selectedMonth] === 2)

  return (
    <>
      <PageHero eyebrow="Destinations" title="Eight wild places. One unforgettable country."
        description="From volcano craters to coral sandbanks. Pick your travel month and we'll show you where Tanzania is at its best."
        image={IMG.savanna}>
        <nav className="mt-8 flex flex-wrap gap-2">
          {destinations.map((d) => (
            <a key={d.slug} href={`#${d.slug}`}
              className="cursor-pointer rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm backdrop-blur-md transition-colors hover:bg-white/25">
              {d.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="sticky top-[68px] z-30 border-b border-border bg-background/85 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          <MonthPills selectedMonth={selectedMonth} onSelect={(m) => setParam('month', m)} />
          <Legend />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {selectedMonth !== undefined && (
          <p className="pt-10 text-lg">
            <span className="font-serif text-2xl">In {months[selectedMonth]}</span>
            <span className="text-muted-foreground">
              {best.length > 0
                ? ` the best places to go are ${best.map((d) => d.name).join(', ')}.`
                : ' most parks are green and quiet, which means fewer crowds and lower prices.'}
            </span>
          </p>
        )}
        <div className="space-y-28 py-20 md:space-y-40 md:py-28">
          {destinations.map((d, i) => (
            <DestinationBody key={d.slug} destination={d} index={i} selectedMonth={selectedMonth} />
          ))}
        </div>
      </div>
    </>
  )
}
