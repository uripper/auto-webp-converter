// Save options to chrome.storage
function saveOptions() {
  let conversionFormat = document.getElementById('conversionFormat').value;
  let autoConvert = document.getElementById('autoConvert').checked;
  chrome.storage.sync.set({
    conversionFormat: conversionFormat,
    autoConvert: autoConvert
  }, function() {
    // Update status to let user know options were saved.
    let status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Use default value conversionFormat = 'png' and autoConvert = true.
  chrome.storage.sync.get({
    conversionFormat: 'png',
    autoConvert: true
  }, function(items) {
    document.getElementById('conversionFormat').value = items.conversionFormat;
    document.getElementById('autoConvert').checked = items.autoConvert;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);