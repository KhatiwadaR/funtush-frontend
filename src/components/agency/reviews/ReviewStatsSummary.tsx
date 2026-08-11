"use client";
import StarIcon from '@mui/icons-material/Star';
import RateReviewIcon from '@mui/icons-material/RateReview';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

interface StatsProps {
  totalReviews: number;
  avgRating: string;
  responseRate: string; 
  fiveStarCount: number;
}

export function ReviewStatsSummary({ totalReviews, avgRating, responseRate, fiveStarCount }: StatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-6 w-full">
      {/* Average Rating */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Average Rating</p>
          <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
            <StarIcon fontSize="small" />
          </div>
        </div>
        <div className="flex items-baseline space-x-1.5 mt-3">
          <span className="text-3xl font-bold text-slate-800">{avgRating}</span>
          <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
        </div>
      </div>

      {/* Total Reviews */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Reviews</p>
          <div className="p-2 bg-sky-50 rounded-lg text-sky-600">
            <RateReviewIcon fontSize="small" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-3xl font-bold text-slate-800">{totalReviews}</p>
        </div>
      </div>

      {/* Response Rate */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Response Rate</p>
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <QuestionAnswerIcon fontSize="small" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-3xl font-bold text-slate-800">{responseRate}</p>
        </div>
      </div>

      {/* 5-Star Reviews */}
      <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">5-Star Reviews</p>
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
            <WorkspacePremiumIcon fontSize="small" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-3xl font-bold text-slate-800">{fiveStarCount}</p>
        </div>
      </div>
    </div>
  );
}