import type { Receipt } from '@/lib/types/receipt';
import { ProviderLogo } from '@/components/ui/ProviderLogo';

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function ReceiptRow({ receipt, isNew }: { receipt: Receipt; isNew?: boolean }) {
  const providerClass = `provider-${receipt.provider}`;

  return (
    <div className={`receipt-card ${providerClass} ${isNew ? 'new-entry' : ''}`}>
      <ProviderLogo provider={receipt.provider} size={42} />

      <div className="receipt-body">
        <p className="receipt-name">{receipt.payer_name ?? 'Unknown payer'}</p>
        <div className="receipt-meta">
          <span className="receipt-provider-badge">{receipt.provider}</span>
          <span className="receipt-time">{timeAgo(receipt.received_at)}</span>
        </div>
        {receipt.reference_no && (
          <p className="receipt-ref">Ref: {receipt.reference_no}</p>
        )}
      </div>

      <div className="receipt-right">
        <p className="receipt-amount">
          ETB {Number(receipt.amount).toLocaleString('en-ET', {
            minimumFractionDigits: 2, maximumFractionDigits: 2,
          })}
        </p>
        <div className="receipt-check">✓</div>
      </div>
    </div>
  );
}
