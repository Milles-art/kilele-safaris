import { motion, AnimatePresence } from 'framer-motion'
import { categories, IMG, trips } from '../data.js'
import { PageHero, TripCard } from '../components.jsx'
import { useSearchParams, Link } from '../router.jsx'

export default function Safaris() {
  const [params, setParam] = useSearchParams()
  const type = params.get('type') || undefined
  const filtered = type ? trips.filter((t) => t.category === type) : trips

  return (
    <>
      <PageHero
        eyebrow="Safaris & tours"
        title="Every road leads somewhere wild."
        description="Six signature journeys, each one private and reshaped around you. Pick a starting point and we'll tailor the rest."
        image={IMG.gameDrive1}
      />

      <section className="mx-auto max-w-7xl px-5 pb-32 md:px-8">
        <div className="flex flex-wrap gap-2">
          {[undefined, ...categories].map((category) => {
            const active = category === type
            return (
              <button key={category ?? 'all'} type="button" onClick={() => setParam('type', category)}
                className={`relative cursor-pointer rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${active
                  ? 'text-primary-foreground' : 'bg-muted text-foreground/70 hover:text-foreground'}`}>
                {active && (
                  <motion.span layoutId="trip-filter" className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{category ?? 'All trips'}</span>
              </button>
            )
          })}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'journey' : 'journeys'} · prices per person, park fees included
        </p>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((trip, i) => <TripCard key={trip.slug} trip={trip} index={i} />)}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  )
}
