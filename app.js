const screens = {
  start: document.getElementById('startScreen'),
  menu: document.getElementById('menuScreen'),
  quiz: document.getElementById('quizScreen'),
  quizResult: document.getElementById('quizResultScreen'),
  branch: document.getElementById('branchScreen'),
  confirm: document.getElementById('confirmScreen'),
};

const buttons = {
  knowChoice: document.getElementById('knowChoiceBtn'),
  moodChoice: document.getElementById('moodChoiceBtn'),
  backToStartFromMenu: document.getElementById('backToStartFromMenu'),
  backToStartFromQuiz: document.getElementById('backToStartFromQuiz'),
  backToQuiz: document.getElementById('backToQuiz'),
  backToMenu: document.getElementById('backToMenu'),
  backToBranch: document.getElementById('backToBranch'),
  toBranchFromMenu: document.getElementById('toBranchFromMenu'),
  toConfirm: document.getElementById('toConfirm'),
  confirmOrder: document.getElementById('confirmOrder'),
  acceptSuggestions: document.getElementById('acceptSuggestions'),
  declineSuggestions: document.getElementById('declineSuggestions'),
};

const containers = {
  menuList: document.getElementById('menuList'),
  selectedCounter: document.getElementById('selectedCounter'),
  quizQuestion: document.getElementById('quizQuestion'),
  quizTitle: document.getElementById('quizTitle'),
  suggestions: document.getElementById('suggestions'),
  branchList: document.getElementById('branchList'),
  confirmBranch: document.getElementById('confirmBranch'),
  confirmItems: document.getElementById('confirmItems'),
  confirmTotal: document.getElementById('confirmTotal'),
  statusMessage: document.getElementById('statusMessage'),
  phoneInput: document.getElementById('phoneInput'),
  phoneHint: document.getElementById('phoneHint'),
};

const menu = [
  { id: 'arrabbiata', name: 'Пенне Аррабиата', description: 'Острая томатная паста с чесноком и перцем чили.', price: 420 },
  { id: 'carbonara', name: 'Спагетти Карбонара', description: 'Классический соус с гуанчале, яйцом и пармезаном.', price: 480 },
  { id: 'bolognese', name: 'Тальятелле Болоньезе', description: 'Тушёная говядина, томаты и ароматные травы.', price: 510 },
  { id: 'pesto', name: 'Тренетте с песто', description: 'Базиликовый песто, кедровые орехи и пармезан.', price: 450 },
  { id: 'salmon', name: 'Феттуччине с лососем', description: 'Сливочный соус, слабосолёный лосось и лимон.', price: 560 },
  { id: 'vegan', name: 'Кремовая паста с овощами', description: 'Цукини, баклажан, сладкий перец и овсяные сливки.', price: 430 },
  { id: 'truffle', name: 'Паппарделле с трюфельным маслом', description: 'Грибы, трюфельное масло и выдержанный пармезан.', price: 620 },
  { id: 'lasagna', name: 'Лазанья с рикоттой', description: 'Сливочная рикотта, моцарелла и томатный соус.', price: 540 },
];

const quiz = [
  {
    title: 'Вопрос 1',
    question: 'Какое настроение сегодня?',
    options: [
      { label: 'Хочу классики', tags: ['carbonara', 'bolognese'] },
      { label: 'Нужна лёгкость', tags: ['pesto', 'vegan'] },
      { label: 'Хочу чего-то насыщенного', tags: ['arrabbiata', 'truffle'] },
    ],
  },
  {
    title: 'Вопрос 2',
    question: 'Любите ли острое?',
    options: [
      { label: 'Да, поострее', tags: ['arrabbiata'] },
      { label: 'Предпочитаю нейтральное', tags: ['carbonara', 'bolognese'] },
      { label: 'Лёгкая пикантность', tags: ['pesto', 'salmon'] },
    ],
  },
  {
    title: 'Вопрос 3',
    question: 'Нужна ли опция без мяса?',
    options: [
      { label: 'Да, без мяса', tags: ['vegan', 'pesto', 'lasagna'] },
      { label: 'Нет, можно мясо', tags: ['bolognese', 'carbonara', 'arrabbiata'] },
      { label: 'Рыба подойдёт', tags: ['salmon'] },
    ],
  },
  {
    title: 'Вопрос 4',
    question: 'Какой соус любите больше?',
    options: [
      { label: 'Сливочный', tags: ['carbonara', 'salmon', 'vegan'] },
      { label: 'Томатный', tags: ['arrabbiata', 'bolognese', 'lasagna'] },
      { label: 'Песто', tags: ['pesto'] },
    ],
  },
  {
    title: 'Вопрос 5',
    question: 'Насколько сытный нужен обед?',
    options: [
      { label: 'Беру самое плотное', tags: ['bolognese', 'truffle', 'lasagna'] },
      { label: 'Средней сытости', tags: ['carbonara', 'pesto', 'salmon'] },
      { label: 'Хочу лёгкость', tags: ['vegan', 'pesto'] },
    ],
  },
];

const branches = [
  { id: 'center', name: 'Центральный', address: 'Невский проспект, 10' },
  { id: 'islands', name: 'В.О.', address: 'Средний проспект, 21' },
  { id: 'south', name: 'Юг', address: 'Балканская площадь, 5' },
];

const selectedItems = new Set();
let quizAnswers = [];
let selectedBranch = null;

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => {
    if (element) {
      element.classList.toggle('hidden', key !== name);
    }
  });
}

function renderMenu() {
  containers.menuList.innerHTML = '';
  menu.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';

    const title = document.createElement('h3');
    title.textContent = item.name;

    const description = document.createElement('p');
    description.className = 'muted';
    description.textContent = item.description;

    const footer = document.createElement('div');
    footer.className = 'card__footer';

    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = `${item.price} ₽`;

    const toggle = document.createElement('button');
    toggle.className = 'secondary';
    toggle.textContent = selectedItems.has(item.id) ? 'Убрать' : 'Добавить';
    toggle.addEventListener('click', () => toggleItem(item.id));

    footer.append(price, toggle);
    card.append(title, description, footer);
    containers.menuList.appendChild(card);
  });
  updateSelectedCounter();
}

function toggleItem(id) {
  if (selectedItems.has(id)) {
    selectedItems.delete(id);
  } else {
    selectedItems.add(id);
  }
  renderMenu();
  renderSuggestions();
  updateSelectedCounter();
  updateConfirmButtonState();
}

function updateSelectedCounter() {
  const count = selectedItems.size;
  containers.selectedCounter.textContent = count ? `${count} блюд` : '0 блюд';
  buttons.toBranchFromMenu.disabled = count === 0;
}

function renderQuizStep(index) {
  const step = quiz[index];
  containers.quizTitle.textContent = step.title;
  containers.quizQuestion.innerHTML = '';

  const prompt = document.createElement('p');
  prompt.textContent = step.question;
  containers.quizQuestion.appendChild(prompt);

  const list = document.createElement('div');
  list.className = 'options-grid';

  step.options.forEach((option) => {
    const btn = document.createElement('button');
    btn.className = 'option-card';
    btn.textContent = option.label;
    btn.addEventListener('click', () => handleQuizAnswer(option.tags));
    list.appendChild(btn);
  });

  containers.quizQuestion.appendChild(list);
}

function handleQuizAnswer(tags) {
  quizAnswers.push(tags);
  if (quizAnswers.length === quiz.length) {
    buildSuggestions();
    showScreen('quizResult');
    renderSuggestions();
    return;
  }
  renderQuizStep(quizAnswers.length);
}

function buildSuggestions() {
  const counts = {};
  quizAnswers.flat().forEach((tag) => {
    counts[tag] = (counts[tag] || 0) + 1;
  });

  const sortedIds = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  const picks = sortedIds.slice(0, 4);

  selectedItems.clear();
  picks.forEach((id) => selectedItems.add(id));
}

function renderSuggestions() {
  if (!containers.suggestions) return;
  containers.suggestions.innerHTML = '';
  const suggestedItems = menu.filter((item) => selectedItems.has(item.id));

  suggestedItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card card--compact';

    const header = document.createElement('div');
    header.className = 'card__header';

    const title = document.createElement('h3');
    title.textContent = item.name;

    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = `${item.price} ₽`;

    header.append(title, price);

    const description = document.createElement('p');
    description.className = 'muted';
    description.textContent = item.description;

    const toggle = document.createElement('button');
    toggle.className = 'secondary';
    toggle.textContent = 'Убрать из списка';
    toggle.addEventListener('click', () => toggleItem(item.id));

    card.append(header, description, toggle);
    containers.suggestions.appendChild(card);
  });

  if (!suggestedItems.length) {
    const empty = document.createElement('p');
    empty.className = 'muted';
    empty.textContent = 'Ничего не выбрано — вернитесь к меню и добавьте блюда.';
    containers.suggestions.appendChild(empty);
  }
}

function renderBranches() {
  containers.branchList.innerHTML = '';
  branches.forEach((branch) => {
    const btn = document.createElement('button');
    btn.className = 'branch';
    btn.textContent = `${branch.name} · ${branch.address}`;
    btn.dataset.branchId = branch.id;
    btn.addEventListener('click', () => selectBranch(branch.id));
    containers.branchList.appendChild(btn);
  });
}

function selectBranch(id) {
  selectedBranch = branches.find((branch) => branch.id === id) || null;
  Array.from(containers.branchList.children).forEach((child) => {
    child.classList.toggle('branch--active', child.dataset.branchId === id);
  });
  buttons.toConfirm.disabled = !selectedBranch;
}

function buildConfirm() {
  containers.confirmBranch.textContent = selectedBranch ? `${selectedBranch.name} — ${selectedBranch.address}` : '';
  containers.confirmItems.innerHTML = '';

  let total = 0;
  menu.filter((item) => selectedItems.has(item.id)).forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price} ₽`;
    total += item.price;
    containers.confirmItems.appendChild(li);
  });

  containers.confirmTotal.textContent = total ? `Итого: ${total} ₽` : '';
  updateConfirmButtonState();
}

function updateConfirmButtonState() {
  const hasItems = selectedItems.size > 0;
  const validPhone = /^\+7\d{10}$/.test(containers.phoneInput.value.trim());
  buttons.confirmOrder.disabled = !(hasItems && selectedBranch && validPhone);
}

function resetFlow() {
  selectedItems.clear();
  quizAnswers = [];
  selectedBranch = null;
  containers.phoneInput.value = '+7';
  buttons.toBranchFromMenu.disabled = true;
  buttons.toConfirm.disabled = true;
  buttons.confirmOrder.disabled = true;
  renderMenu();
  renderBranches();
  renderQuizStep(0);
  renderSuggestions();
  containers.statusMessage.classList.add('hidden');
  containers.statusMessage.textContent = '';
}

async function sendTelegram(message) {
  const token = document.body.dataset.telegramBotToken || window.TELEGRAM_BOT_TOKEN;
  const chatId = document.body.dataset.telegramChatId || window.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('Не заданы токен или chat_id бота');
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const payload = { chat_id: chatId, text: message, parse_mode: 'HTML' };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Ошибка Telegram API: ${error}`);
  }
}

function buildTelegramMessage() {
  const items = menu.filter((item) => selectedItems.has(item.id));
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const list = items.map((item) => `• ${item.name} — ${item.price} ₽`).join('\n');
  const branchText = selectedBranch ? `${selectedBranch.name} (${selectedBranch.address})` : 'не выбран';
  const phone = containers.phoneInput.value.trim();

  return [
    '<b>Новый заказ из квиза Bistro Pasta</b>',
    `Филиал: ${branchText}`,
    `Телефон: ${phone}`,
    'Блюда:',
    list || '—',
    total ? `Итого: ${total} ₽` : 'Итого: 0 ₽',
  ].join('\n');
}

async function handleConfirm() {
  const message = buildTelegramMessage();
  containers.statusMessage.classList.remove('hidden');
  containers.statusMessage.textContent = 'Отправляем заказ в Telegram…';
  buttons.confirmOrder.disabled = true;

  try {
    await sendTelegram(message);
    containers.statusMessage.textContent = 'Заказ отправлен! Мы свяжемся с вами в Telegram.';
  } catch (error) {
    console.error(error);
    containers.statusMessage.textContent = `Не удалось отправить: ${error.message}`;
  } finally {
    buttons.confirmOrder.disabled = false;
  }
}

buttons.knowChoice.addEventListener('click', () => {
  showScreen('menu');
  renderMenu();
});

buttons.moodChoice.addEventListener('click', () => {
  showScreen('quiz');
  renderQuizStep(0);
});

buttons.backToStartFromMenu.addEventListener('click', () => showScreen('start'));
buttons.backToStartFromQuiz.addEventListener('click', () => {
  quizAnswers = [];
  renderQuizStep(0);
  showScreen('start');
});
buttons.backToQuiz.addEventListener('click', () => {
  quizAnswers.pop();
  renderQuizStep(quizAnswers.length);
  showScreen('quiz');
});
buttons.backToMenu.addEventListener('click', () => showScreen('menu'));
buttons.backToBranch.addEventListener('click', () => showScreen('branch'));

buttons.toBranchFromMenu.addEventListener('click', () => {
  renderBranches();
  showScreen('branch');
});

buttons.toConfirm.addEventListener('click', () => {
  buildConfirm();
  showScreen('confirm');
});

buttons.acceptSuggestions.addEventListener('click', () => {
  renderMenu();
  renderBranches();
  showScreen('branch');
});

buttons.declineSuggestions.addEventListener('click', () => {
  selectedItems.clear();
  renderMenu();
  showScreen('menu');
});

buttons.confirmOrder.addEventListener('click', handleConfirm);
containers.phoneInput.addEventListener('input', () => {
  const value = containers.phoneInput.value.trim();
  const valid = /^\+7\d{10}$/.test(value);
  containers.phoneHint.textContent = valid ? 'Формат корректен, отправляем в Telegram.' : 'Введите номер в федеральном формате, пример: +7XXXXXXXXXX';
  updateConfirmButtonState();
});

renderMenu();
renderBranches();
renderQuizStep(0);
renderSuggestions();
showScreen('start');
updateConfirmButtonState();

window.addEventListener('load', resetFlow);
