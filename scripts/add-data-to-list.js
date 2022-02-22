

(async () => {
  alert('Started Adding People');

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const getWalmartStorage = async ()  => {
		const data = await chrome.storage.local.get(['number', 'listName'])
		return data ;
	};

  const addPeople = async () => {
    return new Promise(async (resolve, reject) => {
      document.querySelector('[data-input="checkbox"]').click();
      await sleep(1000);
      document.querySelector('div.apolloio-css-vars-reset.zp-overlay').querySelector('a').click()
      await sleep(1000);
      document.querySelector('.apollo-icon-plus').nextSibling.click();
      await sleep(300);
      const interval = setInterval(async () => {
        const dialog = document.querySelector('.zp-modal-content').querySelector('.apolloio-css-vars-reset');
        const input = dialog.querySelector('.Select.Select--multi.is-searchable').querySelector('input.Select-input');
        if (input && input!= '') {
          clearInterval(interval);
          await setInput(input, listName);
          dialog.querySelector('[class="Select-option is-focused"]').click();
          await sleep(1000);
          dialog.querySelector('[data-cy="confirm"]').click();
          const intervalRefresh = setInterval(() => {
            const notificationDiv = document.querySelector('.rrt-middle-container');
            if(notificationDiv) {
              const divs = [...notificationDiv.querySelectorAll('div')].filter(item => item.innerText.includes("Refresh prospects"));
              if (divs.length > 0) {
                clearInterval(intervalRefresh);
                divs.reverse()[0].click();
                resolve(true);
              }
            }
          },500)
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
  console.log(CS);
  const pages = Number(CS.number);
  const listName = CS.listName;
    if (pages > 0 && CS.listName) {
      for (let i = 1; i <= pages; i++) {
        console.log("Page # ", i);
        await addPeople();
        console.log("Waiting for 2 Seconds")
        await sleep(2000);
      }
    } else alert("Invalid PageNumber/ListName Number");
   
})()
