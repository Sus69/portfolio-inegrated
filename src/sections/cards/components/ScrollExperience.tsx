import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { Card } from './Card'
import { ThemeCat } from './ThemeCat'
import { toolkitCards } from '../data/cards'
import { createCardTimeline } from '../animations/cardTimeline'

export function ScrollExperience() {
  const rootRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const scene = sceneRef.current
    if (!root || !scene) return

    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      return createCardTimeline(root, scene)
    }, root)
    return () => media.revert()
  }, [])

  return (
    <main>
      <section className="experience" ref={rootRef} aria-label="Toolkit scroll experience">
        <div className="scene" ref={sceneRef}>
          <div className="next-section">
            <div className="next-section__inner">
              <span className="next-section__kicker">end of skills</span>
              <h2>A new canvas<br />for the next idea.</h2>
              <span className="next-section__line" />
            </div>
          </div>

          <div className="scene-chrome">
            <header className="heading-block">
              <p className="heading-block__eyebrow">skills / from my CV</p>
              <h1>Skills</h1>
              <p className="heading-block__subtitle">
                <span className="subtitle-front">Technical Skills</span>
                <span className="subtitle-back">Soft Skills</span>
              </p>
            </header>
            <div className="progress" aria-hidden="true">
              {toolkitCards.map((card, index) => <span className="progress-bar" key={card.id} data-step={index} />)}
            </div>
            <p className="scroll-hint">scroll to explore <span>↓</span></p>
            <p className="theme-note--cards">a cat supervised this build</p>
            <ThemeCat className="theme-cat--cards" />
          </div>

          <div className="card-stage">
            <div className="cards">
              {toolkitCards.map((card, index) => <Card card={card} index={index} key={card.id} />)}
            </div>
          </div>

          <div className="reduced-content">
            <p className="reduced-content__label">Skills</p>
            <div className="reduced-content__grid">
              {toolkitCards.map((card) => (
                <div className="reduced-content__item" key={card.id}>
                  <strong>{card.front.title.replace('\n', ' ')}</strong>
                  <span>{card.back.title.replace('\n', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="after-space" aria-hidden="true" />
    </main>
  )
}
