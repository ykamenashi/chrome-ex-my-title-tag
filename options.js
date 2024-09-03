document.getElementById('change_btn').addEventListener('click', async (e) =>{
    let area_value = document.getElementById('prefix').value;
    if( area_value != ''){
        let options = {
            exclude_urls: area_value
        }
        await chrome.storage.sync.set(options);
        alert('リストを更新しました');
    }
})

chrome.storage.sync.get( { exclude_urls: '' }, (result)=>{
    document.getElementById('prefix').value = result.exclude_urls;
})
