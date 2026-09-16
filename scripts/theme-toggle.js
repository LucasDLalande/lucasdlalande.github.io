const button = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");
function updateThemeIcon() {
  if (document.body.classList.contains("dark-mode")) {
    icon.src = "/assets/icons/sun.svg";
  } else {
    icon.src = "/assets/icons/moon.svg";
  }
}
button.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  updateThemeIcon();
});
/* Restore previous theme */
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}
updateThemeIcon();