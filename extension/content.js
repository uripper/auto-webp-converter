chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "imageFound") {
      let images = document.getElementsByTagName('img');
      for (let i = 0; i < images.length; i++) {
        if (images[i].src === request.imageUrl) {
          images[i].src = request.convertedImageUrl;
          break;
        }
      }
    }
  }
);

window.onload = function() {
  let images = document.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    if (images[i].src.endsWith('.webp') || images[i].src.endsWith('.avif')) {
      chrome.runtime.sendMessage({
        message: "convertImage",
        imageUrl: images[i].src,
        imageType: images[i].src.split('.').pop()
      });
    }
  }
};