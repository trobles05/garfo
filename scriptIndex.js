// --- SELEÇÃO DE ELEMENTOS DO DOM (CARRINHO E MODAIS) ---
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

// --- NOVOS SELETORES PARA OPÇÃO DE ENTREGA ---
const deliveryOptions = document.querySelectorAll(
  'input[name="delivery-method"]'
);
const addressContainer = document.getElementById("address-container");

let cart = [];
let pizzaSize = "";
let maxFlavors = 1;
let currentDrinkType = "";

// ===================================================================
// BANCO DE DADOS DE PRODUTOS (EXTRAÍDO DO CARDÁPIO GARFO DE OURO)
// ===================================================================

// NOTA: O cardápio possui preços P, M e G. A estrutura atual suporta apenas um preço.
// Foi usado o preço da pizza GRANDE (G) como referência.
const pizzaFlavors = [
  // Pizzas Salgadas
  {
    id: 1,
    name: "Moda da Casa",
    description:
      "Mussarela, presunto, tomate, calabresa, bacon, cebola, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 80.0,
  },
  {
    id: 2,
    name: "Atum",
    description:
      "Mussarela, tomate, atum, ervilha, cebola, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 72.0,
  },
  {
    id: 3,
    name: "Bacon",
    description: "Mussarela, bacon, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 75.0,
  },
  {
    id: 4,
    name: "Baiana",
    description:
      "Mussarela, filé, cebola, calabresa, tomate, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 82.0,
  },
  {
    id: 5,
    name: "Calabresa",
    description: "Mussarela, cebola, calabresa, tomate, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 72.0,
  },
  {
    id: 6,
    name: "Canadense",
    description:
      "Mussarela, lombo canadense, champignon, catupiry, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 82.0,
  },
  {
    id: 7,
    name: "Catupiry",
    description: "Mussarela, catupiry, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 74.0,
  },
  {
    id: 8,
    name: "Catufilé",
    description: "Mussarela, filé, catupiry, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 90.0,
  },
  {
    id: 9,
    name: "Cremosa",
    description: "Mussarela, creme de leite, catupiry, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 64.0,
  },
  {
    id: 10,
    name: "5 Queijos",
    description:
      "Mussarela, provolone, queijo prato, parmesão, requeijão, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 72.5,
  }, // Preço M no cardapio, G não informado
  {
    id: 11,
    name: "Espanhola",
    description: "Mussarela, calabresa, ovo, bacon, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 75.0,
  },
  {
    id: 12,
    name: "Escarola",
    description: "Mussarela, chicória, alho, bacon, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 78.0,
  },
  {
    id: 13,
    name: "Frango ao Milho",
    description:
      "Mussarela, frango, milho, creme de leite, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 68.0,
  },
  {
    id: 14,
    name: "Frango Catupiry",
    description: "Mussarela, frango, catupiry, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 67.0,
  },
  {
    id: 15,
    name: "Frango com Palmito",
    description: "Mussarela, frango, catupiry, palmito, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 70.0,
  },
  {
    id: 16,
    name: "Filé Acebolado",
    description: "Mussarela, filé, cebola, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 80.0,
  },
  {
    id: 17,
    name: "Lombo ao Creme",
    description:
      "Mussarela, lombo canadense, tomate, catupiry, creme de leite, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 72.0,
  },
  {
    id: 18,
    name: "Marguerita",
    description: "Mussarela, tomate, manjericão e azeitona.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 64.0,
  },
  {
    id: 19,
    name: "Mexicana",
    description:
      "Mussarela, bacon, calabresa, pimenta vermelha, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 75.0,
  },
  {
    id: 20,
    name: "Milho",
    description: "Mussarela, milho verde, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 66.0,
  },
  {
    id: 21,
    name: "Mineira",
    description:
      "Mussarela, calabresa, ervilha, palmito, catupiry, creme de leite, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 75.0,
  },
  {
    id: 22,
    name: "Mussarela",
    description: "Mussarela, tomate, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 62.0,
  },
  {
    id: 23,
    name: "Manchester",
    description:
      "Mussarela, tomate picado, milho, palmito, calabresa, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 72.0,
  },
  {
    id: 24,
    name: "Napolitana",
    description: "Mussarela, tomate, presunto, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 66.0,
  },
  {
    id: 25,
    name: "Paulista",
    description:
      "Mussarela, lombo canadense, palmito, milho, calabresa picada, creme de leite, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 75.0,
  },
  {
    id: 26,
    name: "Palmito",
    description:
      "Mussarela, palmito picado, tomate picado, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 66.0,
  },
  {
    id: 27,
    name: "Portuguesa",
    description:
      "Mussarela, presunto, ovos, tomate, milho, seleta de legumes, cebola, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 66.0,
  },
  {
    id: 28,
    name: "Peperone",
    description: "Mussarela, tomate, fatias de peperone, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 75.0,
  },
  {
    id: 29,
    name: "Romanesca",
    description: "Mussarela, presunto, bacon, catupiry, champignon e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 76.0,
  },
  {
    id: 30,
    name: "Strogonoff de Carne",
    description:
      "Mussarela, strogonoff de carne, batata palha, catupiry, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 82.0,
  },
  {
    id: 31,
    name: "Strogonoff de Frango",
    description:
      "Mussarela, strogonoff de frango, batata palha, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 75.0,
  },
  {
    id: 32,
    name: "Stalo",
    description:
      "Mussarela, presunto, frango, palmito, calabresa, tomate picado, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 75.0,
  },
  {
    id: 33,
    name: "Toscana",
    description: "Mussarela, calabresa, palmito, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 74.0,
  },
  {
    id: 34,
    name: "Toledo",
    description:
      "Mussarela, lombo canadense, palmito, catupiry, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 75.0,
  },
  {
    id: 35,
    name: "Tomate Seco com Rúcula",
    description: "Mussarela, tomate seco, rúcula fresca, azeitona e orégano.",
    img: "https://placehold.co/100x100/ef4444/white?text=Pizza",
    price: 68.0,
  },
  // Pizzas Doces
  {
    id: 36,
    name: "Banana com Canela",
    description: "Leite condensado, banana e canela.",
    img: "https://placehold.co/100x100/f59e0b/white?text=Doce",
    price: 62.5,
  },
  {
    id: 37,
    name: "Beijinho",
    description:
      "Creme de leite, coco ralado, leite condensado e chocolate branco.",
    img: "https://placehold.co/100x100/f59e0b/white?text=Doce",
    price: 67.0,
  },
  {
    id: 38,
    name: "Brigadeiro",
    description: "Creme de leite, chocolate preto e chocolate granulado.",
    img: "https://placehold.co/100x100/f59e0b/white?text=Doce",
    price: 64.5,
  },
  {
    id: 39,
    name: "Sedução",
    description: "Creme de leite, chocolate preto, leite condensado e morango.",
    img: "https://placehold.co/100x100/f59e0b/white?text=Doce",
    price: 67.0,
  },
  {
    id: 40,
    name: "Sensação",
    description:
      "Creme de leite, chocolate branco, leite condensado e morango.",
    img: "https://placehold.co/100x100/f59e0b/white?text=Doce",
    price: 67.5,
  },
  {
    id: 41,
    name: "Romeu & Julieta",
    description: "Creme de leite, mussarela, goiabada e leite condensado.",
    img: "https://placehold.co/100x100/f59e0b/white?text=Doce",
    price: 65.0,
  },
  {
    id: 42,
    name: "Sorvete",
    description: "Sorvete napolitano com cobertura.",
    img: "https://placehold.co/100x100/f59e0b/white?text=Doce",
    price: 63.0,
  },
];

const portionsData = {
  "Mista Completa": {
    description:
      "Fritas, frango a passarinho, filé picado, calabresa, mussarela, presunto e azeitona.",
    options: [
      { size: "Individual", price: 47.0 },
      { size: "Duplo", price: 74.5 },
    ],
  },
  "Frango à Passarinho": {
    description: "Frango a passarinho, fritas e azeitona.",
    options: [
      { size: "Individual", price: 37.0 },
      { size: "Duplo", price: 62.0 },
    ],
  },
  "Isca de Tilápia": {
    description:
      "Filé de tilápia empanado, fritas, azeitona e acompanhamento da casa.",
    options: [
      { size: "Individual", price: 45.0 },
      { size: "Duplo", price: 75.0 },
    ],
  },
  "Batata Frita": {
    description: "Porção de batata frita sequinha e crocante.",
    options: [
      { size: "Individual", price: 22.0 },
      { size: "Duplo", price: 29.0 },
    ],
  },
  "Filé Acebolado": {
    description: "Filé acebolado com fritas e azeitona.",
    options: [
      { size: "Individual", price: 48.0 },
      { size: "Duplo", price: 86.0 },
    ],
  },
  "Picanha em Tiras": {
    description: "Picanha com fritas.",
    options: [
      { size: "Individual", price: 50.0 },
      { size: "Duplo", price: 89.5 },
    ],
  },
  "Calabresa Acebolada": {
    description: "Porção de calabresa fatiada e acebolada.",
    options: [
      { size: "Individual", price: 30.0 },
      { size: "Duplo", price: 52.0 },
    ],
  },
  "Tábua de Frios": {
    description:
      "Ovo de codorna, salaminho, mussarela, palmito, presunto e azeitona.",
    options: [
      { size: "Individual", price: 48.0 },
      { size: "Duplo", price: 79.0 },
    ],
  },
  Torresmo: {
    description: "Porção de torresmo crocante.",
    options: [
      { size: "Individual", price: 35.0 },
      { size: "Duplo", price: 57.0 },
    ],
  },
  "Pastelzinho (Carne/Queijo)": {
    description: "Pastéis de Carne ou Presunto e Queijo.",
    options: [
      { size: "4 Unidades", price: 29.5 },
      { size: "8 Unidades", price: 55.5 },
    ],
  },
  "Filézinho Mignon": {
    description: "Filé mignon em tiras com fritas.",
    options: [
      { size: "Individual", price: 46.5 },
      { size: "Duplo", price: 84.5 },
    ],
  },
  Coraçãozinho: {
    description: "Porção de coração de frango.",
    options: [
      { size: "Individual", price: 35.0 },
      { size: "Duplo", price: 57.0 },
    ],
  },
  "Massinha da Casa": {
    description: "Massa de pizza frita da casa.",
    options: [
      { size: "Individual", price: 20.0 },
      { size: "Duplo", price: 27.0 },
    ],
  },
};

const sandwichesData = {
  "Filé Mignon": [
    {
      name: "X-Filé Bacon",
      description: "Pão, filé, bacon, mussarela. Acompanha batata frita.",
      price: 26.5,
    },
    {
      name: "X-Filé Salada",
      description:
        "Pão, filé, mussarela, alface, tomate. Acompanha batata frita.",
      price: 24.0,
    },
    {
      name: "X-Filé Simples",
      description: "Pão, filé, mussarela. Acompanha batata frita.",
      price: 22.0,
    },
    {
      name: "X-Filé Egg",
      description: "Pão, filé, mussarela, ovo. Acompanha batata frita.",
      price: 24.0,
    },
    {
      name: "X-Tudo",
      description:
        "Pão, filé, presunto, mussarela, bacon, calabresa, ovo, palmito, milho, alface, tomate, maionese. Acompanha batata frita.",
      price: 29.5,
    },
  ],
  "X-Burger": [
    {
      name: "X-Americano",
      description:
        "Hambúrguer, mussarela, ovo, presunto, alface, tomate. Acompanha batata frita.",
      price: 20.0,
    },
    {
      name: "X-Burguer Bacon",
      description: "Hambúrguer, mussarela, bacon. Acompanha batata frita.",
      price: 24.0,
    },
    {
      name: "X-Burguer Salada",
      description:
        "Hambúrguer, mussarela, alface, tomate. Acompanha batata frita.",
      price: 20.0,
    },
    {
      name: "X-Burguer Simples",
      description: "Hambúrguer, mussarela. Acompanha batata frita.",
      price: 18.0,
    },
    {
      name: "X-Burguer Egg",
      description: "Hambúrguer, mussarela, ovo. Acompanha batata frita.",
      price: 20.0,
    },
    {
      name: "X-Burguer Calabresa",
      description: "Hambúrguer, mussarela, calabresa. Acompanha batata frita.",
      price: 22.0,
    },
  ],
  "X-Frango": [
    {
      name: "X-Frango Bacon",
      description:
        "Pão, frango desfiado, bacon, mussarela. Acompanha batata frita.",
      price: 19.0,
    },
    {
      name: "X-Frango Salada",
      description: "Pão, frango desfiado, mussarela. Acompanha batata frita.",
      price: 19.0,
    },
    {
      name: "X-Frango Egg",
      description:
        "Pão, frango desfiado, mussarela, ovo. Acompanha batata frita.",
      price: 20.0,
    },
  ],
};

// Categoria "Meals" foi transformada em "aLaCarteData" para melhor representar o cardápio.
const aLaCarteData = {
  Filés: [
    {
      name: "Filé à Parmegiana",
      description:
        "Filé mignon à milanesa coberto com queijo ao molho vermelho. Acompanha fritas e arroz branco.",
      options: [
        { size: "Individual", price: 58.5 },
        { size: "Duplo", price: 99.8 },
      ],
    },
    {
      name: "Filé Chateaubriand",
      description:
        "Filé mignon alto grelhado, queijo, molho madeira, champignon e presunto. Acompanha banana à milanesa, farofa, alface, tomate, fritas e arroz branco.",
      options: [
        { size: "Individual", price: 58.5 },
        { size: "Duplo", price: 99.8 },
      ],
    },
    {
      name: "Filé com Fritas",
      description:
        "Filé mignon grelhado. Acompanha alface, tomate, fritas e arroz branco.",
      options: [
        { size: "Individual", price: 48.5 },
        { size: "Duplo", price: 89.8 },
      ],
    },
    {
      name: "Filé à Milanesa c/ Fritas",
      description:
        "Filé à milanesa. Acompanha alface, tomate, fritas e arroz branco.",
      options: [
        { size: "Individual", price: 48.5 },
        { size: "Duplo", price: 89.8 },
      ],
    },
    {
      name: "Filé Executivo com Feijão",
      description:
        "Filé mignon grelhado. Acompanha alface, tomate, salada russa, farofa, ovos fritos, fritas e arroz branco.",
      options: [
        { size: "Individual", price: 54.5 },
        { size: "Duplo", price: 95.8 },
      ],
    },
    {
      name: "Filé Acebolado (Prato)",
      description:
        "Filé mignon grelhado com cebola. Acompanha alface, tomate, fritas e arroz branco.",
      options: [
        { size: "Individual", price: 48.5 },
        { size: "Duplo", price: 89.8 },
      ],
    },
    {
      name: "Filé com Legumes",
      description:
        "Filé mignon grelhado. Acompanha legumes na manteiga, alface, tomate e arroz branco.",
      options: [
        { size: "Individual", price: 48.5 },
        { size: "Duplo", price: 89.8 },
      ],
    },
  ],
  Picanhas: [
    {
      name: "Picanha Acebolada",
      description:
        "Picanha grelhada acebolada. Acompanha alface, tomate, fritas e arroz branco.",
      options: [
        { size: "Individual", price: 55.0 },
        { size: "Duplo", price: 93.9 },
      ],
    },
    {
      name: "Picanha da Casa",
      description:
        "Picanha grelhada. Acompanha purê de batata, vinagrete, farofa, fritas e arroz.",
      options: [
        { size: "Individual", price: 55.0 },
        { size: "Duplo", price: 93.9 },
      ],
    },
    {
      name: "Picanha Grelhada",
      description:
        "Picanha grelhada. Acompanha alface, tomate, fritas e arroz.",
      options: [
        { size: "Individual", price: 55.0 },
        { size: "Duplo", price: 93.9 },
      ],
    },
    {
      name: "Picanha Alho e Óleo",
      description:
        "Picanha grelhada no alho e óleo. Acompanha alface, tomate, fritas e arroz.",
      options: [
        { size: "Individual", price: 55.0 },
        { size: "Duplo", price: 93.9 },
      ],
    },
  ],
  Frangos: [
    {
      name: "Frango à Passarinho (Prato)",
      description: "Acompanha alface, tomate, fritas e arroz branco.",
      options: [
        { size: "Individual", price: 50.0 },
        { size: "Duplo", price: 75.0 },
      ],
    },
    {
      name: "Frango à Milanesa c/ Fritas",
      description:
        "Frango à milanesa. Acompanha alface, tomate, fritas e arroz branco.",
      options: [
        { size: "Individual", price: 45.0 },
        { size: "Duplo", price: 70.0 },
      ],
    },
    {
      name: "Frango à Parmegiana",
      description:
        "Frango à milanesa, coberto com queijo ao molho vermelho. Acompanha alface, tomate, fritas e arroz branco.",
      options: [
        { size: "Individual", price: 50.0 },
        { size: "Duplo", price: 75.0 },
      ],
    },
    {
      name: "Frango com Legumes",
      description:
        "Frango grelhado com legumes na manteiga. Acompanha alface, tomate, fritas e arroz branco.",
      options: [
        { size: "Individual", price: 45.0 },
        { size: "Duplo", price: 70.0 },
      ],
    },
  ],
  Peixes: [
    {
      name: "Filé de Pintado ao Molho Branco",
      description:
        "Grelhado com molho branco e queijo gratinado. Acompanha arroz, purê de batata, banana à milanesa e pêssego.",
      options: [
        { size: "Individual", price: 80.0 },
        { size: "Duplo", price: 130.0 },
      ],
    },
    {
      name: "Filé de Tilápia ao Molho Branco",
      description:
        "Grelhado com molho branco e queijo gratinado. Acompanha arroz, purê de batata, banana à milanesa e pêssego.",
      options: [
        { size: "Individual", price: 65.0 },
        { size: "Duplo", price: 100.0 },
      ],
    },
    {
      name: "Filé de Pintado à Parmegiana",
      description:
        "À milanesa coberto com queijo ao molho vermelho. Acompanha fritas e arroz.",
      options: [
        { size: "Individual", price: 75.0 },
        { size: "Duplo", price: 125.0 },
      ],
    },
    {
      name: "Filé de Tilápia à Parmegiana",
      description:
        "À milanesa coberto com queijo ao molho vermelho. Acompanha fritas e arroz.",
      options: [
        { size: "Individual", price: 65.0 },
        { size: "Duplo", price: 100.0 },
      ],
    },
  ],
  Massas: [
    {
      name: "Lasanha Bolonhesa",
      description: "Massa de lasanha com molho bolonhesa e queijo.",
      options: [
        { size: "Individual", price: 44.0 },
        { size: "Duplo", price: 71.5 },
      ],
    },
    {
      name: "Lasanha Napolitana",
      description: "Massa de lasanha com molho napolitano, presunto e queijo.",
      options: [
        { size: "Individual", price: 42.0 },
        { size: "Duplo", price: 69.9 },
      ],
    },
    {
      name: "Espaguetti Alho e Óleo",
      description: "Espaguetti salteado no alho e óleo.",
      options: [
        { size: "Individual", price: 40.0 },
        { size: "Duplo", price: 65.0 },
      ],
    },
    {
      name: "Espaguetti Bolonhesa",
      description: "Espaguetti com tradicional molho bolonhesa.",
      options: [
        { size: "Individual", price: 40.0 },
        { size: "Duplo", price: 65.0 },
      ],
    },
  ],
  Canjas: [
    {
      name: "Canja de Frango",
      description: "Frango desfiado, legumes e arroz.",
      options: [
        { size: "Individual", price: 35.9 },
        { size: "Duplo", price: 44.9 },
      ],
    },
    {
      name: "Sopa de Peixe",
      description: "Peixe tilápia e legumes.",
      options: [
        { size: "Individual", price: 39.9 },
        { size: "Duplo", price: 49.9 },
      ],
    },
    {
      name: "Sopa Ministrone",
      description: "Carne, legumes e macarrão.",
      options: [
        { size: "Individual", price: 39.9 },
        { size: "Duplo", price: 49.9 },
      ],
    },
  ],
  Kids: [
    {
      name: "Filézinho Kids",
      description: "Arroz, fritas e filé picado.",
      price: 29.9,
    },
    {
      name: "Franguinho Kids",
      description: "Arroz, fritas e frango picado.",
      price: 27.9,
    },
    {
      name: "Bolonhesita Kids",
      description: "Macarrão à bolonhesa e batata frita.",
      price: 25.9,
    },
  ],
};

// NOTA: O cardápio fornecido não lista bebidas. Mantive os dados de exemplo.
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
    // A lógica para refeições pode precisar ser adaptada para aLaCarteData
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
  closePizzaModal();
});

function closePizzaModal() {
  pizzaModal.classList.remove("active");
}
closePizzaModalBtn.addEventListener("click", closePizzaModal);
pizzaModal.addEventListener("click", (event) => {
  if (event.target === pizzaModal) closePizzaModal();
});

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

// A função openMealModal precisará ser adaptada se você quiser usar a estrutura aLaCarteData
function openMealModal() {
  mealModalTitle.textContent = `Escolha seu Prato Á La Carte`;
  mealOptionsContainer.innerHTML =
    "<p>Esta seção precisa ser adaptada para a nova estrutura de dados 'aLaCarteData'.</p>";
  // Exemplo de como você poderia começar a adaptar:
  // Object.keys(aLaCarteData).forEach(category => { ... });
  mealModal.classList.add("active");
}

function closeMealModal() {
  mealModal.classList.remove("active");
}
closeMealModalBtn.addEventListener("click", closeMealModal);
mealModal.addEventListener("click", (event) => {
  if (event.target === mealModal) closeMealModal();
});

function openSandwichModal(type) {
  sandwichModalTitle.textContent = `Escolha seu Lanche`;
  sandwichOptionsContainer.innerHTML = "";
  const options = sandwichesData[type];
  options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option-item");
    optionElement.innerHTML = `
      <div class="option-details">
        <h4>${option.name}</h4>
        <p>${option.description}</p>
      </div>
      <div class="option-price-action">
        <span>R$ ${option.price.toFixed(2)}</span>
        <button class="add-sandwich-option-btn" data-name="${
          option.name
        }" data-price="${option.price}">Adicionar</button>
      </div>
    `;
    sandwichOptionsContainer.appendChild(optionElement);
  });
  sandwichModal.classList.add("active");
}

sandwichOptionsContainer.addEventListener("click", function (event) {
  const addBtn = event.target.closest(".add-sandwich-option-btn");
  if (addBtn) {
    const name = addBtn.getAttribute("data-name");
    const price = parseFloat(addBtn.getAttribute("data-price"));
    addToCart(name, price);
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
// LÓGICA DO CARRINHO (UNIFICADO E CORRIGIDO)
// ===================================================================

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

  Toastify({
    text: "Item adicionado ao carrinho!",
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "#22c55e",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    offset: { y: 20 },
  }).showToast();

  updateCartModal();
}

function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
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

// --- NOVA LÓGICA DE OPÇÕES DE ENTREGA ---
deliveryOptions.forEach((option) => {
  option.addEventListener("change", function () {
    if (this.value === "entrega") {
      addressContainer.classList.remove("hidden");
    } else {
      addressContainer.classList.add("hidden");
      addressInput.value = "";
      addressWarn.classList.add("hidden");
      addressInput.classList.remove("input-error");
    }
  });
});

// --- LÓGICA DE FINALIZAÇÃO DO PEDIDO (CHECKOUT) ATUALIZADA ---
checkoutBtn.addEventListener("click", function () {
  const isOpen = checkRestaurantOpen();
  if (!isOpen) {
    Toastify({
      text: "Desculpe, o restaurante está fechado no momento!",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#ef4444" },
    }).showToast();
    return;
  }
  if (cart.length === 0) return;

  const deliveryMethod = document.querySelector(
    'input[name="delivery-method"]:checked'
  );

  if (!deliveryMethod) {
    Toastify({
      text: "Por favor, escolha Entrega ou Retirada.",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#ef4444" },
    }).showToast();
    return;
  }

  if (deliveryMethod.value === "entrega" && addressInput.value.trim() === "") {
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

  let deliveryInfo = "";
  if (deliveryMethod.value === "entrega") {
    deliveryInfo = `*Endereço de entrega:*\n${addressInput.value}`;
  } else {
    deliveryInfo = `*Método de Entrega:*\nRetirar no balcão`;
  }

  const message = `*== NOVO PEDIDO ==*\n\nOlá, gostaria de fazer o seguinte pedido:\n\n${cartItems}\n\n${deliveryInfo}${obsValue}\n\n*Total: R$ ${totalPedido.toFixed(
    2
  )}*`;

  const phone = "67999358598"; // Telefone do cardápio
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

  cart = [];
  addressInput.value = "";
  addressObs.value = "";
  if (deliveryMethod) {
    deliveryMethod.checked = false;
  }
  addressContainer.classList.add("hidden");
  updateCartModal();
});

// ===================================================================
// FUNÇÕES DE VERIFICAÇÃO E OUTROS
// ===================================================================
function checkRestaurantOpen() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // Domingo = 0, Segunda = 1, ...

  // Horários do cardápio (aproximado, pois não especifica dias)
  const openAlmoco = { h: 11, m: 0 }; // 11:00
  const closeAlmoco = { h: 15, m: 0 }; // 15:00
  const openJantar = { h: 18, m: 0 }; // 18:00
  const closeJantar = { h: 23, m: 45 }; // 23:45

  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  const openAlmocoMin = openAlmoco.h * 60 + openAlmoco.m;
  const closeAlmocoMin = closeAlmoco.h * 60 + closeAlmoco.m;
  const openJantarMin = openJantar.h * 60 + openJantar.m;
  const closeJantarMin = closeJantar.h * 60 + closeJantar.m;

  const isAlmocoOpen =
    currentTimeInMinutes >= openAlmocoMin &&
    currentTimeInMinutes < closeAlmocoMin;
  const isJantarOpen =
    currentTimeInMinutes >= openJantarMin &&
    currentTimeInMinutes < closeJantarMin;

  return isAlmocoOpen || isJantarOpen;
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

// --- Animação de Scroll ---
const elementosParaAnimar = document.querySelectorAll(".sobre__restaurante");
const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
};
const observer = new IntersectionObserver(callback, { threshold: 0.2 });
elementosParaAnimar.forEach((element) => {
  observer.observe(element);
});

// --- Lógica do Menu Hambúrguer ---
const hamburgerButton = document.getElementById("hamburger-button");
const mobileMenu = document.getElementById("mobile-menu");
const closeButton = document.getElementById("close-button");
const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");

function openMenu() {
  hamburgerButton.classList.add("active");
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  hamburgerButton.classList.remove("active");
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "auto";
}

hamburgerButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});
