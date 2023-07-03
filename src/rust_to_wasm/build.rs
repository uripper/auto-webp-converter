use std::process::Command;

fn main() {
    let output = Command::new("cargo")
        .args(&["build", "--target", "wasm32-unknown-unknown", "--release"])
        .output()
        .expect("Failed to execute command");

    if !output.status.success() {
        panic!("Command executed with faulty exit code");
    }

    Command::new("wasm-bindgen")
        .args(&[
            "target/wasm32-unknown-unknown/release/wasm_module.wasm",
            "--out-dir",
            ".",
        ])
        .output()
        .expect("Failed to execute command");
}