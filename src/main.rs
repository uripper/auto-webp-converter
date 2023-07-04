use wasm_bindgen::prelude::*;

mod converter;
mod utils;
mod settings;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct SerdeFile {
    name: String,
    data: Vec<u8>,
    format: String,
}



fn private_convert(file: JsValue) -> JsValue {
    
    let serde_file = wasm_bindgen::JsValue::from(file);
    let converter = converter::Converter::new();
    let result = converter::Converter::convert(&converter, &serde_file);
    result.unwrap()
}
pub fn main (){
#[wasm_bindgen]
pub fn convert(file: JsValue) -> JsValue {
    let file = private_convert(file);
    file
}
}