import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import type { EventItem } from '../types';

type Props = {
  event: EventItem;
  onClose: () => void;
};

const EventModal: React.FC<Props> = ({ event, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
      dialog.addEventListener('close', onClose);
    }

    return () => {
      if (dialog) {
        dialog.removeEventListener('close', onClose);
      }
    };
  }, [onClose]);

  if (!document || !document.body) {
    return null;
  }

  return ReactDOM.createPortal(
    <dialog
      ref={dialogRef}
      id="event-modal"
      className="modal-content"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <button
        className="modal-close"
        onClick={() => dialogRef.current?.close()}
        aria-label="Close"
        style={{ background: 'transparent', border: 'none', fontSize: '28px', cursor: 'pointer', position: 'absolute', top: '10px', right: '15px' }}
      >
        &times;
      </button>
      <h2 id="modal-title" style={{ marginBottom: 12 }}>
        {event.title}
      </h2>
      <img src={event.img} alt="" style={{ width: '50%', margin: '10px 0 16px', borderRadius: 8 }} />
      <p id="modal-description">{event.desc}</p>
    </dialog>,
    document.body
  );
};

export default EventModal;
