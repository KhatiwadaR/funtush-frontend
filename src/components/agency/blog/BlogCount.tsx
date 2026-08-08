import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/context/theme";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function BlogCount() {
  const { isDark } = useTheme();

  const cardClass = isDark
    ? "bg-[#111B3A] text-white border-[#1E293B]"
    : "bg-white text-neutral-900 border-neutral-200";

  const secondaryText = isDark ? "text-[#596583]" : "text-neutral-500";

  return (
    <div className="w-full space-y-6">
      {/* Header & Actions Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          {/* Breadcrumbs */}
          <div className="flex items-center text-xs gap-1">
            <span className={isDark ? "text-[#596583]" : "text-neutral-500"}>
              Dashboard
            </span>
            <ChevronRightIcon className={`w-4 h-4 ${isDark ? "text-[#596583]" : "text-neutral-400"}`} />
            <span className={isDark ? "text-white font-medium" : "text-neutral-900 font-medium"}>
              All Blogs
            </span>
          </div>

          <h1
            className={
              isDark
                ? "text-2xl font-bold text-white tracking-tight"
                : "text-2xl font-bold text-neutral-900 tracking-tight"
            }
          >
            All Blogs
          </h1>

          <p className={`text-sm ${secondaryText}`}>
            Manage and organize all your blog posts
          </p>
        </div>

        <Link
          href="/dashboard/blog/new"
          className={`flex items-center gap-2 rounded-xl text-xs font-semibold px-5 py-3 transition-all shadow-sm ${
            isDark
              ? "bg-[#111B3A] border border-[#1E293B] text-white hover:bg-[#1a264a]"
              : "bg-neutral-900 text-white hover:bg-neutral-800"
          }`}
        >
          <AddIcon className="w-4 h-4" />
          Add new Blog
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        <Card className={`${cardClass} rounded-2xl border p-4 flex flex-col justify-between shadow-sm`}>
          <div className="flex items-center gap-2">
            <div className="w-[35px] h-[35px] bg-[#9044D9] rounded-full flex items-center justify-center text-white shrink-0">
              <DescriptionIcon style={{ fontSize: 18 }} />
            </div>

            <div className="pl-2">
              <p className={`text-xs ${secondaryText} pl-6`}>Total Blogs</p>
              <p className="font-bold text-2xl pl-2">248</p>
            </div>

            <Image
              src="/vector.png"
              alt="vector"
              width={70.93}
              height={29.76}
              className="object-contain ml-auto"
            />
          </div>

          <Growth />
        </Card>

        <StatCard
          title="Published"
          value="248"
          color="#1CAA50"
          image="/green-squiggle.png"
          cardClass={cardClass}
          secondaryText={secondaryText}
        />

        <StatCard
          title="Draft"
          value="248"
          color="#FF8D28"
          image="/orange-squiggle.png"
          cardClass={cardClass}
          secondaryText={secondaryText}
        />

        <StatCard
          title="Total Views"
          value="125.5K"
          color="#0088FF"
          image="/blue-squiggle.png"
          cardClass={cardClass}
          secondaryText={secondaryText}
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
  image,
  cardClass,
  secondaryText,
}: {
  title: string;
  value: string;
  color: string;
  image: string;
  cardClass: string;
  secondaryText: string;
}) {
  return (
    <Card className={`${cardClass} rounded-2xl border flex flex-col justify-between shadow-sm`}>
      <div className="flex items-center gap-2">
        <div
          style={{ backgroundColor: color }}
          className="w-[35px] h-[35px] rounded-full flex items-center justify-center text-white shrink-0"
        >
          <DescriptionIcon style={{ fontSize: 18 }} />
        </div>

        <div className="pl-2">
          <p className={`text-xs ${secondaryText} pl-6`}>{title}</p>
          <p className="font-bold text-2xl pl-2">{value}</p>
        </div>

        <Image
          src={image}
          alt="chart"
          width={70.93}
          height={29.76}
          className="object-contain ml-auto"
        />
      </div>

      <Growth />
    </Card>
  );
}

function Growth() {
  return (
    <div className="flex items-center gap-1.5 text-xs mt-3">
      <div className="p-0.5 rounded-full bg-[#34C759]/10 text-[#34C759] flex items-center justify-center">
        <ArrowUpwardIcon style={{ fontSize: 14 }} />
      </div>
      <span className="font-semibold text-[#34C759]">12.5%</span>
      <span className="text-[#596583]">from last month</span>
    </div>
  );
}