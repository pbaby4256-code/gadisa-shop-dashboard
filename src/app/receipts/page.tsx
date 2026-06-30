import { ReceiptFeed } from '@/components/receipts/ReceiptFeed';
import { ReceiptFilters } from '@/components/receipts/ReceiptFilters';
import type { Provider } from '@/lib/types/receipt';

export default function ReceiptsPage({
  searchParams,
}: {
  searchParams: { provider?: string; q?: string };
}) {
  const provider = searchParams.provider as Provider | undefined;
  const search = searchParams.q;

  return (
    <div className="receipts-page">
      <div className="receipts-page-header">
        <p className="receipts-page-eyebrow">Gadisa Shop</p>
        <p className="receipts-page-title">
          {provider ? `${provider} payments` : 'Payment check'}
        </p>
      </div>

      <ReceiptFilters />
      <ReceiptFeed provider={provider} search={search} />
    </div>
  );
}
