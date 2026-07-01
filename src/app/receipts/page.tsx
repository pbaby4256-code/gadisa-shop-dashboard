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
      <ReceiptFilters />
      <div className="section-header">
        <p className="section-title">
          {provider ? `${provider} payments` : 'Recent payments'}
        </p>
      </div>
      <ReceiptFeed provider={provider} search={search} />
    </div>
  );
}
