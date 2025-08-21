import React, { useState } from "react";
import type { EventItem } from "../types";
import EventMarker from "./EventMarker";
import EventModal from "./EventModal";

const Card: React.FC<{ e: EventItem; onOpen: () => void }> = ({ e, onOpen }) => (
  <article
      className="event"
      onClick={() => { console.log('Card clicked:', e.title); onOpen(); }}
      role="button"
      tabIndex={0}
      onKeyDown={(ev) => { if (ev.key === 'Enter' || ev.key === ' ') { console.log('Card keyboard open:', e.title); onOpen(); } }}
      aria-label={`Open details for ${e.title}`}
    >
    <EventMarker year={e.year} />
    <h3>{e.title}</h3>
    <img src={`/${e.img}`} alt={e.title} />
    <p>{e.desc}</p>
  </article>
);

const Timeline: React.FC<{ events: EventItem[] }> = ({ events }) => {
  const [open, setOpen] = useState<EventItem | null>(null);

  return (
    <main id="timeline">
      <h2>Major BMW Milestones</h2>
      {events.map((e, i) => (
        <Card key={`${e.year}-${i}`} e={e} onOpen={() => setOpen(e)} />
      ))}
      {open && <EventModal event={open} onClose={() => setOpen(null)} />}
    </main>
  );
};

export default Timeline;
