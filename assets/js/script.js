document.addEventListener("DOMContentLoaded", function () {
  console.log('%cHello, done', 'color: #0099ff; font-size: 30px; font-weight: bold');

  // === 🔧 ELEMENTS ===
  const h1 = document.getElementById("title");
  const modal = document.getElementById("settingsModal");
  const closeModal = document.getElementById("closeModal");
  const resetChanges = document.getElementById("resetChanges");
  const newTextInput = document.getElementById("newTextInput");

  const colorInputs = {
    color1: document.getElementById("color1Input"),
    color2: document.getElementById("color2Input"),
    color3: document.getElementById("color3Input"),
    color4: document.getElementById("color4Input")
  };

  const defaultColors = {
    color1: "#ff00cc",
    color2: "#333399",
    color3: "#000000",
    color4: "#00ffee"
  };

  // === 🍪 COOKIES ===
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;

    console.log(`%cCookies ${name} set!`, 'color:rgb(255, 30, 0); font-size: 14px');
    console.log(`%cValue: ${value}`, 'color: #2196F3; font-size: 14px');
    console.log(`%cExpires: ${expires}`, 'color: #FF9800; font-size: 12px');
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let c of ca) {
      c = c.trim();
      if (c.startsWith(nameEQ)) return decodeURIComponent(c.substring(nameEQ.length));
    }
    return null;
  }

  // === 💾 CHARGEMENT INIT. ===
  const savedText = getCookie("words");
  h1.innerText = savedText || "Press Space";
  h1.setAttribute("data-text", h1.innerText);

  Object.keys(colorInputs).forEach(color => {
    const saved = getCookie(color);
    if (saved) {
      document.documentElement.style.setProperty(`--${color}`, saved);
    }
  });

  // === 🧠 FUNCTIONS ===
  function updateText() {
    console.log(`%cSettings window closed`, 'color: #F44336; font-size: 16px; font-weight: bold; background-color: #00796b; padding: 6px 12px; border-radius: 8px;');
    h1.innerText = newTextInput.value;
    setCookie("words", h1.innerText, 365);
  }

  // === 🎹 KEYBOARD ===
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && modal.style.display !== 'flex') {
      modal.style.display = 'flex';
      newTextInput.value = h1.innerText;
      console.log(`%cSettings window opened`, 'color:rgb(116, 241, 104); font-size: 16px; font-weight: bold; background-color: #00796b; padding: 6px 12px;');
    } else if ((event.code === 'Escape' || event.code === 'Enter') && modal.style.display === 'flex') {
      modal.style.display = 'none';
      updateText();
    }
  });

  // === ✖️ CLOSE MODAL ===
  closeModal?.addEventListener("click", () => {
    modal.style.display = 'none';
    updateText();
  });

  // === 📝 INPUT TEXTE (50 char max) ===
  newTextInput.addEventListener('input', () => {
    if (newTextInput.value.length > 50) {
      newTextInput.value = newTextInput.value.slice(0, 50);
    }
  });

  // === 🔄 RESET === (not activated)
  resetChanges?.addEventListener('click', () => {
    Object.keys(defaultColors).forEach(color => {
      document.documentElement.style.setProperty(`--${color}`, defaultColors[color]);
      colorInputs[color].value = defaultColors[color];
      setCookie(color, defaultColors[color], 365);
    });
  });

  // === 🎨 COLORS ===
  Object.entries(colorInputs).forEach(([color, input]) => {
    input?.addEventListener("input", function () {
      document.documentElement.style.setProperty(`--${color}`, this.value);
      setCookie(color, this.value, 365);
    });
  });
});
