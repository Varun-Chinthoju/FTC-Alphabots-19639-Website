let valA = 0;
let valB = 0;
let targetOut = 0;
let score = 1;
let lives = 3;

const GATES = {
    AND: (a, b) => a && b ? 1 : 0,
    OR: (a, b) => a || b ? 1 : 0,
    XOR: (a, b) => a !== b ? 1 : 0,
    NAND: (a, b) => !(a && b) ? 1 : 0
};

function initGame() {
    score = 1;
    lives = 3;
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('gameover').classList.add('hidden');
    nextLevel();
}

function nextLevel() {
    valA = Math.round(Math.random());
    valB = Math.round(Math.random());
    
    const gateKeys = Object.keys(GATES);
    const randomGate = gateKeys[Math.floor(Math.random() * gateKeys.length)];
    targetOut = GATES[randomGate](valA, valB);
    
    document.getElementById('val-a').textContent = valA;
    document.getElementById('val-b').textContent = valB;
    document.getElementById('val-out').textContent = targetOut;
    document.getElementById('selected-gate').textContent = "?";
    
    // Reset visual power
    document.querySelectorAll('.powered').forEach(el => el.classList.remove('powered'));
    
    // Set input power visuals
    if (valA) {
        document.getElementById('node-a').classList.add('powered');
        document.getElementById('wire-a').classList.add('powered');
    }
    if (valB) {
        document.getElementById('node-b').classList.add('powered');
        document.getElementById('wire-b').classList.add('powered');
    }
}

function handleChoice(gateName) {
    const result = GATES[gateName](valA, valB);
    const gateBox = document.getElementById('selected-gate');
    gateBox.textContent = gateName;
    
    if (result === targetOut) {
        // Success animation
        gateBox.classList.add('powered');
        if (targetOut) {
            document.getElementById('wire-out').classList.add('powered');
            document.getElementById('node-out').classList.add('powered');
        }
        
        score++;
        document.getElementById('score').textContent = score;
        setTimeout(nextLevel, 1200);
    } else {
        lives--;
        document.getElementById('lives').textContent = lives;
        window.parent.postMessage({ type: 'shake' }, '*');
        
        // Show wrong gate failure
        gateBox.style.borderColor = '#ef4444';
        gateBox.style.color = '#ef4444';
        
        if (lives <= 0) endGame();
        else setTimeout(nextLevel, 1200);
    }
}

function endGame() {
    document.getElementById('gameover').classList.remove('hidden');
    document.getElementById('stats-msg').textContent = `System overloaded at Level ${score}.`;
    window.parent.postMessage({ type: 'game_win' }, '*');
    
    let high = parseInt(localStorage.getItem('hs-logic-puzzle') || "0");
    if (score > high) {
        window.parent.postMessage({ type: 'update_high_score', gameId: 'logic-puzzle', score: score }, '*');
    }
}

initGame();
