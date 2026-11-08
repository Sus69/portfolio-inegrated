import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import '../styles/cursor.css'

export const CustomCursor = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [labelText, setLabelText] = useState('')

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const container = containerRef.current
    const dot = dotRef.current
    const ring = ringRef.current

    if (!container || !dot || !ring) return

    // Pre-allocated high performance quickTo setters
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power3' })
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power3' })
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power2.out' })
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power2.out' })

    let lastX = 0
    let lastY = 0
    let stopTimeout: number | undefined
    let isHovering = false
    let isExpanding = false
    let isCrosshair = false
    let isPressed = false
    let hasMoved = false

    const handlePointerMove = (e: PointerEvent) => {
      // Ignore touch gestures so mobile experiences remain native
      if (e.pointerType === 'touch') return
      const { clientX: x, clientY: y } = e

      if (!hasMoved) {
        hasMoved = true
        document.body.classList.add('has-custom-cursor')
        container.classList.add('is-active')
        // Instant snap on first move so it doesn't animate from (0,0)
        gsap.set([dot, ring], { x, y })
        lastX = x
        lastY = y
        return
      }

      setDotX(x)
      setDotY(y)
      setRingX(x)
      setRingY(y)

      const dx = x - lastX
      const dy = y - lastY
      const speed = Math.hypot(dx, dy)
      lastX = x
      lastY = y

      if (stopTimeout) clearTimeout(stopTimeout)

      // Velocity squash & stretch when moving naturally without state lock
      if (!isHovering && !isExpanding && !isCrosshair && !isPressed) {
        if (speed > 1.5) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI)
          const scaleX = 1 + Math.min(speed * 0.012, 0.45)
          const scaleY = 1 - Math.min(speed * 0.008, 0.25)

          gsap.to(ring, {
            scaleX,
            scaleY,
            rotation: angle,
            duration: 0.14,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        stopTimeout = window.setTimeout(() => {
          if (!isHovering && !isExpanding && !isCrosshair && !isPressed) {
            gsap.to(ring, {
              scaleX: 1,
              scaleY: 1,
              rotation: 0,
              duration: 0.35,
              ease: 'power3.out',
              overwrite: 'auto',
            })
          }
        }, 50)
      }
    }

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const projectTarget = target.closest<HTMLElement>(
        '.project-char, .project-letter, .preview-trigger, [data-cursor="expand"]'
      )
      const reticleTarget = target.closest<HTMLElement>(
        '.retro-computer, .retro-computer-wrapper, .theme-cat, [class*="theme-cat"], [data-cursor="crosshair"]'
      )
      const clickableTarget = target.closest<HTMLElement>(
        'button, a, .nav-link, .profile-btn, input, textarea, [role="button"], [data-cursor="pointer"]'
      )

      if (projectTarget) {
        isExpanding = true
        isHovering = false
        isCrosshair = false
        ring.classList.add('is-expanding')
        ring.classList.remove('is-crosshair')
        setLabelText('VIEW')
        gsap.to(ring, {
          scaleX: 2.1,
          scaleY: 2.1,
          rotation: 0,
          duration: 0.25,
          ease: 'back.out(1.5)',
          overwrite: 'auto',
        })
        gsap.to(dot, { scale: 0.2, opacity: 0, duration: 0.2 })
      } else if (reticleTarget) {
        isCrosshair = true
        isHovering = false
        isExpanding = false
        ring.classList.add('is-crosshair')
        ring.classList.remove('is-expanding')
        setLabelText('')
        gsap.to(ring, {
          scaleX: 1.7,
          scaleY: 1.7,
          rotation: 0,
          duration: 0.25,
          ease: 'power3.out',
          overwrite: 'auto',
        })
        gsap.to(dot, { scale: 0.6, opacity: 1, duration: 0.2 })
      } else if (clickableTarget) {
        isHovering = true
        isExpanding = false
        isCrosshair = false
        ring.classList.remove('is-expanding', 'is-crosshair')
        setLabelText('')
        gsap.to(ring, {
          scaleX: 1.5,
          scaleY: 1.5,
          rotation: 0,
          duration: 0.25,
          ease: 'back.out(1.6)',
          overwrite: 'auto',
        })
        gsap.to(dot, { scale: 0.45, opacity: 1, duration: 0.2 })
      } else {
        if (isHovering || isExpanding || isCrosshair) {
          isHovering = false
          isExpanding = false
          isCrosshair = false
          ring.classList.remove('is-expanding', 'is-crosshair')
          setLabelText('')
          gsap.to(ring, {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power3.out',
            overwrite: 'auto',
          })
          gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 })
        }
      }
    }

    const handlePointerDown = () => {
      isPressed = true
      gsap.to(ring, {
        scaleX: 0.75,
        scaleY: 0.75,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      gsap.to(dot, { scale: 1.5, duration: 0.12, ease: 'power2.out' })
    }

    const handlePointerUp = () => {
      isPressed = false
      const targetScale = isExpanding ? 2.1 : isCrosshair ? 1.7 : isHovering ? 1.5 : 1
      gsap.to(ring, {
        scaleX: targetScale,
        scaleY: targetScale,
        duration: 0.24,
        ease: 'back.out(1.8)',
        overwrite: 'auto',
      })
      gsap.to(dot, { scale: isExpanding ? 0.2 : isHovering ? 0.45 : 1, duration: 0.2 })
    }

    const handleMouseLeave = () => {
      container.classList.remove('is-active')
      document.body.classList.remove('has-custom-cursor')
    }

    const handleMouseEnter = () => {
      if (hasMoved) {
        container.classList.add('is-active')
        document.body.classList.add('has-custom-cursor')
      }
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('mouseover', handlePointerOver, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('mouseover', handlePointerOver)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      if (stopTimeout) clearTimeout(stopTimeout)
    }
  }, [])

  return (
    <div ref={containerRef} className="custom-cursor-container" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-label">{labelText}</span>
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}

