'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useReducedEffects } from '@/components/motion-preferences';
import { Tilt } from '@/components/motion-primitives/tilt';
import { Reveal } from '@/components/portfolio-motion';
import { Spotlight } from '@/components/motion-primitives/spotlight';
import { Magnetic } from '@/components/motion-primitives/magnetic';
import { ShimmerLink } from '@/components/watermelon/shimmer-link';
import { CopyConfirm } from '@/components/watermelon/copy-confirm';
import { FluidTabLabel } from '@/components/watermelon/fluid-tab-label';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ShieldCheck,
  FileCode2,
  Fingerprint,
  Network,
  Code2,
  GraduationCap,
  MapPin,
  Mail,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { education, experience, expertise, profile, projects } from './content';

function ProjectDiagram({ id }: { id: string }) {
  if (id === 'apt')
    return (
      <div
        className="project-visual apt-visual"
        aria-label="APT research pipeline from payload to OpCodes to classification"
      >
        <div className="visual-topline">
          <span>APT / CLASSIFICATION PIPELINE</span>
          <span>01</span>
        </div>
        <div className="pipeline">
          <div>
            <FileCode2 />
            <span>Payload</span>
          </div>
          <ArrowRight className="pipeline-arrow" />
          <div>
            <Code2 />
            <span>OpCodes</span>
          </div>
          <ArrowRight className="pipeline-arrow" />
          <div className="pipeline-result">
            <Fingerprint />
            <span>Attribution</span>
          </div>
        </div>
        <div className="visual-bottomline">
          <span>40 APT groups studied</span>
          <span>SVM · KNN · DL</span>
        </div>
      </div>
    );
  if (id === 'toolkit')
    return (
      <div className="project-visual toolkit-visual">
        <div className="visual-topline">
          <span>CLIENT DATA / LIFECYCLE</span>
          <ShieldCheck size={16} />
        </div>
        <div className="lifecycle">
          <span>
            <Check size={15} /> Collect
          </span>
          <span>
            <Check size={15} /> Store
          </span>
          <span>
            <Check size={15} /> Transfer
          </span>
          <span>
            <Check size={15} /> Dispose
          </span>
        </div>
        <div className="visual-bottomline">
          <span>Practical protection, end to end</span>
          <span>PIPEDA</span>
        </div>
      </div>
    );
  if (id === 'honeypot')
    return (
      <div className="project-visual honeypot-visual">
        <div className="visual-topline">
          <span>HONEYPOT / OBSERVATION WORKFLOW</span>
          <Network size={16} />
        </div>
        <div className="pipeline">
          <div>
            <Network />
            <span>Conpot</span>
          </div>
          <ArrowRight className="pipeline-arrow" />
          <div>
            <Fingerprint />
            <span>Behavior</span>
          </div>
          <ArrowRight className="pipeline-arrow" />
          <div className="pipeline-result">
            <ShieldCheck />
            <span>Detection</span>
          </div>
        </div>
        <div className="visual-bottomline">
          <span>Observe → extract → map</span>
          <span>IOC / TTP</span>
        </div>
      </div>
    );
  return (
    <div className="project-visual osint-visual">
      <div className="visual-topline">
        <span>OSINT / INTELLIGENCE WORKFLOW</span>
        <Code2 size={16} />
      </div>
      <div
        className="code-snippet"
        aria-label="Workflow: collect threat feeds, normalize intelligence, enrich indicators"
      >
        <p>
          <span>01</span>
          <b>collect</b>(threat_feeds)
        </p>
        <p>
          <span>02</span>
          <b>normalize</b>(intelligence)
        </p>
        <p>
          <span>03</span>
          <b>enrich</b>(indicators)
        </p>
      </div>
      <div className="visual-bottomline">
        <span>Raw feeds → structured intelligence</span>
        <span>PYTHON</span>
      </div>
    </div>
  );
}

type Project = (typeof projects)[number];
const filters = [
  { id: 'all', label: 'All projects', matches: (_project: Project) => true },
  {
    id: 'ai',
    label: 'AI & machine learning',
    matches: (project: Project) => project.id === 'apt',
  },
  {
    id: 'security',
    label: 'Cybersecurity',
    matches: (project: Project) => project.id !== 'apt',
  },
];

function ProjectCard({ project, light }: { project: Project; light: boolean }) {
  const reduce = useReducedEffects();
  return (
    <Tilt className="project-tilt">
      <motion.article
        className={'project-card project-' + project.id}
        layout
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: reduce ? 0 : 0.4 }}
      >
        <Spotlight size={260} className="card-spotlight" />
        <ProjectDiagram id={project.id} />
        <div className="project-body">
          <span className="project-category">{project.category}</span>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="project-footer">
            <span className="project-number">RESEARCH / {project.number}</span>
            <Sheet>
              <SheetTrigger className="project-open">
                View project <ArrowUpRight size={17} />
              </SheetTrigger>
              <SheetContent
                className={(light ? 'light ' : 'dark ') + 'project-sheet'}
              >
                <SheetHeader>
                  <span className="eyebrow section-number">
                    RESEARCH / {project.number}
                  </span>
                  <SheetTitle>{project.name}</SheetTitle>
                  <SheetDescription>{project.overview}</SheetDescription>
                </SheetHeader>
                <div className="sheet-body">
                  <h3>Inside the project</h3>
                  <ul>
                    {project.details.map((detail) => (
                      <li key={detail}>
                        <ArrowRight size={16} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <ShimmerLink
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.linkLabel} <ArrowUpRight size={17} />
                  </ShimmerLink>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.article>
    </Tilt>
  );
}

export function WorkSection({ light }: { light: boolean }) {
  const [filter, setFilter] = useState('all');
  return (
    <section id="work" className="section container">
      <span className="eyebrow section-number">01 / SELECTED WORK</span>
      <div className="section-heading-row">
        <div>
          <h2 className="section-title">
            Built to understand.
            <br />
            <em>Designed to defend.</em>
          </h2>
          <p className="section-description">
            A selection of research and hands-on projects across security,
            intelligence, and machine learning.
          </p>
        </div>
        <a
          className="button-text section-heading-link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          Explore GitHub <ArrowUpRight size={17} />
        </a>
      </div>
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(String(value))}
        className="work-tabs"
      >
        <TabsList aria-label="Filter projects" className="project-filter-list">
          {filters.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="project-filter"
            >
              <FluidTabLabel
                active={filter === item.id}
                group="project-filter-pill"
              >
                {item.label}{' '}
                <span className="filter-count">
                  {projects.filter(item.matches).length}
                </span>
              </FluidTabLabel>
            </TabsTrigger>
          ))}
        </TabsList>
        {filters.map((item) => (
          <TabsContent key={item.id} value={item.id}>
            <motion.div layout className="project-grid">
              {projects.filter(item.matches).map((project) => (
                <ProjectCard key={project.id} project={project} light={light} />
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

export function ExpertiseSection() {
  const [activeSkill, setActiveSkill] = useState('security');
  return (
    <section id="expertise" className="section container">
      <span className="eyebrow section-number">03 / SKILLS & TOOLS</span>
      <h2 className="section-title">
        The tools behind <em>the work.</em>
      </h2>
      <Tabs
        value={activeSkill}
        onValueChange={(value) => setActiveSkill(String(value))}
        className="expertise-tabs"
      >
        <TabsList
          aria-label="Areas of expertise"
          className="expertise-tab-list"
        >
          {expertise.map((area) => (
            <TabsTrigger
              key={area.id}
              value={area.id}
              className="expertise-tab"
            >
              <FluidTabLabel
                active={activeSkill === area.id}
                group="expertise-pill"
              >
                {area.label}
              </FluidTabLabel>
            </TabsTrigger>
          ))}
        </TabsList>
        {expertise.map((area) => (
          <TabsContent
            key={area.id}
            value={area.id}
            className="expertise-content"
          >
            <Reveal className="expertise-summary">
              <span className="expertise-icon">
                {area.id === 'security' ? (
                  <ShieldCheck size={26} />
                ) : area.id === 'ml' ? (
                  <Network size={26} />
                ) : (
                  <Code2 size={26} />
                )}
              </span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </Reveal>
            <div className="skill-groups">
              {area.groups.map((group, index) => (
                <Reveal key={group.label} delay={index * 0.08}>
                  <h4 className="eyebrow">{group.label}</h4>
                  <div className="skill-tags">
                    {group.tools.map((tool) => (
                      <span key={tool}>{tool}</span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

export function JourneySection() {
  return (
    <section id="journey" className="section container">
      <span className="eyebrow section-number">
        02 / EXPERIENCE & EDUCATION
      </span>
      <h2 className="section-title">
        Learning. Building. <em>Defending.</em>
      </h2>
      <div className="journey-layout">
        <div>
          <h3 className="journey-column-label">EXPERIENCE</h3>
          <div className="timeline">
            {experience.map((entry, index) => (
              <Reveal key={entry.role} delay={index * 0.1}>
                <article className="timeline-entry">
                  <span
                    className={'timeline-dot ' + (!index ? 'accent-dot' : '')}
                  />
                  <span className="entry-date">{entry.date}</span>
                  <h4>{entry.role}</h4>
                  <span className="entry-organization">
                    {entry.organization}
                  </span>
                  <p>{entry.description}</p>
                  <div className="tags">
                    {entry.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="education-column">
          <h3 className="journey-column-label">EDUCATION</h3>
          {education.map((entry, index) => (
            <Reveal key={entry.title} delay={index * 0.1}>
              <article className="education-card">
                <div className="education-top">
                  <GraduationCap size={21} />
                  <span className="entry-date">{entry.date}</span>
                </div>
                <h4>{entry.title}</h4>
                <p>{entry.institution}</p>
                <span>{entry.location}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section container about-section">
      <div>
        <span className="eyebrow section-number">04 / A LITTLE ABOUT ME</span>
        <h2 className="section-title">
          Curiosity is
          <br />
          <em>the constant.</em>
        </h2>
        <div className="about-location">
          <MapPin size={16} />
          {profile.location}
        </div>
      </div>
      <Reveal className="about-copy">
        <p className="about-lead">
          I’m Anmol, a security researcher drawn to the places where AI, code,
          and adversary behavior meet.
        </p>
        <p>
          My work spans AI-generated code analysis, malware classification,
          threat intelligence, and practical data protection. I like taking a
          complex security problem apart, understanding the patterns, and
          turning what I learn into something useful.
        </p>
        <p>
          With an MSc in Cybersecurity & Threat Intelligence from the University
          of Guelph, I bring both a research mindset and an engineering
          foundation to the work.
        </p>
        <a
          className="button-text"
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          More about my background <ArrowUpRight size={17} />
        </a>
      </Reveal>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section container contact-section">
      <div className="contact-layout">
        <div>
          <span className="eyebrow section-number">05 / LET’S CONNECT</span>
          <h2 className="section-title">
            Let’s build something
            <br />
            <em>worth protecting.</em>
          </h2>
          <p className="section-description">
            Research ideas, security challenges, or a chance to collaborate. I’m
            always up for a thoughtful conversation.
          </p>
          <Magnetic intensity={0.12}>
            <ShimmerLink href={'mailto:' + profile.email}>
              Start a conversation <ArrowUpRight size={18} />
            </ShimmerLink>
          </Magnetic>
        </div>
        <Reveal className="contact-details">
          <Mail className="contact-mail-icon" size={30} strokeWidth={1} />
          <span className="eyebrow">DROP ME A LINE</span>
          <div className="email-row">
            <a href={'mailto:' + profile.email}>{profile.email}</a>
          </div>
          <CopyConfirm value={profile.email} />
          <div className="social-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={15} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
