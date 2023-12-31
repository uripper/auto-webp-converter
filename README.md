# WebP to PNG Chrome Extension

## Description
This Google Chrome extension automatically converts .webp image files to .png format during downloads. It listens for download events, checks if the downloaded file is a WebP image, and converts it to PNG before saving it to the disk.

## Setup
1. Clone the repository with `git clone https://github.com/uripper/auto-webp-converter.git`
2. Open your Google Chrome or Chromium Browser.
3. Navigate to `chrome://extensions/`
4. Check the box  Developer mode in the top right.
5. Click "Load Unpacked" and select the src folder of this cloned repository.

## Usage
After installing the extension, it works automatically. Whenever you download a .webp file, the extension will detect it, convert it to .png format and then save it to your default download location.

## Limitations
This extension only works with .webp files that are being downloaded. It does not currently have the ability to choose the filename, where the file will be saved, or output format. These are all things that will hopefully be added.

## Future Improvements
In the future, we want to add more image conversion options and provide a user-friendly options page where users can customize their image download preferences.

## Contributing
Please feel free to fork, clone, and submit PRs for improvements. All contributions are welcome!

