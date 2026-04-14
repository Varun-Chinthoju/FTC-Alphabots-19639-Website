const SCENARIOS = [
    { text: "A robot intentionally blocks an opponent's path for 10 seconds.", isPenalty: true, explanation: "Blocking or pinning for more than 5 seconds is a penalty (G201)." },
    { text: "A robot touches the opponent's scoring element during TeleOp.", isPenalty: false, explanation: "Incidental contact is usually legal unless it interferes with scoring (G401)." },
    { text: "A drive team member steps onto the field during the match.", isPenalty: true, explanation: "Safety violation. Drive team must stay in their station (S1)." },
    { text: "A robot expands to 20x20x20 inches after the match starts.", isPenalty: false, explanation: "Robots can expand beyond 18x18x18 after the match begins unless game-specific rules restrict it." },
    { text: "A robot launches a game element across the field.", isPenalty: true, explanation: "Launching game elements is generally prohibited unless specifically allowed (G405)." },
    { text: "A robot detaches a part of itself intentionally.", isPenalty: true, explanation: "Robots may not intentionally detach parts on the field (G402)." },
    { text: "Two robots from the same alliance touch the same goal.", isPenalty: false, explanation: "This is legal unless it exceeds the possession limit or blocking rules." }
];

let currentScenario = null;
let streak = 0;
let highStreak = parseInt(localStorage.getItem('hs-penalty-legal') || "0");

function initGame() {
    streak = 0;
    document.getElementById('streak').textContent = streak;
    document.getElementById('high-streak').textContent = highStreak;
    document.getElementById('gameover').classList.add('hidden');
    nextScenario();
}

function nextScenario() {
    currentScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    document.getElementById('scenario-text').textContent = currentScenario.text;
}

function handleChoice(pickedPenalty) {
    if (pickedPenalty === currentScenario.isPenalty) {
        streak++;
        document.getElementById('streak').textContent = streak;
        if (streak > highStreak) {
            highStreak = streak;
            document.getElementById('high-streak').textContent = highStreak;
            window.parent.postMessage({ type: 'update_high_score', gameId: 'penalty-legal', score: highStreak }, '*');
        }
        nextScenario();
    } else {
        endGame();
    }
}

function endGame() {
    document.getElementById('gameover').classList.remove('hidden');
    document.getElementById('explanation').textContent = currentScenario.explanation;
    window.parent.postMessage({ type: 'shake' }, '*');
    window.parent.postMessage({ type: 'game_win' }, '*'); // Record participation
}

initGame();
