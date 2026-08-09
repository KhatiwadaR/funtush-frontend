"use client";
import StarIcon from '@mui/icons-material/Star';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface ReviewItem {
  id: string;
  package_id: string;
  agency_id: string;
  trekker_name: string; 
  rating: number;
  title: string;
  text: string;
  guide_rating: number;
  created_at?: string;
  date?: string; 
}

interface RowProps {
  review: ReviewItem;
  isFlagged: boolean;    
  hasResponse: boolean;  
  onClick: () => void;   
}

export function ReviewTableRow({ review, isFlagged, hasResponse, onClick }: RowProps) {
  const displayDate = review.date || (review.created_at ? new Date(review.created_at).toLocaleDateString() : "");

  return (
    <tr 
      onClick={onClick}
      className="hover:bg-slate-50/80 transition-colors cursor-pointer select-none border-b border-slate-100 last:border-none"
    >
      <td className="p-4 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900">{review.trekker_name}</span>
          <div className="flex gap-1.5 mt-1.5">
            {hasResponse && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ForumOutlinedIcon sx={{ fontSize: '12px' }} /> Responded
              </span>
            )}
            {isFlagged && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-700 border border-red-200">
                <FlagOutlinedIcon sx={{ fontSize: '12px' }} /> Flagged
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="p-4 text-slate-600 whitespace-nowrap font-medium align-middle">
        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
          {review.package_id}
        </span>
      </td>

      <td className="p-4 whitespace-nowrap align-middle">
        <div className="flex items-center text-amber-500 font-bold">
          <StarIcon fontSize="small" className="mr-1 text-amber-500" />
          <span>{review.rating}.0</span>
        </div>
      </td>

      <td className="p-4 max-w-xs md:max-w-md text-slate-500 align-middle">
        <div className="flex flex-col">
          <span className="font-semibold text-slate-700 text-xs line-clamp-1">{review.title}</span>
          <span className="text-xs text-slate-500 line-clamp-1 mt-0.5">{review.text}</span>
        </div>
      </td>

      <td className="p-4 text-right text-slate-400 text-xs font-medium whitespace-nowrap align-middle">
        <div className="flex items-center justify-end gap-2">
          <span>{displayDate}</span>
          <ChevronRightIcon fontSize="small" className="text-slate-400" />
        </div>
      </td>
    </tr>
  );
}