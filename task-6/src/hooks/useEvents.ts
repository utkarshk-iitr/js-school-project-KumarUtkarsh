import { useMemo, useState } from "react";
import data from "../../public/data/events.json";

type Filter = {
  category?: string;
  q?: string;
};

export function useEvents() {
  const [filter, setFilter] = useState<Filter>({});

  const categories = useMemo(() => {
    const s = new Set<string>();
    data.forEach((e) => s.add(e.category));
    return ["All", ...Array.from(s).sort()];
  }, []);

  const events = useMemo(() => {
    return data.filter((e) => {
      if (filter.category && filter.category !== "All" && e.category !== filter.category) {
        return false;
      }
      if (filter.q) {
        const q = filter.q.toLowerCase();
        return (
          e.year.toLowerCase().includes(q) ||
          e.title.toLowerCase().includes(q) ||
          e.desc.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filter]);

  const applyFilter = (f: Filter) => setFilter(f);

  return { events, categories, applyFilter };
}
