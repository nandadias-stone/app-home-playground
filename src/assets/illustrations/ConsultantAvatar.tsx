/**
 * Avatar gerado em SVG para "Marcos S." (Consultor Stone).
 * Substituível por foto real quando disponível.
 */
export function ConsultantAvatar({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="consultant-clip">
          <circle cx="24" cy="24" r="24" />
        </clipPath>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#65E1A0" />
          <stop offset="100%" stopColor="#1FB95F" />
        </linearGradient>
      </defs>
      <g clipPath="url(#consultant-clip)">
        {/* Fundo */}
        <rect width="48" height="48" fill="url(#bg-grad)" />
        {/* Pescoço */}
        <rect x="18" y="34" width="12" height="10" fill="#D6A077" />
        {/* Cabeça */}
        <ellipse cx="24" cy="22" rx="11" ry="12" fill="#E5B58E" />
        {/* Cabelo */}
        <path
          d="M14 18c0-7 5-11 10-11s10 4 10 11c0 1.5-.3 3-.8 4.3-.5-3-2-5-4-5h-1c-1 0-2-.5-2.5-1.5C25 14 23 13 21 13.5c-3 .8-5 3-6 6 -.5-.5-.8-1-.8-1.5Z"
          fill="#3B2A1F"
        />
        {/* Óculos */}
        <circle cx="19.5" cy="22" r="3" fill="none" stroke="#1F2937" strokeWidth="0.8" />
        <circle cx="28.5" cy="22" r="3" fill="none" stroke="#1F2937" strokeWidth="0.8" />
        <line x1="22.5" y1="22" x2="25.5" y2="22" stroke="#1F2937" strokeWidth="0.8" />
        {/* Sorriso */}
        <path d="M21 28c1.5 1 3 1.5 3 1.5s1.5-.5 3-1.5" stroke="#7C4A2A" strokeWidth="1" strokeLinecap="round" fill="none" />
        {/* Camisa */}
        <path d="M6 48c0-7 8-12 18-12s18 5 18 12H6Z" fill="#0E5B33" />
      </g>
    </svg>
  );
}
