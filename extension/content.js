```javascript
const wasm = import('wasm');

chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
    if (downloadItem.filename.endsWith('.webp') || downloadItem.filename.endsWith('.avif')) {
        const newFilename = downloadItem.filename.replace(/\.webp$|\.avif$/, '.png');
        suggest({filename: newFilename, conflictAction: 'uniquify'});
    }
});

chrome.downloads.onCreated.addListener(downloadItem => {
    if (downloadItem.filename.endsWith('.png')) {
        const fileReader = new FileReader();
        fileReader.onload = async function() {
            const arrayBuffer = this.result;
            const uint8Array = new Uint8Array(arrayBuffer);
            const converter = await wasm.then(m => m.Converter.new(uint8Array));
            const convertedFile = converter.convert();
            const blob = new Blob([convertedFile], {type: 'image/png'});
            const url = URL.createObjectURL(blob);
            chrome.downloads.download({url: url, filename: downloadItem.filename});
        };
        fileReader.readAsArrayBuffer(downloadItem);
    }
});
```