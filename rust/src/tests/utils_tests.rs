use wasm_bindgen_test::*;
use crate::utils::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_file_conversion() {
    let file = File {
        name: String::from("test.webp"),
        data: vec![0, 1, 2, 3, 4],
        format: String::from("webp"),
    };

    let converted_file = convert_file_to_png(file.clone());
    assert_eq!(converted_file.format, "png");

    let converted_file = convert_file_to_jpg(file.clone());
    assert_eq!(converted_file.format, "jpg");
}

#[wasm_bindgen_test]
fn test_file_conversion_failure() {
    let file = File {
        name: String::from("test.txt"),
        data: vec![0, 1, 2, 3, 4],
        format: String::from("txt"),
    };

    let result = std::panic::catch_unwind(|| {
        convert_file_to_png(file.clone())
    });
    assert!(result.is_err());

    let result = std::panic::catch_unwind(|| {
        convert_file_to_jpg(file.clone())
    });
    assert!(result.is_err());
}