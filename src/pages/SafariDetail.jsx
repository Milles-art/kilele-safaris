import { motion } from 'framer-motion'
import { formatPrice, getTrip, site, trips, EASE } from '../data.js'
import {
  ArrowLeft, ArrowUpRight, CalendarDays, Check, Clock, MessageCircle,
  PageHero, SectionHeading, TripCard, Users, Button,
} from '../components.jsx'
import { Link } from '../router.jsx'

function Itinerary({ days }) {
  return (
    <ol className="relative">
      {days.map((item, i) => (
        <motion.li key={item.day}
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
          className="relative grid grid-cols-[2.5rem_1fr] gap-5 pb-10 last:pb-0">
          {i < days.length - 1 && (
            <motion.span aria-hidden className="absolute top-10 left-5 w-px origin-top bg-primary/50"
              style={{ bottom: 0 }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3 }} />
          )}
          <span className="relative grid size-10 place-items-center rounded-full bg-primary font-serif text-sm font-semibold text-primary-foreground">
            {i + 1}
          </span>
          <div className="pt-1.5">
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">{item.day}</p>
            <h3 className="mt-1 font-serif text-2xl">{item.title}</h3>
            <p className="mt-2 text-muted-foreground">{item.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}

export default function SafariDetail({ slug }) {
  const trip = getTrip(slug)
  if (!trip) return null

  const facts = [
    { Icon: Clock, label: 'Duration', value: `${trip.days} days` },
    { Icon: CalendarDays, label: 'Best time', value: trip.bestTime },
    { Icon: Users, label: 'Group', value: trip.groupSize },
  ]
  const related = trips.filter((t) => t.slug !== trip.slug).slice(0, 3)
  const waText = encodeURIComponent(`Hi Kilele Safaris, I'm interested in "${trip.title}".`)

  return (
    <>
      <PageHero eyebrow={trip.category} title={trip.title} description={trip.blurb} image={trip.image}>
        <Link to="/safaris" className="mt-8 inline-flex cursor-pointer items-center gap-2 text-sm text-white/80 hover:text-white">
          <ArrowLeft className="size-4" /> All safaris
        </Link>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 pb-28 md:px-8 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-20">
          <div className="grid gap-4 sm:grid-cols-3">
            {facts.map(({ Icon, label, value }) => (
              <div key={label} className="rounded-2xl bg-card p-5 shadow-sm">
                <Icon className="size-5 text-accent" />
                <p className="mt-3 text-xs tracking-wider text-muted-foreground uppercase">{label}</p>
                <p className="mt-1 font-medium">{value}</p>
              </div>
            ))}
          </div>

          <div>
            <SectionHeading eyebrow="Highlights" title="What you'll remember." />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {trip.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 rounded-2xl bg-secondary px-5 py-4">
                  <span className="size-2 shrink-0 rounded-full bg-primary" />{h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading eyebrow="Day by day" title="The journey." />
            <div className="mt-10"><Itinerary days={trip.itinerary} /></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-serif text-2xl">Included</h3>
              <ul className="mt-4 space-y-3">
                {trip.included.map((item) => (
                  <li key={item} className="flex gap-3"><Check className="mt-0.5 size-5 shrink-0 text-chart-3" />{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl">Not included</h3>
              <ul className="mt-4 space-y-3 text-muted-foreground">
                {trip.excluded.map((item) => (
                  <li key={item} className="flex gap-3"><ArrowUpRight className="mt-0.5 size-5 shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-foreground p-8 text-background shadow-xl">
            <p className="text-sm text-background/60">From, per person</p>
            <p className="mt-1 font-serif text-5xl font-light">{formatPrice(trip.priceFrom)}</p>
            <p className="mt-4 text-sm text-background/70">
              Private trip with your own guide. Dates, lodges and pace can all be changed.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Button to="/contact" size="lg" className="h-12 rounded-full text-base">Enquire about this trip</Button>
              <a href={`${site.whatsapp}?text=${waText}`} target="_blank" rel="noreferrer"
                className="group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-background/10 px-7 text-base font-medium whitespace-nowrap text-background transition-all hover:bg-background/20 hover:text-background h-12">
                <MessageCircle className="size-5" /> Ask on WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-32 md:px-8">
        <SectionHeading eyebrow="Keep exploring" title="You might also love." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {related.map((t, i) => <TripCard key={t.slug} trip={t} index={i} />)}
        </div>
      </section>
    </>
  )
}
