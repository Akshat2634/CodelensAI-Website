"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  useCallback,
} from "react";

type Theme = "dark" | "light" | "system";
type ResolvedTheme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "dark",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") return getSystemTheme();
  return theme;
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light" || saved === "system") return saved;
  return "system";
}

// External store for theme to avoid setState-in-effect
let listeners: Array<() => void> = [];
let currentTheme: Theme = "system";
let currentResolved: ResolvedTheme = "dark";

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getThemeSnapshot() {
  return currentTheme;
}

function getResolvedSnapshot() {
  return currentResolved;
}

function getServerThemeSnapshot() {
  return "system" as Theme;
}

function getServerResolvedSnapshot() {
  return "dark" as ResolvedTheme;
}

function applyTheme(theme: Theme) {
  currentTheme = theme;
  currentResolved = resolveTheme(theme);
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(currentResolved);
  emitChange();
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerThemeSnapshot);
  const resolvedTheme = useSyncExternalStore(subscribe, getResolvedSnapshot, getServerResolvedSnapshot);

  // Initialize from localStorage once
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    applyTheme(getStoredTheme());
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    localStorage.setItem("theme", t);
    applyTheme(t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
