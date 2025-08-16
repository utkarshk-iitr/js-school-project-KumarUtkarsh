import { EventData } from "./types";

export async function fetchEvents(): Promise<EventData[]> {
  const res = await fetch("data/events.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load events");
  return res.json();
}
