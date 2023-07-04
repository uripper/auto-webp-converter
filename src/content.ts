import { Image } from './utils';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'convertImage') {
        const image = new Image(request.data);
        image.convertToPng().then(png => {
            sendResponse({ type: 'convertImage', data: png });
        });
    }
    return true; // keeps the message channel open until sendResponse is called
});