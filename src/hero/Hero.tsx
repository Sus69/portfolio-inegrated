import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'

declare global {
  interface Window {
    __heroFluidLoaded?: boolean
  }
}

const TOY_FACES = [
  { mouth: 'w', eyeStyle: 'normal', text: '> hello_world', led: 'green' },
  { mouth: '3', eyeStyle: 'squint', text: '> compiling_fun', led: 'amber' },
  { mouth: 'v', eyeStyle: 'sparkle', text: '> cat_approved', led: 'pink' },
]

/**
 * Hero section with:
 * - Fluid simulation WebGL canvas
 * - Staged kinetic line entrance for editorial statements
 * - Interactive 3D perspective toy with spring recoils and ASCII display toggles
 * - Reactive feline typography accents
 */
const GLYPHS = '01_<>{}/*+=~#[]'

export function Hero() {
  const introRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLParagraphElement>(null)
  const computerRef = useRef<HTMLDivElement>(null)
  const computerInnerRef = useRef<HTMLDivElement>(null)
  const identityRef = useRef<HTMLDivElement>(null)
  const [toyIndex, setToyIndex] = useState(0)
  const [screenText, setScreenText] = useState(TOY_FACES[0].text)
  const [isGlitching, setIsGlitching] = useState(false)
  const cipherIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (window.__heroFluidLoaded) return
    window.__heroFluidLoaded = true
    const load = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const s = document.createElement('script')
        s.src = src
        s.async = false
        s.onload = () => resolve()
        s.onerror = () => reject(new Error('failed to load ' + src))
        document.body.appendChild(s)
      })
    load('/hero/assets.js')
      .then(() => load('/hero/fluid.js'))
      .catch((err) => console.error(err))
  }, [])

  // Kinetic Editorial Staging
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (introRef.current) {
        const lines = gsap.utils.toArray<HTMLElement>('.statement-line', introRef.current)
        gsap.fromTo(
          lines,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power2.out', delay: 0.1 }
        )
      }
      if (noteRef.current) {
        gsap.fromTo(
          noteRef.current,
          { autoAlpha: 0, rotate: -7, scale: 0.94 },
          { autoAlpha: 1, rotate: -2, scale: 1, duration: 0.55, ease: 'back.out(1.6)', delay: 0.55 }
        )
      }
      if (computerRef.current) {
        gsap.fromTo(
          computerRef.current,
          { autoAlpha: 0, y: 20, scale: 0.95 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.75, ease: 'back.out(1.2)', delay: 0.3 }
        )
      }
      if (identityRef.current) {
        gsap.fromTo(
          identityRef.current,
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 0.25 }
        )
      }
    })
    return () => media.revert()
  }, [])

  // 3D Pointer Parallax on Computer Toy
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!computerInnerRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    gsap.to(computerInnerRef.current, {
      rotateY: x * 14,
      rotateX: -y * 14,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handlePointerLeave = () => {
    if (!computerInnerRef.current) return
    gsap.to(computerInnerRef.current, {
      rotateY: -6,
      rotateX: 4,
      duration: 0.65,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    })
  }

  // Tactile Click Recoil, Screen Expression Cycle & Kinetic Text Decryption
  const handleComputerClick = () => {
    const nextIndex = (toyIndex + 1) % TOY_FACES.length
    setToyIndex(nextIndex)
    setIsGlitching(true)

    // CRT text decryption scramble
    if (cipherIntervalRef.current) clearInterval(cipherIntervalRef.current)
    const target = TOY_FACES[nextIndex].text
    let frame = 0
    const totalFrames = 10

    cipherIntervalRef.current = window.setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const revealed = Math.floor(progress * target.length)
      const scrambled = target
        .split('')
        .map((ch, idx) => {
          if (idx < revealed || ch === ' ' || ch === '>') return ch
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')
      setScreenText(scrambled)

      if (frame >= totalFrames) {
        if (cipherIntervalRef.current) clearInterval(cipherIntervalRef.current)
        setScreenText(target)
        setIsGlitching(false)
      }
    }, 22)

    if (computerInnerRef.current) {
      gsap.fromTo(
        computerInnerRef.current,
        { scaleX: 1.14, scaleY: 0.86, rotateZ: (Math.random() - 0.5) * 6 },
        { scaleX: 1, scaleY: 1, rotateZ: 0, duration: 0.65, ease: 'elastic.out(1.4, 0.35)', overwrite: 'auto' }
      )
    }
  }

  useEffect(() => {
    return () => {
      if (cipherIntervalRef.current) clearInterval(cipherIntervalRef.current)
    }
  }, [])

  const currentFace = TOY_FACES[toyIndex]

  return (
    <div className="hero-scope">
      <header className="stage-viewport" id="hero">
        <div className="scene-container" id="scene-container">
          <img
            className="scene-layer layer-background"
            id="bg-img"
            src="/hero/BACKGROUND.svg"
            alt="Illustrated Surreal Landscape"
            draggable="false"
          />

          <canvas
            className="scene-layer layer-webgl"
            id="fluid-canvas"
            role="img"
            aria-label="Interactive Fluid Reveal Canvas"
          ></canvas>

          <div className="hero-interface" id="hero-interface">
            <div className="intro-statement" ref={introRef}>
              <p className="statement-line">Curious by nature.</p>
              <p className="statement-line">Driven to understand.</p>
              <p className="statement-line accent">Always building something.</p>
            </div>
            <p className="hero-cat-note" ref={noteRef} aria-hidden="true">
              a cat supervised this build
            </p>

            <div className="portrait-hint" aria-hidden="true">
              <svg className="hint-wave" width="18" height="10" viewBox="0 0 18 10" fill="none">
                <path d="M1 5C3.5 1.5 6 1.5 8.5 5C11 8.5 13.5 8.5 16 5" stroke="#FF3F70" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div
              className="retro-computer-wrapper"
              id="retro-computer-toy"
              ref={computerRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onClick={handleComputerClick}
            >
              <div
                className="retro-computer"
                ref={computerInnerRef}
                role="button"
                tabIndex={0}
                aria-label="Interactive sculptural retro cat computer. Click to cycle terminal screen."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleComputerClick()
                  }
                }}
              >
                <div className="comp-ears">
                  <span className="comp-ear left"></span>
                  <span className="comp-ear right"></span>
                </div>

                <div className="comp-monitor">
                  <div className="comp-bezel">
                    <div className={`comp-screen ${isGlitching ? 'is-glitching' : ''}`}>
                      <div className={`screen-cat-face ${currentFace.eyeStyle}`}>
                        <span className="cat-eye left"></span>
                        <span className="cat-mouth">{currentFace.mouth}</span>
                        <span className="cat-eye right"></span>
                      </div>
                      <div className="screen-cursor-line">{screenText}</div>
                    </div>
                  </div>

                  <div className="comp-vents">
                    <span></span><span></span><span></span>
                  </div>
                </div>

                <div className="comp-base">
                  <div className="comp-floppy-slot"></div>
                  <div className="comp-badge"></div>
                  <div className={`comp-led ${currentFace.led}`}></div>
                </div>
              </div>
            </div>

            <div className="identity-block" ref={identityRef}>
              <h1 className="identity-name">
                <span className="cat-m">M</span>anaal <span className="cat-m">M</span>aple
              </h1>
              <p className="identity-descriptor">AI · Systems · Design · Development</p>
            </div>

            <a
              href="#toolkit"
              className="scroll-cue"
              aria-label="Scroll down to view portfolio sections"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('toolkit')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="scroll-label">Scroll to explore</span>
              <svg className="scroll-arrow" width="18" height="22" viewBox="0 0 18 22" fill="none">
                <path d="M9 3V17M9 17L4 12M9 17L14 12" stroke="#14245C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </header>
    </div>
  )
}
