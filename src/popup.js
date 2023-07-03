```javascript
const wasmModule = require('./rust_to_wasm/target/wasm32-unknown-unknown/release/wasm_module.wasm');

document.addEventListener('DOMContentLoaded', function() {
    let button = document.getElementById('button');
    button.addEventListener('click', function() {
        wasmModule.then(module => {
            let result = module.run();
            document.getElementById('result').textContent = result;
        });
    });
});
```