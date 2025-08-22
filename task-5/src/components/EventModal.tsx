import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import type { EventItem } from "../types";

type Props = {
  event: EventItem;
  onClose: () => void;
};

const EventModal: React.FC<Props> = ({ event, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!document || !document.body) return null;

  return ReactDOM.createPortal(
    <div
      id="modal"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{ display: "flex" }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="document"
        style={{ position: "relative" }}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
          style={{ background: 'transparent', border: 'none', fontSize: 28, cursor: 'pointer' }}
        >
          &times;
        </button>
        <h2 style={{ marginBottom: 12 }}>{event.title}</h2>
        <img src={`/${event.img}`} alt={event.title} style={{ width: "50%", margin: "10px 0 16px", borderRadius: 8 }} />
        <p>{event.desc}</p>
      </div>
    </div>,
    document.body
  );
};

export default EventModal;
