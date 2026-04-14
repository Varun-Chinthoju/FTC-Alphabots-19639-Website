const ICONS = [
    "ph-robot", "ph-nut", "ph-code", "ph-circuit-board",
    "ph-engine", "ph-gear", "ph-battery-charging", "ph-cpu"
];

let cards = [];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;

function initGame() {
    const doubleIcons = [...ICONS, ...ICONS];
    cards = doubleIcons.sort(() => Math.random() - 0.5);
    flippedCards = [];
    matchedCount = 0;
    moves = 0;
    timer = 0;
    
    document.getElementById('moves').textContent = moves;
    document.getElementById('timer').textContent = "00:00";
    document.getElementById('gameover').classList.add('hidden');
    
    const board = document.getElementById('board');
    board.innerHTML = '';
    
    cards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.onclick = () => flipCard(card);
        
        card.innerHTML = `
            <div class="card-front"></div>
            <div class="card-back"><i class="ph ${icon}"></i></div>
        `;
        board.appendChild(card);
    });
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer++;
        const mins = Math.floor(timer / 60).toString().padStart(2, '0');
        const secs = (timer % 60).toString().padStart(2, '0');
        document.getElementById('timer').textContent = `${mins}:${secs}`;
    }, 1000);
}

function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount++;
        flippedCards = [];
        if (matchedCount === ICONS.length) {
            endGame();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            window.parent.postMessage({ type: 'shake' }, '*');
        }, 1000);
    }
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('gameover').classList.remove('hidden');
    document.getElementById('stats-msg').textContent = `Matched in ${moves} moves and ${timer} seconds!`;
    window.parent.postMessage({ type: 'game_win' }, '*');
    
    const bestTime = localStorage.getItem('hs-memory-match') || Infinity;
    if (timer < bestTime) {
        window.parent.postMessage({ type: 'update_high_score', gameId: 'memory-match', score: `${timer}s` }, '*');
    }
}

document.getElementById('restart-btn').onclick = initGame;
initGame();
