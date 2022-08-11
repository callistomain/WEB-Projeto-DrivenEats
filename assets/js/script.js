// Variables
const form = document.querySelector("form");

// Sorting inputs
let inputs = [];
for (const element of form.elements) {
    if (element.type !== "fieldset") inputs.push(element);
}

// Execute
addInputListeners();

// Functions 
function validateForm() {
    if (form.checkValidity()) {
        const button = document.querySelector("button");
        button.textContent = "Fechar pedido";
        button.classList.replace("disabled", "enabled");
        button.addEventListener("click", executeOrder);
        removeInputListeners();
    }
}

function executeOrder() {
    const names = document.querySelectorAll("input:checked + label > div h4");
    const prices = document.querySelectorAll("input:checked + label > div h5");

    const [dish, drink, dessert] = [...names].map(e => e.textContent);
    const total = [...prices].reduce((a, b) => a + priceToNumber(b.textContent), 0).toFixed(2);

    const url = "https://wa.me/5511996807608?text=" + encodeURIComponent(
        `Olá, gostaria de fazer o pedido:\n- Prato: ${dish}\n- Bebida: ${drink}\n- Sobremesa: ${dessert}\nTotal: R$ ${total}`
    );
    openInNewTab(url);
}

// Helpers
function addInputListeners() {
    inputs.forEach(e => e.addEventListener("click", validateForm));
}

function removeInputListeners() {
    inputs.forEach(e => e.removeEventListener("click", validateForm));
}

function priceToNumber(str) {
    return Number(str.replace("R$ ", "").replace(",", "."));
}

function openInNewTab(url) {
    window.open(url, '_blank').focus();
}
