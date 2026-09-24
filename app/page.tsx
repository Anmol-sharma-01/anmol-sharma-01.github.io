'use client';

/* oxlint-disable next/no-img-element -- Small local avatar is served directly by static GitHub Pages. */
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  GitBranch,
  MapPin,
  Moon,
  Sun,
  Menu,
  ShieldCheck,
  Code2,
  GraduationCap,
  Pause,
  Play,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Magnetic } from '@/components/motion-primitives/magnetic';
import { TextEffect } from '@/components/motion-primitives/text-effect';
import { Spotlight } from '@/components/motion-primitives/spotlight';
import { Tilt } from '@/components/motion-primitives/tilt';
import { BorderTrail } from '@/components/motion-primitives/border-trail';
import { TextLoop } from '@/components/motion-primitives/text-loop';
import { RevealText } from '@/components/watermelon/reveal-text';
import { MotionPausedContext } from '@/components/motion-preferences';
import { Reveal, ScrollProgress } from '@/components/portfolio-motion';
import { ShimmerLink } from '@/components/watermelon/shimmer-link';
import {
  WorkSection,
  ExpertiseSection,
  JourneySection,
  AboutSection,
  ContactSection,
} from './portfolio-sections';
import { SeasonPicker, useSeasonTheme } from './season-theme';
import { profile } from './content';

const navLinks = [
  ['work', 'Work'],
  ['journey', 'Experience'],
  ['expertise', 'Skills'],
  ['about', 'Background'],
];

export default function Home() {
  const theme = useSeasonTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const [motionPaused, setMotionPaused] = useState(false);
  const systemReduced = useReducedMotion();
  const reduce = motionPaused || !!systemReduced;
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-20% 0px -55% 0px' },
    );
    for (const [id] of navLinks) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, []);
  function goTo(id: string) {
    setMenuOpen(false);
    // Wait for the menu's scroll lock to release before navigating.
    window.setTimeout(() => {
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      target?.setAttribute('tabindex', '-1');
      target?.focus({ preventScroll: true });
      history.pushState(null, '', '#' + id);
    }, 220);
  }
  return (
    <MotionPausedContext.Provider value={motionPaused}>
      <MotionConfig reducedMotion={motionPaused ? 'always' : 'user'}>
        <div
          className={theme.light ? 'portfolio light' : 'portfolio'}
          style={theme.style}
          data-season={theme.season}
          data-motion={reduce ? 'paused' : 'running'}
        >
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <header className="site-header">
            <ScrollProgress />
            <div className="container nav-inner">
              <a className="brand" href="#top" aria-label="Anmol Sharma home">
                <span className="brand-symbol">
                  as<span>.</span>
                </span>
                <span>
                  Anmol Sharma<small>Cybersecurity + AI</small>
                </span>
              </a>
              <nav aria-label="Main navigation">
                {navLinks.map(([id, label]) => (
                  <a
                    key={id}
                    href={'#' + id}
                    aria-current={active === id ? 'location' : undefined}
                  >
                    {label}
                    {active === id && (
                      <motion.span
                        layoutId="nav-active"
                        className="nav-active"
                        transition={{ duration: reduce ? 0 : 0.25 }}
                      />
                    )}
                  </a>
                ))}
              </nav>
              <div className="nav-actions">
                <div className="desktop-season">
                  <SeasonPicker
                    choice={theme.choice}
                    choose={theme.choose}
                    label={theme.palette.name}
                  />
                </div>
                <button
                  className="icon-button theme-button"
                  onClick={theme.toggleMode}
                  aria-label={
                    theme.light
                      ? 'Switch to dark theme'
                      : 'Switch to light theme'
                  }
                >
                  {theme.light ? <Moon size={17} /> : <Sun size={17} />}
                </button>
                <button
                  type="button"
                  className="icon-button motion-button"
                  disabled={!!systemReduced}
                  onClick={() => setMotionPaused((value) => !value)}
                  aria-pressed={reduce}
                  aria-label={
                    systemReduced
                      ? 'Reduced motion is on'
                      : motionPaused
                        ? 'Resume animations'
                        : 'Pause animations'
                  }
                  title={
                    systemReduced
                      ? 'Reduced motion is on'
                      : motionPaused
                        ? 'Resume animations'
                        : 'Pause animations'
                  }
                >
                  {reduce ? <Play size={16} /> : <Pause size={16} />}
                </button>
                <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                  <SheetTrigger
                    className="icon-button mobile-menu-button"
                    aria-label="Open navigation"
                  >
                    <Menu size={19} />
                  </SheetTrigger>
                  <SheetContent
                    className={
                      (theme.light ? 'light ' : 'dark ') + 'mobile-sheet'
                    }
                  >
                    <SheetHeader>
                      <SheetTitle>
                        Anmol Sharma<span className="brand-dot">.</span>
                      </SheetTitle>
                      <SheetDescription>
                        Security researcher & builder
                      </SheetDescription>
                    </SheetHeader>
                    <nav className="mobile-nav" aria-label="Mobile navigation">
                      {[...navLinks, ['contact', 'Get in touch']].map(
                        ([id, label], index) => (
                          <a
                            key={id}
                            href={'#' + id}
                            onClick={(event) => {
                              event.preventDefault();
                              goTo(id);
                            }}
                          >
                            <span>0{index + 1}</span>
                            {label}
                            <ArrowUpRight size={20} />
                          </a>
                        ),
                      )}
                    </nav>
                    <div className="mobile-season">
                      <span className="eyebrow">MAKE IT YOUR SEASON</span>
                      <SeasonPicker
                        choice={theme.choice}
                        choose={theme.choose}
                        label={theme.palette.name}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>
          <main id="main">
            <section id="top" className="hero" aria-labelledby="hero-title">
              <div className="hero-aurora" aria-hidden="true" />
              <div className="ambient-points" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => (
                  <span
                    key={i}
                    style={{
                      left: 7 + i * 8 + '%',
                      top: 18 + ((i * 23) % 70) + '%',
                      animationDelay: -i * 1.2 + 's',
                    }}
                  />
                ))}
              </div>
              <div className="container hero-layout">
                <div className="hero-copy">
                  <img
                    className="mobile-avatar"
                    src="/images/anmol-avatar.png"
                    alt="Anmol Sharma GitHub avatar"
                    width={52}
                    height={52}
                  />
                  <div className="hero-date">
                    <span className="greeting">
                      <i />
                      {theme.greeting}
                    </span>
                    <span className="date-text">{theme.dateLabel}</span>
                    <span className="palette-badge">
                      {theme.palette.name} palette
                    </span>
                  </div>
                  <p className="hero-intro">
                    <RevealText>Hi, I’m Anmol Sharma.</RevealText>
                  </p>
                  <h1 id="hero-title">
                    <TextEffect
                      as="span"
                      per="word"
                      preset="slide"
                      className="hero-title-line"
                    >
                      I study how systems break.
                    </TextEffect>
                    <TextEffect
                      as="span"
                      per="word"
                      preset="fade-in-blur"
                      delay={0.2}
                      className="hero-title-line gradient-text"
                    >
                      Then build smarter defenses.
                    </TextEffect>
                  </h1>
                  <div className="research-focus">
                    <span className="focus-label">Exploring</span>
                    <TextLoop
                      items={[
                        'AI code security',
                        'Malware behavior',
                        'Threat intelligence',
                      ]}
                    />
                  </div>
                  <p className="hero-description">
                    Security researcher exploring AI-generated code, malware
                    behavior, and threat intelligence. Turning complex security
                    questions into practical tools and clearer answers.
                  </p>
                  <div className="hero-buttons">
                    <Magnetic intensity={0.14} range={100}>
                      <ShimmerLink href="#work">
                        See the work <ArrowRight size={17} />
                      </ShimmerLink>
                    </Magnetic>
                    <a className="button-outline" href="#contact">
                      Get in touch <ArrowUpRight size={16} />
                    </a>
                  </div>
                  <div className="hero-socials">
                    <span>
                      <MapPin size={14} /> Kitchener–Waterloo, Canada
                    </span>
                    <span className="social-divider" />
                    <a href={profile.github} target="_blank" rel="noreferrer">
                      <GitBranch size={15} /> GitHub <ArrowUpRight size={13} />
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer">
                      LinkedIn <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
                <Tilt className="profile-tilt" rotationFactor={7}>
                  <motion.aside
                    className="profile-panel"
                    initial={reduce ? false : { y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    aria-label="Anmol Sharma research profile"
                  >
                    <BorderTrail />
                    <Spotlight className="profile-spotlight" size={320} />
                    <div className="profile-panel-top">
                      <span className="eyebrow">RESEARCHER / BUILDER</span>
                      <ArrowUpRight size={18} />
                    </div>
                    <div className="profile-identity">
                      <div className="identity-ring">
                        <span className="identity-monogram" aria-hidden="true">
                          AS<span>.</span>
                        </span>
                      </div>
                      <div className="identity-caption">
                        <span className="status-dot" /> SECURITY × INTELLIGENCE
                      </div>
                    </div>
                    <div className="profile-name">
                      <img
                        src="/images/anmol-avatar.png"
                        alt="Anmol’s GitHub avatar"
                        width={44}
                        height={44}
                      />
                      <div>
                        <h2>Anmol Sharma</h2>
                        <p>Security Researcher</p>
                      </div>
                      <ShieldCheck size={23} />
                    </div>
                    <div className="profile-details">
                      <span>
                        <GraduationCap size={17} /> MSc, University of Guelph
                      </span>
                      <span>
                        <Code2 size={17} /> AI code security & malware analysis
                      </span>
                    </div>
                    <a className="profile-link" href="#about">
                      A little more about me <ArrowRight size={15} />
                    </a>
                  </motion.aside>
                </Tilt>
              </div>
              <div className="container hero-bottom">
                <span>THINK LIKE AN ADVERSARY. BUILD FOR THE DEFENDER.</span>
                <a href="#work">
                  Explore below <ArrowDown size={14} />
                </a>
              </div>
            </section>
            <Reveal className="container metrics-strip">
              <div>
                <strong>40</strong>
                <span>APT groups studied</span>
              </div>
              <div>
                <strong>04</strong>
                <span>Research & engineering projects</span>
              </div>
              <div>
                <strong>
                  MSc<span className="metric-dot">.</span>
                </strong>
                <span>Cybersecurity & Threat Intelligence</span>
              </div>
              <div>
                <strong>AI + Security</strong>
                <span>At the center of my work</span>
              </div>
            </Reveal>
            <WorkSection light={theme.light} />
            <JourneySection />
            <ExpertiseSection />
            <AboutSection />
            <ContactSection />
          </main>
          <footer className="container footer">
            <a className="brand" href="#top">
              Anmol Sharma<span className="brand-dot">.</span>
            </a>
            <span>Research with purpose. Build with care.</span>
            <a href="#top">
              Back to top <ArrowUpRight size={14} />
            </a>
          </footer>
        </div>
      </MotionConfig>
    </MotionPausedContext.Provider>
  );
}
