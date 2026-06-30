import type { Receipt } from '@/lib/types/receipt';

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return new Date(iso).toLocaleDateString();
}

const PROVIDER_COLOR: Record<string, string> = {
  telebirr: 'var(--provider-telebirr, #16a34a)',
  BOA: 'var(--provider-boa, #2563eb)',
  CBE: 'var(--provider-cbe, #d97706)',
  Awash: 'var(--provider-awash, #7c3aed)',
};

export function ReceiptRow({ receipt }: { receipt: Receipt }) {
  const color = PROVIDER_COLOR[receipt.provider] ?? '#666';

  return (
    <div className="receipt-row">
      <div className="receipt-row-icon" style={{ background: `${color}1a`, color }}>
        ✓
      </div>
      <div className="receipt-row-main">
        <p className="receipt-row-name">{receipt.payer_name ?? 'Unknown payer'}</p>
        <p className="receipt-row-meta">
          {receipt.provider} · {timeAgo(receipt.received_at)}
        </p>
      </div>
      <p className="receipt-row-amount">
        ETB {receipt.amount.toLocaleString()}
      </p>
    </div>
  );
}
