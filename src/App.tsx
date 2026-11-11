import { useState } from 'react'
import { Navigation } from './components/Navigation'
import { CustomCursor } from './components/CustomCursor'
import { ScrollSpine } from './components/ScrollSpine'
import { LoadingScreen } from './components/LoadingScreen'
import { Hero } from './hero/Hero'
import { ScrollExperience } from './sections/cards/components/ScrollExperience'
import { ProjectShowcase } from './sections/projects/components/ProjectShowcase'
import { FooterSprzeSection } from './sections/footer/components/FooterSprzeSection'

/**
 * Integrated portfolio:
 *   - Navigation: Unified fixed header (pill at top-left, profile button at top-right)
 *   - CustomCursor: High-performance tactile & kinetic pointer system
 *   - ScrollSpine: Ambient velocity-sensitive wayfinder rail
 *   1. hero-section (top)
 *   2. card-section (Toolkit card stack) — id="toolkit"
 *   3. txt-img-cvrt-section (Projects, text-to-image) — id="projects"
 *   4. ftr-sprze-section (footer surprise reveal) — id="contact"
 */
export default function App() {
  const [loading, setLoading] = useState(true)

  // Loading screen first — nothing else renders until it is dismissed.
  if (loading) {
    return (
      <div className="integrated-portfolio">
        <LoadingScreen onDone={() => setLoading(false)} />
      </div>
    )
  }

  return (
    <div className="integrated-portfolio">
      <CustomCursor />
      <ScrollSpine />
      <Navigation />
      <Hero />
      <div id="toolkit">
        <ScrollExperience />
      </div>
      <ProjectShowcase />
      <div id="contact">
        <FooterSprzeSection />
      </div>
    </div>
  )
}
