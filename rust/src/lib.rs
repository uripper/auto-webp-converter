use wasm_bindgen::prelude::*;
use std::io::Cursor;
use image::{ImageFormat, load};

mod utils;
mod converter;

#[wasm_bindgen]
pub struct File {
    name: String,
    data: Vec<u8>,
}

#[wasm_bindgen]
impl File {
    #[wasm_bindgen(constructor)]
    pub fn new(name: String, data: Vec<u8>) -> File {
        File { name, data }
    }

    #[wasm_bindgen]
    pub fn name(&self) -> String {
        self.name.clone()
    }

    #[wasm_bindgen]
    pub fn data(&self) -> Vec<u8> {
        self.data.clone()
    }
}

#[wasm_bindgen]
pub fn convert(file: &File) -> Result<File, JsValue> {
    let cursor = Cursor::new(&file.data);
    let img = load(cursor, ImageFormat::WebP).map_err(|e| e.to_string())?;
    let mut buffer = Vec::new();
    img.write_to(&mut buffer, ImageFormat::Png).map_err(|e| e.to_string())?;
    Ok(File::new(file.name.clone(), buffer))
}