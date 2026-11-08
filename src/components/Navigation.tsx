import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

type SectionKey = 'home' | 'projects' | 'contact'

export function Navigation() {
  const [activeSection, setActiveSection] = useState<SectionKey>('home')
  const indicatorRef = useRef<HTMLDivElement>(null)
  const homeLinkRef = useRef<HTMLAnchorElement>(null)
  const projectsLinkRef = useRef<HTMLAnchorElement>(null)
  const contactLinkRef = useRef<HTMLAnchorElement>(null)
  const profileBtnRef = useRef<HTMLAnchorElement>(null)
  const xTo = useRef<gsap.QuickToFunc | null>(null)
  const yTo = useRef<gsap.QuickToFunc | null>(null)

  const linkRefs: Record<SectionKey, React.RefObject<HTMLAnchorElement | null>> = {
    home: homeLinkRef,
    projects: projectsLinkRef,
    contact: contactLinkRef,
  }

  // Setup magnetic quickTo for profile button
  useEffect(() => {
    if (!profileBtnRef.current) return
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!media.matches) return

    xTo.current = gsap.quickTo(profileBtnRef.current, 'x', { duration: 0.28, ease: 'power2.out' })
    yTo.current = gsap.quickTo(profileBtnRef.current, 'y', { duration: 0.28, ease: 'power2.out' })
  }, [])

  // Position sliding indicator
  const updateIndicator = (key: SectionKey, animate = true) => {
    const linkEl = linkRefs[key]?.current
    const indicatorEl = indicatorRef.current
    if (!linkEl || !indicatorEl) return

    const targetX = linkEl.offsetLeft
    const targetW = linkEl.offsetWidth

    if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(indicatorEl, { x: targetX, width: targetW, autoAlpha: 1 })
      return
    }

    gsap.killTweensOf(indicatorEl)
    gsap.to(indicatorEl, {
      x: targetX,
      width: targetW,
      autoAlpha: 1,
      duration: 0.34,
      ease: 'power3.out',
    })
  }

  useLayoutEffect(() => {
    updateIndicator(activeSection, false)
    const handleResize = () => updateIndicator(activeSection, false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    updateIndicator(activeSection, true)
  }, [activeSection])

  // Scroll detection to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      const contactEl = document.getElementById('contact')
      const projectsEl = document.getElementById('projects')

      if (contactEl && scrollY + windowHeight * 0.5 >= contactEl.offsetTop) {
        setActiveSection('contact')
      } else if (projectsEl && scrollY + windowHeight * 0.4 >= projectsEl.offsetTop) {
        setActiveSection('projects')
      } else {
        setActiveSection('home')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
    section: SectionKey
  ) => {
    e.preventDefault()
    setActiveSection(section)
    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Profile Button Magnetic Handlers
  const handleProfilePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (!profileBtnRef.current || !xTo.current || !yTo.current) return
    const rect = profileBtnRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.32
    const deltaY = (e.clientY - centerY) * 0.32
    xTo.current(deltaX)
    yTo.current(deltaY)
  }

  const handleProfilePointerLeave = () => {
    if (!profileBtnRef.current) return
    gsap.to(profileBtnRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 0.65,
      ease: 'elastic.out(1.2, 0.38)',
      overwrite: 'auto',
    })
  }

  const handlePressDown = (target: HTMLElement | null) => {
    if (!target) return
    gsap.to(target, { scale: 0.93, duration: 0.1, ease: 'power1.out' })
  }

  const handlePressUp = (target: HTMLElement | null) => {
    if (!target) return
    gsap.to(target, { scale: 1, duration: 0.25, ease: 'back.out(2)' })
  }

  return (
    <header className="portfolio-nav-header" role="banner">
      <nav className="nav-pill" aria-label="Main Navigation">
        <div className="nav-pill-indicator" ref={indicatorRef} aria-hidden="true" />
        <a
          ref={homeLinkRef}
          href="#hero"
          className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
          onClick={(e) => handleNavigate(e, 'hero', 'home')}
          onPointerDown={(e) => handlePressDown(e.currentTarget)}
          onPointerUp={(e) => handlePressUp(e.currentTarget)}
          onPointerCancel={(e) => handlePressUp(e.currentTarget)}
        >
          Home
        </a>
        <a
          ref={projectsLinkRef}
          href="#projects"
          className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
          onClick={(e) => handleNavigate(e, 'projects', 'projects')}
          onPointerDown={(e) => handlePressDown(e.currentTarget)}
          onPointerUp={(e) => handlePressUp(e.currentTarget)}
          onPointerCancel={(e) => handlePressUp(e.currentTarget)}
        >
          Projects
        </a>
        <a
          ref={contactLinkRef}
          href="#contact"
          className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={(e) => handleNavigate(e, 'contact', 'contact')}
          onPointerDown={(e) => handlePressDown(e.currentTarget)}
          onPointerUp={(e) => handlePressUp(e.currentTarget)}
          onPointerCancel={(e) => handlePressUp(e.currentTarget)}
        >
          Contact
        </a>
      </nav>

      <a
        ref={profileBtnRef}
        href="#contact"
        className="profile-btn"
        aria-label="About Manaal Maple"
        onClick={(e) => handleNavigate(e, 'contact', 'contact')}
        onPointerMove={handleProfilePointerMove}
        onPointerLeave={handleProfilePointerLeave}
        onPointerDown={(e) => handlePressDown(e.currentTarget)}
        onPointerUp={(e) => handlePressUp(e.currentTarget)}
        onPointerCancel={(e) => handlePressUp(e.currentTarget)}
      >
        <svg
          className="profile-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="8" r="4" stroke="#14245C" strokeWidth="2" />
          <path
            d="M4.5 20.5C4.5 16.634 7.858 13.5 12 13.5C16.142 13.5 19.5 16.634 19.5 20.5"
            stroke="#14245C"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </a>
    </header>
  )
}
