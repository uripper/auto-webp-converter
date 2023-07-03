use std::fs;
use std::io::Read;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn read_file(path: &str) -> Vec<u8> {
    let mut file = fs::File::open(path).expect("Unable to open the file");
    let mut contents = Vec::new();
    file.read_to_end(&mut contents).expect("Unable to read the file");
    contents
}

#[wasm_bindgen]
pub fn write_file(path: &str, data: &[u8]) {
    fs::write(path, data).expect("Unable to write the file");
}