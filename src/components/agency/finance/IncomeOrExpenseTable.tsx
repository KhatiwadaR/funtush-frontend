'use client';

import { useState } from 'react';

type Transaction = {
  id: string;
  date: string;
  amount: number;
  payment_method: string;

  source?: string;
  booking_ref?: string;
  category?: string;
  description?: string;
};
type Props = {
  data: Transaction[];
  type: 'income' | 'expense';
};

const tableClass = 'p-4 text-left';
const inputClass = 'rounded-lg border border-neutral-200 p-2';

export default function IncomeOrexpenseTable({ data, type }: Props) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [category, setCategory] = useState('');

  const paymentMethodArr = [...new Set(data.map((obj) => obj.payment_method))];
  const bookingRefArr = [...new Set(data.map((obj) => obj.booking_ref))];
  const categoryArr = [...new Set(data.map((obj) => obj.category))];

  const filteredData = data.filter((obj) => {
    const itemDate = new Date(obj.date);

    const matchesStart = !startDate || itemDate >= new Date(startDate);

    const matchesEnd = !endDate || itemDate <= new Date(endDate);

    const matchesPaymentMethod = !paymentMethod || obj.payment_method === paymentMethod;

    const matchesBookingRef = !bookingRef || obj.booking_ref === bookingRef;

    const matchesCategory = !category || obj.category === category;

    return matchesStart && matchesEnd && matchesPaymentMethod && matchesBookingRef && matchesCategory;
  });

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6">
      <fieldset className="mb-4 flex flex-wrap items-center gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
        <label htmlFor="start-date">Start Date: </label>
        <input
          type="date"
          id="start-date"
          className={inputClass}
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label htmlFor="end-date">End Date: </label>
        <input
          type="date"
          id="end-date"
          className={inputClass}
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <label htmlFor="payment-method">Payment Method </label>
        <select
          name="paymentMethod"
          id="payment-method"
          className={inputClass}
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">All</option>
          {paymentMethodArr.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>

        {type === 'income' && (
          <>
            <label htmlFor="booking-reference">Booking Reference </label>
            <select
              name="bookingReference"
              id="booking-reference"
              className={inputClass}
              value={bookingRef}
              onChange={(e) => setBookingRef(e.target.value)}
            >
              <option value="">All</option>
              {bookingRefArr.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </>
        )}

        {type === 'expense' && (
          <>
            <label htmlFor="category">Category </label>
            <select
              name="category"
              id="category"
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {categoryArr.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </>
        )}
      </fieldset>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className={tableClass}>Date</th>
            <th className={tableClass}>{type === 'income' ? 'Source' : 'Category'}</th>
            <th className={tableClass}>{type === 'income' ? 'Booking Reference' : 'Description'}</th>
            <th className={tableClass}>Amount</th>
            <th className={tableClass}>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((obj) => {
            return (
              <tr key={obj.id}>
                <td className={tableClass}>{obj.date}</td>
                <td className={tableClass}>{type === 'income' ? obj.source : obj.category}</td>
                <td className={tableClass}>{type === 'income' ? obj.booking_ref : obj.description}</td>
                <td className={tableClass}>{obj.amount}</td>
                <td className={tableClass}>{obj.payment_method}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
