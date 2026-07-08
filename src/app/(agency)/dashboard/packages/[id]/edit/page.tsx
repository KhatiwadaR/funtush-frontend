"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PackageBuilderForm from "@/components/PackageBuilderForm";

type PackageForm = {
  id: string | number;
  [key: string]: string | number | boolean | object | null;
};

export default function EditPackagePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [initialData] = useState<PackageForm | null>(() => {
    if (typeof window === "undefined" || !id) return null;

    const stored = localStorage.getItem("packages");

    if (!stored) return null;

    const allPackages = JSON.parse(stored) as Array<{
      id: string | number;
      [key: string]: unknown;
    }>;

    const foundPackage = allPackages.find((p) => String(p.id) === String(id));

    return foundPackage ? (foundPackage as PackageForm) : null;
  });

  useEffect(() => {
    if (!initialData) {
      router.push("/dashboard/packages");
    }
  }, [initialData, router]);

  if (!initialData) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-sm text-gray-500 animate-pulse">
          Loading package specifications...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <PackageBuilderForm initialData={initialData} packageId={id} />
    </div>
  );
}
