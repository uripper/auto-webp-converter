```rust
use wasm_bindgen::prelude::*;
use reqwest::Error;
use scraper::{Html, Selector};

#[wasm_bindgen]
pub struct WebScraper {
    url: String,
}

#[wasm_bindgen]
impl WebScraper {
    pub fn new(url: String) -> Self {
        WebScraper { url }
    }

    pub async fn scrape_web(&self) -> Result<(String, String), Error> {
        let resp = reqwest::get(&self.url).await?;
        let body = resp.text().await?;
        let fragment = Html::parse_document(&body);
        let image_selector = Selector::parse("img").unwrap();

        for element in fragment.select(&image_selector) {
            let image_url = element.value().attr("src").unwrap().to_string();
            let image_type = self.get_image_type(&image_url);
            if image_type == "webp" || image_type == "avif" {
                return Ok((image_url, image_type));
            }
        }

        Err(Error::new())
    }

    fn get_image_type(&self, url: &str) -> String {
        let parts: Vec<&str> = url.split('.').collect();
        parts.last().unwrap().to_string()
    }
}
```