'use client';

import finance from '../../../../../../data/finance.json';
import IncomeOrExpenseTable from '@/components/agency/finance/IncomeOrExpenseTable';

const agencyId = 'ag-001';

const incomeArr = finance.income.filter((inc) => inc.agency_id === agencyId);

export default function IncomePage() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-neutral-900">Income</h2>
      <IncomeOrExpenseTable data={incomeArr} type="income" />
    </div>
  );
}
