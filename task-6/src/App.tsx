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
      // pass
    }

    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setThemeDark(prefersDark);
    applyThemeClass(prefersDark);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setThemeDark(e.matches);
          applyThemeClass(e.matches);
        }
      } catch {
        // pass
      }
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const onToggleTheme = useCallback(() => {
    setThemeDark((prev) => {
      const next = !prev;
      applyThemeClass(next);
      try {
        localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {
        // pass
      }
      return next;
    });
  }, []);

  return (
    <>
      <Header onToggleTheme={onToggleTheme} themeDark={themeDark} />
      <FilterPanel categories={categories} onFilter={applyFilter} />
      <Timeline events={events} />
    </>
  );
};

export default App;
