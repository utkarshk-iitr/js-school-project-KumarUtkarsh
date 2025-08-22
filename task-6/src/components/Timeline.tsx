import React, { useState, useRef, useEffect } from 'react';
import type { EventItem } from '../types';
import EventMarker from './EventMarker';
import EventModal from './EventModal';

const Card: React.FC<{
  e: EventItem;
  onOpen: (event: EventItem) => void;
  isActive: boolean;
  buttonRef: React.Ref<HTMLButtonElement>; // This line is corrected
}> = ({ e, onOpen, isActive, buttonRef }) => (
  <article className="event">
    <button
      ref={isActive ? buttonRef : null}
      onClick={() => onOpen(e)}
      aria-label={`Open details for ${e.title}`}
      aria-current={isActive ? 'true' : undefined}
    >
      <EventMarker year={e.year} />
      <h3>{e.title}</h3>
      <img src={e.img} alt="" />
      <p>{e.desc}</p>
    </button>
  </article>
);

const Timeline: React.FC<{ events: EventItem[] }> = ({ events }) => {
  const [open, setOpen] = useState<EventItem | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleOpen = (event: EventItem, index: number) => {
    // We set the ref here, before opening the modal.
    // Note: this relies on the button being rendered in the DOM.
    // The ref will be attached to the correct button in the Card component.
    setActiveIndex(index);
    setOpen(event);
  };
  
  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    if (open === null && triggerRef.current) {
        // After the modal closes, focus the button that opened it.
        triggerRef.current.focus();
    } else if (open !== null && activeIndex !== null) {
        // When a modal opens, update triggerRef to point to the active button.
        const button = timelineRef.current?.querySelectorAll('button')[activeIndex];
        if (button) {
            triggerRef.current = button;
        }
    }
  }, [open, activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (activeIndex === null) {
        // If no item is active, start at the beginning
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
              isActive={i === activeIndex}
              buttonRef={triggerRef}
            />
          </div>
        ))}
      </div>
      {open && <EventModal event={open} onClose={handleClose} />}
    </main>
  );
};

export default Timeline;
