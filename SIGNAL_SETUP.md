# Signal Grid Setup Guide

## Current Status

The Signal Grid component is working correctly, but data display requires authentication to avoid GitHub API rate limiting (403 errors).

### What You're Seeing

- ✅ UI components render correctly
- ✅ Placeholders and descriptions display
- ❌ Live data fails due to 403 Forbidden (rate limit)

### Why This Happens

GitHub API allows only 60 requests/hour without authentication. A Personal Access Token increases this to 5,000 requests/hour, which is sufficient for a portfolio site.

---

## Quick Fix: Add GitHub Token

### Step 1: Create a Personal Access Token

1. Go to: **https://github.com/settings/tokens?type=beta**
2. Click **"Generate new token"**
3. Select **"Personal Access Token (fine-grained)"**
4. Fill in the form:
   - **Token name:** `next-portfolio-dev`
   - **Expiration:** `90 days`
   - **Repository access:** `Public repositories (read-only)`
   - **Permissions:** Keep defaults (read access to public data)
5. Click **"Generate token"**
6. **Copy the token immediately** (it won't be shown again)

### Step 2: Add Token to `.env.local`

Open `/home/namit/Burning/next-portfolio/.env.local` and uncomment the line:

```bash
GITHUB_TOKEN=ghp_your_token_here
```

Replace `ghp_your_token_here` with your actual token. Example:

```bash
GITHUB_TOKEN=ghp_1234567890abcdefghijklmnopqrstuvwxyz
```

### Step 3: Restart Dev Server

```bash
npm run dev
```

Then reload the website page. Data should now load successfully! 🎉

---

## What Gets Displayed

Once the token is added, the Signal Grid will show:

### Top Row Metrics (Always Visible)
- **GitHub Contributions:** Total contributions from the last 30 weeks
- **Public Repos:** Number of public repositories
- **LeetCode Solved:** Total problems solved
- **LeetCode Streak:** Current streak length

### Individual View (Default)
- **GitHub Panel:**
  - Active days in the past year
  - Current contribution streak
  - Number of followers
  - Latest event
  - Recent repositories
  - 30-week contribution calendar

- **LeetCode Panel:**
  - Total problems solved
  - LeetCode ranking
  - Active days this year
  - Current streak
  - 52-week submission calendar

### Unified View
- Click "Unified View" button to see a merged calendar combining both GitHub and LeetCode activity

---

## Troubleshooting

### Still Getting 403 Errors?

1. **Check .env.local:** Make sure the token is uncommented and not still a placeholder
2. **Restart server:** The token is read at startup, so restart with `npm run dev`
3. **Clear browser cache:** Shift+Ctrl+R (hard refresh)
4. **Token expired?:** Create a new one from https://github.com/settings/tokens?type=beta

### Token Doesn't Work?

- Token may have insufficient permissions (shouldn't happen with default public access)
- Try revoking it and creating a new one
- Check that there are no extra spaces in `.env.local`

### Rate Limiting Still Occurs?

- Each token has a 5,000 request/hour limit
- If you exceed this during development, wait an hour or rotate to a new token
- In production, consider using a more robust authentication system

---

## API Endpoint Details

The data is fetched from: `GET /api/signal`

### Response Structure

```json
{
  "github": {
    "username": "namit-x",
    "publicRepos": 15,
    "followers": 42,
    "latestEvent": "PushEvent",
    "recentRepositories": [...],
    "contributions": {
      "total": 1234,
      "activeDays": 156,
      "currentStreak": 12
    },
    "calendar": [...]
  },
  "leetcode": {
    "username": "namit_x",
    "solved": 425,
    "ranking": 125000,
    "activeDays": 200,
    "streak": 45,
    "solvedByDifficulty": {
      "easy": 150,
      "medium": 200,
      "hard": 75
    },
    "calendar": [...]
  },
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

---

## Next Steps

1. ✅ Generate GitHub token (takes 2 minutes)
2. ✅ Add token to `.env.local`
3. ✅ Restart dev server
4. ✅ Reload website to see live data

Happy building! 🚀
