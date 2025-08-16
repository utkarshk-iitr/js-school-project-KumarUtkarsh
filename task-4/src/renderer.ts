import {EventData} from "./types";
import {openModal} from "./modal";

export function render(events:EventData[]):void{
  const timeline = document.getElementById("timeline");
  if(!timeline) return;

  let container = document.getElementById("events");
  if(container) container.remove();

  container = document.createElement("div");
  container.id = "events";
  timeline.appendChild(container);

  events.forEach((ev)=>{
    const item = document.createElement("itemicle");
    item.className = "event";

    const year = document.createElement("div");
    year.className = "event-marker";
    year.innerHTML = `<span>${ev.year}</span>`;

    const h3 = document.createElement("h3");
    h3.textContent = ev.title;

    const category = document.createElement("div");
    category.className = "event-category";
    category.textContent = `Category: ${ev.category}`;
    Object.assign(category.style,{
      color: "#0066b2",
      fontWeight: "bold",
      fontSize: "14px",
      marginTop: "60px",
    });

    const img = document.createElement("img");
    img.src = ev.img;
    img.alt = ev.title;
    img.loading = "lazy";

    const p = document.createElement("p");
    p.textContent = ev.desc;

    item.append(year,h3,img,p,category);

    item.tabIndex = 0;
    item.addEventListener("click",()=>openModal(ev));
    item.addEventListener("keydown",(e:KeyboardEvent)=>{
      if(e.key==="Enter" || e.key===" "){
        e.preventDefault();
        openModal(ev);
      }
    });

    container!.appendChild(item);
  });
}
