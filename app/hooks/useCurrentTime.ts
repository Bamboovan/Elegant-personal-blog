"use client";

import { useState, useEffect } from "react";

export function useCurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toISOString().replace("T", " ").slice(0, 19);
  };

  const formatTimeOnly = (date: Date) => {
    return date.toTimeString().slice(0, 8);
  };

  const formatDateOnly = (date: Date) => {
    return date.toISOString().slice(0, 10);
  };

  return {
    time,
    formatted: formatTime(time),
    timeOnly: formatTimeOnly(time),
    dateOnly: formatDateOnly(time),
  };
}
