const DECK = [
    { f: "What is the maximum robot size?", b: "18 x 18 x 18 inches" },
    { f: "How many motors are allowed?", b: "8 DC Motors maximum" },
    { f: "What does FTC stand for?", b: "FIRST Tech Challenge" },
    { f: "What is the Autonomous period duration?", b: "30 seconds" },
    { f: "What is the TeleOp period duration?", b: "2 minutes" },
    { f: "How many teams per alliance?", b: "2 teams (Red and Blue alliances)" },
    { f: "What is the team number for Alphabots?", b: "19639" },
    { f: "What is the 'Golden Whisk'?", b: "An award won by Team 19639" },
    { f: "What is a 'Human Player'?", b: "A student who manages game elements from the side" },
    { f: "What is 'Gracious Professionalism'?", b: "The core value of FIRST: high-quality work + respect" }
];

let currentIndex = 0;
let reviewedCount = 0;
let reviewedIndices = new Set();

function initGame() {
    currentIndex = 0;
    reviewedCount = 0;
    reviewedIndices.clear();
    document.getElementById('completion').classList.add('hidden');
    updateCard();
}

function updateCard() {
    const card = document.getElementById('card');
    card.classList.remove('flipped');
    
    document.getElementById('front-text').textContent = DECK[currentIndex].f;
    document.getElementById('back-text').textContent = DECK[currentIndex].b;
    document.getElementById('counter').textContent = `Card ${currentIndex + 1} of ${DECK.length}`;
    
    if (!reviewedIndices.has(currentIndex)) {
        reviewedIndices.add(currentIndex);
        reviewedCount++;
        window.parent.postMessage({ type: 'update_high_score', gameId: 'flashcards', score: reviewedCount }, '*');
    }
}

function flipCard() {
    document.getElementById('card').classList.toggle('flipped');
}

function nextCard() {
    if (currentIndex < DECK.length - 1) {
        currentIndex++;
        updateCard();
    } else {
        document.getElementById('completion').classList.remove('hidden');
        window.parent.postMessage({ type: 'game_win' }, '*');
    }
}

function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCard();
    }
}

initGame();
