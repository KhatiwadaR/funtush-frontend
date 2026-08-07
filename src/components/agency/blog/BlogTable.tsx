import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default function BlogTable({ posts }: { posts: BlogPost[] }) {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? "bg-[#111B3A] text-white border-[#1E293B]"
    : "bg-white text-neutral-900 border-neutral-200";

  const mutedText = isDark ? "text-[#596583]" : "text-neutral-500";

  return (
    <div className="w-full space-y-3">
      {/* Desktop Header - Hidden on Mobile/Tablet */}
      <Card
        className={`hidden lg:grid ${cardClass} rounded-2xl overflow-hidden border p-4 grid-cols-[3.5fr_1fr_1.2fr_1.2fr_1fr_0.8fr_0.8fr_1fr] items-center text-xs font-semibold shadow-sm`}
      >
        <div className="pl-2">BLOG</div>
        <div className="text-center">CATEGORY</div>
        <div className="text-center">AUTHOR</div>
        <div className="text-center">PUBLISHED DATE</div>
        <div className="text-center">STATUS</div>
        <div className="text-center">VIEWS</div>
        <div className="text-center">COMMENTS</div>
        <div className="text-center">ACTIONS</div>
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
              <p className="font-semibold truncate text-xs">{blog.title}</p>
              <p className={`text-[11px] truncate ${mutedText}`}>
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
            <span className="truncate text-xs">{blog.author.name}</span>
          </div>

          {/* Date & Time */}
          <div className="flex lg:flex-col justify-between lg:justify-center lg:items-center text-xs">
            <p className="font-medium">{blog.date}</p>
            <p className={`text-[11px] ${mutedText}`}>{blog.time}</p>
          </div>

          {/* Status */}
          <div className="flex items-center lg:justify-center">
            <span
              className={`px-3 py-1 rounded-lg text-[11px] font-bold text-center ${
                blog.status === "Published"
                  ? "bg-[#3CD875]/20 text-[#3CD875]"
                  : "bg-[#FF8D28]/20 text-[#FF8D28]"
              }`}
            >
              {blog.status}
            </span>
          </div>

          {/* Views */}
          <div className="flex items-center justify-between lg:justify-center text-xs">
            <span className="lg:hidden text-neutral-400">Views:</span>
            <span className="font-semibold">{blog.views}</span>
          </div>

          {/* Comments */}
          <div className="flex items-center justify-between lg:justify-center text-xs">
            <span className="lg:hidden text-neutral-400">Comments:</span>
            <span className="font-semibold">{blog.likes}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end lg:justify-center gap-1.5 border-t lg:border-t-0 pt-3 lg:pt-0 border-neutral-700/20">
            <button
              aria-label="View"
              className={`p-1.5 rounded-lg transition-colors ${
                isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-neutral-100 text-neutral-600"
              }`}
            >
              <VisibilityIcon style={{ fontSize: 18 }} />
            </button>
            <button
              aria-label="Edit"
              className={`p-1.5 rounded-lg transition-colors ${
                isDark ? "hover:bg-white/5 text-gray-300" : "hover:bg-neutral-100 text-neutral-600"
              }`}
            >
              <EditIcon style={{ fontSize: 18 }} />
            </button>
            <button
              aria-label="Delete"
              className="p-1.5 rounded-lg transition-colors text-red-500 hover:bg-red-500/10"
            >
              <DeleteIcon style={{ fontSize: 18 }} />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}