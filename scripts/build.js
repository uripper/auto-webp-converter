const { exec } = require('child_process');

// Compile Rust to WASM
exec('wasm-pack build --target web', (error, stdout, stderr) => {
    if (error) {
        console.log(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Stdout: ${stdout}`);
});

// Run Webpack
exec('webpack --config build/webpack.config.js', (error, stdout, stderr) => {
    if (error) {
        console.log(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Stdout: ${stdout}`);
});