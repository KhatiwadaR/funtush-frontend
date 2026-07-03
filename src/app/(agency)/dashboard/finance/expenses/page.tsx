'use client';

import finance from '../../../../../../data/finance.json';
import IncomeOrExpenseTable from '@/components/agency/finance/IncomeOrExpenseTable';

const agencyId = 'ag-001';

const expenseArr = finance.expenses.filter((expense) => expense.agency_id === agencyId);

export default function ExpensePage() {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold text-neutral-900">Expense</h2>
      <IncomeOrExpenseTable data={expenseArr} type="expense" />
    </div>
  );
}
