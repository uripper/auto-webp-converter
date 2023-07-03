const wasm = import("../pkg/converter_bg.wasm");

document.getElementById("convertButton").addEventListener("click", async () => {
    const files = document.getElementById("fileList").files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === "image/webp" || file.type === "image/avif") {
            const response = await fetch(URL.createObjectURL(file));
            const buffer = await response.arrayBuffer();
            const result = await wasm.then(wasm => {
                return wasm.convert(buffer);
            });
            chrome.runtime.sendMessage({command: "convert", data: result});
        }
    }
});

document.getElementById("optionsButton").addEventListener("click", () => {
    chrome.runtime.sendMessage({command: "options"});
});