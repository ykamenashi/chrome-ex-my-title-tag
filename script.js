let msg = document.title;

let indicator = document.createElement('div');
indicator.style.position = 'fixed';
indicator.style.bottom = 0;
indicator.style.right = 0;
indicator.style.zIndex = 999;

indicator.style.backgroundColor = 'white';
indicator.style.border = '1px solid #000';
indicator.style.height = '25px';
indicator.style.width = '100px';
indicator.style.paddingLeft = '4px';

indicator.addEventListener('mouseover', (ev)=>{
  let elm = ev.target;
  elm.style.opacity = 0;
});
indicator.addEventListener('mouseout', (ev)=>{
  let elm = ev.target;
  
  elm.style.opacity = 100;
});
document.body.appendChild(indicator);

let tmpElm = document.createElement('span');
tmpElm.style.visibility = 'hidden';
tmpElm.style.whiteSpace = 'pre';
tmpElm.textContent = msg;
document.body.appendChild(tmpElm);

const width = tmpElm.offsetWidth;
document.body.removeChild(tmpElm);
let offsetPx = 14;
indicator.style.width = (width + offsetPx) + 'px';
indicator.textContent = msg;
