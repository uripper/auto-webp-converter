use wasm_bindgen::prelude::*;
use std::io::Read;

mod converter;
mod utils;

#[wasm_bindgen]
pub fn convert(file: JsValue) -> Result<JsValue, JsValue> {
    let file: utils::File = file.into_serde().unwrap();
    let converted_file = converter::convert(file)?;
    Ok(JsValue::from_serde(&converted_file).unwrap())
}

#[cfg(test)]
mod tests {
    use super::*;
    use wasm_bindgen_test::*;

    #[wasm_bindgen_test]
    fn test_convert() {
        let file = utils::File {
            name: String::from("test.webp"),
            data: vec![],
            format: String::from("webp"),
        };
        let result = convert(JsValue::from_serde(&file).unwrap());
        assert!(result.is_ok());
    }
}