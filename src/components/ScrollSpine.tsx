import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../styles/spine.css'

const SECTIONS = [
  { id: 'hero', index: '01', label: 'Hero' },
  { id: 'toolkit', index: '02', label: 'Toolkit' },
  { id: 'projects', index: '03', label: 'Projects' },
  { id: 'contact', index: '04', label: 'Contact' },
]

export const ScrollSpine = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const beadRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let resetTimeout: number | undefined

    const updateSpine = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0

      // Track travel distance: track height (220px) - bead height (18px) = 202px
      const travel = 202
      const targetY = progress * travel

      const dy = scrollY - lastScrollY
      lastScrollY = scrollY
      const velocity = Math.min(Math.abs(dy), 50)
      const scaleY = 1 + velocity * 0.016
      const scaleX = Math.max(1 - velocity * 0.007, 0.65)

      if (beadRef.current) {
        gsap.to(beadRef.current, {
          y: targetY,
          scaleY,
          scaleX,
          duration: 0.16,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        if (resetTimeout) clearTimeout(resetTimeout)
        resetTimeout = window.setTimeout(() => {
          if (beadRef.current) {
            gsap.to(beadRef.current, {
              scaleY: 1,
              scaleX: 1,
              duration: 0.35,
              ease: 'elastic.out(1.2, 0.4)',
              overwrite: 'auto',
            })
          }
        }, 70)
      }

      // Determine active section based on midpoint of screen
      const mid = scrollY + window.innerHeight * 0.45
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el && el.offsetTop <= mid) {
          setActiveSection(SECTIONS[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', updateSpine, { passive: true })
    updateSpine()

    return () => {
      window.removeEventListener('scroll', updateSpine)
      if (resetTimeout) clearTimeout(resetTimeout)
    }
  }, [])

  const handleNav = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="scroll-spine" aria-label="Page section navigation">
      <div className="spine-track" ref={trackRef}>
        <div className="spine-bead" ref={beadRef} aria-hidden="true" />
        <div className="spine-nodes">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              className={`spine-node ${activeSection === sec.id ? 'is-active' : ''}`}
              onClick={() => handleNav(sec.id)}
              aria-label={`Jump to ${sec.label} section`}
              data-cursor="pointer"
            >
              <span className="spine-dot" />
              <span className="spine-label">
                <span className="spine-label-index">{sec.index}</span>
                <span>{sec.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

