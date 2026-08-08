'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useStaff } from '@/hooks/useStaff';
import AddStaffModal from '@/components/agency/staff/AddStaffModal';
import rolesData from '../../../../../data/roles.json';
import Link from 'next/link';
import { AnalyticsSummaryCard } from '@/components/shared/AnalyticsSummaryCard';
import { CheckCircle2, Shield, Users } from 'lucide-react';

// Helper to format time
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Get role label
const getRoleLabel = (roleValue: string) => {
  const role = rolesData.find((r) => r.value === roleValue);
  return role ? role.label : roleValue;
};

export default function StaffPage() {
  const { staff, toggleActive, addStaff } = useStaff();
  const [isModalOpen, setIsModalOpen] = useState(false);

  type AddStaffData = Parameters<typeof addStaff>[0];

  const handleAddStaff = (data: AddStaffData) => {
    addStaff(data);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3"><div><div className="flex items-center gap-2 text-sm text-neutral-500"><Link href="/dashboard">Dashboard</Link><span>/</span><span className="font-semibold text-neutral-900">Staff</span></div><h1 className="mt-2 text-2xl font-semibold text-neutral-900">Staff</h1><p className="mt-1 text-sm text-neutral-600">Manage your agency team and account access.</p></div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl bg-primary-900 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
        >
          + Add Staff
        </button></div>

      <div className="grid gap-3 sm:grid-cols-3"><AnalyticsSummaryCard label="Total Staff" value={staff.length} tone="primary" icon={Users} /><AnalyticsSummaryCard label="Active Staff" value={staff.filter((member) => member.active).length} tone="success" icon={CheckCircle2} /><AnalyticsSummaryCard label="Roles" value={new Set(staff.map((member) => member.role)).size} tone="warning" icon={Shield} /></div>

      {/* Staff Table */}
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">
                Staff
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">
                Email
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">
                Role
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">
                Last Active
              </th>
              <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-4 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-neutral-50">
                <td className="px-4 py-3">
                  <a
                    href={`/dashboard/staff/${member.id}`}
                    className="flex items-center gap-3 hover:text-primary-900"
                  >
                    <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden shrink-0">
                      {member.avatar && (
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <span className="font-medium">{member.name}</span>
                  </a>
                </td>
                <td className="px-4 py-3 text-sm text-neutral-600">{member.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700">
                    {getRoleLabel(member.role)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-neutral-500">
                  {formatTime(member.lastActive)}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(member.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      member.active ? 'bg-green-600' : 'bg-neutral-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        member.active ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Staff Modal */}
      <AddStaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddStaff}
      />
    </div>
  );
}

