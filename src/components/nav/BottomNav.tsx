'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { TelebirrLogo, CBELogo, BOALogo } from '@/components/ui/ProviderLogo';

export function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeProvider = searchParams.get('provider');

  const tabs = [
    {
      href: '/receipts',
      label: 'All',
      provider: undefined,
      icon: (active: boolean) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="8" height="8" rx="2"
            fill={active ? '#e85d26' : '#9ca3af'}/>
          <rect x="13" y="3" width="8" height="8" rx="2"
            fill={active ? '#e85d26' : '#9ca3af'} opacity="0.7"/>
          <rect x="3" y="13" width="8" height="8" rx="2"
            fill={active ? '#e85d26' : '#9ca3af'} opacity="0.7"/>
          <rect x="13" y="13" width="8" height="8" rx="2"
            fill={active ? '#e85d26' : '#9ca3af'} opacity="0.4"/>
        </svg>
      ),
    },
    {
      href: '/receipts?provider=telebirr',
      label: 'telebirr',
      provider: 'telebirr',
      icon: () => <TelebirrLogo size={26} />,
    },
    {
      href: '/receipts?provider=BOA',
      label: 'BOA',
      provider: 'BOA',
      icon: () => <BOALogo size={26} />,
    },
    {
      href: '/receipts?provider=CBE',
      label: 'CBE',
      provider: 'CBE',
      icon: () => <CBELogo size={26} />,
    },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const isActive =
          pathname === '/receipts' &&
          ((tab.provider === undefined && !activeProvider) ||
            tab.provider === activeProvider);

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="bottom-nav-icon">{tab.icon(isActive)}</span>
            <span className="bottom-nav-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
