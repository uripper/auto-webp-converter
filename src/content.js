const wasmModule = require('./rust_to_wasm/target/wasm32-unknown-unknown/release/wasm_module.wasm');

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action == "callWasmFunction") {
        let result = wasmModule.wasmFunction(request.data);
        sendResponse({result: result});
    }
});

// Send a message to the background script
function sendMessageToBackgroundScript(message) {
    chrome.runtime.sendMessage({action: "messageFromContentScript", data: message}, function(response) {
        console.log(response);
    });
}

// Call a WASM function
function callWasmFunction(data) {
    let result = wasmModule.wasmFunction(data);
    return result;
}