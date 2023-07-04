import { convertImage } from './background';
import { Image } from './utils';

document.addEventListener('DOMContentLoaded', () => {
  const convertButton = document.getElementById('convertButton');
  const optionsButton = document.getElementById('optionsButton');

  convertButton?.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.tabs.sendMessage(activeTab.id as number, { message: 'convertImage' });
      }
    });
  });

  optionsButton?.addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'convertImage') {
    const image: Image = request.image;
    convertImage(image);
  }
});