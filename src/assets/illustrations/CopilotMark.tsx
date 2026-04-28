/**
 * Símbolo "sparkle" do Copiloto (estrela 4-pontas em verde claro).
 */
export function CopilotMark({ size = 20, color = '#9BE0BC' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2 13.7 9.4c.2.7.7 1.2 1.4 1.4L22 12l-7 1.7c-.7.2-1.2.7-1.4 1.4L12 22l-1.7-6.9c-.2-.7-.7-1.2-1.4-1.4L2 12l7-1.7c.7-.2 1.2-.7 1.4-1.4L12 2Z"
        fill={color}
      />
      <path
        d="M19 4l.6 2.4c.1.3.3.5.6.6L22 7.5l-1.8.6c-.3.1-.5.3-.6.6L19 11l-.6-2.3c-.1-.3-.3-.5-.6-.6L16 7.5l1.8-.5c.3-.1.5-.3.6-.6L19 4Z"
        fill="#fff"
        opacity="0.85"
      />
    </svg>
  );
}
