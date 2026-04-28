/**
 * Ilustração de maquininha (POS) verde Stone usada no Banner Autocredenciamento.
 */
export function PosTerminal({ size = 110 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.18}
      viewBox="0 0 110 130"
      fill="none"
      aria-hidden="true"
    >
      {/* Corpo principal */}
      <rect x="14" y="6" width="82" height="118" rx="8" fill="#3CCF7A" />
      <rect x="14" y="6" width="82" height="118" rx="8" fill="url(#pos-gradient)" />

      {/* Tela */}
      <rect x="22" y="14" width="66" height="48" rx="4" fill="#0E2A1B" />
      <rect x="26" y="20" width="58" height="2" fill="#3CCF7A" opacity="0.5" />
      <text x="28" y="38" fontFamily="Inter, sans-serif" fontSize="6" fill="#65E1A0" fontWeight="600">
        STONE
      </text>
      <text x="28" y="52" fontFamily="Inter, sans-serif" fontSize="11" fill="#fff" fontWeight="700">
        20:14
      </text>
      <text x="74" y="58" fontFamily="Inter, sans-serif" fontSize="5" fill="#65E1A0" textAnchor="end">
        Loja STONE
      </text>

      {/* Slot do cartão */}
      <rect x="22" y="68" width="66" height="3" rx="1" fill="#0E2A1B" opacity="0.4" />

      {/* Teclado */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={26 + col * 20}
            y={78 + row * 12}
            width="14"
            height="8"
            rx="2"
            fill="#fff"
            fillOpacity="0.85"
          />
        )),
      )}

      <defs>
        <linearGradient id="pos-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.05" />
        </linearGradient>
      </defs>
    </svg>
  );
}
