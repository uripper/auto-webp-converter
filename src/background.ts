import { Image } from './utils.ts';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'convertImage') {
    convertImage(request.image);
  } else if (request.message === 'saveOptions') {
    saveOptions(request.options);
  }
});

function convertImage(image: Image): void {
  // Conversion logic here
}

function saveOptions(options: any): void {
  chrome.storage.sync.set({ 'options': options }, function() {
    console.log('Options saved');
  });
}