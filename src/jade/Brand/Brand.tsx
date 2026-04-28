type BrandProps = {
  variant: 'mastercard' | 'visa' | 'pix' | 'boleto' | 'elo';
  size?: number;
};

export function Brand({ variant, size = 24 }: BrandProps) {
  const w = size;
  const h = size;
  switch (variant) {
    case 'mastercard':
      return (
        <svg width={w} height={h} viewBox="0 0 32 22" fill="none" aria-hidden="true">
          <rect width="32" height="22" rx="3" fill="#fff" />
          <circle cx="13" cy="11" r="6.4" fill="#EB001B" />
          <circle cx="19" cy="11" r="6.4" fill="#F79E1B" />
          <path
            d="M16 6.6a6.4 6.4 0 0 0 0 8.8 6.4 6.4 0 0 0 0-8.8Z"
            fill="#FF5F00"
          />
        </svg>
      );
    case 'visa':
      return (
        <svg width={w} height={h} viewBox="0 0 32 22" fill="none" aria-hidden="true">
          <rect width="32" height="22" rx="3" fill="#1434CB" />
          <path
            d="M13.5 14.5h-2L13 7.5h2l-1.5 7Zm5.7-6.8c-.4-.2-1-.3-1.7-.3-1.9 0-3.2 1-3.2 2.4 0 1 .9 1.6 1.7 2 .8.3 1 .6 1 .9 0 .5-.6.7-1.1.7a3.7 3.7 0 0 1-1.7-.3l-.2-.1-.3 1.6c.5.2 1.4.4 2.4.4 2 0 3.3-1 3.3-2.5 0-.9-.5-1.6-1.6-2-.6-.3-1-.5-1-.9 0-.3.4-.6 1.1-.6a3.6 3.6 0 0 1 1.4.3l.2.1.4-1.5Zm5.3-.2h-1.5c-.5 0-.8.1-1 .6l-2.8 6.4h2l.4-1h2.4l.2 1H26l-1.5-7Zm-2.3 4.5l.7-2 .2-.7.2.7.4 2H22.2Z"
            fill="#fff"
          />
        </svg>
      );
    case 'elo':
      return (
        <svg width={w} height={h} viewBox="0 0 32 22" fill="none" aria-hidden="true">
          <rect width="32" height="22" rx="3" fill="#000" />
          <circle cx="11" cy="11" r="3.5" fill="#FFB000" />
          <path d="M16 8.5l3 1.3-3 1.3v-2.6Z" fill="#EE3338" />
          <path d="M16 11.6l3 1.3-3 1.3v-2.6Z" fill="#06A35F" />
        </svg>
      );
    case 'pix':
      return (
        <svg width={w} height={h} viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect width="32" height="32" rx="16" fill="#32BCAD" />
          <path
            d="M11 11.3 16 6.3l5 5-2.5 2.5L16 11.3l-2.5 2.5L11 11.3Zm0 9.4 5 5 5-5-2.5-2.5L16 20.7l-2.5-2.5L11 20.7ZM6 16l3.2-3.2L13 16.5l-3.7 3.7L6 16Zm17.2-3.4L26 16l-3.2 3.4-3.5-3.5 3.5-3.3Z"
            fill="#fff"
          />
        </svg>
      );
    case 'boleto':
      return (
        <svg width={w} height={h} viewBox="0 0 32 22" fill="none" aria-hidden="true">
          <rect width="32" height="22" rx="3" fill="#fff" stroke="#E5E7EB" />
          <path
            d="M5 5.5h2v11H5v-11Zm3 0h1v11H8v-11Zm2 0h2v11h-2v-11Zm3 0h1v11h-1v-11Zm2 0h3v11h-3v-11Zm4 0h1v11h-1v-11Zm2 0h2v11h-2v-11Zm3 0h1v11h-1v-11Zm2 0h2v11h-2v-11Z"
            fill="#0F172A"
          />
        </svg>
      );
  }
}
