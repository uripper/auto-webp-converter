use wasm_bindgen_test::*;
use wasm_bindgen::prelude::*;
use crate::converter::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_convert_webp_to_png() {
    let file = File {
        name: String::from("test.webp"),
        data: vec![0, 1, 2, 3, 4],
        format: String::from("webp"),
    };
    let result = convert(file, String::from("png"));
    assert_eq!(result.format, "png");
}

#[wasm_bindgen_test]
fn test_convert_avif_to_jpg() {
    let file = File {
        name: String::from("test.avif"),
        data: vec![0, 1, 2, 3, 4],
        format: String::from("avif"),
    };
    let result = convert(file, String::from("jpg"));
    assert_eq!(result.format, "jpg");
}

#[wasm_bindgen_test]
fn test_convert_when_source_not_available() {
    let file = File {
        name: String::from("test.webp"),
        data: vec![0, 1, 2, 3, 4],
        format: String::from("webp"),
    };
    let result = convert(file, String::from("jpg"));
    assert_eq!(result.format, "jpg");
}