'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';

type Props = {
  type?: 'income' | 'expense';
};

export default function AddIncomeModal({ type }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
        {type === 'income' ? 'Add Income' : 'Add Expense'}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={type === 'income' ? 'Add Income' : 'Add Expense'}
        size="md"
      >
        <Input id="amount" label="Amount" type="number" placeholder="Amount" />
        <Input id="date" label="Date" type="date" placeholder="Date" />

        {/* category, booking_ref and notes need to be updated after corresponding ui is available.*/}

        <Input
          id={type === 'income' ? 'source' : 'category'}
          label={type === 'income' ? 'Source' : 'Category'}
          type="text"
          placeholder={type === 'income' ? 'Source' : 'Category'}
        />
        {type === 'income' && (
          <Input id="booking_ref" label="Booking Reference" type="text" placeholder="Booking Reference" />
        )}
        <Input id="notes" label="Notes" type="text" placeholder="Notes" />
      </Modal>
    </>
  );
}
