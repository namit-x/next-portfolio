type CalendarCell = {
  date: string
  count: number
  level: number
}

type GitHubUser = {
  login: string
  public_repos: number
  followers: number
  avatar_url: string
}

type GitHubEvent = {
  id: string
  type: string
  repo?: {
    name: string
  }
  created_at: string
}

type LeetCodeResponse = {
  data?: {
    matchedUser?: {
      username: string
      profile?: {
        realName?: string
        ranking?: number
        userAvatar?: string
      }
      submitStats?: {
        acSubmissionNum?: Array<{
          difficulty: string
          count: number
          submissions: number
        }>
      }
      userCalendar?: {
        streak?: number
        totalActiveDays?: number
        submissionCalendar?: string
      }
    }
  }
}

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'namit-x'
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || 'namitrana'

// Validate required environment variables on startup
if (!process.env.GITHUB_USERNAME || !process.env.LEETCODE_USERNAME) {
  console.warn('[Signal API] WARNING: GITHUB_USERNAME or LEETCODE_USERNAME not set in environment variables')
}

const DAY_MS = 24 * 60 * 60 * 1000
const CALENDAR_WEEKS = 52

export const dynamic = 'force-dynamic'

const toDateKey = (date: Date) => date.toISOString().slice(0, 10)

const getCalendarStart = (fromDate?: string) => {
  if (fromDate) {
    const date = new Date(`${fromDate}T00:00:00Z`)
    if (!isNaN(date.getTime())) {
      return date
    }
  }

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const dayOffset = today.getUTCDay()
  const endOfWeek = new Date(today.getTime() + (6 - dayOffset) * DAY_MS)
  return new Date(endOfWeek.getTime() - (CALENDAR_WEEKS * 7 - 1) * DAY_MS)
}

const formatEventType = (type: string) =>
  type
    .replace(/Event$/, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .toLowerCase()

const levelFromCount = (count: number, thresholds: [number, number, number, number] = [1, 3, 6, 10]) => {
  if (count <= 0) return 0
  if (count >= thresholds[3]) return 4
  if (count >= thresholds[2]) return 3
  if (count >= thresholds[1]) return 2
  return 1
}

const buildCalendar = (
  countsByDate: Map<string, number>,
  levelByDate?: Map<string, number>,
  fromDate?: string
): CalendarCell[] => {
  const start = getCalendarStart(fromDate)
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  const cells: CalendarCell[] = []
  let date = new Date(start)

  while (date <= today) {
    const key = toDateKey(date)
    const count = countsByDate.get(key) ?? 0

    cells.push({
      date: key,
      count,
      level: levelByDate?.get(key) ?? levelFromCount(count),
    })

    date.setUTCDate(date.getUTCDate() + 1)
  }

  // Pad to complete weeks
  while (cells.length % 7 !== 0) {
    cells.push({
      date: `padded-${cells.length}`,
      count: 0,
      level: 0,
    })
  }

  return cells
}

const getCurrentStreak = (countsByDate: Map<string, number>) => {
  let streak = 0
  const cursor = new Date()
  cursor.setUTCHours(0, 0, 0, 0)

  while (countsByDate.get(toDateKey(cursor)) ?? 0) {
    streak += 1
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }

  return streak
}

const fetchJson = async <T,>(url: string, init?: RequestInit): Promise<T> => {
  const headers: Record<string, string> = {
    accept: 'application/json',
    'user-agent': 'namit-portfolio-signal-grid',
  }

  // Add GitHub token if available for authenticated requests
  if (url.includes('api.github.com') && process.env.GITHUB_TOKEN) {
    // Better validation: just check if token exists and has some length
    if (process.env.GITHUB_TOKEN.length > 10) {
      headers['authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }
  }

  // Merge init headers if provided
  if (init?.headers && typeof init.headers === 'object' && !Array.isArray(init.headers)) {
    Object.assign(headers, init.headers)
  }

  const response = await fetch(url, {
    ...init,
    headers,
  })

  if (!response.ok) {
    // Extract rate limit info from headers if available
    const rateLimitRemaining = response.headers.get('x-ratelimit-remaining')
    const rateLimitReset = response.headers.get('x-ratelimit-reset')

    const error = new Error(
      `API Error: ${response.status} from ${url}` +
      (rateLimitRemaining ? ` (Rate limit: ${rateLimitRemaining} remaining)` : '')
    )
      ; (error as any).statusCode = response.status
      ; (error as any).isRateLimit = response.status === 403 || response.status === 429
      ; (error as any).retryAfter = rateLimitReset

    throw error
  }

  return response.json() as Promise<T>
}

const parseGitHubCalendar = (html: string) => {
  const countsByDate = new Map<string, number>()
  const levelByDate = new Map<string, number>()
  const cellRegex = /<td\b(?=[^>]*ContributionCalendar-day)[^>]*>/g
  let match: RegExpExecArray | null

  while ((match = cellRegex.exec(html)) !== null) {
    const cell = match[0]
    const date = cell.match(/data-date="([^"]+)"/)?.[1]
    const rawLevel = Number(cell.match(/data-level="([^"]+)"/)?.[1] ?? 0)
    const tooltip = html
      .slice(match.index, match.index + 700)
      .match(/<tool-tip[^>]*>(.*?)<\/tool-tip>/)?.[1]
    const rawCount = tooltip?.match(/([\d,]+) contribution/)?.[1]
    const count = rawCount ? Number(rawCount.replace(/,/g, '')) : 0

    if (date) {
      countsByDate.set(date, count)
      levelByDate.set(date, rawLevel)
    }
  }

  return { countsByDate, levelByDate }
}

const getGitHubSignal = async (fromDate?: string) => {
  const [user, contributionHtml, events] = await Promise.all([
    fetchJson<GitHubUser>(`https://api.github.com/users/${GITHUB_USERNAME}`),
    fetch(`https://github.com/${GITHUB_USERNAME}?action=show&controller=profiles&tab=contributions&user_id=${GITHUB_USERNAME}`, {
      cache: 'no-store',
      headers: {
        accept: 'text/html',
        'user-agent': 'namit-portfolio-signal-grid',
        'x-requested-with': 'XMLHttpRequest',
        ...(process.env.GITHUB_TOKEN &&
          process.env.GITHUB_TOKEN !== 'your_github_token_here' && {
          'authorization': `token ${process.env.GITHUB_TOKEN}`,
        }),
      },
    }).then((response) => {
      if (!response.ok) throw new Error(`GitHub calendar returned ${response.status}`)
      return response.text()
    }),
    fetchJson<GitHubEvent[]>(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`
    ),
  ])

  const { countsByDate, levelByDate } = parseGitHubCalendar(contributionHtml)

  if (countsByDate.size === 0) {
    events.forEach((event) => {
      const key = event.created_at.slice(0, 10)
      countsByDate.set(key, (countsByDate.get(key) ?? 0) + 1)
    })
  }

  const recentRepos = Array.from(
    new Set(events.map((event) => event.repo?.name).filter(Boolean))
  ).slice(0, 3)
  const lastEvent = events[0]

  return {
    profile: {
      label: 'GitHub',
      handle: `@${user.login}`,
      href: `https://github.com/${GITHUB_USERNAME}`,
      avatar: user.avatar_url,
    },
    stats: {
      contributions: Array.from(countsByDate.values()).reduce((sum, count) => sum + count, 0),
      activeDays: Array.from(countsByDate.values()).filter(Boolean).length,
      streak: getCurrentStreak(countsByDate),
      repos: user.public_repos,
      followers: user.followers,
    },
    calendar: buildCalendar(countsByDate, levelByDate, fromDate),
    recent: {
      label: lastEvent ? formatEventType(lastEvent.type) : 'no public event',
      repo: lastEvent?.repo?.name ?? recentRepos[0] ?? 'public profile',
      at: lastEvent?.created_at ?? null,
      repos: recentRepos,
    },
  }
}

const getLeetCodeSignal = async (fromDate?: string) => {
  const response = await fetchJson<LeetCodeResponse>('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query userProfileCalendar($username: String!, $year: Int) {
          matchedUser(username: $username) {
            username
            profile {
              realName
              ranking
              userAvatar
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            userCalendar(year: $year) {
              streak
              totalActiveDays
              submissionCalendar
            }
          }
        }
      `,
      variables: {
        username: LEETCODE_USERNAME,
      },
    }),
  })

  const user = response.data?.matchedUser
  if (!user) {
    throw new Error('LeetCode user not found')
  }

  const calendarPayload = user.userCalendar?.submissionCalendar
    ? (JSON.parse(user.userCalendar.submissionCalendar) as Record<string, number>)
    : {}
  const countsByDate = new Map<string, number>()

  Object.entries(calendarPayload).forEach(([timestamp, count]) => {
    const dt = new Date(Number(timestamp) * 1000)
    const date = `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}-${String(dt.getUTCDate()).padStart(2, '0')}`
    countsByDate.set(date, count)
  })

  const solvedByDifficulty = new Map(
    user.submitStats?.acSubmissionNum?.map((entry) => [entry.difficulty, entry]) ?? []
  )

  return {
    profile: {
      label: 'LeetCode',
      handle: user.username,
      href: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
      avatar: user.profile?.userAvatar ?? null,
    },
    stats: {
      solved: solvedByDifficulty.get('All')?.count ?? 0,
      submissions: solvedByDifficulty.get('All')?.submissions ?? 0,
      easy: solvedByDifficulty.get('Easy')?.count ?? 0,
      medium: solvedByDifficulty.get('Medium')?.count ?? 0,
      hard: solvedByDifficulty.get('Hard')?.count ?? 0,
      streak: user.userCalendar?.streak ?? getCurrentStreak(countsByDate),
      activeDays: user.userCalendar?.totalActiveDays ?? Array.from(countsByDate.values()).filter(Boolean).length,
      ranking: user.profile?.ranking ?? null,
    },
    calendar: buildCalendar(countsByDate, undefined, fromDate),
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const fromDate = url.searchParams.get('from')

    // Validate fromDate parameter if provided
    if (fromDate && !/^\d{4}-\d{2}-\d{2}$/.test(fromDate)) {
      return Response.json(
        {
          error: 'Invalid fromDate format. Expected YYYY-MM-DD',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Content-Type': 'application/json',
          },
        }
      )
    }

    const [github, leetcode] = await Promise.all([
      getGitHubSignal(fromDate ?? undefined),
      getLeetCodeSignal(fromDate ?? undefined),
    ])

    return Response.json(
      {
        github,
        leetcode,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          // Cache for 5 minutes, allow stale content for up to 10 minutes if backend is down
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unable to load signal data'
    const statusCode = (error as any)?.statusCode || 500
    const isRateLimit = (error as any)?.isRateLimit || errorMessage.includes('403') || errorMessage.includes('429')

    // Log error for monitoring (in production, send to error tracking service)
    if (process.env.NODE_ENV === 'development') {
      console.error('[Signal API Error]:', {
        message: errorMessage,
        statusCode,
        isRateLimit,
        timestamp: new Date().toISOString(),
      })
    }

    // Handle rate limiting with proper status code
    if (isRateLimit) {
      const retryAfter = (error as any)?.retryAfter
      const headers: Record<string, string> = {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json',
      }

      if (retryAfter) {
        headers['Retry-After'] = retryAfter
      }

      if (process.env.NODE_ENV === 'development') {
        console.error(
          '[Rate Limit Help] API is rate-limited. To fix:\n' +
          '1. Go to: https://github.com/settings/tokens?type=beta\n' +
          '2. Click "Generate new token"\n' +
          '3. Select "Personal Access Token (fine-grained)"\n' +
          '4. Name: "next-portfolio-dev"\n' +
          '5. Expiration: 90 days\n' +
          '6. Repository access: Public repositories (read-only)\n' +
          '7. Copy token and add to .env.local: GITHUB_TOKEN=ghp_xxx'
        )
      }

      return Response.json(
        {
          error: 'API rate limited. Please try again later.',
        },
        {
          status: 429,
          headers,
        }
      )
    }

    return Response.json(
      {
        error: errorMessage,
      },
      {
        status: statusCode >= 400 ? statusCode : 502,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
