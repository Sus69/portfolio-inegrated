import { useEffect, useState } from 'react'
import '../styles/loading.css'

type LoadingScreenProps = {
  onDone: () => void
}

/**
 * Loading screen shown before everything else.
 * Carries the in-development disclaimer: the portfolio is a work in
 * progress, so the current design choices should not be judged yet.
 * Dismisses via the Enter button, or automatically shortly after the
 * page has loaded. Unmounts completely once dismissed.
 */
export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  const dismiss = () => {
    if (leaving) return
    setLeaving(true)
    window.setTimeout(() => {
      setGone(true)
      onDone()
    }, 550)
  }

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Auto-dismiss shortly after load; faster when reduced motion is on.
    const delay = reduced ? 600 : 2400
    const timer = window.setTimeout(dismiss, delay)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (gone) return null

  return (
    <div
      className={`loading-screen${leaving ? ' loading-screen--leaving' : ''}`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="loading-screen__inner">
        <p className="loading-screen__eyebrow">Manaal Maple — Portfolio</p>
        <h1 className="loading-screen__title">
          Manaal
          <span> Maple</span>
        </h1>

        <div className="loading-screen__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <p className="loading-screen__disclaimer">
          This portfolio is still in development. The current design choices
          are a work in progress — please don&rsquo;t judge them yet. This site
          is shared just for more information.
        </p>

        <button
          type="button"
          className="loading-screen__enter"
          onClick={dismiss}
        >
          Enter portfolio →
        </button>

        <p className="loading-screen__note">a cat supervised this build</p>
      </div>
    </div>
  )
}
