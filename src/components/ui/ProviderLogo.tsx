// Provider logo components using the real brand images.
// Images live in /public/logos/ and are served as static assets by Next.js.

import Image from 'next/image';

interface LogoProps { size?: number; }

export function TelebirrLogo({ size = 36 }: LogoProps) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: '#ffffff', border: '1.5px solid #e4e6ea',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexShrink: 0,
    }}>
      <Image
        src="/logos/telebirr.jpg"
        alt="telebirr"
        width={size - 6}
        height={size - 6}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}

export function CBELogo({ size = 36 }: LogoProps) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: '#ffffff', border: '1.5px solid #e4e6ea',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexShrink: 0,
    }}>
      <Image
        src="/logos/cbe.png"
        alt="CBE"
        width={size - 4}
        height={size - 4}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}

export function BOALogo({ size = 36 }: LogoProps) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: '#ffffff', border: '1.5px solid #e4e6ea',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', flexShrink: 0,
    }}>
      <Image
        src="/logos/boa.png"
        alt="BOA"
        width={size - 6}
        height={size - 6}
        style={{ objectFit: 'contain' }}
      />
    </div>
  );
}

export function AwashLogo({ size = 36 }: LogoProps) {
  // No real logo uploaded yet — placeholder until confirmed
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: '#6B21A8',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        color: 'white', fontSize: size * 0.28,
        fontWeight: 800, fontFamily: 'Arial',
        letterSpacing: '-0.5px',
      }}>AW</span>
    </div>
  );
}

export function ProviderLogo({ provider, size = 36 }: { provider: string; size?: number }) {
  switch (provider) {
    case 'telebirr': return <TelebirrLogo size={size} />;
    case 'CBE':      return <CBELogo size={size} />;
    case 'BOA':      return <BOALogo size={size} />;
    case 'Awash':    return <AwashLogo size={size} />;
    default:
      return (
        <div style={{
          width: size, height: size, borderRadius: size * 0.28,
          background: '#6b7280', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontSize: size * 0.5 }}>💳</span>
        </div>
      );
  }
}
