const toggleButton = document.getElementById("themeToggle");
const body = document.body;

toggleButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggleButton.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

// BOTON PARA MOSTRAR FORMULARIO DE CONTACTO
const btnContacto = document.getElementById("contacto-menu");

btnContacto.addEventListener("click", mostrarFormulario);

function mostrarFormulario() {
  const formulario = document.querySelector("form");
  if (formulario.classList.contains("hidden")) {
    formulario.classList.remove("hidden");
  }
}
