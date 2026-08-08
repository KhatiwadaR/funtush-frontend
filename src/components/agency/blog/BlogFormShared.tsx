
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

import { BlogEditorSection } from "./BlogEditorSection";
import { BlogPublishSettings } from "./BlogPublishSettings";

interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  htmlContent?: string;
  category?: string;
  status: "Published" | "Scheduled" | "Draft";
  publishDate?: string;
  tag?: string;
  photoOption?: "local" | "gallery";
  date: string;
  views: number;
}

interface BlogFormSharedProps {
  postId?: string;
}

interface FormErrors {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  publishDate: string;
  photo: string;

}

export function BlogFormShared({
  postId,
}: BlogFormSharedProps) {
  const router = useRouter();

  /* --------------------------------------------------
     Form State
  -------------------------------------------------- */

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");

  const [publishDate, setPublishDate] = useState(
    "Jul 19, 2026 10:30 AM"
  );

  const [tag, setTag] = useState("");

  const [photoOption, setPhotoOption] = useState<
    "local" | "gallery"
  >("local");

  /* --------------------------------------------------
     Centralized Errors
  -------------------------------------------------- */

  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    publishDate: "",
    photo: "",

  });

  

  useEffect(() => {
  if (!postId) return;

  const loadBlog = async () => {
    try {
      const data = localStorage.getItem("funtush_blog_posts");

      if (!data) {
        toast.error("Blog data could not be found.");
        return;
      }

      const posts: BlogPost[] = JSON.parse(data);

      if (!Array.isArray(posts)) {
        toast.error("Invalid blog data.");
        return;
      }

      const target = posts.find(
        (post) => String(post.id) === String(postId)
      );

      if (!target) {
        toast.error("Blog post could not be found.");
        return;
      }

      setTitle(target.title || "");
      setSubtitle(target.subtitle || "");
      setHtmlContent(target.htmlContent || "");
      setCategory(target.category || "");
      setStatus(target.status || "Draft");

      setPublishDate(
        target.publishDate || "Jul 19, 2026 10:30 AM"
      );

      setTag(target.tag || "");
      setPhotoOption(target.photoOption || "local");
    } catch (error) {
      console.error("Failed to load blog:", error);

      toast.error(
        "Failed to load blog details. Please try again."
      );
    }
  };

  loadBlog();
}, [postId]);

  

  const clearError = (
    field: keyof FormErrors
  ) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /* --------------------------------------------------
     Validation
  -------------------------------------------------- */

  const validateForm = (
    targetStatus: string
  ) => {
    const newErrors: FormErrors = {
      title: "",
      subtitle: "",
      content: "",
      category: "",
      publishDate: "",
      photo: "",
    };

    /* Title */

    if (!title.trim()) {
      newErrors.title =
        "Blog title is required.";
    }

    /* Subtitle */

    if (!subtitle.trim()) {
      newErrors.subtitle =
        "Subtitle is required.";
    }

    /* Content */

    const plainContent = htmlContent
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();

    if (!plainContent) {
      newErrors.content =
        "Blog content is required.";
    }

    /* Category */

    if (
      targetStatus === "Published" &&
      !category.trim()
    ) {
      newErrors.category =
        "Category is required before publishing.";
    }

    /* Scheduled Date */

    if (
      targetStatus === "Scheduled" &&
      !publishDate.trim()
    ) {
      newErrors.publishDate =
        "Publish date is required for scheduled posts.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(
      (error) => error !== ""
    );
  };

  /* --------------------------------------------------
     Save / Publish / Schedule
  -------------------------------------------------- */

  const handleSave = (
    e?: React.FormEvent,
    targetStatus?: string
  ) => {
    if (e) {
      e.preventDefault();
    }

    const finalStatus =
      targetStatus || status;

    if (!validateForm(finalStatus)) {
      toast.error(
        "Please fix the highlighted fields."
      );
      return;
    }

    try {
      const currentRecords =
        localStorage.getItem(
          "funtush_blog_posts"
        );

      let recordsList: BlogPost[] = [];

      /* Read existing records */

      if (currentRecords) {
        try {
          const parsedRecords =
            JSON.parse(currentRecords);

          if (Array.isArray(parsedRecords)) {
            recordsList = parsedRecords;
          } else {
            toast.error(
              "Invalid saved blog data."
            );
            return;
          }
        } catch (error) {
          console.error(
            "Failed to parse saved blogs:",
            error
          );

          toast.error(
            "Unable to read saved blogs. Please try again."
          );

          return;
        }
      }

      const dateValue = new Date()
        .toISOString()
        .split("T")[0];

      /* --------------------------------------------------
         UPDATE EXISTING BLOG
      -------------------------------------------------- */

      if (postId) {
        const blogExists =
          recordsList.some(
            (item) =>
              String(item.id) ===
              String(postId)
          );

        if (!blogExists) {
          toast.error(
            "The blog you are trying to update could not be found."
          );
          return;
        }

        recordsList = recordsList.map(
          (item) =>
            String(item.id) ===
              String(postId)
              ? {
                ...item,

                title: title.trim(),

                subtitle:
                  subtitle.trim(),

                htmlContent,

                category,

                status:
                  finalStatus as
                  | "Draft"
                  | "Scheduled"
                  | "Published",

                publishDate,

                tag,

                photoOption,

                date: dateValue,
              }
              : item
        );

        localStorage.setItem(
          "funtush_blog_posts",
          JSON.stringify(recordsList)
        );

        if (
          finalStatus === "Published"
        ) {
          toast.success(
            "Blog published successfully!"
          );
        } else if (
          finalStatus === "Scheduled"
        ) {
          toast.success(
            "Blog scheduled successfully!"
          );
        } else {
          toast.success(
            "Blog saved as draft successfully!"
          );
        }
      }

      /* --------------------------------------------------
         CREATE NEW BLOG
      -------------------------------------------------- */

      else {
        const newPost: BlogPost = {
          id: `post-${Date.now()}`,

          title: title.trim(),

          subtitle:
            subtitle.trim(),

          htmlContent,

          category,

          status:
            finalStatus as
            | "Draft"
            | "Scheduled"
            | "Published",

          publishDate,

          tag,

          photoOption,

          date: dateValue,

          views: 0,
        };

        recordsList = [
          newPost,
          ...recordsList,
        ];

        localStorage.setItem(
          "funtush_blog_posts",
          JSON.stringify(recordsList)
        );

        if (
          finalStatus === "Published"
        ) {
          toast.success(
            "Blog published successfully!"
          );
        } else if (
          finalStatus === "Scheduled"
        ) {
          toast.success(
            "Blog scheduled successfully!"
          );
        } else {
          toast.success(
            "Blog saved as draft successfully!"
          );
        }
      }

      router.push("/dashboard/blog");
    } catch (error) {
      console.error(
        "Failed to save blog:",
        error
      );

      toast.error(
        "Failed to save the blog. Please try again."
      );
    }
  };

  /* --------------------------------------------------
     Preview
  -------------------------------------------------- */

  const handlePreview = () => {
    const newErrors: FormErrors = {
      title: "",
      subtitle: "",
      content: "",
      category: "",
      publishDate: "",
      photo: "",
    };

    /* Title */

    if (!title.trim()) {
      newErrors.title =
        "Blog title is required.";
    }

    /* Subtitle */

    if (!subtitle.trim()) {
      newErrors.subtitle =
        "Subtitle is required.";
    }

    /* Content */

    const plainContent = htmlContent
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();

    if (!plainContent) {
      newErrors.content =
        "Blog content is required.";
    }

    setErrors(newErrors);

    const hasErrors =
      Object.values(newErrors).some(
        (error) => error !== ""
      );

    if (hasErrors) {
      toast.error(
        "Please fix the highlighted fields before previewing."
      );
      return;
    }

    try {
      localStorage.setItem(
        "funtush_blog_preview",
        JSON.stringify({
          title,
          subtitle,
          htmlContent,
          category,
          status,
          publishDate,
          tag,
          photoOption,
        })
      );

      toast.success(
        "Preview generated successfully!"
      );

      router.push(
        "/dashboard/blog/preview"
      );
    } catch (error) {
      console.error(
        "Preview failed:",
        error
      );

      toast.error(
        "Unable to generate preview. Please try again."
      );
    }
  };

  /* --------------------------------------------------
     Render
  -------------------------------------------------- */

  return (
    <div className="w-full space-y-6">
      {/* Header & Actions */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          {/* Breadcrumbs */}

          <div className="flex items-center gap-1 text-sm">
            <span className="text-neutral-500 dark:text-[#596583]">
              Dashboard
            </span>

            <ChevronRightIcon
              className="text-neutral-400"
              style={{ fontSize: 18 }}
            />

            <span className="text-neutral-500 dark:text-[#596583]">
              All Blogs
            </span>

            <ChevronRightIcon
              className="text-neutral-400"
              style={{ fontSize: 18 }}
            />

            <span className="text-neutral-900 dark:text-[#596583] font-medium">
              {postId
                ? "Edit Blog"
                : "Add Blogs"}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-neutral-900 dark:text-[#596583] tracking-tight mt-2">
            All Blogs
          </h1>

          <p className="text-sm text-neutral-500 dark:text-[#596583]">
            {postId
              ? "Edit and update your blog post"
              : "Create and publish a new blog post"}
          </p>
        </div>

        {/* Actions */}

        <div className="flex items-center gap-3">
          {/* Save Draft */}

          <button
            type="button"
            onClick={() =>
              handleSave(
                undefined,
                "Draft"
              )
            }
            className="px-4 py-2.5 bg-[#111B3A] hover:bg-[#1a264a] text-white text-xs font-semibold border border-[#1E293B] transition-colors shadow-sm rounded-md"
          >
            Save as Draft
          </button>

          {/* Preview */}

          <button
            type="button"
            onClick={handlePreview}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#111B3A] hover:bg-[#1a264a] text-white text-xs font-semibold border border-[#1E293B] transition-colors shadow-sm rounded-md"
          >
            <VisibilityIcon
              style={{ fontSize: 16 }}
            />

            Preview
          </button>

          {/* Publish */}

          <button
            type="button"
            onClick={() =>
              handleSave(
                undefined,
                "Published"
              )
            }
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-colors rounded-md"
          >
            <AddIcon
              style={{ fontSize: 16 }}
            />

            Publish
          </button>
        </div>
      </div>

      {/* Main Content */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
        {/* Editor */}

        <BlogEditorSection
          title={title}
          setTitle={(value) => {
            setTitle(value);
            clearError("title");
          }}
          subtitle={subtitle}
          setSubtitle={(value) => {
            setSubtitle(value);
            clearError("subtitle");
          }}
          htmlContent={htmlContent}
          setHtmlContent={(value) => {
            setHtmlContent(value);
            clearError("content");
          }}
          errors={{
            title: errors.title,
            subtitle: errors.subtitle,
            content: errors.content,
          }}
        />

        {/* Publish Settings */}

        <BlogPublishSettings
          category={category}
          setCategory={(value) => {
            setCategory(value);
            clearError("category");
          }}
          status={status}
          setStatus={(value) => {
            setStatus(value);

            if (value !== "Scheduled") {
              clearError("publishDate");
            }
          }}
          publishDate={publishDate}
          setPublishDate={(value) => {
            setPublishDate(value);
            clearError("publishDate");
          }}
          tag={tag}
          setTag={setTag}
          photoOption={photoOption}
          setPhotoOption={setPhotoOption}
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
}
