//desired formats are either png or jpg

#[derive(Debug, PartialEq)]
pub enum Format {
    Png,
    Jpg,
}


#[derive(Debug, PartialEq)]
pub struct UserSettings {
    pub format: Format,
}

impl UserSettings {
    pub fn get_format() -> Format {
        let format = Format::Png;
        format
    }
}