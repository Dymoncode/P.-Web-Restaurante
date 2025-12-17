const toggleButton = document.getElementById("themeToggle");
const body = document.body;

toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark");
    toggleButton.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

// Actualiza el año en el footer
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});