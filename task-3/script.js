let overlay = null;
let keydown = null;

document.addEventListener('DOMContentLoaded',function(){ init(); });

function init(){
  document.createElement('p');
  
  fetch('data/events.json',{cache:'no-store'})
    .then(function(res){
      return res.json();
    })
    .then(function(events){
      render(events);
    })
}

function render(events){
  const timeline = document.getElementById('timeline');
  let container = document.getElementById('events');

  container = document.createElement('div');
  container.id = 'events';
  timeline.appendChild(container);

  events.forEach(function(ev){
    const art = document.createElement('article');
    art.className = 'event';

    const year = document.createElement('div');
    year.className = 'event-marker';
    year.innerHTML = '<span>' + (ev.year) + '</span>';
    const h3 = document.createElement('h3');
    h3.textContent = ev.title;

    const category = document.createElement('div');
    category.className = 'event-category';
    category.textContent = 'Category: '+ev.category;
    category.style.color = '#0066b2';
    category.style.fontWeight = 'bold';
    category.style.fontSize = '14px';
    category.style.marginTop = '60px';

    const img = document.createElement('img');
    img.src = ev.img;
    img.alt = ev.title;
    img.loading = 'lazy';

    const p = document.createElement('p');
    p.textContent = ev.desc;

    art.appendChild(year);
    art.appendChild(h3);
    art.appendChild(img);
    art.appendChild(p);
    art.appendChild(category);

    art.tabIndex = 0;
    art.addEventListener('click',function(){openModal(ev);});
    art.addEventListener('keydown',function(e){
      if(e.key==='Enter' || e.key===' '){
        e.preventDefault();
        openModal(ev);
      }
    });

    container.appendChild(art);
  });
}

function openModal(ev) {
  const modal = document.getElementById('modal');
  modal.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'modal-content';

  const button = document.createElement('span');
  button.className = 'modal-close';
  button.innerHTML = '&times;';
  button.addEventListener('click',closeModal);
  button.addEventListener('keydown',(e)=>{
    if(e.key==='Enter' || e.key===' ') closeModal();
  });

  const title = document.createElement('h2');
  title.textContent = ev.year+' — '+ev.title;

  const category = document.createElement('div');
  category.className = 'modal-category';
  category.textContent = 'Category: ' + ev.category;
  category.style.color = '#0066b2';
  category.style.fontWeight = 'bold';
  category.style.marginBottom = '15px';
  category.style.fontSize = '16px';

  const img = document.createElement('img');
  img.src = ev.img;
  img.alt = ev.title;
  img.style.maxWidth = '100%';
  box.appendChild(img);

  const desc = document.createElement('p');
  desc.textContent = ev.desc;

  box.appendChild(button);
  box.appendChild(title);
  box.appendChild(category);
  box.appendChild(desc);
  modal.appendChild(box);
  modal.style.display = 'block';
  
  overlay = function(e){
    if(e.target===modal){
      closeModal();
    }
  };

  modal.addEventListener('click',overlay);
  keydown = function(e){
    if(e.key==='Escape'){
      closeModal();
    }
  };
  document.addEventListener('keydown',keydown);
  button.focus();
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  modal.innerHTML = '';

  if(overlay){
    modal.removeEventListener('click',overlay);
    overlay = null;
  }
  if(keydown){
    document.removeEventListener('keydown',keydown);
    keydown = null;
  }
}
