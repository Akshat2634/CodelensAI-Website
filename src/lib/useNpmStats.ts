"use client";

import { useEffect, useState } from "react";
import { STATS } from "@/lib/constants";

export function useNpmStats() {
  const [version, setVersion] = useState(STATS.version);
  const [downloads, setDownloads] = useState(
    parseInt(STATS.weeklyDownloads.replace(/[^0-9]/g, ""), 10)
  );

  useEffect(() => {
    fetch("https://registry.npmjs.org/claude-roi/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.version) setVersion(data.version);
      })
      .catch(() => {});

    fetch("https://api.npmjs.org/downloads/point/last-week/claude-roi")
      .then((res) => res.json())
      .then((data) => {
        if (data.downloads) setDownloads(data.downloads);
      })
      .catch(() => {});
  }, []);

  return { version, downloads };
}
