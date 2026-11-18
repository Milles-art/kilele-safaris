import { useEffect } from 'react'
import { RouterProvider, useLocation } from './router.jsx'
import { Footer, Header } from './components.jsx'
import Home from './pages/Home.jsx'
import Safaris from './pages/Safaris.jsx'
import SafariDetail from './pages/SafariDetail.jsx'
import Destinations from './pages/Destinations.jsx'
import { About, Contact } from './pages/Simple.jsx'
import { getTrip } from './data.js'

function Routes() {
  const { pathname } = useLocation()

  const slug = pathname.startsWith('/safaris/') ? pathname.split('/')[2] : null
  const trip = slug ? getTrip(slug) : null

  useEffect(() => {
    const meta = {
      '/': {
        title: 'Kilele Safaris | Tanzania Safaris, Kilimanjaro & Zanzibar',
        description: 'Wildlife safaris, Kilimanjaro climbs and Zanzibar escapes, guided by people born in Tanzania.',
      },
      '/safaris': {
        title: 'Safaris & Tours | Kilele Safaris',
        description: 'Private Tanzania safaris, Kilimanjaro treks and Zanzibar beach escapes. Tailor-made, with local guides.',
      },
      '/destinations': {
        title: 'Destinations | Kilele Safaris',
        description: 'Serengeti, Ngorongoro, Tarangire, Kilimanjaro, Zanzibar and the wild south: where to go in Tanzania and the best months for each.',
      },
      '/about': {
        title: 'About us | Kilele Safaris',
        description: 'Born under Kilimanjaro. Meet the Tanzanian guides behind Kilele Safaris and the promises we keep on every trip.',
      },
      '/contact': {
        title: 'Contact | Kilele Safaris',
        description: 'Tell us where your wild begins. Send a private safari enquiry and a local trip designer will reply within 24 hours.',
      },
    }
    const current = trip
      ? { title: `${trip.title} | Kilele Safaris`, description: trip.blurb }
      : meta[pathname] ?? meta['/']

    document.title = current.title
    const setMeta = (attr, value, content) => {
      let el = document.querySelector(`meta[${attr}="${value}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, value)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }
    setMeta('name', 'description', current.description)
    setMeta('property', 'og:title', current.title)
    setMeta('property', 'og:description', current.description)
  }, [pathname, trip])

  let page
  if (pathname === '/') page = <Home />
  else if (pathname === '/safaris') page = <Safaris />
  else if (trip) page = <SafariDetail slug={slug} />
  else if (pathname === '/destinations') page = <Destinations />
  else if (pathname === '/about') page = <About />
  else if (pathname === '/contact') page = <Contact />
  else page = <Home />

  return (
    <div className="overflow-x-clip bg-background">
      <Header />
      <main>{page}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return <RouterProvider><Routes /></RouterProvider>
}
