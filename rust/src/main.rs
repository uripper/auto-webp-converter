```rust
use wasm_bindgen::prelude::*;
extern crate image_converter;
extern crate web_scraper;

use image_converter::convert_image;
use web_scraper::scrape_web;

#[wasm_bindgen]
fn main() {
    let image_url = scrape_web();
    let image_type = image_url.split(".").last().unwrap();

    if image_type == "webp" || image_type == "avif" {
        let converted_image = convert_image(&image_url, image_type);
        println!("Image converted successfully: {}", converted_image);
    } else {
        println!("Image is not in webp or avif format: {}", image_url);
    }
}
```