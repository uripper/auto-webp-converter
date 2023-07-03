use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_main() {
    let converter = crate::converter::Converter::new();
    assert!(converter.is_ok(), "Failed to create converter");

    let file = crate::File::new("test.webp", "image/webp");
    assert!(file.is_ok(), "Failed to create file");

    let result = converter.unwrap().convert(file.unwrap());
    assert!(result.is_ok(), "Failed to convert file");

    let converted_file = result.unwrap();
    assert_eq!(converted_file.mime_type, "image/png", "Failed to convert to png");
}