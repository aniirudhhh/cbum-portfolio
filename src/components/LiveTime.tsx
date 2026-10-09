"use client";

import { useEffect, useState } from "react";

export function LiveTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Only run on client to avoid hydration mismatch
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true 
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // update every second just in case it ticks over
    return () => clearInterval(interval);
  }, []);

  // Return an empty placeholder of same height during SSR to avoid layout shift
  if (!time) {
    return <div className="flex flex-col gap-1 mt-4 min-h-[38px] opacity-0" aria-hidden="true" />;
  }

  return (
    <div className="flex flex-col gap-1 mt-4">
      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">
        Local Time
      </span>
      <span className="text-sm font-medium tracking-tight text-foreground/80 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        {time} in Bangalore
      </span>
    </div>
  );
}
