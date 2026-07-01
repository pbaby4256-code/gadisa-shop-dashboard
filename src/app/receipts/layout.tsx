import { BottomNav } from '@/components/nav/BottomNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <header className="app-topbar">
        <div className="app-topbar-brand">
          <div className="app-topbar-logo">🏬</div>
          <div>
            <p className="app-topbar-name">Gadisa Shop</p>
            <p className="app-topbar-sub">Payment dashboard</p>
          </div>
        </div>
        <div className="app-topbar-live">
          <span className="live-pulse"></span>
          Live
        </div>
      </header>
      <main className="app-main">{children}</main>
      <BottomNav />
    </div>
  );
}
