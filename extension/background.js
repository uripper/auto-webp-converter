// Importing WASM module
const wasm = import('../pkg/converter');

// Listening for downloads
chrome.downloads.onCreated.addListener((downloadItem) => {
  if (downloadItem.filename.endsWith('.webp') || downloadItem.filename.endsWith('.avif')) {
    chrome.downloads.cancel(downloadItem.id, () => {
      convertFile(downloadItem);
    });
  }
});

// Function to convert file
async function convertFile(downloadItem) {
  const { converter } = await wasm;
  const file = await fetch(downloadItem.url).then(response => response.arrayBuffer());
  const convertedFile = converter.convert(file, downloadItem.filename);
  downloadConvertedFile(convertedFile, downloadItem.filename);
}

// Function to download converted file
function downloadConvertedFile(file, filename) {
  const url = URL.createObjectURL(new Blob([file]));
  const downloadOptions = {
    url: url,
    filename: filename.replace(/\.webp$|\.avif$/, '.png'),
    conflictAction: 'uniquify'
  };
  chrome.downloads.download(downloadOptions);
}

// Listening for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === 'convert') {
    convertFile(request.file);
  } else if (request.command === 'options') {
    chrome.runtime.openOptionsPage();
  }
});