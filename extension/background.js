```javascript
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeBackgroundColor({ color: '#4688F1' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'convertImage') {
    fetchImage(request.imageUrl)
      .then(imageData => convertImage(imageData, request.imageType))
      .then(convertedImage => {
        sendResponse({ action: 'conversionComplete', convertedImage });
      })
      .catch(error => {
        console.error('Error converting image:', error);
        sendResponse({ action: 'conversionFailed', error: error.message });
      });
    return true;  // Will respond asynchronously.
  }
});

function fetchImage(url) {
  return fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => new Uint8Array(buffer));
}

function convertImage(imageData, type) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('rust/src/main.rs');
    worker.onmessage = event => {
      if (event.data.action === 'conversionComplete') {
        resolve(event.data.convertedImage);
      } else if (event.data.action === 'conversionFailed') {
        reject(new Error(event.data.error));
      }
    };
    worker.postMessage({ action: 'convertImage', imageData, type });
  });
}
```