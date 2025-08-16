import { fetchEvents } from "./fetcher";
import { render } from "./renderer";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const events = await fetchEvents();
    render(events);
  } catch (err) {
    console.error("Failed to init:", err);
  }
});
