use wasm_bindgen::prelude::*;
use image::DynamicImage;
use image::codecs::webp::WebPDecoder;
use crate::settings::{UserSettings, Format};
use wasm_bindgen::JsValue;
use js_sys::Uint8Array;
use std::io::Cursor;

#[wasm_bindgen]
pub struct Converter {}

#[wasm_bindgen]
impl Converter {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Converter {
        Converter {}
    }

    #[wasm_bindgen]
    pub fn convert(&self, data: &JsValue) -> Result<JsValue, JsValue> {
        let user_format = UserSettings::get_format();
        let u8_data = Uint8Array::new(data);
        let cursor = Cursor::new(u8_data.to_vec());

        // Directly create a WebPDecoder
        let img = WebPDecoder::new(cursor).map_err(|e| e.to_string())?;
        let img = DynamicImage::from_decoder(img).map_err(|e| e.to_string())?;

        // Convert the image to the user's desired format
        let converted = match user_format {
            Format::Png => img.to_rgba8(),
            Format::Jpg => img.to_rgba8(),
        };

        // Convert the image to memory
        let mut buffer = Vec::new();
        match user_format {
            Format::Png => image::codecs::png::PngEncoder::new(&mut buffer).encode(&converted, converted.width(), converted.height(), image::ColorType::Rgba8),
            Format::Jpg => image::codecs::jpeg::JpegEncoder::new(&mut buffer).encode(&converted, converted.width(), converted.height(), image::ColorType::Rgb8),
        }.map_err(|e| e.to_string())?;

        let array = Uint8Array::from(&buffer[..]);
        Ok(JsValue::from(array))
    }
}
