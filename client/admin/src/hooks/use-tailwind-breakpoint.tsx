import { useEffect, useState } from "react";

// Data
import { breakpointMap } from "@/data/breakpoint-map";

// types
import type { MediaQueryBreakpoints } from "@/types";

export const useTailwindBreakpoint = (breakpoint: MediaQueryBreakpoints): boolean => {
  const query = breakpointMap[breakpoint];

  const getMatch = (q: string): boolean => {
    if (typeof window === "undefined") return false;

    return window.matchMedia(q).matches;
  };

  const [matches, setMatches] = useState(() => getMatch(query));

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList: MediaQueryList = window.matchMedia(query);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQueryList.addEventListener("change", handler);

    return () => {
      mediaQueryList.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
};
