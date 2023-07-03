let options = {
  convertTo: 'png',
  autoConvert: true
};

chrome.storage.sync.get('options', (data) => {
  if (data.options) {
      options = data.options;
  }
});

function getOptions() {
  return options;
}

function setOptions(newOptions) {
  options = newOptions;
  chrome.storage.sync.set({options: newOptions});
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'options') {
      if (request.method === 'get') {
          sendResponse(getOptions());
      } else if (request.method === 'set') {
          setOptions(request.data);
          sendResponse({status: 'success'});
      }
  }
});