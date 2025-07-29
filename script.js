const arrowToWasd = { 'ArrowUp': 'W', 'ArrowDown': 'S', 'ArrowLeft': 'A', 'ArrowRight': 'D' };
let keys = [];
let currentIndex = 0;
let timeLeft = 15;
let timer;

function generateRandomKeys() {
  keys = []; // limpa array antes de gerar de novo
  const possible = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  for (let i = 0; i < 10; i++) {
    keys.push(possible[Math.floor(Math.random() * possible.length)]);
  }
}

function renderSequence() {
  const sequenceDiv = document.getElementById('sequence');
  sequenceDiv.innerHTML = '';
  keys.forEach((key, i) => {
    const div = document.createElement('div');
    div.classList.add('key-box');
    div.id = 'key-' + i;

    // Agora vai mostrar setas usando caracteres unicode
    let arrowSymbol = '';
    switch (key) {
      case 'ArrowUp': arrowSymbol = '↑'; break;
      case 'ArrowDown': arrowSymbol = '↓'; break;
      case 'ArrowLeft': arrowSymbol = '←'; break;
      case 'ArrowRight': arrowSymbol = '→'; break;
    }

    div.textContent = arrowSymbol;
    sequenceDiv.appendChild(div);
  });
}

function endGame(success) {
  clearInterval(timer);
  document.removeEventListener('keydown', handleKey);
  document.getElementById('result').textContent = success ? '✅ Sucesso!' : '❌ Falha!';
}

function handleKey(e) {
  if (e.key.toUpperCase() === 'R') {
    restartGame();
    return;
  }

  let inputKey = e.key.toUpperCase();
  const expected = keys[currentIndex];
  const expectedWASD = arrowToWasd[expected];

  if (
    inputKey === expected.replace('Arrow', '').toUpperCase() ||
    inputKey === expectedWASD
  ) {
    document.getElementById('key-' + currentIndex).classList.add('correct');
    currentIndex++;
    if (currentIndex >= keys.length) endGame(true);
  } else {
    document.getElementById('key-' + currentIndex).classList.add('wrong');
    endGame(false);
  }
}

function startTimer() {
  timeLeft = 15; // reseta tempo no start
  document.getElementById('time').textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
    if (timeLeft <= 0) endGame(false);
  }, 1000);
}

function restartGame() {
  clearInterval(timer);
  keys = [];
  currentIndex = 0;
  document.getElementById('result').textContent = '';
  generateRandomKeys();
  renderSequence();
  startTimer();
  document.addEventListener('keydown', handleKey);
}

// Inicialização inicial
generateRandomKeys();
renderSequence();
document.addEventListener('keydown', handleKey);
startTimer();
