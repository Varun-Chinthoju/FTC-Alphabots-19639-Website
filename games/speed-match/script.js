const ITEMS = [
    { name: "MOTOR", cat: "HARDWARE" },
    { name: "JAVA", cat: "SOFTWARE" },
    { name: "SERVO", cat: "HARDWARE" },
    { name: "VARIABLE", cat: "SOFTWARE" },
    { name: "CHASSIS", cat: "HARDWARE" },
    { name: "LOOP", cat: "SOFTWARE" },
    { name: "BATTERY", cat: "HARDWARE" },
    { name: "METHOD", cat: "SOFTWARE" },
    { name: "GEAR", cat: "HARDWARE" },
    { name: "OBJECT", cat: "SOFTWARE" },
    { name: "SENSOR", cat: "HARDWARE" },
    { name: "ARRAY", cat: "SOFTWARE" },
    { name: "WHEEL", cat: "HARDWARE" },
    { name: "STRING", cat: "SOFTWARE" }
];

let currentItem = null;
let score = 0;
let timeLeft = 20;
let timerInterval = null;

function initGame() {
    score = 0;
    timeLeft = 20;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('gameover').classList.add('hidden');
    
    nextItem();
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function nextItem() {
    currentItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    document.getElementById('target-item').textContent = currentItem.name;
}

function handleChoice(cat) {
    if (!currentItem) return;
    
    if (cat === currentItem.cat) {
        score++;
        document.getElementById('score').textContent = score;
        nextItem();
    } else {
        timeLeft = Math.max(0, timeLeft - 2);
        document.getElementById('timer').textContent = timeLeft;
        window.parent.postMessage({ type: 'shake' }, '*');
        nextItem();
    }
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('gameover').classList.remove('hidden');
    document.getElementById('stats-msg').textContent = `You correctly identified ${score} items!`;
    window.parent.postMessage({ type: 'game_win' }, '*');
    
    let high = parseInt(localStorage.getItem('hs-speed-match') || "0");
    if (score > high) {
        window.parent.postMessage({ type: 'update_high_score', gameId: 'speed-match', score: score }, '*');
    }
}

initGame();
