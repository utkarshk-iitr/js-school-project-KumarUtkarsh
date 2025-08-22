import React, { useState, useCallback } from "react";
import Header from "./components/Header";
import FilterPanel from "./components/FilterPanel";
import Timeline from "./components/Timeline";
import { useEvents } from "./hooks/useEvents";

const App: React.FC = () => {
  const { events, categories, applyFilter } = useEvents();
  const [themeDark, setThemeDark] = useState(false);

  const onToggleTheme = useCallback(() => {
    setThemeDark((p) => !p);
    document.documentElement.style.background = !themeDark ? "#0b1220" : "#fff";
    document.body.style.background = !themeDark ? "#0b1220" : "#fff";
    document.body.style.color = "#333";
  }, [themeDark]);

  return (
    <>
      <Header onToggleTheme={onToggleTheme} />
      <FilterPanel categories={categories} onFilter={applyFilter} />
      <Timeline events={events} />
    </>
  );
};

export default App;
