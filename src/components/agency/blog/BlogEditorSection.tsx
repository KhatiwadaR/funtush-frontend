
"use client";

import { QuillEditor } from "./QuillEditor";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme";
import SparklesIcon from "@mui/icons-material/AutoAwesome";

interface BlogEditorSectionProps {
  title: string;
  setTitle: (val: string) => void;

  subtitle: string;
  setSubtitle: (val: string) => void;

  htmlContent: string;
  setHtmlContent: (val: string) => void;

  errors: {
    title: string;
    subtitle: string;
    content: string;
  };
}

export function BlogEditorSection({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  htmlContent,
  setHtmlContent,
  errors,
}: BlogEditorSectionProps) {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? "bg-[#111B3A] text-white border-[#1E293B]"
    : "bg-white text-neutral-900 border-neutral-200";

  const inputClass = isDark
    ? "border-[#615B5B] bg-[#0d1b32] text-white placeholder-[#615B5B]"
    : "border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500";

  return (
    <Card
      className={`lg:col-span-2 ${cardClass} rounded-2xl border p-6 shadow-sm`}
    >
      {/* Blog Title */}
      <div className="space-y-1.5">
        <label className="font-bold">
          Blog Title{" "}
          <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title..."
          className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${
            errors.title
              ? "border-red-500 focus:ring-red-500"
              : inputClass
          }`}
        />

        {errors.title && (
          <p className="text-xs text-red-500">
            {errors.title}
          </p>
        )}
      </div>

      {/* Sub Title */}
      <div className="space-y-1.5 mt-5">
        <label className="font-bold">
          Sub title{" "}
          <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Enter sub title..."
          className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${
            errors.subtitle
              ? "border-red-500 focus:ring-red-500"
              : inputClass
          }`}
        />

        {errors.subtitle && (
          <p className="text-xs text-red-500">
            {errors.subtitle}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-1.5 mt-5">
        <div className="flex justify-between items-center">
          <label className="font-bold">
            Content{" "}
            <span className="text-red-500">*</span>
          </label>

          <button
            type="button"
            className="flex items-center gap-1.5 text-[11px] text-blue-400 hover:text-blue-300 font-medium"
          >
            <SparklesIcon
              style={{ fontSize: 14 }}
            />
            Copy-writing tips
          </button>
        </div>

        <div
          className={
            errors.content
              ? "rounded-xl border border-red-500"
              : ""
          }
        >
          <QuillEditor
            content={htmlContent}
            onChange={setHtmlContent}
          />
        </div>

        {errors.content && (
          <p className="text-xs text-red-500">
            {errors.content}
          </p>
        )}
      </div>
    </Card>
  );
}

