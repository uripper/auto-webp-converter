```rust
extern crate image;

use image::{ImageFormat, ImageDecoder, ImageError};
use std::fs::File;
use std::io::BufWriter;
use std::path::Path;

pub struct ImageConverter;

impl ImageConverter {
    pub fn convert_image(image_path: &str, output_format: ImageFormat) -> Result<String, ImageError> {
        let input_file = File::open(image_path)?;
        let decoder = image::codecs::webp::WebPDecoder::new(input_file)?;
        let output_path = format!("{}.{}", image_path, match output_format {
            ImageFormat::Png => "png",
            ImageFormat::Jpeg => "jpg",
            _ => return Err(ImageError::UnsupportedError(String::from("Unsupported output format"))),
        });
        let output_file = File::create(&output_path)?;
        let mut writer = BufWriter::new(output_file);

        match output_format {
            ImageFormat::Png => {
                let encoder = image::codecs::png::PngEncoder::new(&mut writer);
                encoder.encode(decoder.into_reader()?, decoder.dimensions().0, decoder.dimensions().1, decoder.color_type())?;
            },
            ImageFormat::Jpeg => {
                let encoder = image::codecs::jpeg::JpegEncoder::new(&mut writer);
                encoder.encode(decoder.into_reader()?, decoder.dimensions().0, decoder.dimensions().1, decoder.color_type())?;
            },
            _ => (),
        };

        Ok(output_path)
    }
}
```