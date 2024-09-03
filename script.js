const textOffsetPixel = 14;

const mtt = () => {
  let msg = document.title;

  /// set up style of page title indicator
  let indicator = document.createElement('div');
  indicator.style.position = 'fixed';
  indicator.style.bottom = 0;
  indicator.style.right = 0;
  indicator.style.zIndex = 999;

  indicator.style.color = 'black';
  indicator.style.backgroundColor = 'white';
  indicator.style.border = '1px solid #000';
  indicator.style.height = '25px';
  indicator.style.width = '100px';
  indicator.style.paddingLeft = '4px';

  /// Hide on double click
  indicator.addEventListener('dblclick', (ev)=>{
    let elm = ev.target;
    elm.style.display = 'none';
  });
  document.body.appendChild(indicator);

  indicator.style.width = (calcTitleWidth() + textOffsetPixel) + 'px';
  indicator.id = 'pageTitleIndicator';
  indicator.textContent = msg;
}

const timeout = window.setTimeout(mtt, 1000);

const watchTitleTag = () => {
  const target = document.querySelector('title');
  const observer = new MutationObserver((mutations) => {
    const title = mutations[0].target.textContent;
    document.querySelector('#pageTitleIndicator').textContent = title;
    document.querySelector('#pageTitleIndicator').style.width = (calcTitleWidth() + textOffsetPixel) + 'px';
  });
  const config = { subtree: true, characterData: true, childList: true };
  observer.observe(target, config);
}

const timeout2 = window.setTimeout(watchTitleTag, 1200);

/// treat multi-byte characters length with box
const calcTitleWidth = () => {
  const msg = document.title;
  const tmpElm = document.createElement('span');
  tmpElm.style.visibility = 'hidden';
  tmpElm.style.whiteSpace = 'pre';
  tmpElm.textContent = msg;
  document.body.appendChild(tmpElm);
  const width = tmpElm.offsetWidth;
  document.body.removeChild(tmpElm);
  return width;
}

/// end of code