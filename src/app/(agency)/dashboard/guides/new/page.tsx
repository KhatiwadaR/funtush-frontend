'use client';
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useGuides } from "@/hooks/useGuides";
import GuideForm from "@/components/agency/guides/GuideForm";
import Link from "next/link";

export default function NewGuidePage() {
  const { addGuide } = useGuides();
  const router = useRouter();

  const handleSave = (data: Parameters<typeof addGuide>[0]) => {
    addGuide(data);
    router.push("/dashboard/guides");
  };

  return (
    <div className="mx-auto w-full max-w-6xl py-6">
      <div className="mb-6">
        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <Link href="/dashboard">Dashboard</Link>
          <ChevronRight size={15} />
          <Link href="/dashboard/guides">Guides</Link>
          <ChevronRight size={15} />
          <strong className="text-primary-900">New guide</strong>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900">Add guide</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Create a new guide profile with a clean dashboard form layout.
        </p>
      </div>
      <GuideForm onSave={handleSave} isNew />
    </div>
  );
}
