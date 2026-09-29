import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownRight, ArrowUpRight, AtSign, Code2, Mail, Menu, X } from 'lucide-react'
import { projects, siteConfig, skillGroups } from './data'

gsap.registerPlugin(ScrollTrigger)

const navItems = [['About', '#about'], ['Work', '#work'], ['Experience', '#experience'], ['Contact', '#contact']]

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setLoaded(true), reduce ? 80 : 650)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loaded || !root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.from('.reveal', { y: 30, opacity: 0, duration: .9, stagger: .11, ease: 'power3.out' })
      gsap.utils.toArray<HTMLElement>('.section-reveal').forEach((section) => {
        gsap.from(section.querySelectorAll('.animate-in'), { scrollTrigger: { trigger: section, start: 'top 78%' }, y: 28, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out' })
      })
      gsap.to('.orb-one', { scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 1 }, y: 130, x: 70 })
      gsap.utils.toArray<HTMLElement>('.experience-item').forEach((item) => gsap.from(item, { scrollTrigger: { trigger: item, start: 'top 86%' }, x: 36, opacity: 0, duration: .65 }))
    }, root)
    return () => ctx.revert()
  }, [loaded])

  return <div ref={root} className={loaded ? 'app is-loaded' : 'app'}>
    <div className="preloader" aria-hidden="true"><span>SMIT</span><b>— 100</b></div>
    <div className="grain" />
    <header className="nav-wrap">
      <a className="brand" href="#top" aria-label="Back to top">SMIT<span>®</span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <a className="nav-email" href={`mailto:${siteConfig.email}`}>Start a project <ArrowUpRight size={15} /></a>
      <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" /><div className="orb orb-one" /><div className="orb orb-two" />
        <div className="hero-inner">
          <p className="eyebrow reveal"><i /> Software engineer · India</p>
          <h1 id="hero-title"><span className="reveal">Building digital</span><span className="reveal accent-line">systems <em>&amp;</em> experiences.</span></h1>
          <div className="hero-bottom reveal"><p>I translate ambitious ideas into thoughtful, high-performing web products — from interface to infrastructure.</p><div className="hero-links"><a className="button button-primary" href="#work">View selected work <ArrowDownRight size={17} /></a><a className="text-link" href="#contact">Get in touch <ArrowUpRight size={16} /></a></div></div>
        </div>
        <a className="scroll-cue reveal" href="#about"><span>Scroll to explore</span><b /></a>
      </section>

      <section className="intro section-reveal" id="about">
        <div className="section-kicker animate-in"><span>(01)</span> An introduction</div>
        <div className="intro-copy"><h2 className="animate-in">I build web applications, APIs and products that turn <em>ideas</em> into usable software.</h2><div className="intro-detail animate-in"><p>Full-stack developer with a product-minded approach to React, Node.js and MongoDB. I care about crisp interfaces, clear systems and building technology that earns its place.</p><a href="#contact" className="text-link">More about my approach <ArrowDownRight size={16} /></a></div></div>
      </section>

      <section className="skills section-reveal" id="skills">
        <div className="section-kicker animate-in"><span>(02)</span> Technical vocabulary</div>
        <div className="skill-header animate-in"><h2>Tools for the whole<br />product picture.</h2><p>Comfortable moving between the polished surface and the systems beneath it.</p></div>
        <div className="skill-grid">{skillGroups.map(([group, ...skills]) => <div className="skill-group animate-in" key={group}><p>{group}</p><ul>{skills.map(skill => <li key={skill}>{skill}<span>↗</span></li>)}</ul></div>)}</div>
      </section>

      <section className="projects section-reveal" id="work">
        <div className="projects-top animate-in"><div className="section-kicker"><span>(03)</span> Selected work</div><p>A few product explorations and full-stack builds.<br />Replace these with your live project links.</p></div>
        <div className="project-list">{projects.map((project) => <article className="project animate-in" key={project.number}>
          <div className={`project-art ${project.gradient}`} aria-label={`${project.title} visual placeholder`}><div className="art-ui"><span>{project.number}/</span><b>{project.category}</b><div className="art-lines"><i /><i /><i /></div><div className="art-shape" /></div></div>
          <div className="project-info"><span className="project-no">{project.number}</span><div><p className="project-category">{project.category}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></div><div className="project-actions"><a href={siteConfig.github} target="_blank" rel="noreferrer">Code <Code2 size={15} /></a><a href="#contact">Case study <ArrowUpRight size={15} /></a></div></div>
        </article>)}</div>
      </section>

      <section className="experience section-reveal" id="experience">
        <div className="section-kicker animate-in"><span>(04)</span> Experience</div><div className="experience-heading animate-in"><h2>Always building<br />the next useful thing.</h2><p>Use this timeline to add your verified professional experience.</p></div>
        <div className="timeline"><div className="experience-item"><span>2025 — Present</span><div><p className="placeholder">[COMPANY / INDEPENDENT]</p><h3>Software Engineer</h3><p>Building full-stack applications, React interfaces and Node.js APIs with an emphasis on reusable architecture and dependable delivery.</p></div></div><div className="experience-item"><span>Earlier</span><div><p className="placeholder">[ADD EXPERIENCE]</p><h3>Developer / Builder</h3><p>Add a concise, factual description of a previous role, education, freelance engagement or product-building chapter here.</p></div></div></div>
      </section>

      <section className="capabilities section-reveal"><div className="section-kicker animate-in"><span>(05)</span> How I work</div><div className="cap-grid">{[['01','Product thinking','Build around real user needs, not assumptions.'],['02','Full stack','Shape the interface, API and data model as one system.'],['03','Performance','Make fast experiences and efficient services the baseline.'],['04','Useful AI','Integrate intelligence where it creates genuine leverage.'],['05','Engineering','Keep the architecture understandable and ready to evolve.']].map(([num, title, copy]) => <article className="cap animate-in" key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="contact" id="contact"><div className="contact-glow" /><p className="eyebrow"><i /> Have an idea?</p><h2>Let's build<br /><em>it well.</em></h2><a className="contact-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}<ArrowUpRight /></a><div className="contact-links"><a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub <Code2 size={15} /></a><a href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn <AtSign size={15} /></a><a href={`mailto:${siteConfig.email}`}>Email <Mail size={15} /></a></div></section>
    </main>
    <footer><span>© {new Date().getFullYear()} {siteConfig.name}. Built with intention.</span><a href="#top">Back to top <ArrowUpRight size={15} /></a></footer>
  </div>
}

export default App
