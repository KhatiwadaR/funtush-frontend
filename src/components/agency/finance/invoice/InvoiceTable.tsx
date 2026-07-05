'use client';

type InvoiceArr = {
  id: string;
  trekker_name: string;
  package_name: string;
  amount: number;
  status: string;
};

type Props = {
  invoices: InvoiceArr[];
};

const tableClass = 'p-4 text-left';
const statusStyles = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  overdue: 'bg-red-100 text-red-700',
};

export default function InvoiceTable({ invoices }: Props) {
  return (
    <>
      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <h3>Invoice Table</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className={tableClass}>Invoice ID</th>
              <th className={tableClass}>Trekker Name</th>
              <th className={tableClass}>Package Name</th>
              <th className={tableClass}>Amount</th>
              <th className={tableClass}>Status</th>
            </tr>
          </thead>
          <tbody className="gap-4">
            {invoices.map((invoice) => {
              return (
                <tr key={invoice.id}>
                  <td className={tableClass}>{invoice.id}</td>
                  <td className={tableClass}>{invoice.trekker_name}</td>
                  <td className={tableClass}>{invoice.package_name}</td>
                  <td className={tableClass}>{invoice.amount}</td>
                  <td
                    className={`${tableClass} ${statusStyles[invoice.status.toLowerCase() as keyof typeof statusStyles]}`}
                  >
                    {invoice.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
