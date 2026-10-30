// Server Component (0 bytes client JS) — Hiệu ứng tuyết rơi & nốt nhạc tình yêu siêu nhẹ chuẩn PageSpeed
const PARTICLES = [
  { left: '4%', symbol: '❄', size: 'text-xs', color: 'text-noel-200/60', duration: '18s', delay: '0s' },
  { left: '12%', symbol: '♥', size: 'text-[10px]', color: 'text-love-300/50', duration: '22s', delay: '3s' },
  { left: '21%', symbol: '❅', size: 'text-sm', color: 'text-noel-300/45', duration: '16s', delay: '6s' },
  { left: '30%', symbol: '♪', size: 'text-xs', color: 'text-wine-300/45', duration: '24s', delay: '1.5s' },
  { left: '39%', symbol: '❄', size: 'text-[11px]', color: 'text-gold-300/55', duration: '20s', delay: '8s' },
  { left: '48%', symbol: '♥', size: 'text-xs', color: 'text-noel-300/45', duration: '19s', delay: '4.5s' },
  { left: '57%', symbol: '❅', size: 'text-xs', color: 'text-love-200/60', duration: '23s', delay: '10s' },
  { left: '66%', symbol: '♫', size: 'text-[11px]', color: 'text-gold-400/45', duration: '21s', delay: '2s' },
  { left: '75%', symbol: '❄', size: 'text-sm', color: 'text-noel-200/55', duration: '17s', delay: '7s' },
  { left: '84%', symbol: '♥', size: 'text-[10px]', color: 'text-wine-300/50', duration: '25s', delay: '5s' },
  { left: '91%', symbol: '❅', size: 'text-xs', color: 'text-noel-300/45', duration: '19s', delay: '11s' },
  { left: '96%', symbol: '✦', size: 'text-[10px]', color: 'text-gold-300/55', duration: '22s', delay: '9s' },
]

export function FestiveAmbience() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none print:hidden"
    >
      {PARTICLES.map((p, idx) => (
        <span
          key={idx}
          className={`animate-snowfall absolute -top-8 ${p.size} ${p.color}`}
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  )
}

export function HeroSparkles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* Ánh sáng nến ấm áp lãng mạn */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold-300/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-love-400/20 blur-3xl" />
      {/* Các ngôi sao, bông tuyết & trái tim lấp lánh nhẹ */}
      <span className="animate-twinkle absolute left-[8%] top-[20%] text-lg text-gold-200/75" style={{ animationDelay: '0.2s' }}>✦</span>
      <span className="animate-float-love absolute left-[15%] bottom-[22%] text-base text-love-200/65" style={{ animationDelay: '1.1s' }}>♥</span>
      <span className="animate-twinkle absolute right-[12%] top-[18%] text-base text-white/70" style={{ animationDelay: '0.8s' }}>❄</span>
      <span className="animate-float-love absolute right-[18%] bottom-[25%] text-lg text-gold-200/70" style={{ animationDelay: '1.8s' }}>♪</span>
      <span className="animate-twinkle absolute left-[26%] top-[14%] hidden text-sm text-love-200/60 sm:inline" style={{ animationDelay: '1.5s' }}>❅</span>
      <span className="animate-twinkle absolute right-[28%] top-[26%] hidden text-sm text-gold-300/70 sm:inline" style={{ animationDelay: '2.2s' }}>✦</span>
    </div>
  )
}

