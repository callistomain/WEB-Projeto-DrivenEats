// Init
let dish, drink, dessert, prices, total;
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const items = document.querySelectorAll(".item");
inputs.forEach(e => e.addEventListener("click", validateForm));

// Functions 
function validateForm() {
    if (form.checkValidity()) {
        const button = document.querySelector("button");
        button.textContent = "Fechar pedido";
        button.classList.replace("disabled", "enabled");
        button.addEventListener("click", confirmOrder);
        inputs.forEach(e => e.removeEventListener("click", validateForm));
    }
}

function confirmOrder() {
    const names = document.querySelectorAll("input:checked + label h4");
    const values = document.querySelectorAll("input:checked + label h5");

    [dish, drink, dessert] = [...names].map(e => e.textContent);
    prices = [...values].map(e => priceToNumber(e.textContent));
    total = prices.reduce((a, b) => a + b, 0).toFixed(2);

    // Update DOM
    const titles = [dish, drink, dessert];
    for (let i = 0; i < 3; i++) {
        items[i].children[0].textContent = titles[i];
        items[i].children[1].textContent = prices[i].toFixed(2).replace(".", ",");
    }
    items[3].children[1].textContent = "R$ " + total.replace(".", ",");
    toggleConfirmScreen();
}

function executeOrder() {
    const nome = prompt("Qual o seu nome?");
    const endereco = prompt("Qual o seu endereço?");
    const url = "https://wa.me/5511996807608?text=" + encodeURIComponent(
        `Olá, gostaria de fazer o pedido:\n- Prato: ${dish}\n- Bebida: ${drink}\n- Sobremesa: ${dessert}\nTotal: R$ ${total}\n\nNome: ${nome}\nEndereço: ${endereco}`
    );
    window.open(url, '_blank').focus();
}

// Helpers
function priceToNumber(str) {
    return +str.replace("R$ ", "").replace(",", ".");
}

function toggleConfirmScreen() {
    document.querySelector(".confirm-wrapper").classList.toggle("hide");
}