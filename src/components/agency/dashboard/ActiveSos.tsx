'use client';

import Link from 'next/link';

export default function ActiveSos() {
  return (
    <section className="flex items-center gap-1 md:gap-2 p-1 md:p-2 xl:p-5 bg-[#FFE1E1] xl:bg-[#FFEFEF] rounded-sm md:rounded-lg xl:rounded-2xl border border-[#FF383C]">
      <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#FF2D55] px-1 py-1.5 md:p-2 text-white text-[6px] md:text-base lg:text-[xl] md:w-13.5 md:h-13.5">
        SOS
      </div>
      <div>
        <h2 className="font-semibold text-[8px] md:text-xl lg:text-2xl text-[#FF2F6E]">Active SOS Alert</h2>
        <p className="font-[500] text-[6px] md:text-xs lg:text-sm text-[#625B71]">
          EBC Trek · Guide Bishal Tamang · 4:52 elapsed · 28.007°N 86.852°E
        </p>
      </div>
      <Link
        href="/dashboard/safety"
        className="border border-[#FF2D55] font-semibold text-[4px] md:text-[10px] lg:text-sm text-[#FF2D55] px-2 py-1 md:px-3 md:py-2 lg:px-5 lg:py-3 ml-auto rounded-xs md:rounded-md hover:underline whitespace-nowrap"
      >
        View Alert <span>→</span>
      </Link>
    </section>
  );
}
