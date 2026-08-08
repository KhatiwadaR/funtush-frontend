
"use client";

import { useState } from "react";
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

  errors: {
    category: string;
    publishDate: string;
    photo: string;
  };

  setErrors: React.Dispatch<
    React.SetStateAction<{
      title: string;
      subtitle: string;
      content: string;
      category: string;
      publishDate: string;
      photo: string;
    }>
  >;
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
  errors,
  setErrors,
}: BlogPublishSettingsProps) {
  const { isDark } = useTheme();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const cardClass = isDark
    ? "bg-[#111B3A] text-white border-[#1E293B]"
    : "bg-white text-neutral-900 border-neutral-200";

  const inputClass = isDark
    ? "border-[#615B5B] bg-[#0d1b32] text-white placeholder-[#615B5B]"
    : "border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500";

  const selectClass = isDark
    ? "border-[#615B5B] bg-[#0d1b32] text-slate-300"
    : "border-neutral-300 bg-white text-neutral-600";

  const secondaryText = isDark
    ? "text-[#596583]"
    : "text-neutral-500";

  const handleCategoryChange = (value: string) => {
    setCategory(value);

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        category: "",
      }));
    }
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);

    if (value !== "Scheduled") {
      setErrors((prev) => ({
        ...prev,
        publishDate: "",
      }));
    } else if (!publishDate.trim()) {
      setErrors((prev) => ({
        ...prev,
        publishDate:
          "Publish date and time are required for scheduled posts.",
      }));
    }
  };

  const handlePublishDateChange = (value: string) => {
    setPublishDate(value);

    if (value.trim()) {
      setErrors((prev) => ({
        ...prev,
        publishDate: "",
      }));
    }
  };

  const handleTagChange = (value: string) => {
    setTag(value);
  };

  const validateFile = (file: File) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];

    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, JPEG, PNG, and WEBP images are allowed.";
    }

    if (file.size > maxSize) {
      return "Image size must not exceed 2MB.";
    }

    return "";
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      setSelectedFile(null);

      setErrors((prev) => ({
        ...prev,
        photo: "",
      }));

      return;
    }

    const fileError = validateFile(file);

    if (fileError) {
      setSelectedFile(null);

      setErrors((prev) => ({
        ...prev,
        photo: fileError,
      }));

      return;
    }

    setSelectedFile(file);

    setErrors((prev) => ({
      ...prev,
      photo: "",
    }));
  };

  return (
    <Card
      className={`${cardClass} rounded-2xl border p-6 shadow-sm space-y-5 h-fit`}
    >
      <h2 className="text-sm font-bold">
        Publish Settings
      </h2>

      {/* Category */}
      <div className="space-y-1.5">
        <label className="block font-bold text-xs">
          Select Category{" "}
          <span className="text-red-500">*</span>
        </label>

        <select
          value={category}
          onChange={(e) =>
            handleCategoryChange(e.target.value)
          }
          className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${
            errors.category
              ? "border-red-500 focus:ring-red-500"
              : selectClass
          }`}
        >
          <option value="" disabled>
            Select Category
          </option>

          <option value="tech">
            Technology
          </option>

          <option value="marketing">
            Marketing
          </option>

          <option value="lifestyle">
            Lifestyle
          </option>
        </select>

        {errors.category && (
          <p className="text-xs text-red-500">
            {errors.category}
          </p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-1.5">
        <label className="block font-bold text-xs">
          Status
        </label>

        <select
          value={status}
          onChange={(e) =>
            handleStatusChange(e.target.value)
          }
          className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${selectClass}`}
        >
          <option value="Draft">
            Draft
          </option>

          <option value="Published">
            Published
          </option>

          <option value="Scheduled">
            Scheduled
          </option>
        </select>
      </div>

      {/* Publish Date */}
      {status === "Scheduled" && (
        <div className="space-y-1.5 animate-fadeIn">
          <label className="block font-bold text-xs">
            Publish Date{" "}
            <span className="text-red-500">*</span>
          </label>

          <div className="relative flex items-center">
            <input
              type="text"
              value={publishDate}
              onChange={(e) =>
                handlePublishDateChange(
                  e.target.value
                )
              }
              placeholder="Enter publish date and time"
              className={`w-full rounded-xl border px-3.5 py-3 pr-10 text-xs focus:outline-none focus:ring-2 shadow-sm ${
                errors.publishDate
                  ? "border-red-500 focus:ring-red-500"
                  : inputClass
              }`}
            />

            <CalendarTodayIcon
              className="absolute right-3.5 w-4 h-4 text-neutral-400 pointer-events-none"
            />
          </div>

          {errors.publishDate ? (
            <p className="text-xs text-red-500">
              {errors.publishDate}
            </p>
          ) : (
            <p
              className={`text-[11px] ${secondaryText} mt-1`}
            >
              Set the date and time to publish the blog.
            </p>
          )}
        </div>
      )}

      {/* Tag */}
      <div className="space-y-1.5">
        <label className="block font-bold text-xs">
          Tag
        </label>

        <select
          value={tag}
          onChange={(e) =>
            handleTagChange(e.target.value)
          }
          className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${selectClass}`}
        >
          <option value="">
            Select a tag
          </option>

          <option value="marketing">
            Marketing
          </option>

          <option value="seo">
            SEO
          </option>

          <option value="tips">
            Tips
          </option>
        </select>

        <p
          className={`text-[11px] ${secondaryText} mt-1`}
        >
          Example: Marketing, SEO, tips
        </p>
      </div>

      {/* Photos */}
      <div className="space-y-2 pt-2">
        <label className="block font-bold text-xs">
          Photos
        </label>

        {/* Photo Source */}
        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="photoSource"
              checked={photoOption === "local"}
              onChange={() =>
                setPhotoOption("local")
              }
              className="accent-blue-600"
            />

            Upload from Local Drive
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="photoSource"
              checked={photoOption === "gallery"}
              onChange={() =>
                setPhotoOption("gallery")
              }
              className="accent-blue-600"
            />

            Add from Gallery
          </label>
        </div>

        {/* Upload Box */}
        <div
          className={`border border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3 ${
            errors.photo
              ? "border-red-500"
              : isDark
              ? "border-[#1E293B] bg-[#0d1b32]/50"
              : "border-neutral-300 bg-neutral-50"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center">
            <UploadFileIcon className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium">
              Drag & drop Image here
            </p>

            <p
              className={`text-[11px] ${secondaryText}`}
            >
              Or
            </p>
          </div>

          <label className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-md shadow-blue-600/20 cursor-pointer">
            Upload Image

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {selectedFile && !errors.photo && (
            <p className="text-xs text-green-500 break-all">
              {selectedFile.name}
            </p>
          )}

          {errors.photo && (
            <p className="text-xs text-red-500">
              {errors.photo}
            </p>
          )}
        </div>

        <p
          className={`text-[10px] ${secondaryText} text-center mt-1`}
        >
          Recommended size: 1200*628px (Max, 2MB)
        </p>
      </div>
    </Card>
  );
}

