const WORDS = [
    "ALPHABOTS", "ROBOTICS", "HARDWARE", "SOFTWARE", "OUTREACH", "ENGINEERING",
    "ALLIANCE", "SCRIMMAGE", "TOURNAMENT", "BATTERY", "CHASSIS", "DRIVETRAIN",
    "SERVOS", "SENSORS", "TELEOP", "AUTONOMOUS", "ODOMETRY", "CONTROLLER",
    "WHEELS", "MOTORS", "REVELATION", "DECODE", "MECHANISM", "CONTROL"
];

let targetWord = "";
let guessedLetters = [];
let lives = 6;

function initGame() {
    targetWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    guessedLetters = [];
    lives = 6;
    
    document.getElementById('lives').textContent = lives;
    document.getElementById('gameover').classList.add('hidden');
    
    renderWord();
    renderKeyboard();
}

function renderWord() {
    const display = document.getElementById('word-display');
    const html = targetWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : "_"
    ).join(' ');
    display.textContent = html;
    
    if (!display.textContent.includes("_")) {
        endGame(true);
    }
}

function renderKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
        const btn = document.createElement('button');
        btn.textContent = letter;
        btn.onclick = () => handleGuess(letter, btn);
        keyboard.appendChild(btn);
    });
}

function handleGuess(letter, btn) {
    if (btn.disabled || lives <= 0) return;
    btn.disabled = true;
    
    if (targetWord.includes(letter)) {
        guessedLetters.push(letter);
        btn.classList.add('correct');
        renderWord();
    } else {
        lives--;
        btn.classList.add('wrong');
        document.getElementById('lives').textContent = lives;
        if (lives <= 0) {
            endGame(false);
        } else {
            window.parent.postMessage({ type: 'shake' }, '*');
        }
    }
}

function endGame(won) {
    const modal = document.getElementById('gameover');
    const msg = document.getElementById('result-msg');
    const targetMsg = document.getElementById('target-word-msg');
    
    modal.classList.remove('hidden');
    if (won) {
        msg.textContent = "🏆 CHAMPION!";
        msg.style.color = "var(--brand-green)";
        targetMsg.textContent = `You found the word: ${targetWord}`;
        window.parent.postMessage({ type: 'game_win' }, '*');
        
        // Update high score
        let wins = parseInt(localStorage.getItem('hs-hangman') || "0");
        wins++;
        window.parent.postMessage({ type: 'update_high_score', gameId: 'hangman', score: wins }, '*');
    } else {
        msg.textContent = "💀 DISCONNECTED";
        msg.style.color = "#ef4444";
        targetMsg.textContent = `The word was: ${targetWord}`;
        window.parent.postMessage({ type: 'shake' }, '*');
    }
}

document.getElementById('restart-btn').onclick = initGame;

// Listen for theme init from parent
window.addEventListener('message', (event) => {
    if (event.data.type === 'init') {
        // Theme sync logic if needed
    }
});

initGame();
