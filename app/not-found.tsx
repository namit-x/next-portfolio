import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-black to-slate-900 px-4">
      <div className="max-w-md text-center space-y-6">
        {/* 404 Text */}
        <div className="space-y-2">
          <p className="text-sm font-mono uppercase tracking-widest text-cyan-400">
            Error 404
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white">
            Page not found
          </h1>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-base">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The link might be broken or the page may have moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-lg transition-colors mt-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back home
        </Link>
      </div>
    </div>
  )
}
