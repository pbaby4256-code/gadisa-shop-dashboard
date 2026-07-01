// Branded logo components for each payment provider.
// Built as SVG so they're crisp at any size, no external image dependency,
// and match each provider's actual brand colors as closely as possible.

export function TelebirrLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#00A651"/>
      <text
        x="18" y="14"
        textAnchor="middle"
        fill="white"
        fontSize="7"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        letterSpacing="0.5"
      >
        tele
      </text>
      <text
        x="18" y="24"
        textAnchor="middle"
        fill="#FFD700"
        fontSize="7"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        letterSpacing="0.5"
      >
        birr
      </text>
      <circle cx="18" cy="28.5" r="1.5" fill="#FFD700"/>
    </svg>
  );
}

export function CBELogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#003087"/>
      {/* Shield shape */}
      <path
        d="M18 7 L27 11 L27 19 C27 23.5 22.5 27.5 18 29 C13.5 27.5 9 23.5 9 19 L9 11 Z"
        fill="#0057B8"
      />
      <path
        d="M18 9.5 L25 13 L25 19.5 C25 23 21.5 26.5 18 27.5 C14.5 26.5 11 23 11 19.5 L11 13 Z"
        fill="white"
        opacity="0.15"
      />
      <text
        x="18" y="21"
        textAnchor="middle"
        fill="white"
        fontSize="8"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
      >
        CBE
      </text>
    </svg>
  );
}

export function BOALogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#8B0000"/>
      {/* Stylised "B" mark */}
      <rect x="11" y="9" width="3" height="18" rx="1.5" fill="white"/>
      <path d="M14 9 H20 C22.2 9 24 10.8 24 13 C24 15.2 22.2 17 20 17 H14 Z" fill="white"/>
      <path d="M14 17 H21 C23.2 17 25 18.8 25 21 C25 23.2 23.2 25 21 25 H14 Z" fill="white"/>
      {/* "A" accent dot */}
      <circle cx="27" cy="10" r="3" fill="#FFD700"/>
    </svg>
  );
}

export function AwashLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="10" fill="#6B21A8"/>
      <text
        x="18" y="16"
        textAnchor="middle"
        fill="white"
        fontSize="7"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
        letterSpacing="0.3"
      >
        AWASH
      </text>
      <text
        x="18" y="25"
        textAnchor="middle"
        fill="#E9D5FF"
        fontSize="6.5"
        fontWeight="600"
        fontFamily="Arial, sans-serif"
        letterSpacing="0.3"
      >
        BANK
      </text>
    </svg>
  );
}

export function ProviderLogo({
  provider,
  size = 36,
}: {
  provider: string;
  size?: number;
}) {
  switch (provider) {
    case 'telebirr': return <TelebirrLogo size={size} />;
    case 'CBE':      return <CBELogo size={size} />;
    case 'BOA':      return <BOALogo size={size} />;
    case 'Awash':    return <AwashLogo size={size} />;
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="10" fill="#6b7280"/>
          <text x="18" y="23" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="Arial">💳</text>
        </svg>
      );
  }
}
