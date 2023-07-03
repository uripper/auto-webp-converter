// Importing the WASM module
const wasmModule = chrome.runtime.getURL('src/rust_to_wasm/target/wasm32-unknown-unknown/release/wasm_module.wasm');

let wasm;

// Fetching and instantiating the WASM module
fetch(wasmModule)
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes, {}))
  .then(results => {
    wasm = results.instance;
  });

// Listening for messages from the popup, options, and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'callWasmFunction') {
    // Calling a function from the WASM module
    const result = wasm.exports[request.functionName](...request.arguments);
    sendResponse({ result });
  }
});

// Sending a message to the popup, options, and content scripts when the WASM module is ready
chrome.runtime.sendMessage({ action: 'wasmReady' });