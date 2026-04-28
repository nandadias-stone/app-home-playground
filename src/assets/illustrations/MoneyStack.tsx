/**
 * Ilustração de pilhas de dinheiro (verde) usada no Banner Capital de Giro.
 * Inspirada no asset original do Figma "Capital de Giro".
 */
export function MoneyStack({ size = 110 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 110 110"
      fill="none"
      aria-hidden="true"
    >
      {/* Pilha de notas de fundo */}
      <g transform="translate(8 26)">
        <rect x="0" y="0" width="78" height="44" rx="4" fill="#65E1A0" />
        <rect x="0" y="6" width="78" height="38" rx="4" fill="#3CCF7A" />
        <rect x="0" y="12" width="78" height="32" rx="4" fill="#1FB95F" />
        <circle cx="39" cy="28" r="9" fill="#65E1A0" stroke="#fff" strokeWidth="1.5" />
        <text
          x="39"
          y="32"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="11"
          fill="#fff"
        >
          $
        </text>
        <rect x="6" y="18" width="6" height="20" rx="1.5" fill="#fff" opacity="0.4" />
        <rect x="66" y="18" width="6" height="20" rx="1.5" fill="#fff" opacity="0.4" />
      </g>
      {/* Moedas empilhadas à direita */}
      <g transform="translate(60 18)">
        <ellipse cx="20" cy="64" rx="20" ry="6" fill="#1FB95F" />
        <rect x="0" y="48" width="40" height="16" fill="#3CCF7A" />
        <ellipse cx="20" cy="48" rx="20" ry="6" fill="#65E1A0" />
        <rect x="0" y="32" width="40" height="16" fill="#3CCF7A" />
        <ellipse cx="20" cy="32" rx="20" ry="6" fill="#65E1A0" />
        <rect x="0" y="16" width="40" height="16" fill="#3CCF7A" />
        <ellipse cx="20" cy="16" rx="20" ry="6" fill="#65E1A0" />
        <text
          x="20"
          y="22"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="10"
          fill="#fff"
        >
          $
        </text>
      </g>
    </svg>
  );
}
