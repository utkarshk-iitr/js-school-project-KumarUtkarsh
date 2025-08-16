import {fetchEvents} from "./fetcher";
import {render} from "./renderer";

document.addEventListener("DOMContentLoaded",async()=>{
  const events = await fetchEvents();
  render(events);
});
