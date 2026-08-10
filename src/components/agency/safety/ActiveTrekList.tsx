
"use client";

import { useTheme } from "@/context/theme";
import CompassIcon from "@mui/icons-material/Explore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

export interface ActiveTrek {
  id: string;
  name: string;
  guide_name: string;
  location_name: string;
  lat: number;
  lng: number;
  last_ping: string;
  has_sos: boolean;
  elevation?: string;
  progressText?: string;
  progressPercentage?: number;
}

interface ActiveTrekListProps {
  treks: ActiveTrek[];
  selectedTrekId: string | null;
  onSelectTrek: (id: string) => void;
}

export function ActiveTrekList({
  treks,
  selectedTrekId,
  onSelectTrek,
}: ActiveTrekListProps) {
  const { isDark } = useTheme();

  return (
    <div
      className={`h-full w-full min-w-0 rounded-xl border p-3 sm:p-4 shadow-sm transition-colors ${
        isDark
          ? "bg-slate-900 border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-800"
      }`}
    >
      {/* Header */}
      <div
        className={`mb-3 flex items-center justify-between gap-2 ${
          isDark ? "text-slate-100" : "text-slate-800"
        }`}
      >
        <h3 className="min-w-0 text-sm font-bold">
          Active Treks
        </h3>

        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-xs ${
            isDark
              ? "bg-slate-800 text-slate-300"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {treks.length} Live
        </span>
      </div>

      {/* Trek List */}
      <div className="max-h-[360px] space-y-2 overflow-y-auto pr-0.5 sm:pr-1">
        {treks.map((trek) => {
          const isSelected = selectedTrekId === trek.id;

          return (
            <div
              key={trek.id}
              onClick={() => onSelectTrek(trek.id)}
              className={`w-full min-w-0 cursor-pointer select-none rounded-lg border p-2.5 text-left transition-all sm:p-3 ${
                isSelected
                  ? isDark
                    ? "bg-blue-950/40 border-blue-500 shadow-xs"
                    : "bg-blue-50/60 border-blue-400 shadow-xs"
                  : trek.has_sos
                  ? isDark
                    ? "bg-red-950/30 border-red-900/60 hover:bg-red-950/50"
                    : "bg-red-50/40 border-red-200 hover:bg-red-50/60"
                  : isDark
                  ? "bg-slate-900/50 border-slate-800 hover:bg-slate-800/80"
                  : "bg-slate-50/60 border-slate-100 hover:bg-slate-50"
              }`}
            >
              {/* Trek Information */}
              <div className="flex min-w-0 items-start gap-2">
                {/* Icon */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border sm:h-9 sm:w-9 ${
                    trek.has_sos
                      ? isDark
                        ? "bg-red-950 border-red-800 text-red-400"
                        : "bg-red-50 border-red-200 text-red-600"
                      : isDark
                      ? "bg-slate-800 border-slate-700 text-emerald-400"
                      : "bg-green-50 border-green-200 text-green-600"
                  }`}
                >
                  {trek.has_sos ? (
                    <WarningAmberIcon sx={{ fontSize: 17 }} />
                  ) : (
                    <CompassIcon sx={{ fontSize: 17 }} />
                  )}
                </div>

                {/* Trek Details */}
                <div className="min-w-0 flex-1">
                  {/* Trek name + guide */}
                  <h4
                    className={`truncate text-[11px] font-bold leading-4 sm:text-xs ${
                      trek.has_sos
                        ? isDark
                          ? "text-red-400"
                          : "text-red-600"
                        : isDark
                        ? "text-slate-100"
                        : "text-slate-800"
                    }`}
                    title={`${trek.name} — ${trek.guide_name}`}
                  >
                    {trek.name}
                    <span
                      className={`font-medium ${
                        isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      {" "}
                      — {trek.guide_name}
                    </span>
                  </h4>

                  {/* Status + Location */}
                  <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[9px] sm:text-[10px]">
                    {trek.has_sos ? (
                      <span className="shrink-0 font-bold uppercase tracking-wide text-red-500">
                        SOS ACTIVE
                      </span>
                    ) : (
                      <span className="flex shrink-0 items-center gap-1 font-semibold text-emerald-500">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        LIVE
                      </span>
                    )}

                    <span
                      className={
                        isDark ? "text-slate-600" : "text-slate-300"
                      }
                    >
                      •
                    </span>

                    <span
                      className={`min-w-0 truncate font-mono ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                      title={trek.elevation || trek.location_name}
                    >
                      {trek.elevation || trek.location_name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-2.5">
                <div
                  className={`h-1.5 w-full overflow-hidden rounded-full ${
                    isDark ? "bg-slate-800" : "bg-slate-100"
                  }`}
                >
                  <div
                    className={`h-full rounded-full ${
                      trek.has_sos ? "bg-red-500" : "bg-blue-600"
                    }`}
                    style={{
                      width: `${trek.progressPercentage || 65}%`,
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-1.5 flex min-w-0 items-center justify-between gap-2 pt-1 text-[9px] sm:mt-2 sm:text-[10px]">
                <span
                  className={`min-w-0 truncate font-medium ${
                    isDark ? "text-slate-400" : "text-slate-500"
                  }`}
                  title={trek.progressText || "Day 4 of 12"}
                >
                  {trek.progressText || "Day 4 of 12"}
                </span>

                <span
                  className={`shrink-0 italic ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {trek.last_ping}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

