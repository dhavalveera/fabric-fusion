import { useMemo, useState, type FC } from "react";

// Sonner
import { Toaster as SonnerToaster, type ToasterProps } from "sonner";

// Theme Provider
import { useTheme } from "@/components/theme-provider";

const SonnerToasterComp: FC = () => {
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<ToasterProps["theme"]>("light");

  useMemo(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setResolvedTheme(mediaQuery.matches ? "dark" : "light");

      const handler = (e: MediaQueryListEvent) => setResolvedTheme(e.matches ? "dark" : "light");

      mediaQuery.addEventListener("change", handler);

      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  return (
    <SonnerToaster
      richColors
      visibleToasts={10}
      invert
      theme={resolvedTheme}
      toastOptions={{
        classNames: {
          actionButton: "font-della-respira",
          cancelButton: "font-della-respira",
          closeButton: "font-della-respira",
          content: "font-della-respira",
          description: "font-della-respira",
          loading: "font-della-respira",
          title: "font-della-respira",
        },
      }}
    />
  );
};

export default SonnerToasterComp;
