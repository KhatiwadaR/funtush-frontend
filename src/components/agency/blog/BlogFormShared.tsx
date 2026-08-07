"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { BlogEditorSection } from "./BlogEditorSection";
import { BlogPublishSettings } from "./BlogPublishSettings";

interface BlogPost {
  id: string;
  title: string;
  status: "Published" | "Scheduled" | "Draft";
  date: string;
  views: number;
}

interface BlogFormSharedProps {
  postId?: string;
}

export function BlogFormShared({ postId }: BlogFormSharedProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");
  const [publishDate, setPublishDate] = useState("Jul 19, 2026 10:30 AM");
  const [tag, setTag] = useState("");
  const [photoOption, setPhotoOption] = useState<"local" | "gallery">("local");

  useEffect(() => {
    if (!postId) return;

    const data = localStorage.getItem("funtush_blog_posts");
    if (data) {
      const posts: BlogPost[] = JSON.parse(data);
      const target = posts.find((p) => p.id === postId);
      if (target) {
        setTimeout(() => {
          setTitle(target.title);
        }, 0);
      }
    }
  }, [postId]);

  const handleSave = (e?: React.FormEvent, targetStatus?: string) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;

    const currentRecords = localStorage.getItem("funtush_blog_posts");
    let recordsList: BlogPost[] = currentRecords ? JSON.parse(currentRecords) : [];

    const finalStatus = targetStatus || status;
    const dateValue = new Date().toISOString().split("T")[0];

    if (postId) {
      recordsList = recordsList.map((item) =>
        item.id === postId ? { ...item, title, status: finalStatus as "Draft" | "Scheduled" | "Published", date: dateValue } : item
      );
    } else {
      const newPost: BlogPost = {
        id: `post-${Math.floor(100 + Math.random() * 900)}`,
        title,
        status: finalStatus as "Draft" | "Scheduled" | "Published",
        date: dateValue,
        views: 0
      };
      recordsList = [newPost, ...recordsList];
    }

    localStorage.setItem("funtush_blog_posts", JSON.stringify(recordsList));
    alert(postId ? "Post adjustments committed successfully!" : "New campaign article initialized successfully!");
    router.push("/dashboard/blog");
  };

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header & Actions Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          {/* Breadcrumbs */}
          <div className="flex items-center text-xs gap-1">
            <span className="text-neutral-500 dark:text-[#596583]">Dashboard</span>
            <ChevronRightIcon className="w-4 h-4 text-neutral-400 dark:text-[#596583]" />
            <span className="text-neutral-500 dark:text-[#596583]">All Blogs</span>
            <ChevronRightIcon className="w-4 h-4 text-neutral-400 dark:text-[#596583]" />
            <span className="text-neutral-900 dark:text-white font-medium">Add Blogs</span>
          </div>

          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
            All Blogs
          </h1>

          <p className="text-sm text-neutral-500 dark:text-[#596583]">
            Create and Published a new blogs post
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => handleSave(undefined, "Draft")}
            className="px-4 py-2.5 bg-[#111B3A] hover:bg-[#1a264a] text-white text-xs font-semibold border border-[#1E293B] transition-colors shadow-sm"
          >
            Save as Draft
          </button>
          <button 
            type="button" 
            className="flex items-center gap-2 px-4 py-2.5 bg-[#111B3A] hover:bg-[#1a264a] text-white text-xs font-semibold border border-[#1E293B] transition-colors shadow-sm"
          >
            <VisibilityIcon style={{ fontSize: 16 }} />
            Preview
          </button>
          <button 
            type="button" 
            onClick={(e) => handleSave(e, "Published")}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-colors"
          >
            <AddIcon style={{ fontSize: 16 }} />
            Publish
          </button>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
        <BlogEditorSection
          title={title}
          setTitle={setTitle}
          subtitle={subtitle}
          setSubtitle={setSubtitle}
          youtubeLink={youtubeLink}
          setYoutubeLink={setYoutubeLink}
          htmlContent={htmlContent}
          setHtmlContent={setHtmlContent}
          handleSave={handleSave}
        />

        <BlogPublishSettings
          category={category}
          setCategory={setCategory}
          status={status}
          setStatus={setStatus}
          publishDate={publishDate}
          setPublishDate={setPublishDate}
          tag={tag}
          setTag={setTag}
          photoOption={photoOption}
          setPhotoOption={setPhotoOption}
        />
      </div>
    </div>
  );
}