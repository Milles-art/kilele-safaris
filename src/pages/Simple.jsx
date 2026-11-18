import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IMG, EASE, site, trips } from '../data.js'
import {
  Button, CountUp, Compass, Heart, Languages, Leaf, Mail, MapPin, MessageCircle,
  Minus, Phone, Plus, ChevronDown, Send, SectionHeading, Clock, Timer, Users, Check,
  PageHero, Reveal, useScrollProgress, mapRange,
} from '../components.jsx'
import { Link } from '../router.jsx'

/* ================================================================== */
/* About                                                               */
/* ================================================================== */

const story = 'We grew up in the shadow of Kilimanjaro, listening to lions at night and learning every track in the dust. Kilele Safaris began with one Land Cruiser and a simple promise: show travellers our home the way we know it, and make sure the parks and the people around them are better for every visit.'

const timeline = [
  { year: '2014', title: 'One vehicle, one dream', text: 'Founder Baraka Mollel starts guiding from Arusha with a single Land Cruiser.' },
  { year: '2016', title: 'First summit team', text: 'Our own Kilimanjaro crew forms, paying porters above park-recommended wages.' },
  { year: '2019', title: 'Going south', text: 'We open routes to Ruaha and Nyerere, far from the crowds of the north.' },
  { year: '2022', title: 'Trees for trips', text: 'Every traveller now plants ten trees with our partner villages.' },
  { year: 'Today', title: '48 local guides', text: 'Every guide is Tanzanian, and 1 in 3 is a woman.' },
]

const promises = [
  { Icon: Compass, title: 'Born here, not posted here', text: 'Every guide grew up in Tanzania and speaks Swahili, Maa or Chagga at home.' },
  { Icon: Leaf, title: 'Light footprint', text: 'Small groups, off-road rules respected, and solar-powered fly camps.' },
  { Icon: Users, title: 'Fair to every hand', text: 'Porters, cooks and drivers earn fair wages, with insurance and proper gear.' },
  { Icon: Heart, title: 'Private by default', text: 'Your own vehicle and guide, with no strangers and no fixed schedules.' },
]

const givingStats = [
  { value: 42000, suffix: '', label: 'Trees planted' },
  { value: 12, suffix: '', label: 'Partner villages' },
  { value: 10, suffix: '%', label: 'Of profit to conservation' },
  { value: 260, suffix: '', label: 'School bursaries funded' },
]

const guides = [
  {
    name: 'Baraka Mollel', role: 'Founder & head guide', years: 22, languages: 'Swahili, Maa, English',
    bio: 'Can name a bird by its call from 200 metres. Has spotted over 3,000 leopards and still gets excited every time.',
    image: '/images/guide-baraka.avif',
  },
  {
    name: 'Neema Lyimo', role: 'Senior safari guide', years: 9, languages: 'Swahili, Chagga, English, German',
    bio: 'Trained as a wildlife biologist. Leads our women-only and photography safaris across the Serengeti.',
    image: '/images/guide-neema.avif',
  },
  {
    name: 'Emmanuel Shirima', role: 'Lead mountain guide', years: 14, languages: 'Swahili, Chagga, English, French',
    bio: 'More than 300 summits of Kilimanjaro. Wilderness first responder and the calmest voice at 5,000 m.',
    image: '/images/guide-emmanuel.avif',
  },
]

function StorySection() {
  const ref = useRef(null)
  const progress = useScrollProgress(ref, ['start 85%', 'end 45%'])
  const words = story.split(' ')
  return (
    <section className="mx-auto max-w-5xl px-5 py-24 md:px-8 md:py-36">
      <p className="mb-8 text-sm font-medium tracking-[0.3em] text-accent uppercase">Our story</p>
      <p ref={ref} className="font-serif text-3xl leading-snug font-light md:text-5xl md:leading-tight">
        {words.map((word, i) => (
          <StoryWord key={`${word}-${i}`} word={word} progress={progress}
            range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </p>
    </section>
  )
}

function StoryWord({ word, progress, range }) {
  const opacity = mapRange(progress, range[0], range[1], 0.18, 1)
  return <span style={{ opacity }} className="inline-block pr-[0.28em]">{word}</span>
}

function Timeline() {
  const ref = useRef(null)
  const progress = useScrollProgress(ref, ['start 70%', 'end 60%'])
  const lineScale = mapRange(progress, 0, 1, 0, 1)
  return (
    <section className="bg-secondary/60 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="The journey so far" title="From one Land Cruiser to forty-eight guides." />
        <div ref={ref} className="relative mt-16 md:mt-24">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-foreground/10 md:left-1/2" />
          <div style={{ transform: `scaleY(${lineScale})` }}
            className="absolute top-0 bottom-0 left-4 w-px origin-top bg-primary md:left-1/2" />
          <ol className="space-y-14">
            {timeline.map((item, i) => {
              const right = i % 2 === 1
              return (
                <motion.li key={item.year} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.8, ease: EASE }}
                  className="relative grid pl-12 md:grid-cols-2 md:pl-0">
                  <span className="absolute top-2 left-4 size-3.5 -translate-x-1/2 rounded-full border-2 border-background bg-accent md:left-1/2" />
                  <div className={right ? 'md:col-start-2 md:pl-14' : 'md:pr-14 md:text-right'}>
                    <p className="font-serif text-4xl font-light text-accent">{item.year}</p>
                    <h3 className="mt-1 text-xl font-medium">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.text}</p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Promises() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading eyebrow="What we stand for" title="Four promises we keep on every trip." />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map(({ Icon, title, text }, i) => (
          <motion.div key={title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
            whileHover={{ y: -8 }} className="rounded-3xl bg-card p-7 shadow-sm">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/20 text-accent">
              <Icon className="size-6" />
            </span>
            <h3 className="mt-6 font-serif text-2xl">{title}</h3>
            <p className="mt-3 text-muted-foreground">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function GivingBack() {
  const ref = useRef(null)
  const progress = useScrollProgress(ref, ['start end', 'end start'])
  const imageY = mapRange(progress, 0, 1, '-10%', '10%')
  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.img src="/images/community.avif" alt="Villagers and children planting tree seedlings"
        loading="lazy" style={{ y: imageY }}
        className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-black/55 to-black/75" />
      <div className="relative mx-auto max-w-7xl px-5 py-36 text-white md:px-8 md:py-48">
        <Reveal className="max-w-3xl">
          <p className="mb-4 text-sm font-medium tracking-[0.3em] text-primary uppercase">Giving back</p>
          <h2 className="font-serif text-4xl leading-tight font-light text-balance md:text-6xl">Every safari plants a forest.</h2>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Ten trees for every traveller, school bursaries in the villages around the parks, and a share of every booking for anti-poaching rangers.
          </p>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {givingStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <p className="font-serif text-4xl font-light text-primary md:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-white/75">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Guides() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading eyebrow="Meet the guides" title="The people who'll find your leopard." />
        <p className="max-w-sm text-muted-foreground">A few of the 48 guides, cooks and mountain crew who make every trip.</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {guides.map((guide, i) => (
          <motion.article key={guide.name} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
            whileHover="hover" className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-card">
            <motion.img src={guide.image} alt={guide.name} loading="lazy"
              className="absolute inset-0 size-full object-cover"
              variants={{ hover: { scale: 1.06 } }} transition={{ duration: 0.8, ease: EASE }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white">
              <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">{guide.role}</p>
              <h3 className="mt-1 font-serif text-3xl font-light">{guide.name}</h3>
              <p className="mt-3 text-sm text-white/80">{guide.bio}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/70">
                <span className="flex items-center gap-1.5"><Timer className="size-3.5" />{guide.years} years guiding</span>
                <span className="flex items-center gap-1.5"><Languages className="size-3.5" />{guide.languages}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Born under Kilimanjaro."
        description={'Kilele means “summit” in Swahili. We\'re a family of Tanzanian guides who\'ve spent our lives on these plains and mountains.'}
        image="/images/team.avif" />
      <StorySection />
      <Timeline />
      <Promises />
      <GivingBack />
      <Guides />
      <section className="mx-auto max-w-4xl px-5 pb-32 text-center md:px-8">
        <h2 className="font-serif text-4xl font-light text-balance md:text-5xl">Ready to meet us on the plains?</h2>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/contact" size="lg" className="h-12 rounded-full px-7 text-base">Plan my trip</Button>
          <Button to="/safaris" size="lg" variant="secondary" className="h-12 rounded-full px-7 text-base">Browse safaris</Button>
        </div>
      </section>
    </>
  )
}

/* ================================================================== */
/* Contact                                                             */
/* ================================================================== */

const fieldClass = 'h-11 w-full min-w-0 rounded-xl border border-input bg-card px-2.5 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm'
const labelClass = 'flex items-center gap-2 text-sm leading-none font-medium select-none'
const stepperClass = 'inline-flex shrink-0 items-center justify-center rounded-full border border-transparent size-8 transition-all hover:bg-muted hover:text-foreground'

function Stepper({ value, onChange, label }) {
  return (
    <div className="flex h-11 items-center justify-between rounded-xl border border-input bg-card px-1.5">
      <button type="button" aria-label={`Fewer ${label}`} onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value === 0} className={stepperClass}><Minus className="size-4" /></button>
      <span className="min-w-8 text-center font-medium tabular-nums" aria-live="polite">{value}</span>
      <button type="button" aria-label={`More ${label}`} onClick={() => onChange(value + 1)} className={stepperClass}>
        <Plus className="size-4" />
      </button>
    </div>
  )
}

function FieldError({ message }) {
  if (!message) return null
  return <p className="text-sm text-destructive">{message}</p>
}

function EnquiryForm() {
  const [trip, setTrip] = useState('')
  const [arrival, setArrival] = useState('')
  const [departure, setDeparture] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [ref, setRef] = useState('')
  const [errors, setErrors] = useState({})

  const reset = () => {
    setTrip(''); setArrival(''); setDeparture(''); setAdults(2); setChildren(0)
    setErrors({}); setRef(''); setSent(false)
  }

  const submit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSending(true)

    const form = new FormData(e.currentTarget)
    const payload = {
      trip: trip || undefined,
      arrivalDate: arrival || undefined,
      departureDate: departure || undefined,
      adults,
      children,
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone') || undefined,
      message: form.get('message') || undefined,
      website: form.get('website') || '',
    }

    // Basic client-side checks so we don't bother the server for obvious mistakes.
    const local = {}
    if (!payload.name || payload.name.trim().length < 2) local.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(payload.email || '')) local.email = 'Please enter a valid email address.'
    if (arrival && departure && departure < arrival) local.departureDate = 'Departure must be after arrival.'
    if (Object.keys(local).length) {
      setErrors(local)
      setSending(false)
      return
    }

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        // DRF returns { field: ["message"] } - flatten to { field: "message" }
        const flat = {}
        Object.entries(data).forEach(([key, value]) => {
          flat[key] = Array.isArray(value) ? value.join(' ') : String(value)
        })
        setErrors(flat)
        return
      }
      setRef(data.id)
      setSent(true)
    } catch (err) {
      setErrors({ non_field_errors: 'Could not reach the server. Please try again.' })
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-[2rem] border bg-card/70 p-6 text-center shadow-xl shadow-foreground/5 backdrop-blur md:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary/20 text-accent">
          <Check className="size-7" />
        </span>
        <h2 className="mt-6 font-serif text-3xl font-light md:text-4xl">Asante, thank you.</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Your enquiry is with our team. A local trip designer will reply within 24 hours.
        </p>
        <p className="mt-2 font-mono text-xs text-muted-foreground">Reference: {ref}</p>
        <Button variant="secondary" className="mt-8" onClick={reset}>Send another enquiry</Button>
      </div>
    )
  }

  return (
    <div className="rounded-[2rem] border bg-card/70 p-6 shadow-xl shadow-foreground/5 backdrop-blur md:p-10">
      <h2 className="font-serif text-3xl font-light md:text-4xl">Send an enquiry</h2>
      <p className="mt-2 text-muted-foreground">A local trip designer replies within 24 hours. No payment needed.</p>
      <form onSubmit={submit} className="mt-8 grid gap-6" noValidate>
        {/* Honeypot: hidden from humans, bots fill it in. */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="trip" className={labelClass}>Which trip?</label>
          <div className="relative">
            <select id="trip" value={trip} onChange={(e) => setTrip(e.target.value)}
              className={`${fieldClass} h-11 appearance-none rounded-xl pr-10 cursor-pointer`}>
              <option value="">Not sure yet, help me choose</option>
              {trips.map((t) => <option key={t.slug} value={t.slug}>{t.title}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute top-3.5 right-3 size-4 text-muted-foreground" />
          </div>
          <FieldError message={errors.trip} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="arrivalDate" className={labelClass}>Arrival</label>
            <input id="arrivalDate" type="date" name="arrivalDate" value={arrival} onChange={(e) => setArrival(e.target.value)}
              className={`${fieldClass} cursor-pointer`} />
            <FieldError message={errors.arrivalDate} />
          </div>
          <div className="grid gap-2">
            <label htmlFor="departureDate" className={labelClass}>Departure</label>
            <input id="departureDate" type="date" name="departureDate" value={departure} onChange={(e) => setDeparture(e.target.value)}
              className={`${fieldClass} cursor-pointer`} />
            <FieldError message={errors.departureDate} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <label className={labelClass}>Adults</label>
            <Stepper label="adults" value={adults} onChange={setAdults} />
          </div>
          <div className="grid gap-2">
            <label className={labelClass}>Children (under 16)</label>
            <Stepper label="children" value={children} onChange={setChildren} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="name" className={labelClass}>Your name</label>
            <input id="name" name="name" placeholder="Amara Johnson" autoComplete="name"
              aria-invalid={!!errors.name}
              className={`${fieldClass} ${errors.name ? 'border-destructive' : ''}`} />
            <FieldError message={errors.name} />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className={labelClass}>Email</label>
            <input id="email" name="email" type="email" placeholder="amara@gmail.com" autoComplete="email"
              aria-invalid={!!errors.email}
              className={`${fieldClass} ${errors.email ? 'border-destructive' : ''}`} />
            <FieldError message={errors.email} />
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="phone" className={labelClass}>WhatsApp or phone <span className="font-normal text-muted-foreground">(optional)</span></label>
          <input id="phone" name="phone" type="tel" placeholder="+44 7700 900123" autoComplete="tel" className={fieldClass} />
          <FieldError message={errors.phone} />
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className={labelClass}>Tell us about your dream trip <span className="font-normal text-muted-foreground">(optional)</span></label>
          <textarea id="message" name="message" rows="4"
            placeholder="Honeymoon, love big cats, would like one night under the stars..."
            className={`${fieldClass} min-h-16 py-2`} />
          <FieldError message={errors.message} />
        </div>

        {(errors.detail || errors.non_field_errors) && (
          <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errors.detail || errors.non_field_errors}
          </div>
        )}

        <button type="submit" disabled={sending}
          className="group/button inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-primary px-2.5 text-base font-medium whitespace-nowrap text-primary-foreground transition-all hover:bg-primary/80 disabled:opacity-60 h-12 sm:w-fit sm:px-8">
          <Send className="size-4" /> {sending ? 'Sending…' : 'Send enquiry'}
        </button>
      </form>
    </div>
  )
}

const contactCards = [
  { Icon: MessageCircle, label: 'WhatsApp', value: '+255 768 641 810', note: 'Fastest reply, usually within the hour', href: 'https://wa.me/255768641810' },
  { Icon: Mail, label: 'Email', value: 'hello@kilelesafaris.com', note: 'For detailed plans and quotes', href: 'mailto:hello@kilelesafaris.com' },
  { Icon: Phone, label: 'Call us', value: '+255 768 641 810', note: 'Mon to Sat, 8am to 6pm (EAT)', href: 'tel:+255768641810' },
  { Icon: MapPin, label: 'Visit the office', value: 'Njiro Road, Arusha, Tanzania', note: 'Coffee is on us' },
]

function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium tracking-[0.3em] text-accent uppercase">Talk to a human</p>
      <h2 className="font-serif text-3xl leading-tight font-light text-balance md:text-4xl">Prefer to chat? We're a message away.</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {contactCards.map(({ Icon, label, value, note, href }, i) => {
          const inner = (
            <>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-accent transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted-foreground">{label}</span>
                <span className="block truncate font-medium">{value}</span>
                <span className="block text-xs text-muted-foreground">{note}</span>
              </span>
            </>
          )
          return (
            <motion.li key={label} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}>
              {href ? (
                <a href={href} className="group flex cursor-pointer items-center gap-4 rounded-2xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg">{inner}</a>
              ) : (
                <div className="group flex items-center gap-4 rounded-2xl border bg-card p-4">{inner}</div>
              )}
            </motion.li>
          )
        })}
      </ul>
      <div className="mt-2 flex items-center gap-3 rounded-2xl bg-foreground p-5 text-background">
        <Clock className="size-5 shrink-0 text-primary" />
        <p className="text-sm text-background/80">
          Planning 6 to 12 months ahead gets you the best camps, especially for the July to October migration.
        </p>
      </div>
    </div>
  )
}

export function Contact() {
  return (
    <>
      <PageHero eyebrow="Plan your trip" title="Tell us where your wild begins."
        description="Share your dates and dreams. We'll shape a private journey around you, no payment needed to ask."
        image={IMG.camp} />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pt-8 pb-28 md:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <EnquiryForm />
        <ContactInfo />
      </section>
    </>
  )
}
