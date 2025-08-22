import React, { useState } from "react";

type Props = {
  categories: string[];
  onFilter: (f: { category?: string; q?: string }) => void;
};

const FilterPanel: React.FC<Props> = ({ categories, onFilter }) => {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState<string>("");

  return (
    <div style={{ maxWidth: 800, margin: "12px auto 0", padding: "0 20px", display: "flex", gap: 12 }}>
      <select
        aria-label="Filter by category"
        value={cat}
        onChange={(e) => {
          const v = e.target.value;
          setCat(v);
          onFilter({ category: v, q });
        }}
        style={{ padding: "10px 12px", borderRadius: 10 }}
      >
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        placeholder="Search year / title / text"
        value={q}
        onChange={(e) => {
          const v = e.target.value;
          setQ(v);
          onFilter({ category: cat, q: v });
        }}
        style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default FilterPanel;
