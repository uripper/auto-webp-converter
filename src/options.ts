import { saveOptions, loadOptions } from './background';

document.addEventListener('DOMContentLoaded', loadOptions);
const saveButton = document.getElementById('saveOption');
if (saveButton) {
    saveButton.addEventListener('click', saveOptions);
}
