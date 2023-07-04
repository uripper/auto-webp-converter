import { saveOptions, loadOptions } from './background';

document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('saveOption').addEventListener('click', saveOptions);