export function convertWebpToPng(webp: Blob): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const context = canvas.getContext('2d');
                context.drawImage(img, 0, 0, img.width, img.height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject(new Error('Image conversion failed'));
                    }
                }, 'image/png');
            };
            img.src = URL.createObjectURL(new Blob([event.target.result]));
        };
        reader.readAsArrayBuffer(webp);
    });
}

export function saveToLocalStorage(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.set({ [key]: value }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve();
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

export function loadFromLocalStorage(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(key, (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result[key]);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}