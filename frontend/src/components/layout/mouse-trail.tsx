'use client';

import { useEffect, useRef } from 'react';

// Text/Unicode helper
const txt = (char: string, size = 34) =>
  `<span style="font-size:${size}px;color:#000;line-height:1;display:block;font-family:serif,Georgia,'Times New Roman';user-select:none;">${char}</span>`;

// Note-name badge (black pill with white label)
const badge = (label: string) => {
  const w = label.length <= 1 ? 36 : label.length <= 2 ? 44 : 54;
  const fs = label.length <= 1 ? 15 : label.length <= 2 ? 13 : 11;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="36" viewBox="0 0 ${w} 36">
    <rect x="1" y="1" width="${w - 2}" height="34" rx="17" fill="#000"/>
    <text x="${w / 2}" y="24" text-anchor="middle" fill="white"
      font-size="${fs}" font-family="Arial,sans-serif" font-weight="bold">${label}</text>
  </svg>`;
};

// 50 music symbols — cycle in order
const MUSIC_NOTES: string[] = [
  // ── 1. Maxima (double vertical bars + rectangle) ──────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="36" viewBox="0 0 34 36">
    <rect x="6" y="10" width="22" height="16" fill="none" stroke="#000" stroke-width="2.5"/>
    <line x1="6"  y1="6" x2="6"  y2="30" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="28" y1="6" x2="28" y2="30" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="2"  y1="6" x2="2"  y2="30" stroke="#000" stroke-width="2"   stroke-linecap="round"/>
    <line x1="32" y1="6" x2="32" y2="30" stroke="#000" stroke-width="2"   stroke-linecap="round"/>
  </svg>`,

  // ── 2. Longa (rectangle + right stem going down) ──────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
    <rect x="4" y="10" width="18" height="14" fill="none" stroke="#000" stroke-width="2.5"/>
    <line x1="4"  y1="6"  x2="4"  y2="36" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="22" y1="24" x2="22" y2="36" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // ── 3. Breve (open oval with side bars) ───────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 30 26">
    <ellipse cx="15" cy="13" rx="12" ry="8" fill="none" stroke="#000" stroke-width="2.5"/>
    <line x1="3"  y1="7"  x2="3"  y2="19" stroke="#000" stroke-width="3" stroke-linecap="round"/>
    <line x1="27" y1="7"  x2="27" y2="19" stroke="#000" stroke-width="3" stroke-linecap="round"/>
  </svg>`,

  // ── 4. Whole Note (open oval, no stem, hollow center) ────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="22" viewBox="0 0 28 22">
    <ellipse cx="14" cy="11" rx="12" ry="8.5" fill="none" stroke="#000" stroke-width="2.8"/>
    <ellipse cx="14" cy="11" rx="5"  ry="3.5" fill="white"/>
  </svg>`,

  // ── 5. Half Note (open oval + stem) ──────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="40" viewBox="0 0 22 40">
    <ellipse cx="9" cy="33" rx="8.5" ry="5.5" transform="rotate(-18 9 33)"
      fill="none" stroke="#000" stroke-width="2.5"/>
    <line x1="17.5" y1="30" x2="17.5" y2="4" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // ── 6. Quarter Note ♩ ─────────────────────────────────────────────────────
  txt('♩'),

  // ── 7. Eighth Note ♪ ──────────────────────────────────────────────────────
  txt('♪'),

  // ── 8. Sixteenth Note (2 flags) ───────────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="40" viewBox="0 0 26 40">
    <ellipse cx="9" cy="33" rx="8.5" ry="5.5" transform="rotate(-18 9 33)" fill="#000"/>
    <line x1="17.5" y1="30" x2="17.5" y2="4" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M17.5 4   C24 7.5  25 13   19 17.5" stroke="#000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M17.5 11  C24 14.5 25 20   19 24.5" stroke="#000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  // ── 9. Thirty-Second Note (3 flags) ──────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="44" viewBox="0 0 26 44">
    <ellipse cx="9" cy="37" rx="8.5" ry="5.5" transform="rotate(-18 9 37)" fill="#000"/>
    <line x1="17.5" y1="34" x2="17.5" y2="4" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M17.5 4  C24 7  25 12 19 16" stroke="#000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M17.5 11 C24 14 25 19 19 23" stroke="#000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M17.5 18 C24 21 25 26 19 30" stroke="#000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  // ── 10. Sixty-Fourth Note (4 flags) ──────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="48" viewBox="0 0 26 48">
    <ellipse cx="9" cy="41" rx="8.5" ry="5.5" transform="rotate(-18 9 41)" fill="#000"/>
    <line x1="17.5" y1="38" x2="17.5" y2="4" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M17.5 4  C24 6.5 25 11 19 15"   stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M17.5 10 C24 12.5 25 17 19 21"  stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M17.5 16 C24 18.5 25 23 19 27"  stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M17.5 22 C24 24.5 25 29 19 33"  stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  // ── 11. 128th Note (5 flags) ──────────────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="52" viewBox="0 0 26 52">
    <ellipse cx="9" cy="45" rx="8.5" ry="5.5" transform="rotate(-18 9 45)" fill="#000"/>
    <line x1="17.5" y1="42" x2="17.5" y2="4" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M17.5 4   C23 6  24 10.5 19 14"   stroke="#000" stroke-width="1.9" fill="none" stroke-linecap="round"/>
    <path d="M17.5 9.5 C23 11.5 24 16 19 19.5" stroke="#000" stroke-width="1.9" fill="none" stroke-linecap="round"/>
    <path d="M17.5 15  C23 17  24 21.5 19 25"  stroke="#000" stroke-width="1.9" fill="none" stroke-linecap="round"/>
    <path d="M17.5 20.5 C23 22.5 24 27 19 30.5" stroke="#000" stroke-width="1.9" fill="none" stroke-linecap="round"/>
    <path d="M17.5 26  C23 28  24 32.5 19 36"  stroke="#000" stroke-width="1.9" fill="none" stroke-linecap="round"/>
  </svg>`,

  // ── 12. 256th Note (6 flags) ──────────────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="56" viewBox="0 0 26 56">
    <ellipse cx="9" cy="49" rx="8.5" ry="5.5" transform="rotate(-18 9 49)" fill="#000"/>
    <line x1="17.5" y1="46" x2="17.5" y2="4" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M17.5 4   C23 5.5 24 9.5 19 13"   stroke="#000" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M17.5 9   C23 10.5 24 14.5 19 18"  stroke="#000" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M17.5 14  C23 15.5 24 19.5 19 23"  stroke="#000" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M17.5 19  C23 20.5 24 24.5 19 28"  stroke="#000" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M17.5 24  C23 25.5 24 29.5 19 33"  stroke="#000" stroke-width="1.7" fill="none" stroke-linecap="round"/>
    <path d="M17.5 29  C23 30.5 24 34.5 19 38"  stroke="#000" stroke-width="1.7" fill="none" stroke-linecap="round"/>
  </svg>`,

  // ── 13–24. Note Names (black pill badges) ────────────────────────────────
  badge('C'),
  badge('C\u266f'),   // C♯
  badge('D'),
  badge('D\u266f'),   // D♯
  badge('E'),
  badge('F'),
  badge('F\u266f'),   // F♯
  badge('G'),
  badge('G\u266f'),   // G♯
  badge('A'),
  badge('A\u266f'),   // A♯
  badge('B'),

  // ── 25. Whole Rest (filled rect hanging below a line) ────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="22" viewBox="0 0 32 22">
    <line x1="2"  y1="8" x2="30" y2="8" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="7" y="8" width="18" height="8" fill="#000"/>
  </svg>`,

  // ── 26. Half Rest (filled rect sitting on a line) ────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="22" viewBox="0 0 32 22">
    <line x1="2"  y1="15" x2="30" y2="15" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="7" y="7" width="18" height="8" fill="#000"/>
  </svg>`,

  // ── 27. Quarter Rest (zigzag squiggle) ───────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40">
    <path d="M14 4 L18 11 L8 17 L17 23 L7 30 C7 35 4 37 4 37"
      fill="none" stroke="#000" stroke-width="2.5"
      stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // ── 28. Eighth Rest (diagonal + blob) ────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="36" viewBox="0 0 22 36">
    <line x1="6" y1="10" x2="18" y2="30" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="16" cy="11" r="4.5" fill="#000"/>
  </svg>`,

  // ── 29. Sixteenth Rest (diagonal + two blobs) ────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="40" viewBox="0 0 22 40">
    <line x1="5" y1="10" x2="18" y2="34" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="16" cy="11" r="4" fill="#000"/>
    <circle cx="11" cy="25" r="4" fill="#000"/>
  </svg>`,

  // ── 30. Thirty-Second Rest (3 blobs) ─────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="44" viewBox="0 0 24 44">
    <line x1="5" y1="10" x2="20" y2="38" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="18" cy="11" r="4"   fill="#000"/>
    <circle cx="14" cy="22" r="3.5" fill="#000"/>
    <circle cx="10" cy="33" r="3.5" fill="#000"/>
  </svg>`,

  // ── 31. Sixty-Fourth Rest (4 blobs) ──────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="48" viewBox="0 0 26 48">
    <line x1="5" y1="10" x2="22" y2="42" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="20" cy="11" r="3.5" fill="#000"/>
    <circle cx="16" cy="21" r="3"   fill="#000"/>
    <circle cx="13" cy="31" r="3"   fill="#000"/>
    <circle cx="9"  cy="41" r="3"   fill="#000"/>
  </svg>`,

  // ── 32. Sharp ♯ ───────────────────────────────────────────────────────────
  txt('\u266f', 34),

  // ── 33. Flat ♭ ────────────────────────────────────────────────────────────
  txt('\u266d', 40),

  // ── 34. Natural ♮ ────────────────────────────────────────────────────────
  txt('\u266e', 34),

  // ── 35. Double Sharp (×) ─────────────────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
    <line x1="4"  y1="4"  x2="26" y2="26" stroke="#000" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="26" y1="4"  x2="4"  y2="26" stroke="#000" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="15" cy="15" r="4.5" fill="white"/>
    <circle cx="15" cy="15" r="2"   fill="#000"/>
  </svg>`,

  // ── 36. Double Flat 𝄫 ─────────────────────────────────────────────────────
  txt('\ud834\udd2b', 38),

  // ── 37. Treble Clef 𝄞 ────────────────────────────────────────────────────
  txt('\ud834\udd1e', 44),

  // ── 38. Bass Clef 𝄢 ───────────────────────────────────────────────────────
  txt('\ud834\udd22', 38),

  // ── 39. Alto Clef (B-shape C-clef, centred on middle) ────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="42" viewBox="0 0 28 42">
    <line x1="4" y1="3"  x2="4" y2="39" stroke="#000" stroke-width="3"   stroke-linecap="round"/>
    <line x1="7" y1="3"  x2="7" y2="39" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M7 3  C20 3  25 10 25 21 C25 32 20 39 7 39"
      fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M7 21 C14 21 19 15 19 21 C19 27 14 21 7 21" fill="#000"/>
  </svg>`,

  // ── 40. Tenor Clef (B-shape C-clef, higher position label) ───────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="46" viewBox="0 0 28 46">
    <line x1="4" y1="3"  x2="4" y2="41" stroke="#000" stroke-width="3"   stroke-linecap="round"/>
    <line x1="7" y1="3"  x2="7" y2="41" stroke="#000" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M7 3  C20 3  25 10 25 22 C25 34 20 41 7 41"
      fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M7 22 C14 22 19 16 19 22 C19 28 14 22 7 22" fill="#000"/>
    <text x="5" y="45.5" font-size="8" fill="#000" font-family="Arial,sans-serif">Ten.</text>
  </svg>`,

  // ── 41. Neutral / Percussion Clef (two vertical rectangles) ──────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="40" viewBox="0 0 22 40">
    <rect x="2"  y="8" width="7" height="24" fill="#000" rx="1.5"/>
    <rect x="13" y="8" width="7" height="24" fill="#000" rx="1.5"/>
  </svg>`,

  // ── 42. Dotted Note (quarter + augmentation dot) ─────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
    <ellipse cx="9" cy="33" rx="8.5" ry="5.5" transform="rotate(-18 9 33)" fill="#000"/>
    <line x1="17.5" y1="30" x2="17.5" y2="4" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="27" cy="31" r="3.2" fill="#000"/>
  </svg>`,

  // ── 43. Tie (arc over two noteheads) ─────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 48 32">
    <ellipse cx="8"  cy="24" rx="7" ry="4.5" transform="rotate(-18  8 24)" fill="#000"/>
    <line x1="15"  y1="21" x2="15"  y2="8" stroke="#000" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="38" cy="24" rx="7" ry="4.5" transform="rotate(-18 38 24)" fill="#000"/>
    <line x1="45"  y1="21" x2="45"  y2="8" stroke="#000" stroke-width="2" stroke-linecap="round"/>
    <path d="M14 8 Q30 1 45 8" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // ── 44. Slur (arc below two noteheads) ───────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 48 36">
    <ellipse cx="8"  cy="20" rx="7" ry="4.5" transform="rotate(-18  8 20)" fill="#000"/>
    <line x1="15"  y1="17" x2="15"  y2="6" stroke="#000" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="38" cy="20" rx="7" ry="4.5" transform="rotate(-18 38 20)" fill="#000"/>
    <line x1="45"  y1="17" x2="45"  y2="6" stroke="#000" stroke-width="2" stroke-linecap="round"/>
    <path d="M10 24 Q28 34 44 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // ── 45. Fermata (arc + dot over notehead) ────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
    <ellipse cx="14" cy="37" rx="8.5" ry="5.5" transform="rotate(-18 14 37)" fill="#000"/>
    <line x1="22.5" y1="34" x2="22.5" y2="22" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M5 22 Q18 5 31 22" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="18" cy="14" r="3.5" fill="#000"/>
  </svg>`,

  // ── 46. Staccato (dot above notehead) ────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="44" viewBox="0 0 26 44">
    <ellipse cx="9" cy="37" rx="8.5" ry="5.5" transform="rotate(-18 9 37)" fill="#000"/>
    <line x1="17.5" y1="34" x2="17.5" y2="10" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="17.5" cy="5" r="3.5" fill="#000"/>
  </svg>`,

  // ── 47. Accent (> mark) ───────────────────────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="44" viewBox="0 0 32 44">
    <ellipse cx="11" cy="37" rx="8.5" ry="5.5" transform="rotate(-18 11 37)" fill="#000"/>
    <line x1="19.5" y1="34" x2="19.5" y2="12" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M4 5 L19 12 L4 19"
      fill="none" stroke="#000" stroke-width="2.5"
      stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // ── 48. Marcato (^ caret above notehead) ─────────────────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="46" viewBox="0 0 32 46">
    <ellipse cx="11" cy="39" rx="8.5" ry="5.5" transform="rotate(-18 11 39)" fill="#000"/>
    <line x1="19.5" y1="36" x2="19.5" y2="14" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M4 18 L16 4 L28 18"
      fill="none" stroke="#000" stroke-width="2.5"
      stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  // ── 49. Appoggiatura (grace note + beam to full note) ────────────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="38" height="40" viewBox="0 0 38 40">
    <ellipse cx="26" cy="33" rx="8"   ry="5"   transform="rotate(-18 26 33)" fill="#000"/>
    <line x1="34"  y1="30"  x2="34"  y2="6"  stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="8"  cy="27" rx="5.5" ry="3.5" transform="rotate(-18  8 27)" fill="#000"/>
    <line x1="13.5" y1="24.5" x2="13.5" y2="6" stroke="#000" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="13.5" y1="6" x2="34"   y2="6"  stroke="#000" stroke-width="1.8" stroke-linecap="round"/>
  </svg>`,

  // ── 50. Acciaccatura (grace note + slash + beam to full note) ────────────
  `<svg xmlns="http://www.w3.org/2000/svg" width="38" height="40" viewBox="0 0 38 40">
    <ellipse cx="26" cy="33" rx="8"   ry="5"   transform="rotate(-18 26 33)" fill="#000"/>
    <line x1="34"  y1="30"  x2="34"  y2="6"  stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="8"  cy="27" rx="5.5" ry="3.5" transform="rotate(-18  8 27)" fill="#000"/>
    <line x1="13.5" y1="24.5" x2="13.5" y2="6" stroke="#000" stroke-width="1.8" stroke-linecap="round"/>
    <line x1="13.5" y1="6" x2="34"   y2="6"  stroke="#000" stroke-width="1.8" stroke-linecap="round"/>
    <!-- diagonal slash through grace-note stem -->
    <line x1="6" y1="22" x2="19" y2="7" stroke="#000" stroke-width="2" stroke-linecap="round"/>
  </svg>`,
];

const ANIMATION_CSS = `
@keyframes musicNoteFloat {
  0%   { opacity: 0.9;  transform: translateY(0px)  scale(1);    }
  25%  { opacity: 0.85; transform: translateY(-16px) scale(1.05); }
  100% { opacity: 0;    transform: translateY(-75px) scale(0.4);  }
}
.mouse-trail-note {
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  animation: musicNoteFloat 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  user-select: none;
  transform-origin: center bottom;
  filter: drop-shadow(0 1px 3px rgba(0,0,0,0.15));
}
`;

export default function MouseTrailEffect() {
  const indexRef    = useRef(0);
  const lastXRef    = useRef(0);
  const lastYRef    = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = ANIMATION_CSS;
    document.head.appendChild(style);

    const onMouseMove = (e: MouseEvent) => {
      const now  = Date.now();
      const dx   = e.clientX - lastXRef.current;
      const dy   = e.clientY - lastYRef.current;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Throttle: ≥ 65 ms AND ≥ 30 px movement between spawns
      if (now - lastTimeRef.current < 65 || dist < 30) return;

      lastTimeRef.current = now;
      lastXRef.current    = e.clientX;
      lastYRef.current    = e.clientY;

      const idx = indexRef.current % MUSIC_NOTES.length;
      indexRef.current += 1;

      const el = document.createElement('div');
      el.className  = 'mouse-trail-note';
      el.innerHTML  = MUSIC_NOTES[idx];
      el.style.left = `${e.clientX - 21}px`;
      el.style.top  = `${e.clientY - 21}px`;

      document.body.appendChild(el);

      const cleanup = () => el.parentNode?.removeChild(el);
      el.addEventListener('animationend', cleanup, { once: true });
      setTimeout(cleanup, 1500); // safety fallback
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      style.parentNode?.removeChild(style);
    };
  }, []);

  return null;
}
