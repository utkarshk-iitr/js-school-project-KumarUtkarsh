import React, { useEffect } from "react";
import type { EventItem } from "../types";

type Props = {
  event: EventItem;
  onClose: () => void;
};

const EventModal: React.FC<Props> = ({ event, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div id="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose} aria-label="Close">&times;</span>
        <h2 style={{ marginBottom: 12 }}>{event.title}</h2>
        <img src={`/${event.img}`} alt={event.title} style={{ width: "100%", margin: "10px 0 16px", borderRadius: 8 }} />
        <p>{event.desc}</p>
      </div>
    </div>
  );
};

export default EventModal;
