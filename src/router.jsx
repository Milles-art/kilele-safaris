import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const RouterContext = createContext(null)

export function RouterProvider({ children }) {
  const [location, setLocation] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
  }))

  useEffect(() => {
    const onPop = () => setLocation({ pathname: window.location.pathname, search: window.location.search })
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to, { replace = false } = {}) => {
    if (replace) window.history.replaceState({}, '', to)
    else window.history.pushState({}, '', to)
    setLocation({ pathname: window.location.pathname, search: window.location.search })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const value = useMemo(() => ({ ...location, navigate }), [location, navigate])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useLocation() {
  return useContext(RouterContext)
}

export function useSearchParams() {
  const { search, navigate } = useLocation()
  const params = new URLSearchParams(search)
  const setParam = (key, value) => {
    const next = new URLSearchParams(search)
    if (value === undefined || value === null || value === '') next.delete(key)
    else next.set(key, String(value))
    const qs = next.toString()
    navigate(window.location.pathname + (qs ? `?${qs}` : ''))
  }
  return [params, setParam]
}

export function Link({ to, onClick, children, ...rest }) {
  const { navigate } = useLocation()
  const handleClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    onClick?.(e)
    navigate(to)
  }
  return <a href={to} onClick={handleClick} {...rest}>{children}</a>
}
