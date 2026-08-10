import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import guidesData from "../../../../../../data/guides.json";
import { Star } from "lucide-react";

const statusMap: Record<string, { label: string; color: string }> = {
  available: { label: "Available", color: "bg-success-100 text-success-800" },
  on_trek: { label: "On trek", color: "bg-warning-100 text-warning-800" },
  unavailable: { label: "Unavailable", color: "bg-danger-100 text-danger-800" },
};

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const guide = guidesData.find((item) => item.id === id);

  if (!guide) notFound();

  const statusInfo = statusMap[guide.status] ?? statusMap.unavailable;
  const initials = guide.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="p-4">
       <Link href="/dashboard/guides" className="text-blue-600 hover:underline mt-4 inline-block">
        ← Back to Guides
      </Link>

      <Card className="max-w-4xl space-y-5 rounded-2xl border-neutral-200 p-5 shadow-sm sm:p-6">
        <CardHeader className="mb-0 border-b border-neutral-200 pb-5">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-primary-100 text-xl font-bold text-primary-900 shadow-sm">
              {guide.photo ? (
                <Image
                  src={guide.photo}
                  alt={guide.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            <div className="min-w-0">
              <CardTitle className="truncate text-2xl leading-tight">
                {guide.name}
              </CardTitle>
              <span
                className={`mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${statusInfo.color}`}
              >
                {statusInfo.label}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-end">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-neutral-700">
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {guide.languages.map((language) => (
                <span
                  key={language}
                  className="rounded-full border border-primary-100 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-800"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 sm:text-center mt-2">
            <div className="flex items-center gap-2 sm:justify-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning-100 text-warning-700">
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
              </span>
              <span className="text-xl font-bold text-neutral-900">
                {guide.rating ?? "—"}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-neutral-500">
              Guide rating
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
