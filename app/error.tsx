'use client'

import { useEffect } from 'react'
import { Terminal } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Global Error Boundary]', error)
    }
    // In production, you could send to an error tracking service here
    // e.g., Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-black to-slate-900 px-4">
          <div className="max-w-md text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-red-500/20 border border-red-500/40 p-4">
                <Terminal className="h-8 w-8 text-red-400" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
              <p className="text-slate-300 text-sm">
                We encountered an unexpected error. Our team has been notified.
              </p>
            </div>

            {/* Error details (dev only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-left overflow-auto max-h-32">
                <p className="text-xs font-mono text-red-400 whitespace-pre-wrap break-words">
                  {error.message}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button
                onClick={reset}
                className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-colors"
              >
                Try again
              </button>
              <a
                href="/"
                className="block px-4 py-2 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-colors text-sm"
              >
                Go back home
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
