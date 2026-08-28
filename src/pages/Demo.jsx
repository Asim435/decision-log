import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { seedDecisions } from '../data/seedDecisions.js'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'superseded', label: 'Superseded' },
  { key: 'reversed', label: 'Reversed' },
]

const statusStyles = {
  active: 'bg-positive/15 text-positive',
  superseded: 'bg-neutral/15 text-neutral',
  reversed: 'bg-negative/15 text-negative',
}

const statusLabel = {
  active: 'Active',
  superseded: 'Superseded',
  reversed: 'Reversed',
}

const STORAGE_KEY = 'decision-log.decisions'

const emptyForm = { title: '', why: '', owner: '', status: 'active' }

function loadDecisions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedDecisions
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return seedDecisions
    const valid = parsed.filter(
      (d) => d && typeof d.title === 'string' && typeof d.why === 'string',
    )
    return valid.length ? valid : seedDecisions
  } catch {
    return seedDecisions
  }
}

function saveDecisions(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // ignore quota / private-mode failures
  }
}

const formatDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export default function Demo() {
  const [decisions, setDecisions] = useState(loadDecisions)
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    saveDecisions(decisions)
  }, [decisions])

  const visible = useMemo(
    () => (filter === 'all' ? decisions : decisions.filter((d) => d.status === filter)),
    [decisions, filter],
  )

  const counts = useMemo(() => {
    const base = { all: decisions.length, active: 0, superseded: 0, reversed: 0 }
    decisions.forEach((d) => {
      base[d.status] += 1
    })
    return base
  }, [decisions])

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.why.trim()) return
    const entry = {
      id: Date.now(),
      title: form.title.trim(),
      why: form.why.trim(),
      owner: form.owner.trim() || 'You',
      status: form.status,
      date: new Date().toISOString().slice(0, 10),
    }
    setDecisions((prev) => [entry, ...prev])
    setForm(emptyForm)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-2xl tracking-tight hover:text-accent transition-colors">
            Decision Log
          </Link>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm((v) => !v)}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg"
          >
            {showForm ? 'Cancel' : '+ New decision'}
          </motion.button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <AnimatePresence initial={false}>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <form onSubmit={submit} className="mb-10 rounded-2xl border border-line bg-surface p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="sm:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-text-soft">What was decided</span>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      maxLength={120}
                      placeholder="Switch the design system to a token-based build"
                      className="mt-2 w-full rounded-lg border border-line bg-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                    />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-text-soft">Why</span>
                    <textarea
                      value={form.why}
                      onChange={(e) => setForm({ ...form, why: e.target.value })}
                      maxLength={500}
                      rows={3}
                      placeholder="What made this the right call, and what were you trading off?"
                      className="mt-2 w-full resize-none rounded-lg border border-line bg-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                    />
                  </label>
                  <label>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-text-soft">Owner</span>
                    <input
                      value={form.owner}
                      onChange={(e) => setForm({ ...form, owner: e.target.value })}
                      maxLength={40}
                      placeholder="You"
                      className="mt-2 w-full rounded-lg border border-line bg-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                    />
                  </label>
                  <label>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-text-soft">Status</span>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="mt-2 w-full rounded-lg border border-line bg-bg px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
                    >
                      <option value="active">Active</option>
                      <option value="superseded">Superseded</option>
                      <option value="reversed">Reversed</option>
                    </select>
                  </label>
                </div>
                <button
                  type="submit"
                  className="mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90 disabled:opacity-40"
                  disabled={!form.title.trim() || !form.why.trim()}
                >
                  Log this decision
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f.key
                  ? 'border-accent bg-accent text-bg'
                  : 'border-line text-text-soft hover:border-text-soft hover:text-text'
              }`}
            >
              {f.label}
              <span className="ml-1.5 opacity-60">{counts[f.key]}</span>
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line py-16 text-center text-text-soft">
            Nothing here yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {visible.map((d) => {
              const open = expandedId === d.id
              return (
                <li key={d.id} className="rounded-xl border border-line bg-surface transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.7)]">
                  <button
                    onClick={() => setExpandedId(open ? null : d.id)}
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className={`break-words font-display text-xl leading-snug ${open ? '' : 'line-clamp-2'}`}>
                        {d.title}
                      </h3>
                      <p
                        className={`mt-1 break-words text-sm text-text-soft ${
                          open ? 'whitespace-pre-wrap' : 'line-clamp-2'
                        }`}
                      >
                        {d.why}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[d.status]}`}>
                        {statusLabel[d.status]}
                      </span>
                      <span className="text-xs text-text-soft">{formatDate(d.date)}</span>
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center justify-between gap-4 border-t border-line px-6 py-4 text-sm text-text-soft">
                          <span className="min-w-0 truncate">Owner: {d.owner}</span>
                          <span className="shrink-0">Logged {formatDate(d.date)}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </div>
  )
}
