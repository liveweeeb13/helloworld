const h1 = document.getElementById("title");
const modal = document.getElementById("settingsModal");
const closeModal = document.getElementById("closeModal");
const resetChanges = document.getElementById("resetChanges");
const newTextInput = document.getElementById("newTextInput");

const color1Input = document.getElementById("color1Input");
const color2Input = document.getElementById("color2Input");
const color3Input = document.getElementById("color3Input");
const color4Input = document.getElementById("color4Input");

const color1Preview = document.getElementById("color1Preview");
const color2Preview = document.getElementById("color2Preview");
const color3Preview = document.getElementById("color3Preview");
const color4Preview = document.getElementById("color4Preview");

const defaultColors = {
  color1: "#ff00cc",
  color2: "#333399",
  color3: "#000000",
  color4: "#00ffee"
};

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

// Check if there's a saved word in cookies and apply it
const savedText = getCookie("words");

// Only set default "Press Space" text if no saved text exists in cookies
if (savedText) {
  h1.innerText = savedText;
  h1.setAttribute("data-text", savedText);
} else {
  h1.innerText = "Press Space"; // Default text if no saved text in cookies
  h1.setAttribute("data-text", "Press Space");
}

// Check and apply saved colors from cookies
const savedColors = {
  color1: getCookie("color1"),
  color2: getCookie("color2"),
  color3: getCookie("color3"),
  color4: getCookie("color4")
};

if (savedColors.color1) document.documentElement.style.setProperty('--color1', savedColors.color1);
if (savedColors.color2) document.documentElement.style.setProperty('--color2', savedColors.color2);
if (savedColors.color3) document.documentElement.style.setProperty('--color3', savedColors.color3);
if (savedColors.color4) document.documentElement.style.setProperty('--color4', savedColors.color4);

window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    modal.style.display = 'flex';
    newTextInput.value = h1.innerText; // Set input field with current text
  } else if (event.code === 'Escape' || event.code === 'Enter') {
    modal.style.display = 'none';
    updateText(); 
  }
});

closeModal.addEventListener("click", function () {
  modal.style.display = 'none';
  updateText(); 
});

// Disable clicking outside to close the modal
// The following code is commented out to disable the "close on outside click" feature

/*
let isClickingOutside = false;
window.addEventListener('mousedown', (event) => {
  if (!modal.contains(event.target)) {
    isClickingOutside = true;
  }
});

window.addEventListener('mouseup', () => {
  if (isClickingOutside) {
    modal.style.display = 'none';
    updateText();
    isClickingOutside = false; 
  }
});
*/

// Update text and save to cookies
function updateText() {
  h1.innerText = newTextInput.value;
  setCookie("words", h1.innerText, 365); // Save new text in cookies
}

// Reset to default values
resetChanges.addEventListener('click', () => {
  // Reset colors
  document.documentElement.style.setProperty('--color1', defaultColors.color1);
  document.documentElement.style.setProperty('--color2', defaultColors.color2);
  document.documentElement.style.setProperty('--color3', defaultColors.color3);
  document.documentElement.style.setProperty('--color4', defaultColors.color4);

  // Reset input values
  color1Input.value = defaultColors.color1;
  color2Input.value = defaultColors.color2;
  color3Input.value = defaultColors.color3;
  color4Input.value = defaultColors.color4;

  // Set cookies for reset
  setCookie("color1", defaultColors.color1, 365);
  setCookie("color2", defaultColors.color2, 365);
  setCookie("color3", defaultColors.color3, 365);
  setCookie("color4", defaultColors.color4, 365);
});

// Event listeners for color input changes
color1Input.addEventListener("input", function () {
  document.documentElement.style.setProperty('--color1', this.value);
  setCookie("color1", this.value, 365);
});
color2Input.addEventListener("input", function () {
  document.documentElement.style.setProperty('--color2', this.value);
  setCookie("color2", this.value, 365);
});
color3Input.addEventListener("input", function () {
  document.documentElement.style.setProperty('--color3', this.value);
  setCookie("color3", this.value, 365);
});
color4Input.addEventListener("input", function () {
  document.documentElement.style.setProperty('--color4', this.value);
  setCookie("color4", this.value, 365);
});

/*
// Disable right-click menu 
window.addEventListener('contextmenu', (event) => {
  event.preventDefault(); // This prevents the default right-click menu
});
*/
