const arrowToWasd = { 'ArrowUp': 'W', 'ArrowDown': 'S', 'ArrowLeft': 'A', 'ArrowRight': 'D' };
let keys = [];
let currentIndex = 0;
let timeLeft = 15;
let timer;

function generateRandomKeys() {
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
    div.textContent = key.replace('Arrow', '');
    div.id = 'key-' + i;
    sequenceDiv.appendChild(div);
  });
}

function endGame(success) {
  clearInterval(timer);
  document.removeEventListener('keydown', handleKey);
  document.getElementById('result').textContent = success ? '✅ Sucesso!' : '❌ Falha!';
}

function handleKey(e) {
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
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
    if (timeLeft <= 0) endGame(false);
  }, 1000);
}

generateRandomKeys();
renderSequence();
document.addEventListener('keydown', handleKey);
startTimer();
