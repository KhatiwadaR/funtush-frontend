'use client';

import finance from '../../../../../../data/finance.json';
import InvoiceTable from '@/components/agency/finance/invoice/InvoiceTable';

const agencyId = 'ag-001';

const invoices = finance.invoices.filter((invoice) => invoice.agency_id === agencyId);

export default function InvoicesPage() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-neutral-900">Invoices</h2>
      <InvoiceTable invoices={invoices} />
    </div>
  );
}
