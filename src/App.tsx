import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUp, ArrowUpRight, Menu, X } from 'lucide-react'
import { projects, siteConfig, skillGroups } from './data'
import DemoSection from './Components/UI/DemoSection'

const capabilities = [  ['01', 'Product thinking', 'Build around real user needs, not assumptions.'],
  ['02', 'Full stack', 'Shape the interface, API and data model as one system.'],
  ['03', 'Performance', 'Make fast experiences and efficient services the baseline.'],
  ['04', 'Useful AI', 'Integrate intelligence where it creates genuine leverage.'],
  ['05', 'Engineering', 'Keep the architecture understandable and ready to evolve.'],
] as const

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const now = new Date()
  const today = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now)
  const dateTime = now.toISOString().slice(0, 10)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  return (
    <>
      <header className="site-header">
        <div className="container nav-inner">
          <a className="brand" href="#top" aria-label={`${siteConfig.fullName}, back to top`}>
            {siteConfig.fullName}
          </a>

          <nav id="main-nav" className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            <a className="nav-overlay-email" href={`mailto:${siteConfig.email}`}>
              Email <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </nav>

          <a className="nav-action" href={`mailto:${siteConfig.email}`}>
            Email <ArrowUpRight size={14} aria-hidden="true" />
          </a>

          <button
            className="menu"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero" id="about" aria-labelledby="hero-title">
          <div className="container corridor">
            <p className="dateline">
              <time dateTime={dateTime}>{today}</time>
              <span aria-hidden="true">·</span>
              <span>{siteConfig.location}</span>
            </p>

            <div className="wordmark crop">
              <h1 id="hero-title">
                <span>Smit</span>
                <span>Bharshankar</span>
              </h1>
              <span className="wordmark-rule" aria-hidden="true" />
            </div>

            <p className="lead hero-lead">
              Web products, end to end: from the React interface to the database.
            </p>

            <div className="hero-actions">
              <a className="button button--primary" href="#work">
                See the work <ArrowDownRight size={16} aria-hidden="true" />
              </a>
              <a className="text-link" href={`mailto:${siteConfig.email}`}>
                Email me <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="section section--skills" id="skills" aria-labelledby="skills-title">
          <div className="container">
            <div className="section-head">
              <h2 id="skills-title">What I do</h2>
              <p className="section-note">Based in {siteConfig.location}.</p>
            </div>

            <p className="section-lead">
              Full-stack developer with a product-minded approach to React, Node.js and MongoDB or
              PostgreSQL. I care about crisp interfaces, clear systems and building technology that
              earns its place.
            </p>

            <ul className="skill-list">
              {skillGroups.map(([group, ...skills], index) => (
                <li className="skill-row" key={group}>
                  <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{group}</h3>
                  <p>{skills.join(', ')}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--work" id="work" aria-labelledby="work-title">
          <div className="container">
            <div className="section-head">
              <h2 id="work-title">Work</h2>
              <p className="section-note">One product, shown working.</p>
            </div>

            {projects.map((project) => (
              <article className="project" key={project.number}>
                <div className="project-copy">
                  <div className="project-meta">
                    <span>{project.number}</span>
                    <span>{project.category}</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <ul className="tags" aria-label="Technologies">
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>

                  <div className="project-actions">
                    <a
                      className="text-link"
                      href={siteConfig.AISaas}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Sortres code on GitHub"
                    >
                      Code <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                    <a
                      className="text-link"
                      href={`mailto:${siteConfig.email}?subject=Sortres`}
                    >
                      Ask about Sortres <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="project-figure">
                  <DemoSection project={project} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--process" id="process" aria-labelledby="process-title">
          <div className="container">
            <div className="section-head section-head--single">
              <h2 id="process-title" className="section-title--lg">How I work</h2>
            </div>

            <ol className="process-list">
              {capabilities.map(([number, title, copy]) => (
                <li className="process-step" key={number}>
                  <h3>
                    <span className="step-number">{number}</span>
                    {title}
                  </h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section--experience" id="experience" aria-labelledby="experience-title">
          <div className="container">
            <div className="section-head section-head--single">
              <h2 id="experience-title" className="section-title--lg">Experience</h2>
            </div>

            <div className="role-list">
              <article className="role">
                <p className="role-dates">2026 to present</p>
                <div className="role-body">
                  <h3>Developer / Builder</h3>
                  <p className="role-org">Independent</p>
                  <p>
                    Building full-stack applications, React interfaces and Node.js APIs with an
                    emphasis on reusable architecture and dependable delivery.
                  </p>
                </div>
              </article>

              <article className="role">
                <p className="role-dates">2025 to 2026</p>
                <div className="role-body">
                  <h3>Software Engineer</h3>
                  <p className="role-org">Intelives</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="container contact-inner">
            <h2 id="contact-title">Let’s build it well.</h2>
            <p className="contact-lead">Tell me what you are building.</p>

            <a className="contact-email" href={`mailto:${siteConfig.email}`}>
              <span>{siteConfig.email}</span>
              <ArrowUpRight size={30} aria-hidden="true" />
            </a>

            <div className="contact-links">
              <a className="text-link" href={siteConfig.github} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a className="text-link" href={siteConfig.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="colophon">
            {siteConfig.fullName}, software engineer, {siteConfig.location}. Set in Hedvig Letters
            Serif and Geist. Built with React and Vite. © {now.getFullYear()}.
          </p>
          <a className="text-link" href="#top">
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
