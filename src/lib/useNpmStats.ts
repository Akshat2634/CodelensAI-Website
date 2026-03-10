"use client";

import { useEffect, useState } from "react";
import { STATS } from "@/lib/constants";

export function useNpmStats() {
  const [version, setVersion] = useState(STATS.version);
  const [downloads, setDownloads] = useState(
    parseInt(STATS.weeklyDownloads.replace(/[^0-9]/g, ""), 10)
  );

  useEffect(() => {
    fetch("https://registry.npmjs.org/codelens-ai/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.version) setVersion(data.version);
      })
      .catch(() => {});

    // Sum downloads from both packages (claude-roi was renamed to codelens-ai)
    Promise.all([
      fetch("https://api.npmjs.org/downloads/point/last-week/codelens-ai")
        .then((res) => res.json())
        .then((data) => data.downloads || 0)
        .catch(() => 0),
      fetch("https://api.npmjs.org/downloads/point/last-week/claude-roi")
        .then((res) => res.json())
        .then((data) => data.downloads || 0)
        .catch(() => 0),
    ]).then(([newPkg, oldPkg]) => {
      const total = newPkg + oldPkg;
      if (total >= 1000) setDownloads(total);
    });
  }, []);

  return { version, downloads };
}
