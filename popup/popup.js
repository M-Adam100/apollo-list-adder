document.querySelector('#pages').addEventListener('change',(e) => {
    chrome.storage.local.set({ number: document.querySelector('#pages').value})
})

document.querySelector('#Save_Settings').addEventListener('click',(e) => {
  chrome.storage.local.set({
    number: document.querySelector('#pages').value,
    listName: document.querySelector('#list').value
  })
})

document.querySelector('#Clear_Data').addEventListener('click',(e) => {
  chrome.storage.local.set({
    number: null,
    listName: null
  })
 document.querySelector('#pages').value = '';
 document.querySelector('#list').value = '';
})


document.querySelector('#Save_Data').addEventListener('click', () => {
    const query = { active: true, currentWindow: true };
    function callback(tabs) {
        const currentTab = tabs[0]; 
        chrome.scripting.executeScript(
            {
              target: {tabId: currentTab.id},
              files: ['scripts/add-data-to-list.js']
            },
            () => { console.log("Executed Script")});
      }

    chrome.tabs.query(query, callback);
})

const setUI = () => {
  chrome.storage.local.get(['number', 'listName'], CS => {
    if (CS.number) document.querySelector('#pages').value = CS.number;
    if (CS.listName) document.querySelector('#list').value = CS.listName
  })
}

setUI();








