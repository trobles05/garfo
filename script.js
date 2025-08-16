// --- SELEÇÃO DE ELEMENTOS DO DOM (CARRINHO ORIGINAL) ---
const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const addressObs = document.getElementById("address-obs");

// --- SELEÇÃO DE ELEMENTOS DO DOM (MODAIS) ---
const pizzaModal = document.getElementById("pizza-modal");
const pizzaModalTitle = document.getElementById("pizza-modal-title");
const closePizzaModalBtn = document.getElementById("close-pizza-modal-btn");
const pizzaFlavorsContainer = document.getElementById(
  "pizza-flavors-container"
);
const selectedFlavorsCount = document.getElementById("selected-flavors-count");
const maxFlavorsCount = document.getElementById("max-flavors-count");
const addPizzaToCartBtn = document.getElementById("add-pizza-to-cart-btn");

const portionModal = document.getElementById("portion-modal");
const portionModalTitle = document.getElementById("portion-modal-title");
const closePortionModalBtn = document.getElementById("close-portion-modal-btn");
const portionOptionsContainer = document.getElementById(
  "portion-options-container"
);

const mealModal = document.getElementById("meal-modal");
const mealModalTitle = document.getElementById("meal-modal-title");
const closeMealModalBtn = document.getElementById("close-meal-modal-btn");
const mealOptionsContainer = document.getElementById("meal-options-container");
const mealItemTotal = document.getElementById("meal-item-total");
const addMealToCartBtn = document.getElementById("add-meal-to-cart-btn");

const sandwichModal = document.getElementById("sandwich-modal");
const sandwichModalTitle = document.getElementById("sandwich-modal-title");
const closeSandwichModalBtn = document.getElementById(
  "close-sandwich-modal-btn"
);
const sandwichOptionsContainer = document.getElementById(
  "sandwich-options-container"
);
const addSandwichToCartBtn = document.getElementById(
  "add-sandwich-to-cart-btn"
);

const drinkModal = document.getElementById("drink-modal");
const drinkModalTitle = document.getElementById("drink-modal-title");
const closeDrinkModalBtn = document.getElementById("close-drink-modal-btn");
const drinkOptionsContainer = document.getElementById(
  "drink-options-container"
);
const drinkItemTotal = document.getElementById("drink-item-total");
const addDrinkToCartBtn = document.getElementById("add-drink-to-cart-btn");

let cart = [];
// Variáveis para modais
let pizzaSize = "";
let maxFlavors = 1;
let currentDrinkType = ""; // Variável para saber qual categoria de bebida está aberta

// ===================================================================
// BANCO DE DADOS DE PRODUTOS
// ===================================================================

const pizzaFlavors = [
  {
    id: 1,
    name: "Calabresa",
    description: "Mussarela, calabresa fatiada, cebola e azeitonas.",
    img: "https://placehold.co/100x100/ef4444/white?text=Calabresa",
    price: 55.0,
  },
  {
    id: 2,
    name: "Frango com Catupiry",
    description: "Frango desfiado, catupiry cremoso, milho e azeitonas.",
    img: "https://placehold.co/100x100/f97316/white?text=Frango",
    price: 58.5,
  },
  {
    id: 3,
    name: "Portuguesa",
    description: "Presunto, mussarela, ovo, cebola, pimentão e azeitonas.",
    img: "https://placehold.co/100x100/84cc16/white?text=Portuguesa",
    price: 60.0,
  },
];

const portionsData = {
  Completa: {
    description: "Batata frita, calabresa, bacon, frango e queijo.",
    options: [
      { size: "Meia", price: 40.0 },
      { size: "Inteira", price: 65.0 },
    ],
  },
  Frango: {
    description: "Deliciosos e crocantes pedaços de frango a passarinho.",
    options: [
      { size: "Meia", price: 30.0 },
      { size: "Inteira", price: 45.0 },
    ],
  },
  "Batata Frita": {
    description: "Batatas selecionadas, fritas e crocantes. Acompanha cheddar.",
    options: [
      { size: "Meia", price: 20.0 },
      { size: "Inteira", price: 30.0 },
    ],
  },
};

const meals = {
  "Marmita do Dia": {
    options: [
      {
        name: "Frango Grelhado",
        description: "Arroz, feijão, salada e frango.",
        price: 18.0,
      },
      {
        name: "Bife Acebolado",
        description: "Arroz, feijão, salada e bife.",
        price: 20.0,
      },
      {
        name: "Feijoada",
        description: "Feijoada completa com acompanhamentos.",
        price: 25.0,
      },
    ],
  },
};

const sandwichesData = {
  Normal: [
    {
      name: "X-Burger",
      description: "Pão, hambúrguer, queijo e salada.",
      price: 15.0,
    },
    {
      name: "X-Salada",
      description: "Pão, hambúrguer, queijo, presunto e salada.",
      price: 17.0,
    },
    {
      name: "X-Bacon",
      description: "Pão, hambúrguer, queijo, bacon e salada.",
      price: 20.0,
    },
  ],
  File: [
    {
      name: "X-Filé Mignon",
      description: "Pão, filé mignon, queijo, cebola e salada.",
      price: 28.0,
    },
    {
      name: "X-Filé Tudo",
      description: "Pão, filé mignon, queijo, presunto, ovo, bacon e salada.",
      price: 32.0,
    },
  ],
  Frango: [
    {
      name: "X-Frango",
      description: "Pão, filé de frango, queijo e salada.",
      price: 18.0,
    },
    {
      name: "X-Frango Catupiry",
      description: "Pão, filé de frango, catupiry, milho e salada.",
      price: 22.0,
    },
  ],
};

const drinksData = {
  Refrigerantes: [
    { name: "Coca-Cola Lata", price: 7.0 },
    { name: "Guaraná Lata", price: 6.0 },
    { name: "Coca-Cola 2L", price: 12.0 },
  ],
  Sucos: [
    { name: "Suco de Laranja (500ml)", price: 9.0 },
    { name: "Suco de Abacaxi (500ml)", price: 9.0 },
  ],
  Cervejas: [
    { name: "Heineken Long Neck", price: 10.0 },
    { name: "Budweiser Long Neck", price: 9.0 },
  ],
};

// ===================================================================
// LÓGICA DOS MODAIS (PIZZA, PORÇÃO, MARMITA, LANCHE, BEBIDA)
// ===================================================================

// --- Abertura dos Modais ---
menu.addEventListener("click", function (event) {
  const chooseFlavorBtn = event.target.closest(".choose-flavor-btn");
  if (chooseFlavorBtn) {
    pizzaSize = chooseFlavorBtn.getAttribute("data-size");
    maxFlavors = parseInt(chooseFlavorBtn.getAttribute("data-flavors"));
    openPizzaModal(pizzaSize, maxFlavors);
    return;
  }

  const choosePortionBtn = event.target.closest(".choose-portion-btn");
  if (choosePortionBtn) {
    openPortionModal();
    return;
  }

  const chooseMealBtn = event.target.closest(".choose-meal-btn");
  if (chooseMealBtn) {
    openMealModal();
    return;
  }

  const chooseSandwichBtn = event.target.closest(".choose-sandwich-btn");
  if (chooseSandwichBtn) {
    const sandwichType = chooseSandwichBtn.getAttribute("data-sandwich-type");
    openSandwichModal(sandwichType);
    return;
  }

  const chooseDrinkBtn = event.target.closest(".choose-drink-btn");
  if (chooseDrinkBtn) {
    const drinkType = chooseDrinkBtn.getAttribute("data-drink-type");
    openDrinkModal(drinkType);
    return;
  }
});

// --- Lógica do Modal de Pizzas ---
function openPizzaModal(size, flavors) {
  pizzaModalTitle.textContent = `Monte sua Pizza ${size}`;
  maxFlavorsCount.textContent = flavors;
  selectedFlavorsCount.textContent = 0;

  pizzaFlavorsContainer.innerHTML = "";
  pizzaFlavors.forEach((flavor) => {
    const flavorElement = document.createElement("div");
    flavorElement.classList.add("flavor-item");
    flavorElement.innerHTML = `
      <img src="${flavor.img}" alt="${flavor.name}">
      <div class="flavor-details"><h4>${flavor.name}</h4><p>${
      flavor.description
    }</p></div>
      <div class="flavor-price-action"><span>R$ ${flavor.price.toFixed(
        2
      )}</span><button class="select-flavor-btn" data-name="${
      flavor.name
    }" data-price="${flavor.price}">Selecionar</button></div>
    `;
    pizzaFlavorsContainer.appendChild(flavorElement);
  });

  updatePizzaModalFooter();
  pizzaModal.classList.add("active");
}

pizzaFlavorsContainer.addEventListener("click", function (event) {
  const selectFlavorBtn = event.target.closest(".select-flavor-btn");
  if (selectFlavorBtn) {
    const flavorItem = selectFlavorBtn.closest(".flavor-item");
    const selectedFlavors =
      pizzaFlavorsContainer.querySelectorAll(".selected").length;

    if (flavorItem.classList.contains("selected")) {
      flavorItem.classList.remove("selected");
      selectFlavorBtn.textContent = "Selecionar";
    } else {
      if (selectedFlavors < maxFlavors) {
        flavorItem.classList.add("selected");
        selectFlavorBtn.textContent = "Remover";
      } else {
        Toastify({
          text: `Você só pode escolher até ${maxFlavors} sabor(es).`,
          duration: 3000,
          gravity: "top",
          position: "right",
          style: { background: "#ef4444" },
        }).showToast();
      }
    }
    updatePizzaModalFooter();
  }
});

function updatePizzaModalFooter() {
  const selectedFlavors = pizzaFlavorsContainer.querySelectorAll(".selected");
  selectedFlavorsCount.textContent = selectedFlavors.length;
  addPizzaToCartBtn.disabled = selectedFlavors.length !== maxFlavors;
  addPizzaToCartBtn.classList.toggle(
    "disabled",
    selectedFlavors.length !== maxFlavors
  );
}

addPizzaToCartBtn.addEventListener("click", function () {
  const selectedFlavorItems = pizzaFlavorsContainer.querySelectorAll(
    ".selected .select-flavor-btn"
  );
  let flavorNames = [],
    prices = [];
  selectedFlavorItems.forEach((item) => {
    flavorNames.push(item.getAttribute("data-name"));
    prices.push(parseFloat(item.getAttribute("data-price")));
  });
  const finalName = `Pizza ${pizzaSize} (${flavorNames.join(" / ")})`;
  const finalPrice = Math.max(...prices);
  addToCart(finalName, finalPrice);
  Toastify({
    text: "Pizza adicionada ao carrinho!",
    duration: 3000,
    gravity: "top",
    position: "right",
    style: { background: "#22c55e" },
  }).showToast();
  closePizzaModal();
});

function closePizzaModal() {
  pizzaModal.classList.remove("active");
}
closePizzaModalBtn.addEventListener("click", closePizzaModal);
pizzaModal.addEventListener("click", (event) => {
  if (event.target === pizzaModal) closePizzaModal();
});

// --- Lógica do Modal de Porções ---
function openPortionModal() {
  portionModalTitle.textContent = `Escolha sua Porção`;
  portionOptionsContainer.innerHTML = "";
  Object.keys(portionsData).forEach((portionName, index) => {
    const portionInfo = portionsData[portionName];
    const optionElement = document.createElement("div");
    optionElement.classList.add("option-item");
    const sizeOptionsHtml = portionInfo.options
      .map(
        (opt, sizeIndex) => `
            <input type="radio" id="portion_${index}_size_${sizeIndex}" name="portion_size_${index}" value="${
          opt.price
        }" data-size="${opt.size}">
            <label for="portion_${index}_size_${sizeIndex}">${
          opt.size
        } (R$ ${opt.price.toFixed(2)})</label>
        `
      )
      .join("");
    optionElement.innerHTML = `
            <div class="flavor-details"><h4>${portionName}</h4><p>${portionInfo.description}</p></div>
            <div class="portion-size-options">${sizeOptionsHtml}</div>
            <button class="add-portion-option-btn" data-name="${portionName}" disabled>Adicionar</button>
        `;
    portionOptionsContainer.appendChild(optionElement);
  });
  portionModal.classList.add("active");
}

portionOptionsContainer.addEventListener("change", function (event) {
  if (event.target.type === "radio") {
    const addButton = event.target
      .closest(".option-item")
      .querySelector(".add-portion-option-btn");
    addButton.disabled = false;
  }
});

portionOptionsContainer.addEventListener("click", function (event) {
  const addBtn = event.target.closest(".add-portion-option-btn");
  if (addBtn) {
    const selectedSizeInput = addBtn
      .closest(".option-item")
      .querySelector('input[type="radio"]:checked');
    if (selectedSizeInput) {
      const finalName = `Porção de ${addBtn.getAttribute(
        "data-name"
      )} (${selectedSizeInput.getAttribute("data-size")})`;
      const finalPrice = parseFloat(selectedSizeInput.value);
      addToCart(finalName, finalPrice);
      Toastify({
        text: "Porção adicionada ao carrinho!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#22c55e" },
      }).showToast();
      closePortionModal();
    }
  }
});

function closePortionModal() {
  portionModal.classList.remove("active");
}
closePortionModalBtn.addEventListener("click", closePortionModal);
portionModal.addEventListener("click", (event) => {
  if (event.target === portionModal) closePortionModal();
});

// --- Lógica do Modal de Marmitas ---
function openMealModal() {
  mealModalTitle.textContent = `Escolha sua Marmita do Dia`;
  mealOptionsContainer.innerHTML = "";
  meals["Marmita do Dia"].options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option-item");
    optionElement.innerHTML = `
            <input type="radio" id="meal_${index}" name="meal_option" value="${index}" ${
      index === 0 ? "checked" : ""
    }>
            <label for="meal_${index}">
                <div><span class="option-size">${
                  option.name
                }</span><p style="font-size: 0.8rem; color: #666; margin: 4px 0 0 0;">${
      option.description
    }</p></div>
                <span class="option-price">R$ ${option.price.toFixed(2)}</span>
            </label>
        `;
    mealOptionsContainer.appendChild(optionElement);
  });
  updateMealModalFooter();
  mealModal.classList.add("active");
}

mealOptionsContainer.addEventListener("change", updateMealModalFooter);

function updateMealModalFooter() {
  const selectedOptionInput = mealOptionsContainer.querySelector(
    'input[name="meal_option"]:checked'
  );
  if (selectedOptionInput) {
    const selectedOption =
      meals["Marmita do Dia"].options[parseInt(selectedOptionInput.value)];
    mealItemTotal.textContent = `R$ ${selectedOption.price.toFixed(2)}`;
  }
}

addMealToCartBtn.addEventListener("click", function () {
  const selectedOptionInput = mealOptionsContainer.querySelector(
    'input[name="meal_option"]:checked'
  );
  if (selectedOptionInput) {
    const selectedOption =
      meals["Marmita do Dia"].options[parseInt(selectedOptionInput.value)];
    const finalName = `Marmita (${selectedOption.name})`;
    addToCart(finalName, selectedOption.price);
    Toastify({
      text: "Marmita adicionada ao carrinho!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#22c55e" },
    }).showToast();
    closeMealModal();
  }
});

function closeMealModal() {
  mealModal.classList.remove("active");
}
closeMealModalBtn.addEventListener("click", closeMealModal);
mealModal.addEventListener("click", (event) => {
  if (event.target === mealModal) closeMealModal();
});

// --- Lógica do Modal de Lanches ---
function openSandwichModal(type) {
  sandwichModalTitle.textContent = `Escolha seu Lanche de ${type}`;
  sandwichOptionsContainer.innerHTML = "";
  const options = sandwichesData[type];

  options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option-item");
    optionElement.innerHTML = `
            <input type="radio" id="sandwich_${index}" name="sandwich_option" value="${index}" ${
      index === 0 ? "checked" : ""
    }>
            <label for="sandwich_${index}">
                <div>
                    <span class="option-size">${option.name}</span>
                    <p style="font-size: 0.8rem; color: #666; margin: 4px 0 0 0;">${
                      option.description
                    }</p>
                </div>
                <span class="option-price">R$ ${option.price.toFixed(2)}</span>
            </label>
        `;
    sandwichOptionsContainer.appendChild(optionElement);
  });

  updateSandwichModalFooter();
  sandwichModal.classList.add("active");
}

sandwichOptionsContainer.addEventListener("change", updateSandwichModalFooter);

function updateSandwichModalFooter() {
  const selectedOptionInput = sandwichOptionsContainer.querySelector(
    'input[name="sandwich_option"]:checked'
  );
  if (selectedOptionInput) {
    const sandwichType = sandwichModalTitle.textContent.replace(
      "Escolha seu Lanche de ",
      ""
    );
    const selectedOption =
      sandwichesData[sandwichType][parseInt(selectedOptionInput.value)];
    document.getElementById(
      "sandwich-item-total"
    ).textContent = `R$ ${selectedOption.price.toFixed(2)}`;
  }
}

addSandwichToCartBtn.addEventListener("click", function () {
  const selectedOptionInput = sandwichOptionsContainer.querySelector(
    'input[name="sandwich_option"]:checked'
  );
  if (selectedOptionInput) {
    const sandwichType = sandwichModalTitle.textContent.replace(
      "Escolha seu Lanche de ",
      ""
    );
    const selectedOption =
      sandwichesData[sandwichType][parseInt(selectedOptionInput.value)];
    addToCart(selectedOption.name, selectedOption.price);
    Toastify({
      text: "Lanche adicionado ao carrinho!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#22c55e" },
    }).showToast();
    closeSandwichModal();
  }
});

function closeSandwichModal() {
  sandwichModal.classList.remove("active");
}
closeSandwichModalBtn.addEventListener("click", closeSandwichModal);
sandwichModal.addEventListener("click", (event) => {
  if (event.target === sandwichModal) closeSandwichModal();
});

// --- Lógica do Modal de Bebidas ---
function openDrinkModal(type) {
  currentDrinkType = type;
  drinkModalTitle.textContent = `Escolha seus ${type}`;
  drinkOptionsContainer.innerHTML = "";
  const options = drinksData[type];

  options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option-item");
    optionElement.innerHTML = `
            <input type="radio" id="drink_${index}" name="drink_option" value="${index}" ${
      index === 0 ? "checked" : ""
    }>
            <label for="drink_${index}">
                <span class="option-size">${option.name}</span>
                <span class="option-price">R$ ${option.price.toFixed(2)}</span>
            </label>
        `;
    drinkOptionsContainer.appendChild(optionElement);
  });

  updateDrinkModalFooter();
  drinkModal.classList.add("active");
}

drinkOptionsContainer.addEventListener("change", updateDrinkModalFooter);

function updateDrinkModalFooter() {
  const selectedOptionInput = drinkOptionsContainer.querySelector(
    'input[name="drink_option"]:checked'
  );
  if (selectedOptionInput) {
    const selectedOption =
      drinksData[currentDrinkType][parseInt(selectedOptionInput.value)];
    drinkItemTotal.textContent = `R$ ${selectedOption.price.toFixed(2)}`;
  }
}

addDrinkToCartBtn.addEventListener("click", function () {
  const selectedOptionInput = drinkOptionsContainer.querySelector(
    'input[name="drink_option"]:checked'
  );
  if (selectedOptionInput) {
    const selectedOption =
      drinksData[currentDrinkType][parseInt(selectedOptionInput.value)];
    addToCart(selectedOption.name, selectedOption.price);
    Toastify({
      text: "Bebida adicionada ao carrinho!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#22c55e" },
    }).showToast();
    closeDrinkModal();
  }
});

function closeDrinkModal() {
  drinkModal.classList.remove("active");
}
closeDrinkModalBtn.addEventListener("click", closeDrinkModal);
drinkModal.addEventListener("click", (event) => {
  if (event.target === drinkModal) closeDrinkModal();
});

// ===================================================================
// LÓGICA DO CARRINHO (CÓDIGO CORRIGIDO)
// ===================================================================

// Garante que o aviso de endereço comece escondido
document.addEventListener("DOMContentLoaded", (event) => {
  if (addressWarn) {
    addressWarn.classList.add("hidden");
  }
});

cartBtn.addEventListener("click", function () {
  updateCartModal();
  cartModal.style.display = "flex";
});

cartModal.addEventListener("click", function (event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", function () {
  cartModal.style.display = "none";
});

menu.addEventListener("click", function (event) {
  let addCartBtn = event.target.closest(".add-cart-btn");
  if (addCartBtn) {
    const name = addCartBtn.getAttribute("data-name");
    const price = parseFloat(addCartBtn.getAttribute("data-price"));
    addToCart(name, price);
  }
});

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCartModal();
}

// LÓGICA ATUALIZADA PARA CSS PURO
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    // Usando uma classe única para o container do item
    cartItemElement.classList.add("cart-item");

    cartItemElement.innerHTML = `
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-details">Qtd: ${item.quantity}</p>
        <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
      </div>
      <button class="remove-from-cart-btn" data-name="${
        item.name
      }">Remover</button>
    `;

    total += item.price * item.quantity;
    cartItemsContainer.appendChild(cartItemElement);
  });
  cartTotal.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  cartCounter.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

cartItemsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const name = event.target.getAttribute("data-name");
    removeItemCart(name);
  }
});

function removeItemCart(name) {
  const index = cart.findIndex((item) => item.name === name);
  if (index !== -1) {
    const item = cart[index];
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
    updateCartModal();
  }
}

addressInput.addEventListener("input", function (event) {
  if (event.target.value !== "") {
    addressInput.classList.remove("input-error");
    addressWarn.classList.add("hidden");
  }
});

checkoutBtn.addEventListener("click", function () {
  const isOpen = checkRestaurantOpen();
  if (!isOpen) {
    Toastify({
      text: "Desculpe, o restaurante está fechado no momento!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: { background: "#ef4444" },
    }).showToast();
    return;
  }
  if (cart.length === 0) return;
  if (addressInput.value === "") {
    addressWarn.classList.remove("hidden");
    addressInput.classList.add("input-error");
    return;
  }
  const obsValue = addressObs.value.trim()
    ? `\n*Observação:* ${addressObs.value}`
    : "";
  const cartItems = cart
    .map(
      (item) =>
        ` - ${item.quantity}x *${item.name}* ....... R$ ${item.price.toFixed(
          2
        )}`
    )
    .join("\n");
  const totalPedido = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const message = `*== NOVO PEDIDO ==*\n\nOlá, gostaria de fazer o seguinte pedido:\n\n${cartItems}\n\n*Endereço de entrega:*\n${
    addressInput.value
  }${obsValue}\n\n*Total: R$ ${totalPedido.toFixed(2)}*`;

  // NÚMERO DE WHATSAPP CORRIGIDO
  const phone = "67992347962";

  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

  cart = [];
  addressInput.value = "";
  addressObs.value = "";
  updateCartModal();
});

// ===================================================================
// FUNÇÕES DE VERIFICAÇÃO E CARROSSEL
// ===================================================================
function checkRestaurantOpen() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 17 && hora < 23;
}

const spanItem = document.getElementById("data-span");
const isOpen = checkRestaurantOpen();

if (isOpen) {
  spanItem.classList.remove("status-closed");
  spanItem.classList.add("status-open");
} else {
  spanItem.classList.remove("status-open");
  spanItem.classList.add("status-closed");
}

const carousel = document.getElementById("carousel");
if (carousel) {
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const indicatorsContainer = document.getElementById("indicators");
  const items = document.querySelectorAll(".carousel-item");
  const totalItems = items.length;
  let currentIndex = 0;
  if (totalItems > 0) {
    for (let i = 0; i < totalItems; i++) {
      const dot = document.createElement("span");
      dot.classList.add("indicator-dot");
      if (i === 0) dot.classList.add("active");
      dot.dataset.index = i;
      dot.addEventListener("click", () => goToSlide(i));
      indicatorsContainer.appendChild(dot);
    }
    function updateIndicators(index) {
      const dots = document.querySelectorAll(".indicator-dot");
      dots.forEach((dot) => dot.classList.remove("active"));
      dots[index].classList.add("active");
    }
    function goToSlide(index) {
      const itemWidth = items[0].offsetWidth + 20;
      carousel.style.transform = `translateX(-${itemWidth * index}px)`;
      currentIndex = index;
      updateIndicators(index);
    }
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) goToSlide(currentIndex - 1);
    });
    nextBtn.addEventListener("click", () => {
      if (currentIndex < totalItems - 1) goToSlide(currentIndex + 1);
    });
    window.addEventListener("resize", () => {
      goToSlide(currentIndex);
    });
  }
}
