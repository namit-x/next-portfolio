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

const GITHUB_USERNAME = 'namit-x'
const LEETCODE_USERNAME = 'namitrana'

const DAY_MS = 24 * 60 * 60 * 1000
const CALENDAR_WEEKS = 30

export const dynamic = 'force-dynamic'

const toDateKey = (date: Date) => date.toISOString().slice(0, 10)

const getCalendarStart = () => {
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

const levelFromCount = (count: number, thresholds = [1, 3, 6, 10]) => {
  if (count <= 0) return 0
  if (count >= thresholds[3]) return 4
  if (count >= thresholds[2]) return 3
  if (count >= thresholds[1]) return 2
  return 1
}

const buildCalendar = (
  countsByDate: Map<string, number>,
  levelByDate?: Map<string, number>
): CalendarCell[] => {
  const start = getCalendarStart()

  return Array.from({ length: CALENDAR_WEEKS * 7 }, (_, index) => {
    const date = new Date(start.getTime() + index * DAY_MS)
    const key = toDateKey(date)
    const count = countsByDate.get(key) ?? 0

    return {
      date: key,
      count,
      level: levelByDate?.get(key) ?? levelFromCount(count),
    }
  })
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
  const response = await fetch(url, {
    ...init,
    cache: 'no-store',
    headers: {
      accept: 'application/json',
      'user-agent': 'namit-portfolio-signal-grid',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`)
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

const getGitHubSignal = async () => {
  const [user, contributionHtml, events] = await Promise.all([
    fetchJson<GitHubUser>(`https://api.github.com/users/${GITHUB_USERNAME}`),
    fetch(`https://github.com/${GITHUB_USERNAME}?action=show&controller=profiles&tab=contributions&user_id=${GITHUB_USERNAME}`, {
      cache: 'no-store',
      headers: {
        accept: 'text/html',
        'user-agent': 'namit-portfolio-signal-grid',
        'x-requested-with': 'XMLHttpRequest',
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
    calendar: buildCalendar(countsByDate, levelByDate),
    recent: {
      label: lastEvent ? formatEventType(lastEvent.type) : 'no public event',
      repo: lastEvent?.repo?.name ?? recentRepos[0] ?? 'public profile',
      at: lastEvent?.created_at ?? null,
      repos: recentRepos,
    },
  }
}

const getLeetCodeSignal = async () => {
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
    const date = toDateKey(new Date(Number(timestamp) * 1000))
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
    calendar: buildCalendar(countsByDate),
  }
}

export async function GET() {
  try {
    const [github, leetcode] = await Promise.all([getGitHubSignal(), getLeetCodeSignal()])

    return Response.json(
      {
        github,
        leetcode,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Unable to load signal data',
      },
      {
        status: 502,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    )
  }
}
