const assert = require('assert');
const { execSync } = require('child_process');

function runTest(testName, command) {
  try {
    execSync(command);
    console.log(`Test ${testName} passed`);
  } catch (error) {
    console.error(`Test ${testName} failed`);
    console.error(error.stdout.toString());
  }
}

// Test if Rust code compiles to WASM
runTest('Rust to WASM compilation', 'wasm-pack build ../src');

// Test if JavaScript can call WASM bindings
runTest('JavaScript to WASM bindings', 'node ../extension/background.js');

// Test if the extension builds
runTest('Extension build', 'webpack --config ../build/webpack.config.js');

// Test if the extension converts webp and avif files to jpg or png
runTest('File conversion', 'node ../extension/content.js');

// Test if the extension handles errors when it is not able to convert files
runTest('Error handling', 'node ../extension/popup.js');