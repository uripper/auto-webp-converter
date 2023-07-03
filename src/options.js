const wasmModule = require('./rust_to_wasm/target/wasm32-unknown-unknown/release/wasm_module.wasm');

document.addEventListener('DOMContentLoaded', function() {
    let saveButton = document.getElementById('save');
    saveButton.addEventListener('click', function() {
        wasmModule.save_options();
    });

    let loadButton = document.getElementById('load');
    loadButton.addEventListener('click', function() {
        wasmModule.load_options();
    });
});

wasmModule.init();