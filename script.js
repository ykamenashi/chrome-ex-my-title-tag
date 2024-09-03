const textOffsetPixel = 14;
let timeout1;
let timeout2;

// 除外リストで定義されたURLでは、動作せずreturnする
chrome.storage.sync.get( {exclude_urls: '' }, (result)=>{
  if( result.exclude_urls != '' ){
    const urls = result.exclude_urls.split('\n');
    for(let i=0,max=urls.length; i<max; i++){
      if( urls[i] == '') continue;
      let regex = new RegExp(urls[i]);
      if(regex.test(location.href)){
        return;
      }
    }
  }
  // 動的にTITLEを更新するサイト対策で、遅延処理する
  timeout1 = window.setTimeout(mtt, 1000);
  timeout2 = window.setTimeout(watchTitleTag, 1200);
});

const mtt = () => {
  let msg = document.title;

  // インジケーターの書式を設定する
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

  // ダブルクリックで消す
  indicator.addEventListener('dblclick', (ev)=>{
    let elm = ev.target;
    elm.style.display = 'none';
  });
  document.body.appendChild(indicator);

  indicator.style.width = (calcTitleWidth() + textOffsetPixel) + 'px';
  indicator.id = 'pageTitleIndicator';
  indicator.textContent = msg;
}

// SPAで動的に書き換えられたTITLEを追跡する
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


// マルチバイト文字の長さを再計算して要素に適用する
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