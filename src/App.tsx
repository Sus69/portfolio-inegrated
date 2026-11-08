import { Hero } from './hero/Hero'
import { ScrollExperience } from './sections/cards/components/ScrollExperience'
import { ProjectShowcase } from './sections/projects/components/ProjectShowcase'
import { FooterSprzeSection } from './sections/footer/components/FooterSprzeSection'

/**
 * Integrated portfolio — order confirmed by Manaal, 8 Nov 2026:
 *   1. hero-section (top)
 *   2. card-section (Toolkit card stack) — id="toolkit"
 *   3. txt-img-cvrt-section (Projects, text-to-image) — id="projects"
 *      (the component already carries id="projects")
 *   4. ftr-sprze-section (footer surprise reveal) — id="contact"
 * No duplicates: the card section appears once, after the hero.
 * Each React section keeps its own GSAP ScrollTrigger pinning; the
 * hero's fluid canvas is mounted by Hero.tsx (see that file).
 */
export default function App() {
  return (
    <div className="integrated-portfolio">
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
