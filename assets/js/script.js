// Variables
const form = document.querySelector("form");

// Sorting inputs
let inputs = [];
for (const element of form.elements) {
  if (element.type !== "fieldset") inputs.push(element);
}

// Init
addInputListeners();

// Functions
function validateForm() {
  if (form.checkValidity()) {
    const button = document.querySelector("button");
    button.textContent = "Fechar pedido";
    button.classList.replace("disabled", "enabled");
    removeInputListeners();
  }
}

function addInputListeners() {
  inputs.forEach(e => e.addEventListener("click", validateForm));
}

function removeInputListeners() {
  inputs.forEach(e => e.removeEventListener("click", validateForm));
}