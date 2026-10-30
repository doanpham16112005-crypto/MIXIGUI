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

/** Ông già Noel rón rén lén lút mang hộp quà tới gốc cây thông (hướng sang phải) */
function SneakySantaSVG() {
  return (
    <svg viewBox="0 0 132 136" fill="none" className="h-24 w-24 sm:h-30 sm:w-30 drop-shadow-md" aria-hidden="true">
      {/* Bong bóng "Suỵt... 🤫" lén lút */}
      <g className="animate-santa-whisper">
        <rect x="20" y="3" width="66" height="20" rx="10" fill="#ffffff" stroke="#fda4af" strokeWidth="1.5" />
        <polygon points="52,23 58,23 54,29" fill="#ffffff" />
        <text x="53" y="16.5" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#be123c">
          Suỵt... 🎁♥
        </text>
      </g>

      {/* Bao tải quà to đeo sau lưng */}
      <g>
        <ellipse cx="34" cy="74" rx="20" ry="23" transform="rotate(-18 34 74)" fill="#881337" stroke="#fde68a" strokeWidth="1.5" />
        <path d="M42 52 L50 46 L53 54 Z" fill="#9f1239" />
        <circle cx="46" cy="53" r="2.5" fill="#fbbf24" />
        <text x="24" y="74" fontSize="12" fill="#fde68a">♪</text>
      </g>

      {/* Chân nhón gót rón rén (Tiptoe boots) */}
      <g>
        {/* Chân sau nhón */}
        <path d="M48 98 L40 114 L46 118" stroke="#c41e3a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="47" cy="121" rx="7" ry="4.5" transform="rotate(20 47 121)" fill="#1f2937" />
        {/* Chân trước nhón mũi giày */}
        <path d="M64 98 L72 114 L78 117" stroke="#c41e3a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="80" cy="120" rx="7.5" ry="4.5" transform="rotate(25 80 120)" fill="#1f2937" />
        {/* Viền bông trắng cổ giày */}
        <rect x="38" y="110" width="12" height="4.5" rx="2" fill="#ffffff" />
        <rect x="67" y="110" width="12" height="4.5" rx="2" fill="#ffffff" />
      </g>

      {/* Thân áo choàng đỏ hơi khom người lén lút */}
      <ellipse cx="58" cy="82" rx="20" ry="22" transform="rotate(10 58 82)" fill="#c41e3a" />
      {/* Viền lông trắng vạt áo */}
      <path d="M38 98 Q58 106 78 98" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <line x1="63" y1="62" x2="60" y2="100" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
      {/* Thắt lưng đen & khóa vàng */}
      <path d="M39 84 Q58 90 77 83" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" />
      <rect x="59" y="81" width="8" height="8" rx="1.5" stroke="#fbbf24" strokeWidth="2.2" fill="none" />

      {/* Đầu, Râu trắng xù & Mũ Noel */}
      <g>
        {/* Khuôn mặt hồng hào */}
        <circle cx="67" cy="49" r="12" fill="#fed7aa" />
        <circle cx="71" cy="51" r="2.8" fill="#fb7185" opacity="0.6" />
        {/* Mắt liếc lén lút hóm hỉnh */}
        <circle cx="72" cy="46.5" r="1.7" fill="#1f2937" />
        <circle cx="72.6" cy="46" r="0.6" fill="#ffffff" />
        <path d="M69 43 Q72 41.5 75 43" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
        {/* Mũi đỏ tròn */}
        <circle cx="78" cy="49" r="3" fill="#ef4444" />
        {/* Bộ râu trắng bồng bềnh */}
        <path
          d="M55 49 Q52 64 66 68 Q80 68 81 53 Q75 55 70 52 Q63 54 55 49 Z"
          fill="#ffffff"
        />
        {/* Mũ Ông già Noel rủ ra sau */}
        <path d="M54 43 Q60 24 42 29 Q54 18 76 34 L79 42 Z" fill="#c41e3a" />
        <rect x="53" y="39" width="27" height="6.5" rx="3.2" fill="#ffffff" />
        <circle cx="40" cy="30" r="4.8" fill="#ffffff" />
      </g>

      {/* Tay Ông già Noel cầm hộp quà (hộp quà biến mất đúng khoảnh khắc đặt xuống gốc cây) */}
      <g className="animate-santa-held-gift">
        <rect x="84" y="64" width="24" height="21" rx="3" fill="#15803d" stroke="#fde68a" strokeWidth="1.2" />
        <rect x="94" y="64" width="4" height="21" fill="#fbbf24" />
        <rect x="84" y="73" width="24" height="3.8" fill="#fbbf24" />
        <path d="M96 64 C91 58 87 62 96 64 C105 62 101 58 96 64 Z" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.4" />
        <text x="92" y="56" fontSize="11" fill="#fb7599">♥</text>
      </g>

      {/* Cánh tay đỏ & găng trắng đưa ra phía trước */}
      <path d="M64 70 Q76 76 86 74" stroke="#c41e3a" strokeWidth="7.5" strokeLinecap="round" />
      <circle cx="88" cy="74" r="4.8" fill="#ffffff" />
    </svg>
  )
}

/** Hộp quà bí mật Ông già Noel vừa đặt lại dưới gốc cây thông */
function PlacedTreeGiftSVG() {
  return (
    <svg viewBox="0 0 60 64" fill="none" className="h-11 w-11 sm:h-14 sm:w-14 drop-shadow" aria-hidden="true">
      {/* Tia sáng lấp lánh & trái tim bay lên từ hộp quà mới đặt */}
      <text x="8" y="18" fontSize="11" fill="#fbbf24" className="animate-twinkle">✦</text>
      <text x="26" y="14" fontSize="13" fill="#fb7599" className="animate-float-love">♥</text>
      <text x="44" y="21" fontSize="10" fill="#fde68a" className="animate-twinkle">✨</text>

      {/* Hộp quà xanh thông nơ vàng sang trọng */}
      <rect x="14" y="30" width="32" height="27" rx="4" fill="#15803d" stroke="#fde68a" strokeWidth="1.5" />
      <rect x="27.5" y="30" width="5" height="27" fill="#fbbf24" />
      <rect x="14" y="41" width="32" height="4.5" fill="#fbbf24" />
      <path d="M30 30 C22 21 17 27 30 30 C43 27 38 21 30 30 Z" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.8" />
    </svg>
  )
}

/** Ông già Noel cưỡi xe trượt phép thuật bay vút CHÉO màn hình (hướng sang Trái-Lên) */
function FlyingDiagonalSantaSVG() {
  return (
    <svg viewBox="0 0 260 112" fill="none" className="h-20 w-48 sm:h-28 sm:w-64 drop-shadow-lg" aria-hidden="true">
      <defs>
        <linearGradient id="santaComet" x1="120" y1="62" x2="255" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#fb7599" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fb7599" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Đuôi sao băng phép thuật vàng-hồng kéo dài phía sau */}
      <path d="M126 60 Q185 64 252 54" stroke="url(#santaComet)" strokeWidth="6" strokeLinecap="round" />
      <path d="M132 70 Q190 76 245 70" stroke="url(#santaComet)" strokeWidth="3.5" strokeLinecap="round" />
      <text x="152" y="48" fontSize="13" fill="#fde68a">✦</text>
      <text x="176" y="84" fontSize="13" fill="#fb7599">♥</text>
      <text x="200" y="50" fontSize="12" fill="#ffffff">❄</text>
      <text x="224" y="78" fontSize="13" fill="#fde68a">♪</text>

      {/* Cỗ xe trượt tuyết phép thuật hướng sang Trái */}
      <g>
        {/* Thanh trượt vàng uốn cong phía mũi trái */}
        <path d="M142 84 L38 84 Q20 84 18 68" stroke="#fbbf24" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="58" y1="74" x2="58" y2="84" stroke="#fbbf24" strokeWidth="2.8" />
        <line x1="116" y1="74" x2="116" y2="84" stroke="#fbbf24" strokeWidth="2.8" />

        {/* Bao quà đỏ rượu & đàn/nốt nhạc sau lưng Ông già Noel */}
        <ellipse cx="114" cy="50" rx="20" ry="17" fill="#881337" stroke="#fde68a" strokeWidth="1.4" />
        <rect x="96" y="34" width="15" height="14" rx="2" fill="#198754" />
        <line x1="103.5" y1="34" x2="103.5" y2="48" stroke="#fbbf24" strokeWidth="2.2" />
        <text x="122" y="34" fontSize="14" fill="#fbbf24">♫</text>

        {/* Ông già Noel ngồi vẫy tay chào vui vẻ */}
        {/* Thân áo đỏ */}
        <ellipse cx="76" cy="54" rx="17" ry="18" fill="#c41e3a" />
        <path d="M60 58 Q76 63 92 58" stroke="#1f2937" strokeWidth="4" />
        {/* Khuôn mặt & Râu trắng bay trong gió */}
        <circle cx="68" cy="34" r="10.5" fill="#fed7aa" />
        <circle cx="64" cy="33" r="1.6" fill="#1f2937" />
        <circle cx="58" cy="35" r="2.8" fill="#ef4444" />
        <path d="M58 37 Q58 50 72 51 Q84 50 82 38 Q74 41 68 38 Z" fill="#ffffff" />
        {/* Mũ Noel bay ngược ra sau theo gió */}
        <path d="M60 28 Q74 14 98 22 Q82 28 77 31 Z" fill="#c41e3a" />
        <rect x="59" y="25" width="21" height="5.5" rx="2.7" fill="#ffffff" />
        <circle cx="100" cy="22" r="4.2" fill="#ffffff" />
        {/* Tay vẫy chào */}
        <path d="M64 46 L48 32" stroke="#c41e3a" strokeWidth="6.5" strokeLinecap="round" />
        <circle cx="46" cy="30" r="4.2" fill="#ffffff" />

        {/* Thân cỗ xe nhung đỏ đính trái tim tình yêu */}
        <path
          d="M136 50 Q136 75 114 75 L54 75 Q36 75 33 56 L54 56 Q62 62 82 62 L118 54 Z"
          fill="#c41e3a"
          stroke="#fde68a"
          strokeWidth="2"
        />
        <path d="M84 62 C81 58 76 60 76 64 C76 68 84 72 84 72 C84 72 92 68 92 64 C92 60 87 58 84 62 Z" fill="#fb7599" />
      </g>

      {/* Lời chúc nhỏ bay theo */}
      <text x="16" y="22" fontSize="11" fontWeight="700" fill="#fde68a">
        Ho ho ho! ♥
      </text>
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

      {/* 2. Đoàn tuần lộc kéo cỗ xe quà tặng & tình yêu bay ngang bầu trời (Trái -> Phải) */}
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

      {/* 4. Chú tuần lộc nhỏ chạy chiều ngược lại (Trái -> Phải, lệch nhịp) */}
      <div
        className="animate-reindeer-ltr absolute bottom-3 left-0 hidden sm:block"
        style={{ animationDelay: '11s' }}
      >
        <RunningReindeerPairSVG />
      </div>

      {/* 5. SÂN KHẤU KỊCH BẢN NOEL: Cây thông + Ông già Noel rón rén đặt quà + Bay vút chéo màn hình */}
      <div className="absolute bottom-20 right-3 sm:bottom-0 sm:right-20">
        {/* Cây thông Noel lung linh */}
        <div className="animate-tree-sway relative z-10">
          <ChristmasTreeSVG className="h-32 w-26 sm:h-44 sm:w-36" />
        </div>

        {/* Hộp quà bí mật xuất hiện ngay gốc cây thông đúng lúc Ông già Noel cúi xuống đặt */}
        <div className="animate-santa-placed-gift absolute bottom-1 -left-3 z-20 sm:bottom-1.5 sm:-left-4">
          <PlacedTreeGiftSVG />
        </div>

        {/* Ông già Noel rón rén đi tới cây thông & cúi xuống đặt hộp quà */}
        <div className="animate-santa-sneak absolute bottom-0 -left-16 z-30 sm:-left-20">
          <SneakySantaSVG />
        </div>

        {/* Ông già Noel cất cánh từ chỗ cây thông & bay vút CHÉO toàn màn hình lên bầu trời góc trái trên */}
        <div className="animate-santa-diagonal absolute bottom-6 -left-10 z-30 sm:bottom-10 sm:-left-14">
          <FlyingDiagonalSantaSVG />
        </div>
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
