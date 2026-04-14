const WORDS = [
    { word: "BATTERY", hint: "Provides power to the robot" },
    { word: "CHASSIS", hint: "The frame of the robot" },
    { word: "DRIVETRAIN", hint: "Mechanisms that move the robot" },
    { word: "TELEOP", hint: "Driver controlled period" },
    { word: "AUTONOMOUS", hint: "Pre-programmed period" },
    { word: "ALLIANCE", hint: "Group of two teams working together" },
    { word: "ODOMETRY", hint: "Position tracking using wheels" },
    { word: "CONTROLLER", hint: "Game pad used by drivers" },
    { word: "SENSORS", hint: "Eyes and ears of the robot" },
    { word: "MECHANISM", hint: "A assembly of moving parts" }
];

let currentWord = "";
let score = 0;
let timeLeft = 30;
let timerInterval = null;

function initGame() {
    score = 0;
    timeLeft = 30;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('gameover').classList.add('hidden');
    
    nextWord();
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function nextWord() {
    const item = WORDS[Math.floor(Math.random() * WORDS.length)];
    currentWord = item.word;
    document.getElementById('hint').textContent = item.hint;
    document.getElementById('jumbled-word').textContent = scramble(currentWord);
    document.getElementById('answer-input').value = "";
    document.getElementById('answer-input').focus();
}

function scramble(word) {
    let arr = word.split("");
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const result = arr.join("");
    return result === word ? scramble(word) : result;
}

function handleAnswer() {
    const input = document.getElementById('answer-input').value.toUpperCase().trim();
    if (input === currentWord) {
        score++;
        document.getElementById('score').textContent = score;
        nextWord();
    } else {
        window.parent.postMessage({ type: 'shake' }, '*');
    }
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('gameover').classList.remove('hidden');
    document.getElementById('stats-msg').textContent = `You unscrambled ${score} words!`;
    window.parent.postMessage({ type: 'game_win' }, '*');
    
    let high = parseInt(localStorage.getItem('hs-term-scramble') || "0");
    if (score > high) {
        window.parent.postMessage({ type: 'update_high_score', gameId: 'term-scramble', score: score }, '*');
    }
}

document.getElementById('submit-btn').onclick = handleAnswer;
document.getElementById('answer-input').onkeypress = (e) => { if (e.key === 'Enter') handleAnswer(); };
document.getElementById('restart-btn').onclick = initGame;

initGame();
