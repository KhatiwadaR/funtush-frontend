"use client";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface BlogPublishSettingsProps {
  category: string;
  setCategory: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  publishDate: string;
  setPublishDate: (val: string) => void;
  tag: string;
  setTag: (val: string) => void;
  photoOption: "local" | "gallery";
  setPhotoOption: (val: "local" | "gallery") => void;
}

export function BlogPublishSettings({
  category,
  setCategory,
  status,
  setStatus,
  publishDate,
  setPublishDate,
  tag,
  setTag,
  photoOption,
  setPhotoOption,
}: BlogPublishSettingsProps) {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? "bg-[#111B3A] text-white border-[#1E293B]"
    : "bg-white text-neutral-900 border-neutral-200";

  const inputClass = isDark
    ? "border-[#615B5B] bg-[#0d1b32] text-white placeholder-[#615B5B]"
    : "border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500";

  const selectClass = isDark
    ? "border-[#615B5B] bg-[#0d1b32] text-slate-300"
    : "border-neutral-300 bg-white text-neutral-600";

  const secondaryText = isDark ? "text-[#596583]" : "text-neutral-500";

  return (
    <Card className={`${cardClass} rounded-2xl border p-6 shadow-sm space-y-5 h-fit`}>
      <h3 className="font-bold text-sm border-b border-neutral-700/20 pb-3">Publish Settings</h3>

      {/* Select Category */}
      <div className="space-y-1.5">
        <label className="block font-bold text-xs">Select Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${selectClass}`}
        >
          <option value="" disabled>Select Category</option>
          <option value="tech">Technology</option>
          <option value="marketing">Marketing</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
      </div>

      {/* Status */}
      <div className="space-y-1.5">
        <label className="block font-bold text-xs">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${selectClass}`}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Scheduled">Scheduled</option>
        </select>
      </div>

      {/* Publish Date (Conditional: Only displays when Status is Scheduled) */}
      {status === "Scheduled" && (
        <div className="space-y-1.5 animate-fadeIn">
          <label className="block font-bold text-xs">Publish Date</label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={publishDate}
              onChange={(e) => setPublishDate(e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-3 pr-10 text-xs focus:outline-none focus:ring-2 shadow-sm ${inputClass}`}
            />
            <CalendarTodayIcon className="absolute right-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>
          <p className={`text-[11px] ${secondaryText} mt-1`}>Set the date and time to publish the blog.</p>
        </div>
      )}

      {/* Tag */}
      <div className="space-y-1.5">
        <label className="block font-bold text-xs">Tag</label>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${selectClass}`}
        >
          <option value="" disabled>Enter tags and press comma....</option>
          <option value="marketing">Marketing</option>
          <option value="seo">SEO</option>
          <option value="tips">Tips</option>
        </select>
        <p className={`text-[11px] ${secondaryText} mt-1`}>Example: Marketing, SEO, tips</p>
      </div>

      {/* Photos Upload Section */}
      <div className="space-y-2 pt-2">
        <label className="block font-bold text-xs">Photos</label>
        
        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input 
              type="radio" 
              name="photoSource" 
              checked={photoOption === "local"} 
              onChange={() => setPhotoOption("local")}
              className="accent-blue-600"
            />
            Upload from Local Drive
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input 
              type="radio" 
              name="photoSource" 
              checked={photoOption === "gallery"} 
              onChange={() => setPhotoOption("gallery")}
              className="accent-blue-600"
            />
            Add from Gallery
          </label>
        </div>

        {/* Drag & Drop Box */}
        <div className={`border border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3 ${isDark ? "border-[#1E293B] bg-[#0d1b32]/50" : "border-neutral-300 bg-neutral-50"}`}>
          <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center">
            <UploadFileIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium">Drag & drop Image here</p>
            <p className={`text-[11px] ${secondaryText}`}>Or</p>
          </div>
          <button 
            type="button"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-md shadow-blue-600/20"
          >
            Upload Image
          </button>
        </div>

        <p className={`text-[10px] ${secondaryText} text-center mt-1`}>Recommended size: 1200*628px (Max, 2MB)</p>
      </div>
    </Card>
  );
}