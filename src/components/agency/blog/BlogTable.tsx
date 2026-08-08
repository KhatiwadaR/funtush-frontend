"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  time: string;
  status: "Draft" | "Scheduled" | "Published";
  views: string;
  likes: number;
  thumbnail: string;
}

export default function BlogTable({
  posts,
}: {
  posts: BlogPost[];
}) {
  const { isDark } = useTheme();
  const router = useRouter();

  const cardClass = isDark
    ? "bg-[#111B3A] text-white border-[#1E293B]"
    : "bg-white text-neutral-900 border-neutral-200";

  const mutedText = isDark
    ? "text-[#596583]"
    : "text-neutral-500";

  /* ---------------- VIEW BLOG ---------------- */

  const handleView = (blog: BlogPost) => {
    if (!blog?.id) {
      toast.error("Unable to view this blog.");
      return;
    }

    try {
      router.push(`/dashboard/blog/${blog.id}`);
    } catch (error) {
      console.error("View blog error:", error);
      toast.error("Unable to open the blog.");
    }
  };


  const handleEdit = (blog: BlogPost) => {
    if (!blog?.id) {
      toast.error("Unable to edit this blog.");
      return;
    }

    try {
      router.push(`/dashboard/blog/${blog.id}/edit`);
    } catch (error) {
      console.error("Edit blog error:", error);
      toast.error("Unable to open the blog editor.");
    }
  };


  const handleDelete = (blog: BlogPost) => {
    if (!blog?.id) {
      toast.error("Unable to delete this blog.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const storedPosts =
        localStorage.getItem("funtush_blog_posts");

      if (!storedPosts) {
        toast.error("Blog could not be found.");
        return;
      }

      const existingPosts: BlogPost[] =
        JSON.parse(storedPosts);

      const blogExists = existingPosts.some(
        (item) => String(item.id) === String(blog.id)
      );

      if (!blogExists) {
        toast.error("Blog could not be found.");
        return;
      }

      const updatedPosts = existingPosts.filter(
        (item) => String(item.id) !== String(blog.id)
      );

      localStorage.setItem(
        "funtush_blog_posts",
        JSON.stringify(updatedPosts)
      );

      toast.success("Blog deleted successfully!");

      router.refresh();
    } catch (error) {
      console.error("Delete blog error:", error);

      toast.error(
        "Failed to delete the blog. Please try again."
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Desktop Header */}
      <Card
        className={`hidden lg:grid ${cardClass} rounded-2xl overflow-hidden border p-4 grid-cols-[3.5fr_1fr_1.2fr_1.2fr_1fr_0.8fr_0.8fr_1fr] items-center text-xs font-semibold shadow-sm`}
      >
        <span>BLOG</span>
        <span>CATEGORY</span>
        <span>AUTHOR</span>
        <span>PUBLISHED DATE</span>
        <span>STATUS</span>
        <span>VIEWS</span>
        <span>COMMENTS</span>
        <span>ACTIONS</span>
      </Card>

      {/* Blog Posts List */}
      {posts?.map((blog) => (
        <Card
          key={blog.id}
          className={`${cardClass} rounded-2xl overflow-hidden border p-4 flex flex-col lg:grid lg:grid-cols-[3.5fr_1fr_1.2fr_1.2fr_1fr_0.8fr_0.8fr_1fr] lg:items-center gap-4 lg:gap-0 text-xs shadow-sm`}
        >
          {/* Blog Thumbnail, Title & Description */}
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="relative shrink-0 w-[110px] h-[75px]">
              <Image
                src={`/${blog.thumbnail}`}
                alt={blog.title}
                fill
                className="object-cover rounded-xl"
              />
            </div>

            <div className="flex flex-col justify-center min-w-0 space-y-1">
              <p className="font-semibold truncate text-xs">
                {blog.title}
              </p>

              <p
                className={`text-[11px] truncate ${mutedText}`}
              >
                {blog.description}
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="flex lg:justify-center items-center">
            <span className="bg-[#393996] text-white px-3 py-1 rounded-lg text-[11px] font-bold">
              {blog.category}
            </span>
          </div>

          {/* Author */}
          <div className="flex items-center gap-2 lg:justify-center">
            <Image
              src={`/${blog.author.avatar}`}
              alt={blog.author.name}
              width={28}
              height={28}
              className="rounded-full object-cover shrink-0"
            />

            <span className="truncate text-xs">
              {blog.author.name}
            </span>
          </div>

          {/* Date & Time */}
          <div className="flex lg:flex-col justify-between lg:justify-center lg:items-center text-xs">
            <p className="font-medium">{blog.date}</p>

            <p
              className={`text-[11px] ${mutedText}`}
            >
              {blog.time}
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center lg:justify-center">
            <span
              className={`px-3 py-1 rounded-lg text-[11px] font-bold text-center ${
                blog.status === "Published"
                  ? "bg-[#3CD875]/20 text-[#3CD875]"
                  : blog.status === "Scheduled"
                  ? "bg-blue-500/20 text-blue-500"
                  : "bg-[#FF8D28]/20 text-[#FF8D28]"
              }`}
            >
              {blog.status}
            </span>
          </div>

          {/* Views */}
          <div className="flex items-center justify-between lg:justify-center text-xs">
            <span className="lg:hidden text-neutral-400">
              Views:
            </span>

            <span className="font-semibold">
              {blog.views}
            </span>
          </div>

          {/* Comments */}
          <div className="flex items-center justify-between lg:justify-center text-xs">
            <span className="lg:hidden text-neutral-400">
              Comments:
            </span>

            <span className="font-semibold">
              {blog.likes}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end lg:justify-center gap-1.5 border-t lg:border-t-0 pt-3 lg:pt-0 border-neutral-700/20">
            {/* View */}
            <button
              type="button"
              aria-label={`View ${blog.title}`}
              onClick={() => handleView(blog)}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark
                  ? "hover:bg-white/5 text-gray-300"
                  : "hover:bg-neutral-100 text-neutral-600"
              }`}
            >
              <VisibilityIcon
                style={{ fontSize: 18 }}
              />
            </button>

            {/* Edit */}
            <button
              type="button"
              aria-label={`Edit ${blog.title}`}
              onClick={() => handleEdit(blog)}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark
                  ? "hover:bg-white/5 text-gray-300"
                  : "hover:bg-neutral-100 text-neutral-600"
              }`}
            >
              <EditIcon
                style={{ fontSize: 18 }}
              />
            </button>

            {/* Delete */}
            <button
              type="button"
              aria-label={`Delete ${blog.title}`}
              onClick={() => handleDelete(blog)}
              className="p-1.5 rounded-lg transition-colors text-red-500 hover:bg-red-500/10"
            >
              <DeleteIcon
                style={{ fontSize: 18 }}
              />
            </button>
          </div>
        </Card>
      ))}

      {/* No Blogs */}
      {(!posts || posts.length === 0) && (
        <Card
          className={`${cardClass} rounded-2xl border p-8 text-center shadow-sm`}
        >
          <p className="text-sm font-medium">
            No blog posts found.
          </p>

          <p
            className={`text-xs mt-1 ${mutedText}`}
          >
            Try creating a new blog post.
          </p>
        </Card>
      )}
    </div>
  );
}