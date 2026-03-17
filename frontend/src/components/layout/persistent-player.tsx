'use client'

import { useState } from 'react'

const PLAYLIST_ID = '6QL6GIwIiavwNvgU5vVSBV'

export default function PersistentPlayer() {
  const [started, setStarted] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [hidden, setHidden] = useState(false)

  if (hidden) {
    return (
      <button
        onClick={() => setHidden(false)}
        className="fixed bottom-6 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:bg-green-600 hover:scale-110"
        aria-label="Mở trình phát nhạc"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 left-4 z-50 rounded-2xl bg-gray-900 shadow-2xl transition-all duration-300 ${
        expanded ? 'w-80' : 'w-72'
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none select-none">🌼</span>
          <span className="text-sm font-semibold text-white">MixiGui Music</span>
          {started && (
            <span className="flex items-center gap-0.5">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="inline-block w-0.5 rounded-full bg-green-400"
                  style={{
                    height: `${8 + i * 4}px`,
                    animation: `musicBar 0.8s ease-in-out ${i * 0.15}s infinite alternate`,
                  }}
                />
              ))}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="rounded p-1 text-gray-400 hover:text-white transition"
            aria-label={expanded ? 'Thu nhỏ' : 'Mở rộng'}
          >
            {expanded ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            )}
          </button>
          <button
            onClick={() => setHidden(true)}
            className="rounded p-1 text-gray-400 hover:text-white transition"
            aria-label="Ẩn player"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Player content */}
      {!started ? (
        <div className="px-4 pb-4">
          <div className="flex flex-col items-center gap-3 rounded-xl bg-gray-800 p-5 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
              <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Phát nhạc nền</p>
              <p className="text-xs text-gray-400 mt-0.5">Playlist âm nhạc MixiGui</p>
            </div>
            <button
              onClick={() => { setStarted(true); setExpanded(true) }}
              className="w-full rounded-full bg-green-500 py-2 text-sm font-semibold text-white transition hover:bg-green-400"
            >
              ▶ Bắt đầu nghe
            </button>
            <p className="text-xs text-gray-500">Nhạc sẽ tiếp tục khi chuyển trang</p>
          </div>
        </div>
      ) : (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-3 pb-3">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0&autoplay=1`}
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes musicBar {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1.2); }
        }
      `}</style>
    </div>
  )
}
