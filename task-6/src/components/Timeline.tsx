import React, { useState, useRef, useEffect } from 'react';
import type { EventItem } from '../types';
import EventMarker from './EventMarker';
import EventModal from './EventModal';

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleOpen = (event: EventItem, index: number) => {
    setActiveIndex(index);
    setOpen(event);
  };
  
  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    if (open === null && triggerRef.current) {
        triggerRef.current.focus();
    } 
    else if (open !== null && activeIndex !== null) {
        const button = timelineRef.current?.querySelectorAll('button')[activeIndex];
        if (button) {
            triggerRef.current = button;
        }
    }
  }, [open, activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (activeIndex === null) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            setActiveIndex(0);
            timelineRef.current?.querySelectorAll('button')[0]?.focus();
        }
        return;
    };
    
    let newIndex = activeIndex;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      newIndex = (activeIndex + 1) % events.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      newIndex = (activeIndex - 1 + events.length) % events.length;
    }

    if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        const buttons = timelineRef.current?.querySelectorAll('button');
        buttons?.[newIndex]?.focus();
    }
  };

  return (
    <main id="timeline" ref={timelineRef} onKeyDown={handleKeyDown}>
      <h2>Major BMW Milestones</h2>
      <div className="events-container" role="list">
        {events.map((e, i) => (
          <div role="listitem" key={`${e.year}-${i}`}>
            <Card
              e={e}
              onOpen={() => handleOpen(e, i)}
            />
          </div>
        ))}
      </div>
      {open && <EventModal event={open} onClose={handleClose} />}
    </main>
  );
};

export default Timeline;
