import { Image } from './utils';

class CustomImage extends Image {
    async convertToPng(): Promise<string> {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Could not get 2d context from canvas');
        }

        ctx.drawImage(this, 0, 0);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    throw new Error('Could not create blob from canvas');
                }

                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    if (typeof base64data !== 'string') {
                        throw new Error('Could not convert blob to base64 string');
                    }
                    resolve(base64data);
                };
            }, 'image/png');
        });
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'convertImage') {
        const image = new CustomImage(request.data);
        image.convertToPng().then((png: any) => {
            sendResponse({ type: 'convertImage', data: png });
        });
    }
    return true; // keeps the message channel open until sendResponse is called
});