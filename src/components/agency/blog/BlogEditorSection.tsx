"use client";
import { TipTapEditor } from "./TipTapEditor";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme";
import SparklesIcon from "@mui/icons-material/AutoAwesome";

interface BlogEditorSectionProps {
  title: string;
  setTitle: (val: string) => void;
  subtitle: string;
  setSubtitle: (val: string) => void;
  youtubeLink: string;
  setYoutubeLink: (val: string) => void;
  htmlContent: string;
  setHtmlContent: (val: string) => void;
  handleSave: (e: React.FormEvent) => void;
}

export function BlogEditorSection({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  htmlContent,
  setHtmlContent,
  handleSave,
}: BlogEditorSectionProps) {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? "bg-[#111B3A] text-white border-[#1E293B]"
    : "bg-white text-neutral-900 border-neutral-200";

  const inputClass = isDark
    ? "border-[#615B5B] bg-[#0d1b32] text-white placeholder-[#615B5B]"
    : "border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500";

  // const secondaryText = isDark ? "text-[#596583]" : "text-neutral-500";

  return (
    <Card className={`lg:col-span-2 ${cardClass} rounded-2xl border p-6 shadow-sm`}>
      <form onSubmit={handleSave} className="space-y-5 text-xs">
        {/* Blog Title */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="font-bold">Blog title</label>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            placeholder="Enter blog this here..."
            className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${inputClass}`}
          />
        </div>

        {/* Sub Title */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="font-bold">Sub title</label>
          </div>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            maxLength={100}
            placeholder="Enter sub title.."
            className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${inputClass}`}
          />
        </div>

        {/* Content & TipTap Editor */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="font-bold">Content</label>
            <button type="button" className="flex items-center gap-1.5 text-[11px] text-blue-400 hover:text-blue-300 font-medium">
              <SparklesIcon style={{ fontSize: 14 }} />
              Copy-writing tips
            </button>
          </div>
          
          <TipTapEditor content={htmlContent} onChange={setHtmlContent} />
          
          
        </div>

        
      </form>
    </Card>
  );
}