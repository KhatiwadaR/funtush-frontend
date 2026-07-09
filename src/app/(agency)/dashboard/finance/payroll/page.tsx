'use client';
import finance from '../../../../../../data/finance.json';

const agencyId = 'ag-001';

const payroll = finance.payroll.filter((obj) => obj.agency_id === agencyId);

const tableHeader = ['Name', 'Role', 'Period', 'Amount', 'Status'];

const tableClass = 'p-4 text-left';

export default function PayrollPage() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-neutral-900">Payroll</h2>
      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <h3 className="font-semibold text-neutral-900 mb-4">Staff/Guide Payroll table</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {tableHeader.map((item) => (
                <th key={item} className={tableClass}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payroll.map((item) => {
              return (
                <>
                  <tr key={item.id}>
                    <td className={tableClass}>{item.employee_name}</td>
                    <td className={tableClass}>{item.role}</td>
                    <td className={tableClass}>{item.period}</td>
                    <td className={tableClass}>{`NPR ${item.amount}`}</td>
                    <td className={tableClass}>{item.status}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
