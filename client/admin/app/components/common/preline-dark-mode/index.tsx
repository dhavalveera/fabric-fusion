import { forwardRef, useCallback, useEffect, useMemo, useState, type FC } from "react";

type Theme = "dark" | "light";

const PrelineThemeToggleButton = forwardRef<HTMLDivElement>((props, ref) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = useCallback(() => {
    setTheme(prevValue => (prevValue === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    (async () => {
      const storedTheme = window.localStorage.getItem("hs_theme") as Theme;

      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        setTheme(defaultTheme);
      }
    })();
  }, []);

  useEffect(() => {
    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.add("light");
      html.classList.remove("dark");
    }

    window.localStorage.setItem("hs_theme", theme);
  }, [theme]);

  return (
    <div ref={ref}>
      {theme === "light" ? (
        <button
          type="button"
          className="block rounded-full font-medium text-gray-800 hover:bg-gray-200 focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          onClick={toggleTheme}
          aria-label="Activate dark mode"
        >
          <span className="group inline-flex size-9 shrink-0 items-center justify-center">
            <svg
              className="size-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          </span>
        </button>
      ) : (
        <button
          type="button"
          className="block rounded-full font-medium text-gray-800 hover:bg-gray-200 focus:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          onClick={toggleTheme}
          aria-label="Activate light mode"
        >
          <span className="group inline-flex size-9 shrink-0 items-center justify-center">
            <svg
              className="size-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          </span>
        </button>
      )}
    </div>
  );
});

export default PrelineThemeToggleButton;
