

(async () => {
  alert('Started Adding People');

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function randomIntFromInterval(min, max) {  
  return Math.floor(Math.random() * (max - min + 1) + min)
}

  const getWalmartStorage = async ()  => {
		const data = await chrome.storage.local.get(['number', 'listName'])
		return data ;
	};

  const addPeople = async () => {
    return new Promise(async (resolve, reject) => {
      const sideBar = document.querySelector('.finder-explorer-sidebar-shown');
      const mainDiv = sideBar.querySelector('div').nextElementSibling
      mainDiv.querySelector('[data-input="checkbox"]')?.click();
      await sleep(1000);
      document.querySelector('div.apolloio-css-vars-reset.zp-overlay')?.querySelector('a')?.click()
      await sleep(1000);
      document.querySelector('.apollo-icon-plus').nextSibling?.click();
      await sleep(300);
      const interval = setInterval(async () => {
        const dialog = document.querySelector('.zp-modal-content')?.querySelector('.apolloio-css-vars-reset');
        const input = dialog.querySelector('.Select.Select--multi.is-searchable')?.querySelector('input.Select-input');
        if (input && input!= '') {
          clearInterval(interval);
          await setInput(input, listName);
          dialog.querySelector('[class="Select-option is-focused"]')?.click();
          await sleep(1000);
          dialog.querySelector('[data-cy="confirm"]')?.click();
          console.log('Next Page');
          document.querySelector('img[src="https://app.apollo.io/images/nav-arrow-next-white.svg"]')?.click();
          resolve(true);
        }
      }, 1000)
		});
    
  }
	

  function setInput(temp, value) {
   return new Promise((resolve, reject) => {
    const prototype = Object.getPrototypeOf(temp);
    const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
    prototypeValueSetter.call(temp, value);
    temp.dispatchEvent(new Event('input', { bubbles: true }));
    resolve(true);
   })
    
  }


  const CS = await getWalmartStorage();
  const pages = Number(CS.number);
  const listName = CS.listName;
    if (pages > 0 && CS.listName) {
      for (let i = 1; i <= pages; i++) {
        const delay = randomIntFromInterval(7, 15);
        console.log("Page # ", i);
        await addPeople();
        console.log(`Waiting for ${delay} Seconds`)
        await sleep(delay * 1000);
      }
      alert('Finished Adding!');
    } else alert("Invalid PageNumber/ListName Number");
   
})()
