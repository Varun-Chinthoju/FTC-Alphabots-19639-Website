let sequence = [];
let playerSequence = [];
let score = 0;
let canClick = false;
let highScore = parseInt(localStorage.getItem('hs-pattern-matcher') || "0");

function initGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    
    document.getElementById('score').textContent = score;
    document.getElementById('high-score').textContent = highScore;
    document.getElementById('start-overlay').classList.add('hidden');
    document.getElementById('gameover').classList.add('hidden');
    
    nextRound();
}

function nextRound() {
    playerSequence = [];
    canClick = false;
    score++;
    document.getElementById('score').textContent = score - 1;
    
    sequence.push(Math.floor(Math.random() * 4));
    showSequence();
}

async function showSequence() {
    document.getElementById('status-text').textContent = "Watch the pattern...";
    for (let i = 0; i < sequence.length; i++) {
        await playPad(sequence[i]);
        await new Promise(r => setTimeout(r, 300));
    }
    document.getElementById('status-text').textContent = "Your turn!";
    canClick = true;
}

function playPad(index) {
    return new Promise(resolve => {
        const pad = document.getElementById(`pad-${index}`);
        pad.classList.add('active');
        setTimeout(() => {
            pad.classList.remove('active');
            resolve();
        }, 500);
    });
}

function handlePadClick(index) {
    if (!canClick) return;
    
    playPad(index);
    playerSequence.push(index);
    
    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== sequence[currentStep]) {
        endGame();
        return;
    }
    
    if (playerSequence.length === sequence.length) {
        canClick = false;
        if (score > highScore) {
            highScore = score;
            document.getElementById('high-score').textContent = highScore;
            window.parent.postMessage({ type: 'update_high_score', gameId: 'pattern-matcher', score: highScore }, '*');
        }
        setTimeout(nextRound, 1000);
    }
}

function endGame() {
    canClick = false;
    document.getElementById('gameover').classList.remove('hidden');
    document.getElementById('stats-msg').textContent = `Sequence broken at step ${score}.`;
    window.parent.postMessage({ type: 'shake' }, '*');
    window.parent.postMessage({ type: 'game_win' }, '*');
}
