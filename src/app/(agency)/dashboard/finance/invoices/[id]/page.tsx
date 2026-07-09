import finance from '../../../../../../../data/finance.json';
import agencies from '../../../../../../../data/agencies.json';
import { Button } from '@/components/ui';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const tableClass = 'border border-neutral-200 p-4 text-center';

export default async function InvoiceDetailsPage({ params }: Props) {
  const { id } = await params;

  const invoice = finance.invoices.find((invoice) => invoice.id === id);

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  const agencyName = agencies.find((agency) => agency.id === invoice.agency_id)?.name;

  const subtotal = invoice.amount;
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  return (
    <>
      <div className="space-y-6 p-6">
        <h2 className="text-2xl font-bold text-neutral-900">Invoice Details</h2>
        <div className="rounded-lg border border-neutral-200 bg-white p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-neutral-900">{agencyName}</h3>
          <p>{`Invoice Number: ${invoice.invoice_number}`}</p>
          <p>{`Customer: ${invoice.trekker_name}`}</p>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={tableClass}>Package</th>
                <th className={tableClass}>Amount</th>
                <th className={tableClass}>Issue Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={tableClass}>{invoice.package_name}</td>
                <td className={tableClass}>{invoice.amount}</td>
                <td className={tableClass}>{invoice.issue_date}</td>
              </tr>
            </tbody>
          </table>
          <p className="ml-auto">{`Subtotal: NPR ${subtotal}`}</p>
          <p className="ml-auto">{`Tax (13%): NPR ${tax}`}</p>
          <p className="ml-auto font-bold">{`Total: NPR ${total}`}</p>
        </div>
        <Button variant="secondary">Download PDF</Button>
      </div>
    </>
  );
}
