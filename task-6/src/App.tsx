import React, { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import FilterPanel from "./components/FilterPanel";
import Timeline from "./components/Timeline";
import { useEvents } from "./hooks/useEvents";

const STORAGE_KEY = "site-theme";

const applyThemeClass = (isDark: boolean) => {
  const root = document.documentElement;
  if (isDark) root.classList.add("dark");
  else root.classList.remove("dark");
};

const App: React.FC = () => {
  const { events, categories, applyFilter } = useEvents();
  const [themeDark, setThemeDark] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "dark" || saved === "light") {
        const isDark = saved === "dark";
        setThemeDark(isDark);
        applyThemeClass(isDark);
        return;
      }
    } catch (e) {
      /* ignore localStorage errors (e.g. private mode) */
    }

    // fallback to system preference
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setThemeDark(prefersDark);
    applyThemeClass(prefersDark);

    // optional: respond to system changes *only if* user hasn't saved a preference
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setThemeDark(e.matches);
          applyThemeClass(e.matches);
        }
      } catch {
        // ignore
      }
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // toggle theme and persist choice
  const onToggleTheme = useCallback(() => {
    setThemeDark((prev) => {
      const next = !prev;
      applyThemeClass(next);
      try {
        localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  return (
    <>
      {/* pass themeDark so Header can reflect the current theme if needed */}
      <Header onToggleTheme={onToggleTheme} themeDark={themeDark} />
      <FilterPanel categories={categories} onFilter={applyFilter} />
      <Timeline events={events} />
    </>
  );
};

export default App;
