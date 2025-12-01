const sections = {
  start: document.getElementById("startScreen"),
  menu: document.getElementById("menuScreen"),
  quiz: document.getElementById("quizScreen"),
  quizResult: document.getElementById("quizResultScreen"),
  branch: document.getElementById("branchScreen"),
  confirm: document.getElementById("confirmScreen"),
};

const state = {
  selectedItems: {},
  branch: null,
  quizStep: 0,
  quizAnswers: [],
  suggestions: [],
};

const menuData = [
  {
    category: "Паста",
    items: [
      {
        name: "Паста с тыквой и беконом",
        price: 310,
        description:
          "Тёплая и уютная: сладкая тыква, хрустящий бекон и мягкий сливочный соус. Для момента, когда хочется заботы.",
        tags: ["уют", "бекон", "сливочно"],
      },
      {
        name: "Томатная с базиликом",
        price: 310,
        description:
          "Лёгкая и свежая, чистый итальянский вкус. Когда хочется простоты и ясности.",
        tags: ["легко", "свежесть"],
      },
      {
        name: "Аматричана с беконом",
        price: 290,
        description: "Острая и дерзкая паста для тех, кому нужен небольшой огонь внутри.",
        tags: ["остро", "бекон"],
      },
      {
        name: "Паста с рагу Болоньезе",
        price: 340,
        description:
          "Плотный, мясной, насыщенный соус из трёх видов мяса. Когда нужен сытный, уверенный вкус.",
        tags: ["сытно", "мясо"],
      },
      {
        name: "Сливочная с грибами и беконом",
        price: 350,
        description:
          "Нежность сливок, аромат грибов и хруст бекона. Когда хочется съедобных объятий.",
        tags: ["сливочно", "грибы", "бекон"],
      },
      {
        name: "С мисо-песто и креветками",
        price: 410,
        description: "Лёгкая, яркая, с умами-оттенками. Когда нужно что-то необычное и вдохновляющее.",
        tags: ["легко", "морепродукты", "ярко"],
      },
      {
        name: "Паста с цыпленком",
        price: 290,
        description: "Спокойный и понятный вкус, как домашняя забота, только лучше.",
        tags: ["сытно", "мясо"],
      },
      {
        name: "Детская сливочная с цветными макарошками",
        price: 260,
        description:
          "Мягкий сливочный вкус и яркие макарошки. Радость детям и взрослым, которые сами немного дети.",
        tags: ["сливочно", "легко", "детское"],
      },
    ],
  },
  {
    category: "Допы и супы",
    items: [
      {
        name: "Дополнительный пармезан",
        price: 50,
        description: "Когда хочется чуть больше счастья сверху.",
        tags: ["сыр", "топпинги"],
      },
      {
        name: "Трюфельное масло",
        price: 90,
        description: "Аромат, который делает обычный день праздничным.",
        tags: ["аромат", "особенное"],
      },
      {
        name: "Хрустящий бекон",
        price: 90,
        description: "Для тех, кто считает, что хруст улучшает настроение.",
        tags: ["бекон", "топпинги"],
      },
      {
        name: "Суп томатный с пармезаном",
        price: 340,
        description: "Густой, ароматный, тёплый. Успокаивает лучше долгих разговоров.",
        tags: ["легко", "суп"],
      },
      {
        name: "Суп тыквенный с беконом",
        price: 340,
        description:
          "Кремовый, сладковатый, с солёными акцентами бекона. Настроение уютной осени без хандры.",
        tags: ["уют", "суп", "бекон"],
      },
    ],
  },
  {
    category: "Комбо",
    items: [
      {
        name: "Итальянская классика",
        price: 690,
        description: "Паста, напиток и кантуччи — маленькая Италия, собранная в одном наборе.",
        tags: ["комбо", "сытно"],
      },
      {
        name: "Быстрый обед",
        price: 490,
        description: "Паста, суп, напиток и кантуччи. Умный обед для тех, кто ценит время и вкус.",
        tags: ["комбо", "легко"],
      },
      {
        name: "Дуэт",
        price: 990,
        description: "Две пасты, два напитка и два кантуччи. Для двоих или для одного, если этот один — лучшая компания.",
        tags: ["комбо", "для двоих"],
      },
    ],
  },
  {
    category: "Напитки",
    items: [
      {
        name: "Эспрессо",
        price: 100,
        description: "Короткий, крепкий, честный. Чтобы включить мозг и действовать.",
        tags: ["заряд", "кофе"],
      },
      {
        name: "Американо",
        price: 120,
        description: "Мягкий и спокойный вкус. Для тех, кому нужно просто согреться.",
        tags: ["кофе", "легко"],
      },
      {
        name: "Капучино",
        price: 150,
        description: "Нежная пена и тёплая уверенность. Когда хочется чуть больше доброты в день.",
        tags: ["кофе", "сливочно"],
      },
      {
        name: "Глинтвейн безалкогольный",
        price: 180,
        description: "Пряный, уютный, согревающий. Отличен в холодные дни.",
        tags: ["уют", "ярко"],
      },
      {
        name: "Чай пакетированный",
        price: 100,
        description: "Простой горячий напиток без лишней философии.",
        tags: ["чай", "легко"],
      },
      {
        name: "Какао",
        price: 200,
        description: "Вкус детства, который работает и во взрослой жизни.",
        tags: ["уют", "сливочно"],
      },
    ],
  },
  {
    category: "Сладкое",
    items: [
      {
        name: "Бабл-вафли с сиропом",
        price: 250,
        description: "Воздушные, мягкие, сладкие. Маленькое удовольствие, которое спасает день.",
        tags: ["десерт", "ярко"],
      },
      {
        name: "Кантуччи",
        price: 89,
        description: "Хрустящие итальянские печенья. Идеальны к кофе и лёгким разговорам.",
        tags: ["десерт", "легко"],
      },
    ],
  },
];

const imagePool = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1467003909390-22b89e0a17cf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
];

const menuItems = menuData.flatMap((group, idx) =>
  group.items.map((item, itemIdx) => ({
    ...item,
    id: `${group.category}-${item.name}`.replace(/[^а-яА-Яa-zA-Z0-9]+/g, "-").toLowerCase(),
    category: group.category,
    image: imagePool[(idx + itemIdx) % imagePool.length],
  }))
);

const branches = [
  { id: "moskovskaya", name: "Киров, Московская 4" },
  { id: "oktyabrskiy", name: "Киров, Октябрьский проспект 104" },
];

const quizQuestions = [
  {
    prompt: "Какое настроение сейчас ближе?",
    options: [
      { label: "Хочу уюта и заботы", tag: "уют" },
      { label: "Лёгкость и свежесть", tag: "легко" },
      { label: "Хочу ярких ощущений", tag: "ярко" },
    ],
  },
  {
    prompt: "Нужна сытность или перекус?",
    options: [
      { label: "Плотно и сытно", tag: "сытно" },
      { label: "Легкий перекус", tag: "легко" },
      { label: "Что-то в середине", tag: "суп" },
    ],
  },
  {
    prompt: "Хотите сливочный вкус?",
    options: [
      { label: "Да, сливочный", tag: "сливочно" },
      { label: "Больше томатов/бульонов", tag: "легко" },
      { label: "Не важно", tag: "особенное" },
    ],
  },
  {
    prompt: "Добавим остроты?",
    options: [
      { label: "Да, люблю погорячее", tag: "остро" },
      { label: "Лучше мягко", tag: "уют" },
      { label: "Можно нейтрально", tag: "свежесть" },
    ],
  },
  {
    prompt: "Хотите морепродукты или мясо?",
    options: [
      { label: "Морепродукты", tag: "морепродукты" },
      { label: "Мясо/бекон", tag: "бекон" },
      { label: "Можно без них", tag: "десерт" },
    ],
  },
];

function showSection(key) {
  Object.values(sections).forEach((section) => section.classList.add("hidden"));
  sections[key].classList.remove("hidden");
}

function renderMenu() {
  const menuList = document.getElementById("menuList");
  menuList.innerHTML = "";

  menuData.forEach((group) => {
    const block = document.createElement("div");
    block.className = "category";
    block.innerHTML = `<div class="category__header"><h3>${group.category}</h3></div>`;

    const cards = document.createElement("div");
    cards.className = "cards cards--category";

    group.items.forEach((item) => {
      const fullItem = menuItems.find((m) => m.name === item.name && m.category === group.category);
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${fullItem.image}" alt="${fullItem.name}" />
        <div class="card__content">
          <h4>${fullItem.name}</h4>
          <p>${fullItem.description}</p>
          <div class="price-row">
            <span><strong>${fullItem.price} ₽</strong></span>
            <div class="btn-group">
              <button class="ghost" data-id="${fullItem.id}" data-action="decrease">−</button>
              <span id="qty-${fullItem.id}" class="qty">${state.selectedItems[fullItem.id] || 0}</span>
              <button class="ghost" data-id="${fullItem.id}" data-action="increase">+</button>
            </div>
          </div>
        </div>
      `;

      card.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
          const action = btn.dataset.action;
          if (action === "increase") addItem(fullItem.id);
          if (action === "decrease") removeItem(fullItem.id);
        });
      });
      cards.appendChild(card);
    });

    block.appendChild(cards);
    menuList.appendChild(block);
  });
}

function renderBranches() {
  const branchList = document.getElementById("branchList");
  branchList.innerHTML = "";

  branches.forEach((branch) => {
    const item = document.createElement("label");
    item.className = "branch-item";
    item.innerHTML = `
      <span>${branch.name}</span>
      <input type="radio" name="branch" value="${branch.id}" />
    `;
    item.querySelector("input").addEventListener("change", () => {
      state.branch = branch;
      document.getElementById("toConfirm").disabled = false;
    });
    branchList.appendChild(item);
  });
}

function addItem(id) {
  state.selectedItems[id] = (state.selectedItems[id] || 0) + 1;
  updateSelectedCounter();
}

function removeItem(id) {
  if (!state.selectedItems[id]) return;
  state.selectedItems[id] -= 1;
  if (state.selectedItems[id] <= 0) delete state.selectedItems[id];
  updateSelectedCounter();
}

function updateSelectedCounter() {
  const count = Object.values(state.selectedItems).reduce((acc, val) => acc + val, 0);
  document.getElementById("selectedCounter").textContent = `${count} блюд`;
  document.getElementById("toBranchFromMenu").disabled = count === 0;

  menuItems.forEach((item) => {
    const qtyEl = document.getElementById(`qty-${item.id}`);
    if (qtyEl) qtyEl.textContent = state.selectedItems[item.id] || 0;
  });
}

function openBranchScreen() {
  state.branch = null;
  document.getElementById("toConfirm").disabled = true;
  document.querySelectorAll("input[name='branch']").forEach((input) => (input.checked = false));
  showSection("branch");
}

function renderQuizStep() {
  const question = quizQuestions[state.quizStep];
  const container = document.getElementById("quizQuestion");
  document.getElementById("quizTitle").textContent = `Вопрос ${state.quizStep + 1}`;

  container.innerHTML = `
    <p class="quiz__prompt">${question.prompt}</p>
    <div class="quiz__options"></div>
  `;

  const optionsContainer = container.querySelector(".quiz__options");
  question.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.className = "quiz__button";
    btn.textContent = option.label;
    btn.addEventListener("click", () => handleQuizAnswer(option.tag));
    optionsContainer.appendChild(btn);
  });
}

function handleQuizAnswer(tag) {
  state.quizAnswers[state.quizStep] = tag;
  if (state.quizStep === quizQuestions.length - 1) {
    buildSuggestions();
    showSection("quizResult");
    renderSuggestions();
  } else {
    state.quizStep += 1;
    renderQuizStep();
  }
}

function buildSuggestions() {
  const tagWeights = state.quizAnswers.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});

  const sortedTags = Object.entries(tagWeights)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  const suggestions = [];
  sortedTags.forEach((tag) => {
    menuItems
      .filter((item) => item.tags.includes(tag))
      .forEach((item) => {
        if (!suggestions.includes(item)) {
          suggestions.push(item);
        }
      });
  });

  menuItems.forEach((item) => {
    if (!suggestions.includes(item)) suggestions.push(item);
  });

  state.suggestions = suggestions.slice(0, 6);
}

function renderSuggestions() {
  const container = document.getElementById("suggestions");
  container.innerHTML = "";

  state.suggestions.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="card__content">
        <div class="price-row">
          <h3>${item.name}</h3>
          <label class="badge">
            <input type="checkbox" data-id="${item.id}" checked />
            В заказ
          </label>
        </div>
        <p>${item.description}</p>
        <p><strong>${item.price} ₽</strong></p>
      </div>
    `;
    container.appendChild(card);
  });
}

function commitSuggestions() {
  const checkboxes = document.querySelectorAll("#suggestions input[type='checkbox']");
  let anySelected = false;
  checkboxes.forEach((box) => {
    if (box.checked) {
      addItem(box.dataset.id);
      anySelected = true;
    }
  });

  if (!anySelected) {
    alert("Отметьте хотя бы одно блюдо или выберите меню самостоятельно");
    return;
  }
  openBranchScreen();
}

function renderConfirmation() {
  const list = document.getElementById("confirmItems");
  const branchEl = document.getElementById("confirmBranch");
  const totalEl = document.getElementById("confirmTotal");

  list.innerHTML = "";
  const entries = Object.entries(state.selectedItems);
  entries.forEach(([id, qty]) => {
    const item = menuItems.find((m) => m.id === id);
    const li = document.createElement("li");
    li.innerHTML = `<span>${item.name} × ${qty}</span><strong>${item.price * qty} ₽</strong>`;
    list.appendChild(li);
  });

  const total = entries.reduce((sum, [id, qty]) => {
    const item = menuItems.find((m) => m.id === id);
    return sum + item.price * qty;
  }, 0);

  branchEl.textContent = state.branch ? state.branch.name : "Выберите филиал";
  totalEl.textContent = `Итого: ${total} ₽`;

  document.getElementById("statusMessage").classList.add("hidden");
  document.getElementById("confirmOrder").disabled = true;
  document.getElementById("phoneInput").value = "+7";
}

function validatePhone() {
  const input = document.getElementById("phoneInput");
  if (!input.value.startsWith("+7")) {
    input.value = "+7" + input.value.replace(/[^\d]/g, "");
  }
  const valid = /^\+7\d{10}$/.test(input.value);
  document.getElementById("confirmOrder").disabled = !valid;
}

function submitOrder() {
  const status = document.getElementById("statusMessage");
  const phone = document.getElementById("phoneInput").value;
  const items = Object.entries(state.selectedItems)
    .map(([id, qty]) => {
      const item = menuItems.find((m) => m.id === id);
      return `${item.name} × ${qty}`;
    })
    .join(", ");

  const payload = {
    branch: state.branch?.name,
    phone,
    items,
  };

  console.log("Отправляем в ТГ:", payload);
  status.textContent = "Благодарим за заказ, мы свяжемся с Вами в ближайшее время.";
  status.classList.remove("hidden");
}

renderMenu();
renderBranches();
renderQuizStep();

document.getElementById("knowChoiceBtn").addEventListener("click", () => {
  state.currentFlow = "menu";
  showSection("menu");
});

document.getElementById("moodChoiceBtn").addEventListener("click", () => {
  state.currentFlow = "quiz";
  state.quizStep = 0;
  state.quizAnswers = [];
  renderQuizStep();
  showSection("quiz");
});

document.getElementById("backToStartFromMenu").addEventListener("click", () => showSection("start"));
document.getElementById("backToStartFromQuiz").addEventListener("click", () => showSection("start"));
document.getElementById("backToQuiz").addEventListener("click", () => {
  state.quizStep = 0;
  renderQuizStep();
  showSection("quiz");
});

document.getElementById("declineSuggestions").addEventListener("click", () => {
  showSection("menu");
});

document.getElementById("acceptSuggestions").addEventListener("click", commitSuggestions);

document.getElementById("toBranchFromMenu").addEventListener("click", () => {
  if (Object.keys(state.selectedItems).length === 0) return;
  openBranchScreen();
});

document.getElementById("backToMenu").addEventListener("click", () => showSection("menu"));

document.getElementById("toConfirm").addEventListener("click", () => {
  renderConfirmation();
  showSection("confirm");
});

document.getElementById("backToBranch").addEventListener("click", () => showSection("branch"));

document.getElementById("phoneInput").addEventListener("input", validatePhone);

document.getElementById("confirmOrder").addEventListener("click", submitOrder);
