use std::process::Command;

fn main() {
    let output = Command::new("wasm-pack")
        .arg("build")
        .arg("--target")
        .arg("web")
        .arg("--out-name")
        .arg("wasm")
        .arg("--out-dir")
        .arg("../extension")
        .output()
        .expect("Failed to execute command");

    if !output.status.success() {
        panic!("Failed to compile Rust to WASM: {}", String::from_utf8_lossy(&output.stderr));
    }
}