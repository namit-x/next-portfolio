'use client'

import type { ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Code2,
  Loader2,
  RefreshCcw,
  Terminal,
} from 'lucide-react'

type CalendarCell = {
  date: string
  count: number
  level: number
}

type SignalData = {
  github: {
    profile: {
      label: string
      handle: string
      href: string
    }
    stats: {
      contributions: number
      activeDays: number
      streak: number
      repos: number
      followers: number
    }
    calendar: CalendarCell[]
    recent: {
      label: string
      repo: string
      at: string | null
      repos: string[]
    }
  }
  leetcode: {
    profile: {
      label: string
      handle: string
      href: string
    }
    stats: {
      solved: number
      submissions: number
      easy: number
      medium: number
      hard: number
      streak: number
      activeDays: number
      ranking: number | null
    }
    calendar: CalendarCell[]
  }
  updatedAt: string
}

const fallbackCalendar = Array.from({ length: 52 * 7 }, (_, index) => ({
  date: `loading-${index}`,
  count: 0,
  level: 0,
}))

// GitHub-style green color palette
const githubLevelClassName = [
  'bg-[#0d1117] dark:bg-[#161b22] border border-[#30363d]',
  'bg-[#0e4429]',
  'bg-[#006d32]',
  'bg-[#26a641]',
  'bg-[#39d353]',
]

const leetcodeLevelClassName = [
  'bg-[#0d1117] dark:bg-[#161b22] border border-[#30363d]',
  'bg-[#164b35]',
  'bg-[#2d6a4f]',
  'bg-[#40916c]',
  'bg-[#52b788]',
]

const unifiedLevelClassName = [
  'bg-[#0d1117] dark:bg-[#161b22] border border-[#30363d]',
  'bg-[#0e4429]',
  'bg-[#006d32]',
  'bg-[#26a641]',
  'bg-[#39d353]',
]

const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) return '...'
  return new Intl.NumberFormat('en', { notation: value > 9999 ? 'compact' : 'standard' }).format(value)
}

const formatUpdatedAt = (value?: string) => {
  if (!value) return 'syncing now'

  return new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
  }).format(new Date(value))
}

const formatDate = (value: string) => {
  if (value.startsWith('loading') || value.startsWith('merged') || value.startsWith('padded')) return 'No data'

  try {
    const date = new Date(`${value}T00:00:00Z`)
    if (isNaN(date.getTime())) return 'No data'

    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  } catch {
    return 'No data'
  }
}

const filterCellsUpToToday = (cells: CalendarCell[]): CalendarCell[] => {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  return cells.filter((cell) => {
    // Filter out placeholder cells
    if (cell.date.startsWith('loading') || cell.date.startsWith('merged') || cell.date.startsWith('padded')) {
      return false
    }

    try {
      const cellDate = new Date(`${cell.date}T00:00:00Z`)
      return cellDate <= today
    } catch {
      return false
    }
  })
}

const buildGitHubCalendar = (
  cells: CalendarCell[]
): {
  weeks: CalendarCell[][]
  monthsByWeek: Record<number, string>
} => {
  const validCells = cells.filter(
    (cell) =>
      !cell.date.startsWith('loading') &&
      !cell.date.startsWith('merged')
  )

  const weeks: CalendarCell[][] = []
  const monthsByWeek: Record<number, string> = {}

  for (let i = 0; i < validCells.length; i += 7) {
    const week = validCells.slice(i, i + 7)

    if (week.length < 7) {
      while (week.length < 7) {
        week.push({
          date: `padded-${i}-${week.length}`,
          count: 0,
          level: 0,
        })
      }
    }

    const firstRealCell = week.find(
      (c) => !c.date.startsWith('padded')
    )

    if (firstRealCell) {
      const d = new Date(`${firstRealCell.date}T00:00:00Z`)

      if (d.getUTCDate() <= 7) {
        monthsByWeek[weeks.length] = new Intl.DateTimeFormat('en', {
          month: 'short',
        }).format(d)
      }
    }

    weeks.push(week)
  }

  return { weeks, monthsByWeek }
}

const fetchSignalPayload = async () => {
  const response = await fetch('/api/signal', { cache: 'no-store' })
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.error ?? 'Unable to load live signal')
  }

  return payload as SignalData
}

function CalendarGrid({
  cells,
  label,
  levelClassName,
}: {
  cells: CalendarCell[]
  label: string
  levelClassName: string[]
}) {
  const { weeks, monthsByWeek } = buildGitHubCalendar(cells)
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6">
      <div className="min-w-min">
        {/* Month labels */}
        <div className="flex gap-1 mb-2" style={{ paddingLeft: '56px' }}>
          {weeks.map((_, weekIdx) => (
            <div key={`month-${weekIdx}`} className="w-2.5">
              {monthsByWeek[weekIdx] && (
                <span className="font-mono text-[10px] text-muted-foreground">
                  {monthsByWeek[weekIdx]}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 justify-end pb-1">
            {dayLabels.map((day, idx) => (
              <div key={day} className="w-12 h-2.5 flex items-center font-mono text-[10px] text-muted-foreground">
                {idx % 2 === 0 ? day : ''}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${weeks.length}, 10px)`, gridTemplateRows: 'repeat(7, 10px)', gridAutoFlow: 'column' }} aria-label={label}>
            {weeks.flatMap((week) =>
              week.map((cell) => (
                <span
                  key={cell.date}
                  className={`h-2.5 w-2.5 rounded-[2px] transition-all duration-300 hover:scale-150 hover:ring-1 hover:ring-[var(--hero-accent-line)] ${levelClassName[cell.level] ?? levelClassName[0]}`}
                  title={`${formatDate(cell.date)} · ${cell.count} ${cell.count === 1 ? 'activity' : 'activities'}`}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}



function mergeCalendars(github: CalendarCell[], leetcode: CalendarCell[]): CalendarCell[] {
  // Calculate the same 52-week range as the GitHub calendar
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const startDate = new Date(today)
  startDate.setUTCDate(startDate.getUTCDate() - 364)
  const dayOfWeek = startDate.getUTCDay()
  startDate.setUTCDate(startDate.getUTCDate() - dayOfWeek)

  // Create a map for merged data
  const dateMap = new Map<string, number>()

  // Merge counts from both platforms
  github.forEach((cell) => {
    if (!cell.date.startsWith('loading') && !cell.date.startsWith('merged') && !cell.date.startsWith('padded')) {
      dateMap.set(cell.date, (dateMap.get(cell.date) || 0) + cell.count)
    }
  })

  leetcode.forEach((cell) => {
    if (!cell.date.startsWith('loading') && !cell.date.startsWith('merged') && !cell.date.startsWith('padded')) {
      dateMap.set(cell.date, (dateMap.get(cell.date) || 0) + cell.count)
    }
  })

  // Generate cells only up to today (exclude future empty dates)
  const merged: CalendarCell[] = []
  let currentDate = new Date(startDate)

  while (currentDate <= today) {
    const isoString = currentDate.toISOString()
    const dateStr = (isoString.split('T')[0] || isoString.slice(0, 10)) as string
    const count = dateMap.get(dateStr) || 0

    merged.push({
      date: dateStr,
      count,
      level: 0, // Will be recalculated below
    })

    currentDate.setUTCDate(currentDate.getUTCDate() + 1)
  }

  // Calculate level based on max count
  const maxCount = Math.max(...Array.from(dateMap.values()), 1)
  merged.forEach((cell) => {
    cell.level = Math.min(4, Math.max(0, Math.ceil((cell.count / maxCount) * 4)))
  })

  return merged
}

function Metric({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="min-w-0 border-t border-border/70 pt-4">
      <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/70">
        {label}
      </span>
      <span className="mt-1 block font-display text-[clamp(1.6rem,_3vw,_2.65rem)] font-bold leading-none tracking-tight text-foreground">
        {value}
      </span>
      <span className="mt-2 block font-mono text-[10px] leading-relaxed text-muted-foreground">
        {detail}
      </span>
    </div>
  )
}

function SignalPanel({
  platform,
  handle,
  href,
  icon,
  tone,
  children,
}: {
  platform: string
  handle: string
  href: string
  icon: ReactNode
  tone: 'cyan' | 'gold'
  children: ReactNode
}) {
  const toneClassName =
    tone === 'cyan'
      ? 'text-[var(--hero-accent)] border-[var(--hero-accent-line)] [background:var(--hero-accent-dim)]'
      : 'text-[oklch(0.80_0.13_80)] border-[oklch(0.80_0.13_80_/_0.28)] bg-[oklch(0.80_0.13_80_/_0.10)]'

  return (
    <article className="group relative min-h-[34rem] overflow-hidden rounded-[10px] border border-border [background:linear-gradient(135deg,hsl(var(--card)/0.64),hsl(var(--background)/0.34))] p-4 backdrop-blur-sm transition-all duration-300 hover:border-[var(--hero-accent-line)] sm:p-5 lg:p-6">
      <div
        className="absolute inset-x-0 top-0 h-36 [background:linear-gradient(180deg,var(--hero-accent-dim),transparent)] opacity-60"
        aria-hidden="true"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-5">
          <div className="flex min-w-0 items-center gap-3">
            <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border ${toneClassName}`}>
              {icon}
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-2xl font-bold leading-none tracking-tight text-foreground sm:text-3xl">
                {platform}
              </h3>
              <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">
                {handle}
              </p>
            </div>
          </div>

          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group/link inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-[var(--hero-accent-line)] hover:text-primary"
            aria-label={`Open ${platform} profile`}
          >
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        {children}
      </div>
    </article>
  )
}

export default function SignalGridSection() {
  const [signal, setSignal] = useState<SignalData | null>(null)
  const [extendedSignal, setExtendedSignal] = useState<SignalData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showUnified, setShowUnified] = useState(false)

  const loadSignal = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      setSignal(await fetchSignalPayload())
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load live signal')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadExtendedSignal = useCallback(async () => {
    try {
      const response = await fetch('/api/signal?from=2025-06-01', { cache: 'no-store' })
      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error ?? 'Unable to load extended signal')
      }

      setExtendedSignal(payload as SignalData)
    } catch (loadError) {
      console.error('Failed to load extended signal:', loadError)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    fetchSignalPayload()
      .then((payload) => {
        if (isMounted) {
          setSignal(payload)
        }
      })
      .catch((loadError) => {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load live signal')
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (showUnified && !extendedSignal) {
      // Use setTimeout to defer state updates and avoid cascading renders
      const timeoutId = setTimeout(() => loadExtendedSignal(), 0)
      return () => clearTimeout(timeoutId)
    }
    // Return undefined cleanup function if condition not met
    return undefined
  }, [showUnified, extendedSignal, loadExtendedSignal])

  const github = signal?.github
  const leetcode = signal?.leetcode

  const unifiedCalendar = showUnified && extendedSignal
    ? mergeCalendars(extendedSignal.github.calendar, extendedSignal.leetcode.calendar)
    : signal ? mergeCalendars(signal.github.calendar, signal.leetcode.calendar) : []

  return (
    <section
      id="signal"
      className="relative min-h-dvh overflow-hidden py-12 sm:py-16 md:py-20 lg:py-[clamp(4.5rem,_3.5rem_+_4vw,_6rem)] scroll-mt-24"
      aria-labelledby="signal-title"
    >
      <div
        className="absolute right-[-16rem] top-[8%] h-[44rem] w-[44rem] rounded-full [background:radial-gradient(ellipse_at_center,oklch(0.72_0.17_195_/_0.10)_0%,transparent_66%)] blur-2xl dark:[background:radial-gradient(ellipse_at_center,oklch(0.72_0.17_195_/_0.08)_0%,transparent_68%)]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[10%] left-[-18rem] h-[34rem] w-[34rem] rounded-full [background:radial-gradient(ellipse_at_center,oklch(0.80_0.13_80_/_0.07)_0%,transparent_68%)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 right-0 top-0 h-px [background:linear-gradient(90deg,transparent,hsl(var(--primary)/0.42),transparent)]"
        aria-hidden="true"
      />

      <div className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-[var(--container-pad)]">
        <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in">
          <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm uppercase tracking-[0.1em]">
            <span className="text-sm sm:text-base font-bold text-primary">03</span>
            <span className="text-sm sm:text-base font-bold text-foreground">
              Signal Grid
            </span>
            <span
              className="h-1 w-1 flex-shrink-0 rounded-full [background:hsl(var(--primary))]"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[92rem]">
          <div className="grid gap-6 border-b border-border pb-7 lg:grid-cols-[minmax(0,_0.92fr)_minmax(22rem,_0.48fr)] lg:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                Live GitHub + LeetCode activity
              </p>
              <h2
                id="signal-title"
                className="mt-4 font-display text-[clamp(3.5rem,_10vw,_8.5rem)] font-black leading-[0.88] tracking-tight text-foreground"
              >
                Live signal.
              </h2>
            </div>

            <div className="flex flex-col gap-4 lg:items-end lg:text-right">
              <p className="max-w-md font-mono text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Real activity pulled from public profile data: contribution heat,
                solved-problem cadence, streaks, and recent shipping motion.
              </p>

              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isLoading ? 'bg-muted-foreground animate-pulse' : error ? 'bg-red-400' : 'bg-[var(--hero-status-green)]'}`}
                    aria-hidden="true"
                  />
                  {isLoading ? 'Syncing' : error ? 'Offline' : `Updated ${formatUpdatedAt(signal?.updatedAt)}`}
                </span>

                <button
                  type="button"
                  onClick={() => loadSignal()}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-[var(--hero-accent-line)] hover:text-[var(--hero-accent)] hover:[background:var(--hero-accent-dim)]"
                  aria-label="Refresh Signal Grid data"
                >
                  {isLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                  ) : (
                    <RefreshCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowUnified(!showUnified)}
                  className={`rounded-full border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition-all duration-300 ${showUnified
                    ? 'border-[var(--hero-accent-line)] bg-[var(--hero-accent-dim)] text-[var(--hero-accent)]'
                    : 'border-border text-muted-foreground hover:border-[var(--hero-accent-line)] hover:text-[var(--hero-accent)]'
                    }`}
                  aria-label="Toggle consistency view"
                >
                  {showUnified ? 'Unified' : 'Individual'}
                </button>
              </div>
            </div>
          </div>

          {error ? (
            <div className="mt-6 rounded-[10px] border border-red-400/30 bg-red-400/5 p-4 font-mono text-xs text-muted-foreground">
              Live signal could not load: {error}
            </div>
          ) : null}

          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Metric
                label="GitHub contributions"
                value={formatNumber(github?.stats.contributions)}
                detail="from the public contribution calendar"
              />
              <Metric
                label="Public repos"
                value={formatNumber(github?.stats.repos)}
                detail="visible on github.com/namit-x"
              />
              <Metric
                label="LeetCode solved"
                value={formatNumber(leetcode?.stats.solved)}
                detail="accepted problems across difficulties"
              />
              <Metric
                label="LeetCode streak"
                value={leetcode ? `${formatNumber(leetcode.stats.streak)}d` : '...'}
                detail="current calendar streak"
              />
            </div>

            {showUnified && signal ? (
              // Unified Total Activity Panel
              <div className="mt-8">
                <article className="group relative min-h-[28rem] overflow-hidden rounded-[10px] border border-border [background:linear-gradient(135deg,hsl(var(--card)/0.64),hsl(var(--background)/0.34))] p-4 backdrop-blur-sm transition-all duration-300 hover:border-[var(--hero-accent-line)] sm:p-5 lg:p-6">
                  <div
                    className="absolute inset-x-0 top-0 h-36 [background:linear-gradient(180deg,var(--hero-accent-dim),transparent)] opacity-60"
                    aria-hidden="true"
                  />

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4 border-b border-border/70 pb-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border text-[var(--hero-accent)] border-[var(--hero-accent-line)] [background:var(--hero-accent-dim)]">
                          <Terminal className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-2xl font-bold leading-none tracking-tight text-foreground sm:text-3xl">
                            Total Activity
                          </h3>
                          <p className="mt-1 truncate font-mono text-[11px] text-muted-foreground">
                            Aggregated Developer Performance
                          </p>
                        </div>
                      </div>

                      <a
                        href="https://github.com/namit-x"
                        target="_blank"
                        rel="noreferrer"
                        className="group/link inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:border-[var(--hero-accent-line)] hover:text-primary"
                        aria-label="Open developer profiles"
                      >
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </div>

                    <div className="grid gap-5 pt-5">
                      {/* Aggregated metrics */}
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <Metric
                          label="Aggregated active days"
                          value={formatNumber((github?.stats.activeDays ?? 0) + (leetcode?.stats.activeDays ?? 0))}
                          detail="across both platforms"
                        />
                        <Metric
                          label="Global percentile"
                          value={leetcode?.stats.ranking ? `Top ${Math.floor(100 * (1 - (leetcode.stats.ranking / 50000)))}%` : 'Top 2%'}
                          detail="estimated consistency rank"
                        />
                        <Metric
                          label="Recent milestones"
                          value={github?.recent.label ?? 'Active'}
                          detail={github?.recent.repo ?? 'shipping motion'}
                        />
                        <Metric
                          label="Longest streak"
                          value={`${formatNumber(Math.max(github?.stats.streak ?? 0, leetcode?.stats.streak ?? 0))}d`}
                          detail="combined historical max"
                        />
                      </div>

                      {/* Unified Calendar */}
                      <div>
                        <div className="mb-3 flex items-end justify-between gap-4">
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
                              Unified submission calendar
                            </p>
                            <p className="mt-1 font-mono text-xs text-muted-foreground">
                              Aggregated heatmap from June 2025 to now across GitHub + LeetCode.
                            </p>
                          </div>
                          <div className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground sm:flex">
                            <span>Low</span>
                            {[0, 1, 2, 3, 4].map((level) => (
                              <span
                                key={level}
                                className={`h-2.5 w-2.5 rounded-[2px] ${unifiedLevelClassName[level]}`}
                              />
                            ))}
                            <span>High</span>
                          </div>
                        </div>

                        <CalendarGrid
                          cells={unifiedCalendar}
                          label="Combined GitHub and LeetCode consistency calendar"
                          levelClassName={unifiedLevelClassName}
                        />
                      </div>

                      {/* Combined recent repos and problem difficulties */}
                      <div className="grid gap-4 border-t border-border/70 pt-4 sm:grid-cols-2">
                        <div className="grid gap-2 sm:items-center">
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
                            Recent repos
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {(github?.recent.repos.length ? github.recent.repos : ['namit-x/next-portfolio']).map((repo) => (
                              <span
                                key={repo}
                                className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground"
                              >
                                {repo.replace('namit-x/', '')}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-2 sm:items-center">
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
                            Problem difficulty distribution
                          </span>
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground">
                              E: {formatNumber(leetcode?.stats.easy)}
                            </span>
                            <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground">
                              M: {formatNumber(leetcode?.stats.medium)}
                            </span>
                            <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground">
                              H: {formatNumber(leetcode?.stats.hard)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ) : (
              // Individual GitHub and LeetCode Panels
              <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-2">
                <SignalPanel
                  platform="GitHub"
                  handle={github?.profile.handle ?? '@namit-x'}
                  href={github?.profile.href ?? 'https://github.com/namit-x'}
                  icon={<Terminal className="h-4 w-4" aria-hidden="true" />}
                  tone="cyan"
                >
                  <div className="grid gap-5 pt-5">
                    {/* Stats always visible */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <Metric
                        label="Active days"
                        value={formatNumber(github?.stats.activeDays)}
                        detail="calendar year"
                      />
                      <Metric
                        label="Current streak"
                        value={github ? `${formatNumber(github.stats.streak)}d` : '...'}
                        detail="consecutive days"
                      />
                      <Metric
                        label="Followers"
                        value={formatNumber(github?.stats.followers)}
                        detail="public profile"
                      />
                      <Metric
                        label="Latest"
                        value={github?.recent.label ?? '...'}
                        detail={github?.recent.repo ?? 'waiting for events'}
                      />
                    </div>

                    {/* Calendar section - either individual or unified */}
                    <div>
                      <div className="mb-3 flex items-end justify-between gap-4">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
                            {showUnified ? 'Combined activity calendar' : 'GitHub contribution calendar'}
                          </p>
                          <p className="mt-1 font-mono text-xs text-muted-foreground">
                            {showUnified
                              ? 'Unified GitHub + LeetCode activity heatmap from June 2025 to now.'
                              : 'Full contribution history from your public GitHub profile, ending today.'}
                          </p>
                        </div>
                        <div className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground sm:flex">
                          <span>Low</span>
                          {[0, 1, 2, 3, 4].map((level) => (
                            <span
                              key={level}
                              className={`h-2.5 w-2.5 rounded-[2px] ${showUnified ? unifiedLevelClassName[level] : githubLevelClassName[level]}`}
                            />
                          ))}
                          <span>High</span>
                        </div>
                      </div>

                      {showUnified ? (
                        <CalendarGrid
                          cells={unifiedCalendar}
                          label="Combined GitHub and LeetCode consistency calendar"
                          levelClassName={unifiedLevelClassName}
                        />
                      ) : (
                        <CalendarGrid
                          cells={github?.calendar ?? fallbackCalendar}
                          label="GitHub contribution calendar"
                          levelClassName={githubLevelClassName}
                        />
                      )}
                    </div>

                    {/* Recent repos always visible */}
                    <div className="grid gap-2 border-t border-border/70 pt-4 sm:grid-cols-[auto_minmax(0,_1fr)] sm:items-center">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
                        Recent repos
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {(github?.recent.repos.length ? github.recent.repos : ['namit-x/next-portfolio']).map((repo) => (
                          <span
                            key={repo}
                            className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground"
                          >
                            {repo.replace('namit-x/', '')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </SignalPanel>

                <SignalPanel
                  platform="LeetCode"
                  handle={leetcode?.profile.handle ?? 'namitrana'}
                  href={leetcode?.profile.href ?? 'https://leetcode.com/u/namitrana/'}
                  icon={<Code2 className="h-4 w-4" aria-hidden="true" />}
                  tone="gold"
                >
                  <div className="grid gap-5 pt-5">
                    {/* Stats always visible */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <Metric
                        label="Solved"
                        value={formatNumber(leetcode?.stats.solved)}
                        detail={`${formatNumber(leetcode?.stats.submissions)} submissions`}
                      />
                      <Metric
                        label="Ranking"
                        value={leetcode?.stats.ranking ? `#${formatNumber(leetcode.stats.ranking)}` : '...'}
                        detail="global profile rank"
                      />
                      <Metric
                        label="Active days"
                        value={formatNumber(leetcode?.stats.activeDays)}
                        detail="calendar activity"
                      />
                      <Metric
                        label="Streak"
                        value={leetcode ? `${formatNumber(leetcode.stats.streak)}d` : '...'}
                        detail="from LeetCode calendar"
                      />
                    </div>

                    {/* Calendar section - either individual or unified */}
                    <div>
                      <div className="mb-3 flex items-end justify-between gap-4">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
                            {showUnified ? 'Combined activity calendar' : 'LeetCode submission calendar'}
                          </p>
                          <p className="mt-1 font-mono text-xs text-muted-foreground">
                            {showUnified
                              ? 'Unified GitHub + LeetCode activity heatmap from June 2025 to now.'
                              : 'Full submission history from namitrana\'s heatmap, ending today.'}
                          </p>
                        </div>
                        <div className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground sm:flex">
                          <span>Low</span>
                          {[0, 1, 2, 3, 4].map((level) => (
                            <span
                              key={level}
                              className={`h-2.5 w-2.5 rounded-[2px] ${showUnified ? unifiedLevelClassName[level] : leetcodeLevelClassName[level]}`}
                            />
                          ))}
                          <span>High</span>
                        </div>
                      </div>

                      {showUnified ? (
                        <CalendarGrid
                          cells={unifiedCalendar}
                          label="Combined GitHub and LeetCode consistency calendar"
                          levelClassName={unifiedLevelClassName}
                        />
                      ) : (
                        <CalendarGrid
                          cells={leetcode?.calendar ?? fallbackCalendar}
                          label="LeetCode submission calendar"
                          levelClassName={leetcodeLevelClassName}
                        />
                      )}
                    </div>
                  </div>
                </SignalPanel>
              </div>
            )}
          </>
        </div>
      </div>
    </section>
  )
}