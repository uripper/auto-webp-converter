import { Image, convertWebpToPng } from './utils';

chrome.downloads.onDeterminingFilename.addListener(async (downloadItem, suggest) => {
  const url = downloadItem.url;
  // You might want to adjust this condition to suit your needs
  if (downloadItem.filename.endsWith('.webp')) {
    try {
      // Convert the URL of the request to a data URI
      const image = await fetch(url);
      const blob = await image.blob();
      const convertedBlob = await convertWebpToPng(blob);
      const blobUrl = URL.createObjectURL(convertedBlob);  // Create a blob URL from the blob

      // Generate a new filename
      const newFilename = downloadItem.filename.replace('.webp', '.png');
      // Suggest a new filename and URL
      suggest({ filename: newFilename, conflictAction: 'uniquify' });
      // Cancel the original download
      chrome.downloads.cancel(downloadItem.id);
      // Start a new download with the converted data
      chrome.downloads.download({ url: blobUrl, filename: newFilename });  // Download from the blob URL
    } catch (error) {
      console.error('Failed to convert image', error);
    }
  }
});



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'convertImage') {
    convertImage(request.image);
  } else if (request.message === 'saveOptions') {
    saveOptions(request.options);
  }
});

export function convertImage(image: Image): void {
  const blob = dataURItoBlob(image.src);
  if (!blob) {
    console.error('Failed to convert image to blob');
    return;
  }
  convertWebpToPng(blob).then((convertedBlob) => {
    console.log('Image converted successfully');
    // Do something with the converted blob here
  }).catch((error) => {
    console.error(error);
  });
}

export function saveToLocalStorage(key: string, value: any): void {
  chrome.storage.local.set({ [key]: value }, function() {
    console.log('Value is set to ' + value);
  });
}
export function loadFromLocalStorage(key: string): void {
  chrome.storage.local.get([key], function(result) {
    console.log('Value currently is ' + result.key);
  });
}

export function dataURItoBlob(dataURI: string): Blob | null {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([intArray], { type: mimeString });
  return blob;
}

export function saveOptions(options: any): void {
  chrome.storage.sync.set({ 'options': options }, function() {
    console.log('Options saved');
  });
}
export function loadOptions(): void {
  chrome.storage.sync.get('options', function(result) {
    console.log('Options loaded');
  });
}