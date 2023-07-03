```rust
use std::io::Read;
use wasm_bindgen::prelude::*;
use image::{ImageFormat, ImageDecoder};

#[wasm_bindgen]
pub struct Converter {}

#[wasm_bindgen]
impl Converter {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Converter {
        Converter {}
    }

    #[wasm_bindgen]
    pub fn convert_to_png(&self, data: &[u8]) -> Vec<u8> {
        let cursor = std::io::Cursor::new(data);
        let decoder = image::png::PngDecoder::new(cursor).unwrap();
        let mut buffer = vec![0; decoder.total_bytes() as usize];
        decoder.read_image(&mut buffer).unwrap();
        buffer
    }

    #[wasm_bindgen]
    pub fn convert_to_jpg(&self, data: &[u8]) -> Vec<u8> {
        let cursor = std::io::Cursor::new(data);
        let decoder = image::jpeg::JpegDecoder::new(cursor).unwrap();
        let mut buffer = vec![0; decoder.total_bytes() as usize];
        decoder.read_image(&mut buffer).unwrap();
        buffer
    }
}
```