import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import Reveal from '../components/Reveal.jsx'

const anatomy = [
  { label: 'What', value: 'Adopt Postgres over DynamoDB for the core ledger' },
  { label: 'Why', value: 'The team already knows SQL, and our access patterns are relational, not key-value.' },
  { label: 'When', value: 'Feb 20, 2026' },
  { label: 'Status', value: 'Active' },
]

const scenarios = [
  {
    heading: 'The new hire asks why',
    body: 'Three weeks in, someone asks why you’re on Postgres instead of Dynamo. You link one entry instead of retelling the story from memory.',
  },
  {
    heading: 'The quarterly review',
    body: 'Before planning starts, skim what’s still active and what’s been reversed. Nobody opens a stale doc from January to check.',
  },
  {
    heading: 'The postmortem',
    body: 'An incident traces back to a call made in March. The reasoning is still there, unedited, exactly as it was written down.',
  },
]

function jumpTo(event, id) {
  event.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-2xl tracking-tight">Decision Log</span>
          <nav className="hidden items-center gap-8 text-sm text-text-soft sm:flex">
            <a href="#anatomy" onClick={(e) => jumpTo(e, 'anatomy')} className="hover:text-text transition-colors">How it works</a>
            <a href="#scenarios" onClick={(e) => jumpTo(e, 'scenarios')} className="hover:text-text transition-colors">Why it matters</a>
          </nav>
          <Link to="/app">
            <motion.span
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg"
            >
              Try Demo
            </motion.span>
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-10 hidden h-80 w-80 rounded-full bg-accent-dim blur-3xl animate-drift sm:block" />
        <div className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 pt-16 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-accent">For teams who forget why</p>
            <h1 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Six months from now,
              <br />
              someone will ask why.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-soft">
              Decision Log is where you write it down once — what you decided, why, and when —
              so you never have to reconstruct it from a Slack thread nobody can find again.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link to="/app">
                <motion.span
                  whileHover={{ y: -2, boxShadow: '0 18px 40px -18px rgba(217,164,65,0.55)' }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-bg"
                >
                  Try Demo — no signup
                </motion.span>
              </Link>
              <a href="#anatomy" onClick={(e) => jumpTo(e, 'anatomy')} className="text-sm font-medium text-text-soft underline decoration-line underline-offset-4 hover:text-text transition-colors">
                See how an entry works
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -left-6 -top-6 h-full w-full rounded-2xl border border-line" />
            <div className="relative rounded-2xl border border-line bg-surface p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 break-words font-display text-2xl leading-snug">Deprecate the v1 public API</h3>
                <span className="shrink-0 rounded-full bg-positive/15 px-3 py-1 text-xs font-medium text-positive">Active</span>
              </div>
              <p className="mt-3 break-words text-sm leading-relaxed text-text-soft">
                v1 has no rate limiting and forces us to keep a legacy shard alive for three enterprise
                customers. Six-month migration window before we shut the endpoints off.
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-xs text-text-soft">
                <span>Marcus D.</span>
                <span>May 14, 2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-line bg-surface-soft">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <Reveal>
            <p className="font-display text-3xl leading-snug text-text sm:text-4xl">
              Most decisions don't disappear because they were wrong.
              They disappear because nobody wrote down the reasoning
              before the thread scrolled away.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="anatomy" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">The anatomy of an entry</p>
          <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Four things. Nothing else.</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal delay={80} className="space-y-6">
            {anatomy.map((row) => (
              <div key={row.label} className="border-b border-line pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-soft">{row.label}</p>
                <p className="mt-2 break-words text-lg leading-snug">{row.value}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={160}>
            <div className="rounded-2xl border border-line bg-surface p-8">
              <p className="font-display text-2xl leading-relaxed">
                "We used to argue about decisions we'd already made. Now we just link the entry and move on."
              </p>
              <p className="mt-6 text-sm text-text-soft">Dana Whitfield &mdash; Head of Product, Ledgerly</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="scenarios" className="scroll-mt-24 border-t border-line bg-surface-soft">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Where it actually gets used</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">Not on decision day. Later.</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {scenarios.map((s, i) => (
              <Reveal key={s.heading} delay={i * 90}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-xl border border-line bg-surface p-6"
                >
                  <h3 className="font-display text-xl">{s.heading}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-soft">{s.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-28 text-center">
        <Reveal>
          <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
            Write it down before you need it.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-text-soft">
            The demo is fully working. Add a real decision and see what it looks like a year from now.
          </p>
          <Link to="/app">
            <motion.span
              whileHover={{ y: -2, boxShadow: '0 18px 40px -18px rgba(217,164,65,0.55)' }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-bg"
            >
              Try Demo
            </motion.span>
          </Link>
        </Reveal>
      </section>

      <footer className="border-t border-line px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-text-soft sm:flex-row">
          <span className="font-display text-lg text-text">Decision Log</span>
          <span>&copy; 2026. Built for teams who don't want to have the same argument twice.</span>
        </div>
      </footer>
    </div>
  )
}
