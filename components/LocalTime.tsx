"use client";

import { useEffect, useState } from "react";

export default function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <span>Zuid-Holland</span>;

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Europe/Amsterdam"
  }).format(now);
  const hour = Number(time.slice(0, 2));

  return (
    <span>
      Zuid-Holland, {time}
      {hour >= 23 || hour < 7 ? ", probably asleep" : ""}
    </span>
  );
}
