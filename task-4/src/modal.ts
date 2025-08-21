import {EventData} from "./types";

let overlay:((e:MouseEvent)=>void)|null=null;
let keydown:((e:KeyboardEvent)=>void)|null=null;

export function openModal(ev:EventData):void{
  const modal = document.getElementById("modal");
  if(!modal) return;

  modal.innerHTML = "";
  const box = document.createElement("div");
  box.className = "modal-content";

  const button = document.createElement("span");
  button.className = "modal-close";
  button.innerHTML = "&times;";
  button.addEventListener("click",closeModal);
  button.addEventListener("keydown",(e)=>{
    if(e.key==="Enter" || e.key===" ") closeModal();
  });

  const title = document.createElement("h2");
  title.textContent = `${ev.year} — ${ev.title}`;

  const category = document.createElement("div");
  category.className = "modal-category";
  category.textContent = `Category: ${ev.category}`;
  Object.assign(category.style,{
    color:"#0066b2",
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: "15px",
  });

  const img = document.createElement("img");
  img.src = ev.img;
  img.alt = ev.title;
  img.style.maxWidth = "100%";

  const desc = document.createElement("p");
  desc.textContent = ev.desc;

  box.append(button,title,category,img,desc);
  modal.appendChild(box);
  modal.style.display = "block";

  overlay=(e)=>{
    if(e.target===modal) closeModal();
  };
  modal.addEventListener("click",overlay);

  keydown=(e)=>{
    if(e.key==="Escape") closeModal();
  };
  
  document.addEventListener("keydown",keydown);
  button.focus();
}

export function closeModal():void{
  const modal = document.getElementById("modal");
  if(!modal) return;

  modal.style.display = "none";
  modal.innerHTML = "";

  if(overlay){
    modal.removeEventListener("click",overlay);
    overlay=null;
  }
  if(keydown){
    document.removeEventListener("keydown",keydown);
    keydown=null;
  }
}
