import Link from 'next/link';

export default function BlogCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">Blog Categories</h1>
            <p className="text-sm text-neutral-500">Manage your blog categories in one place.</p>
          </div>
          <Link href="/dashboard/blog/new" className="inline-flex items-center gap-2 rounded-2xl bg-primary-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-800">
            Create New Blog
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['Adventure', 'Trekking', 'Travel Tips', 'Guides', 'Local Culture'].map((category) => (
          <div key={category} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-neutral-900">{category}</div>
            <p className="mt-2 text-sm text-neutral-500">Posts in this category are filtered under {category}.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

