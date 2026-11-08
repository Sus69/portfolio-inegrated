import { useEffect } from 'react'

declare global {
  interface Window {
    __heroFluidLoaded?: boolean
  }
}

/**
 * Hero section — header only, taken verbatim from hero-section/index.html
 * at a542566 (the static <main class="portfolio-content"> projects /
 * tech-stack / contact sections are NOT included: the integrated page
 * supplies those with the txt-img projects section and the footer).
 *
 * The fluid simulation is the original fluid.js IIFE. It grabs the
 * canvas by id on load and runs its own requestAnimationFrame loop, so
 * it is loaded as a classic script (assets.js first, then fluid.js)
 * after this component mounts. It has no cleanup API; the hero never
 * unmounts in this single-page app, so the loop is intentionally left
 * running. Nav links retarget to the integrated sections:
 * Toolkit -> #toolkit, Projects -> #projects, Contact -> #contact.
 */
export function Hero() {
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

        
              <nav className="nav-pill" aria-label="Main Navigation">
                <a href="#hero" className="nav-link active">Home</a>
                <a href="#projects" className="nav-link">Projects</a>
                <a href="#toolkit" className="nav-link">Toolkit</a>
                <a href="#contact" className="nav-link">Contact</a>
              </nav>

        
              <a href="#contact" className="profile-btn" aria-label="About and Contact Manaal Maple">
                <svg className="profile-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            
                  <path d="M8.5 7L7 3.5L10.5 5C11.5 4.3 12.7 4 14 4C15.3 4 16.5 4.3 17.5 5L21 3.5L19.5 7C21 8.5 22 10.5 22 13C22 17.4 18.4 21 14 21C9.6 21 6 17.4 6 13C6 10.5 7 8.5 8.5 7Z" fill="#14245C"/>
            
                  <path d="M8.5 6L8 4.8L9.5 5.5" stroke="#FF3F70" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M19.5 6L20 4.8L18.5 5.5" stroke="#FF3F70" strokeWidth="1.2" strokeLinecap="round"/>
            
                  <line x1="4" y1="13" x2="8" y2="12.5" stroke="#14245C" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="4" y1="15" x2="8" y2="15.5" stroke="#14245C" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="24" y1="13" x2="20" y2="12.5" stroke="#14245C" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="24" y1="15" x2="20" y2="15.5" stroke="#14245C" strokeWidth="1.2" strokeLinecap="round"/>
            
                  <path d="M5 25.5C5 21.8 8.8 19 14 19C19.2 19 23 21.8 23 25.5" stroke="#14245C" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>

        
              <div className="intro-statement">
                <p className="statement-line">Curious by nature.</p>
                <p className="statement-line">Driven to understand.</p>
                <p className="statement-line accent">Always building something.</p>
              </div>
              <p className="hero-cat-note" aria-hidden="true">a cat supervised this build</p>

        
              <div className="portrait-hint" aria-hidden="true">
                <svg className="hint-wave" width="18" height="10" viewBox="0 0 18 10" fill="none">
                  <path d="M1 5C3.5 1.5 6 1.5 8.5 5C11 8.5 13.5 8.5 16 5" stroke="#FF3F70" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

        
              <div className="retro-computer-wrapper" id="retro-computer-toy">
                <div className="retro-computer" role="img" aria-label="Sculptural retro cat computer with live display">
            
                  <div className="comp-ears">
                    <span className="comp-ear left"></span>
                    <span className="comp-ear right"></span>
                  </div>
            
                  <div className="comp-monitor">
                    <div className="comp-bezel">
                      <div className="comp-screen">
                        <div className="screen-cat-face">
                          <span className="cat-eye left"></span>
                          <span className="cat-mouth">w</span>
                          <span className="cat-eye right"></span>
                        </div>
                        <div className="screen-cursor-line">&gt; hello_world</div>
                      </div>
                    </div>
              
                    <div className="comp-vents">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
            
                  <div className="comp-base">
                    <div className="comp-floppy-slot"></div>
                    <div className="comp-badge"></div>
                    <div className="comp-led"></div>
                  </div>
                </div>
              </div>

        
              <div className="identity-block">
                <h1 className="identity-name">
                  <span className="cat-m">M</span>anaal <span className="cat-m">M</span>aple
                </h1>
                <p className="identity-descriptor">AI · Systems · Design · Development</p>
              </div>

        
              <a href="#projects" className="scroll-cue" aria-label="Scroll down to view portfolio sections">
                <span className="scroll-label">Scroll to explore</span>
                <svg className="scroll-arrow" width="18" height="22" viewBox="0 0 18 22" fill="none">
                  <path d="M9 3V17M9 17L4 12M9 17L14 12" stroke="#14245C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

            </div>

          </div>

        </header>
    </div>
  )
}
