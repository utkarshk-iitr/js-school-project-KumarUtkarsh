import React from "react";

const EventMarker: React.FC<{ year: string }> = ({ year }) => {
  return <div className="event-marker">{year}</div>;
};

export default EventMarker;
