'use client'

import { useState } from 'react'
import Image from 'next/image'

const PLAYLIST_ID = '6QL6GIwIiavwNvgU5vVSBV'

export default function PersistentPlayer() {
  const [started, setStarted] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [hidden, setHidden] = useState(false)

  if (hidden) {
    return (
      <button
        onClick={() => setHidden(false)}
        className="fixed bottom-6 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-noel-600 via-wine-600 to-noel-700 text-white shadow-xl ring-2 ring-gold-300/70 transition hover:scale-110 hover:shadow-2xl"
        aria-label="Mở trình phát nhạc Giáng Sinh & Tình Yêu"
      >
        <span className="text-lg" aria-hidden="true">🎄</span>
      </button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 left-4 z-50 overflow-hidden rounded-2xl border border-noel-100 bg-white/95 shadow-2xl backdrop-blur-md transition-all duration-300 ${
        expanded ? 'w-80' : 'w-72'
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-noel-700 via-noel-600 to-wine-600 px-4 py-2.5 text-white">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="MixiGui" width={24} height={24} className="rounded-full object-cover ring-1 ring-gold-300/80" />
          <span className="text-xs font-semibold tracking-wide">🎄 Giai Điệu Noel &amp; Tình Yêu</span>
          {started && (
            <span className="flex items-center gap-0.5">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="inline-block w-0.5 rounded-full bg-gold-200"
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
            className="rounded p-1 text-white/80 hover:bg-white/15 hover:text-white transition"
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
            className="rounded p-1 text-white/80 hover:bg-white/15 hover:text-white transition"
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
        <div className="p-3.5">
          <div className="flex flex-col items-center gap-2.5 rounded-xl border border-noel-100/80 bg-gradient-to-br from-noel-50/90 via-love-50/70 to-gold-50/60 p-4 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-noel-600 to-wine-600 text-white shadow-md ring-2 ring-gold-200">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Nhạc nền Mùa Đông Ấm Áp ♥</p>
              <p className="mt-0.5 text-xs text-gray-500">Bản tình ca Acoustic &amp; Piano Giáng Sinh</p>
            </div>
            <button
              onClick={() => { setStarted(true); setExpanded(true) }}
              className="w-full rounded-full bg-gradient-to-r from-noel-600 to-wine-600 py-2 text-xs font-semibold text-white shadow-sm transition hover:from-noel-700 hover:to-wine-700"
            >
              ▶ Bật giai điệu yêu thương
            </button>
            <p className="text-[11px] text-gray-400">Nhạc giữ nguyên khi bạn dạo quanh trang</p>
          </div>
        </div>
      ) : (
        <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-3">
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

    </div>
  )
}
