// Server Component (0 bytes client JS) — Tuyết rơi, Cây thông Noel & Đàn tuần lộc chạy ngang màn hình (GPU CSS-only)

const PARTICLES = [
  { left: '4%', symbol: '❄', size: 'text-xs', color: 'text-noel-200/70', duration: '18s', delay: '0s' },
  { left: '12%', symbol: '♥', size: 'text-[11px]', color: 'text-love-300/60', duration: '22s', delay: '3s' },
  { left: '21%', symbol: '❅', size: 'text-sm', color: 'text-noel-300/55', duration: '16s', delay: '6s' },
  { left: '30%', symbol: '♪', size: 'text-xs', color: 'text-wine-300/55', duration: '24s', delay: '1.5s' },
  { left: '39%', symbol: '❄', size: 'text-[11px]', color: 'text-gold-300/65', duration: '20s', delay: '8s' },
  { left: '48%', symbol: '♥', size: 'text-xs', color: 'text-noel-300/55', duration: '19s', delay: '4.5s' },
  { left: '57%', symbol: '❅', size: 'text-xs', color: 'text-love-200/65', duration: '23s', delay: '10s' },
  { left: '66%', symbol: '♫', size: 'text-[11px]', color: 'text-gold-400/55', duration: '21s', delay: '2s' },
  { left: '75%', symbol: '❄', size: 'text-sm', color: 'text-noel-200/65', duration: '17s', delay: '7s' },
  { left: '84%', symbol: '♥', size: 'text-[11px]', color: 'text-wine-300/60', duration: '25s', delay: '5s' },
  { left: '91%', symbol: '❅', size: 'text-xs', color: 'text-noel-300/55', duration: '19s', delay: '11s' },
  { left: '96%', symbol: '✦', size: 'text-[11px]', color: 'text-gold-300/65', duration: '22s', delay: '9s' },
]

/** Cây thông Noel lung linh ngôi sao vàng, dây đèn, quả châu đỏ, trái tim & hộp quà */
export function ChristmasTreeSVG({ className = 'h-36 w-28' }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 190" fill="none" className={className} aria-hidden="true">
      {/* Thảm tuyết dưới gốc cây */}
      <ellipse cx="70" cy="180" rx="54" ry="8" fill="#ffffff" fillOpacity="0.85" />

      {/* Thân gỗ */}
      <rect x="61" y="148" width="18" height="30" rx="3" fill="#6b3e26" />

      {/* Tầng lá thông 4 lớp phủ tuyết trắng */}
      <path d="M70 88 L18 154 Q44 162 70 154 Q96 162 122 154 Z" fill="#0f5132" />
      <path d="M22 153 Q35 147 47 153 Q58 148 70 153 Q82 148 93 153 Q105 147 118 153" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />

      <path d="M70 64 L26 126 Q48 133 70 126 Q92 133 114 126 Z" fill="#146c43" />
      <path d="M30 125 Q42 120 53 125 Q62 120 70 125 Q78 120 87 125 Q98 120 110 125" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.85" />

      <path d="M70 42 L36 96 Q53 102 70 96 Q87 102 104 96 Z" fill="#198754" />
      <path d="M39 95 Q54 90 70 95 Q86 90 101 95" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />

      <path d="M70 22 L46 68 Q58 73 70 68 Q82 73 94 68 Z" fill="#209e60" />

      {/* Dây đèn vàng lấp lánh uốn lượn */}
      <path d="M48 62 Q70 74 91 60" stroke="#fde68a" strokeWidth="1.6" strokeDasharray="3 4" />
      <path d="M38 92 Q70 108 100 88" stroke="#fde68a" strokeWidth="1.8" strokeDasharray="3 4" />
      <path d="M27 124 Q70 144 112 120" stroke="#fde68a" strokeWidth="2" strokeDasharray="3 4" />

      {/* Quả châu đỏ Noel, vàng ánh kim & trái tim hồng lấp lánh */}
      <circle cx="56" cy="58" r="3.8" fill="#e83f56" className="animate-twinkle" />
      <circle cx="82" cy="55" r="3.5" fill="#fbbf24" className="animate-twinkle" style={{ animationDelay: '0.7s' }} />
      <circle cx="48" cy="86" r="4.2" fill="#fbbf24" className="animate-twinkle" style={{ animationDelay: '1.3s' }} />
      <circle cx="88" cy="84" r="4.2" fill="#e83f56" className="animate-twinkle" style={{ animationDelay: '0.4s' }} />
      <circle cx="38" cy="116" r="4.5" fill="#e83f56" className="animate-twinkle" style={{ animationDelay: '1.1s' }} />
      <circle cx="72" cy="112" r="4" fill="#fbbf24" className="animate-twinkle" style={{ animationDelay: '1.9s' }} />
      <circle cx="98" cy="115" r="4.5" fill="#ff7aa2" className="animate-twinkle" style={{ animationDelay: '0.6s' }} />
      <circle cx="34" cy="143" r="4.5" fill="#fbbf24" className="animate-twinkle" style={{ animationDelay: '1.5s' }} />
      <circle cx="62" cy="140" r="4.5" fill="#e83f56" className="animate-twinkle" style={{ animationDelay: '0.3s' }} />
      <circle cx="96" cy="142" r="4.5" fill="#e83f56" className="animate-twinkle" style={{ animationDelay: '1.2s' }} />

      {/* Trái tim tình yêu trang trí trên cây thông */}
      <path d="M70 81 C67 77 62 79 62 83 C62 87 70 91 70 91 C70 91 78 87 78 83 C78 79 73 77 70 81 Z" fill="#fb7599" />
      <path d="M50 132 C48 129 44 130 44 133 C44 136 50 139 50 139 C50 139 56 136 56 133 C56 130 52 129 50 132 Z" fill="#fb7599" />

      {/* Hộp quà Giáng Sinh dưới gốc cây */}
      <g>
        <rect x="25" y="158" width="24" height="20" rx="3" fill="#c41e3a" />
        <rect x="35" y="158" width="4" height="20" fill="#fbbf24" />
        <rect x="25" y="166" width="24" height="3.5" fill="#fbbf24" />
        <path d="M37 158 C32 152 28 156 37 158 C46 156 42 152 37 158 Z" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5" />
      </g>
      <g>
        <rect x="89" y="161" width="21" height="17" rx="3" fill="#c93e68" />
        <rect x="98" y="161" width="3.5" height="17" fill="#fde68a" />
        <rect x="89" y="168" width="21" height="3" fill="#fde68a" />
      </g>

      {/* Ngôi sao vàng tỏa sáng trên đỉnh cây thông */}
      <circle cx="70" cy="18" r="13" fill="#fde68a" fillOpacity="0.38" className="animate-twinkle" />
      <polygon
        points="70,5 73.8,13.5 83,14.5 76,20.6 78,29.6 70,24.8 62,29.6 64,20.6 57,14.5 66.2,13.5"
        fill="#fbbf24"
        stroke="#fef3c7"
        strokeWidth="1"
      />
    </svg>
  )
}

/** Một chú tuần lộc đang phi nước đại (hướng sang phải) */
function SingleReindeerGroup({
  xOffset,
  redNose = false,
  delay = '0s',
}: {
  xOffset: number
  redNose?: boolean
  delay?: string
}) {
  return (
    <g transform={`translate(${xOffset}, 0)`}>
      <g className="animate-reindeer-gallop" style={{ animationDelay: delay }}>
        {/* Chân sau đang tung vó */}
        <path d="M18 52 L8 67 L13 69" stroke="#7c4a21" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 52 L17 69 L22 70" stroke="#9c5e2b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Chân trước vươn tới */}
        <path d="M46 50 L56 64 L52 67" stroke="#7c4a21" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 48 L63 59 L60 63" stroke="#9c5e2b" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Đuôi trắng xinh */}
        <ellipse cx="12" cy="43" rx="4.5" ry="3" transform="rotate(-25 12 43)" fill="#fff5eb" />

        {/* Thân tuần lộc */}
        <ellipse cx="34" cy="45" rx="19" ry="10.5" fill="#9c5e2b" />
        <ellipse cx="35" cy="49" rx="13" ry="5" fill="#d9a773" opacity="0.55" />

        {/* Cổ & Đầu hướng sang phải */}
        <path d="M46 43 L54 27 L63 31 L53 48 Z" fill="#9c5e2b" />
        <ellipse cx="60" cy="28" rx="9.5" ry="6.5" transform="rotate(8 60 28)" fill="#a86832" />
        {/* Tai */}
        <ellipse cx="52" cy="23" rx="4" ry="2.2" transform="rotate(-35 52 23)" fill="#7c4a21" />

        {/* Cặp sừng tuần lộc (Antlers) */}
        <path
          d="M55 22 L51 9 M53 15 L46 12 M52 12 L56 7 M59 21 L60 8 M60 14 L66 10"
          stroke="#d4a056"
          strokeWidth="2.3"
          strokeLinecap="round"
        />

        {/* Mắt */}
        <circle cx="62" cy="26.5" r="1.4" fill="#1f130a" />
        <circle cx="62.5" cy="26" r="0.5" fill="#ffffff" />

        {/* Vòng cổ đỏ Noel & Chuông vàng */}
        <path d="M46 39 L55 44" stroke="#c41e3a" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="52" cy="44" r="2.8" fill="#fbbf24" />

        {/* Mũi đỏ Rudolph phát sáng hoặc mũi nâu dễ thương */}
        {redNose ? (
          <>
            <circle cx="70" cy="29" r="5.5" fill="#ff2a4b" opacity="0.35" className="animate-twinkle" />
            <circle cx="70" cy="29" r="3" fill="#ff1e42" />
          </>
        ) : (
          <circle cx="69.5" cy="29" r="2.2" fill="#4a2810" />
        )}
      </g>
    </g>
  )
}

/** Đoàn tuần lộc kéo cỗ xe quà tặng, đàn nhạc & trái tim bay ngang bầu trời */
function FlyingReindeerSleighSVG() {
  return (
    <svg viewBox="0 0 330 86" fill="none" className="h-16 w-64 sm:h-20 sm:w-80 drop-shadow-md" aria-hidden="true">
      {/* Vệt bụi sao vàng & trái tim lấp lánh phía sau cỗ xe */}
      <circle cx="10" cy="52" r="2" fill="#fde68a" opacity="0.7" />
      <circle cx="22" cy="44" r="2.5" fill="#fb7599" opacity="0.8" />
      <circle cx="32" cy="56" r="1.8" fill="#fde68a" opacity="0.8" />
      <text x="14" y="36" fontSize="12" fill="#fb7599">♥</text>
      <text x="30" y="28" fontSize="11" fill="#fde68a">♪</text>

      {/* Cỗ xe trượt tuyết đỏ viền vàng chở đầy quà & trái tim */}
      <g>
        {/* Thanh trượt vàng uốn cong */}
        <path
          d="M38 66 L108 66 Q120 66 122 54"
          stroke="#fbbf24"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line x1="54" y1="58" x2="54" y2="66" stroke="#fbbf24" strokeWidth="2.5" />
        <line x1="94" y1="58" x2="94" y2="66" stroke="#fbbf24" strokeWidth="2.5" />

        {/* Hộp quà & trái tim trên xe */}
        <rect x="52" y="30" width="16" height="15" rx="2" fill="#198754" />
        <line x1="60" y1="30" x2="60" y2="45" stroke="#fde68a" strokeWidth="2.2" />
        <rect x="70" y="26" width="18" height="18" rx="2" fill="#c93e68" />
        <line x1="79" y1="26" x2="79" y2="44" stroke="#fde68a" strokeWidth="2.2" />
        {/* Trái tim tình yêu lớn phát sáng trên cỗ xe */}
        <path
          d="M66 20 C62 14 54 17 54 23 C54 29 66 36 66 36 C66 36 78 29 78 23 C78 17 70 14 66 20 Z"
          fill="#fb7599"
        />

        {/* Thân cỗ xe nhung đỏ Noel */}
        <path
          d="M42 36 Q42 58 60 58 L98 58 Q112 58 114 42 L98 42 Q92 47 78 47 L56 42 Z"
          fill="#c41e3a"
          stroke="#fde68a"
          strokeWidth="1.8"
        />
      </g>

      {/* Dây cương ánh kim nối cỗ xe với 2 chú tuần lộc */}
      <path
        d="M112 46 Q145 52 182 42 Q225 50 272 41"
        stroke="#fde68a"
        strokeWidth="1.6"
        strokeDasharray="3 2"
        opacity="0.9"
      />

      {/* Tuần lộc #1 */}
      <SingleReindeerGroup xOffset={135} redNose={false} delay="0.22s" />
      {/* Tuần lộc dẫn đầu Rudolph mũi đỏ */}
      <SingleReindeerGroup xOffset={225} redNose={true} delay="0s" />

      {/* Nốt nhạc bay phía trước mũi tuần lộc */}
      <text x="306" y="24" fontSize="13" fill="#fbbf24">♫</text>
      <text x="316" y="38" fontSize="10" fill="#fb7599">♥</text>
    </svg>
  )
}

/** Đôi tuần lộc nhỏ chạy tung tăng dưới chân màn hình kèm trái tim & nốt nhạc */
function RunningReindeerPairSVG() {
  return (
    <svg viewBox="0 0 185 76" fill="none" className="h-14 w-36 sm:h-16 sm:w-44 drop-shadow-sm" aria-hidden="true">
      <text x="6" y="26" fontSize="11" fill="#e83f56">♥</text>
      <SingleReindeerGroup xOffset={12} redNose={false} delay="0.25s" />
      <text x="86" y="20" fontSize="12" fill="#d49826">♪</text>
      <SingleReindeerGroup xOffset={96} redNose={true} delay="0s" />
    </svg>
  )
}

export function FestiveAmbience() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none print:hidden"
    >
      {/* 1. Tuyết rơi & trái tim, nốt nhạc lơ lửng */}
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

      {/* 2. Đoàn tuần lộc kéo cỗ xe quà tặng & tình yêu bay ngang màn hình (Trái -> Phải) */}
      <div
        className="animate-reindeer-fly absolute top-[11%] left-0 sm:top-[13%]"
        style={{ animationDelay: '0.3s' }}
      >
        <FlyingReindeerSleighSVG />
      </div>

      {/* 3. Đôi tuần lộc nhỏ chạy tung tăng ngang chân màn hình (Phải -> Trái) */}
      <div
        className="animate-reindeer-rtl absolute bottom-2 left-0"
        style={{ animationDelay: '3s' }}
      >
        <div className="-scale-x-100">
          <RunningReindeerPairSVG />
        </div>
      </div>

      {/* 4. Chú tuần lộc nhỏ chạy chiều ngược lại (Trái -> Phải, lệch nhịp để màn hình luôn sinh động) */}
      <div
        className="animate-reindeer-ltr absolute bottom-3 left-0 hidden sm:block"
        style={{ animationDelay: '11s' }}
      >
        <RunningReindeerPairSVG />
      </div>

      {/* 5. Cây thông Noel lung linh góc dưới màn hình (cạnh nút tim liên hệ, không che nút bấm) */}
      <div className="animate-tree-sway absolute bottom-0 right-16 opacity-95 sm:right-20">
        <ChristmasTreeSVG className="h-24 w-20 sm:h-32 sm:w-24" />
      </div>
    </div>
  )
}

export function HeroSparkles({
  layout = 'centered',
}: {
  layout?: 'centered' | 'split-left' | 'none'
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {/* Ánh sáng nến ấm áp lãng mạn */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold-300/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-love-400/20 blur-3xl" />

      {/* Các ngôi sao, bông tuyết & trái tim lấp lánh nhẹ */}
      <span className="animate-twinkle absolute left-[8%] top-[20%] text-lg text-gold-200/75" style={{ animationDelay: '0.2s' }}>✦</span>
      <span className="animate-float-love absolute left-[15%] bottom-[32%] text-base text-love-200/70" style={{ animationDelay: '1.1s' }}>♥</span>
      <span className="animate-twinkle absolute right-[12%] top-[18%] text-base text-white/75" style={{ animationDelay: '0.8s' }}>❄</span>
      <span className="animate-float-love absolute right-[18%] bottom-[34%] text-lg text-gold-200/75" style={{ animationDelay: '1.8s' }}>♪</span>
      <span className="animate-twinkle absolute left-[26%] top-[14%] hidden text-sm text-love-200/65 sm:inline" style={{ animationDelay: '1.5s' }}>❅</span>
      <span className="animate-twinkle absolute right-[28%] top-[26%] hidden text-sm text-gold-300/75 sm:inline" style={{ animationDelay: '2.2s' }}>✦</span>

      {/* Hai cây thông Noel đối xứng cho Hero căn giữa */}
      {layout === 'centered' && (
        <>
          <div className="animate-tree-sway absolute -bottom-2 left-0 opacity-45 sm:left-4 sm:opacity-90 lg:left-10">
            <ChristmasTreeSVG className="h-28 w-20 sm:h-40 sm:w-32 lg:h-48 lg:w-36" />
          </div>
          <div
            className="animate-tree-sway absolute -bottom-2 right-0 opacity-45 sm:right-4 sm:opacity-90 lg:right-10"
            style={{ animationDelay: '1.8s' }}
          >
            <ChristmasTreeSVG className="h-28 w-20 sm:h-40 sm:w-32 lg:h-48 lg:w-36" />
          </div>
        </>
      )}

      {/* Cụm rừng thông đôi bên phải cho Hero căn trái (Blog, Khóa học, Sản phẩm, Liên hệ) */}
      {layout === 'split-left' && (
        <div className="absolute -bottom-2 right-2 flex items-end gap-1 opacity-40 sm:right-6 sm:opacity-95 lg:right-14">
          <div className="animate-tree-sway hidden sm:block" style={{ animationDelay: '1.2s' }}>
            <ChristmasTreeSVG className="h-28 w-22 lg:h-36 lg:w-28" />
          </div>
          <div className="animate-tree-sway">
            <ChristmasTreeSVG className="h-32 w-24 sm:h-44 sm:w-32 lg:h-52 lg:w-40" />
          </div>
        </div>
      )}
    </div>
  )
}
