function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, val] = cookie.split("=");
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}

function applyPreferences() {
  const fontSize = getCookie("fontsize") || "16";
  const fontColor = getCookie("fontcolor") || "#000000";

  // Apply to inputs
  document.querySelector("#fontsize").value = fontSize;
  document.querySelector("#fontcolor").value = fontColor;

  // Apply to CSS variables
  document.documentElement.style.setProperty("--fontsize", fontSize + "px");
  document.documentElement.style.setProperty("--fontcolor", fontColor);
}

document.addEventListener("DOMContentLoaded", function () {
  applyPreferences();

  const saveBtn = document.querySelector('input[type="submit"]');
  saveBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission

    const fontSize = document.querySelector("#fontsize").value;
    const fontColor = document.querySelector("#fontcolor").value;

    // Save cookies
    setCookie("fontsize", fontSize);
    setCookie("fontcolor", fontColor);

    // Apply immediately
    applyPreferences();
  });
});
