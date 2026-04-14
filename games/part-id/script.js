const PARTS = [
    { name: "Andymark Neverest Motor", img: "../../images/team/bot.jpg" }, // Use available images
    { name: "REV Control Hub", img: "../../images/team/bot.jpg" },
    { name: "REV Expansion Hub", img: "../../images/team/bot.jpg" },
    { name: "Mecanum Wheel", img: "../../images/team/bot.jpg" },
    { name: "TETRIX Beam", img: "../../images/team/bot.jpg" },
    { name: "Bumper Switch", img: "../../images/team/bot.jpg" },
    { name: "Distance Sensor", img: "../../images/team/bot.jpg" },
    { name: "GoBilda Servo", img: "../../images/team/bot.jpg" }
];

let currentPart = null;
let score = 0;
let lives = 3;

function initGame() {
    score = 0;
    lives = 3;
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('gameover').classList.add('hidden');
    nextPart();
}

function nextPart() {
    currentPart = PARTS[Math.floor(Math.random() * PARTS.length)];
    const imgEl = document.getElementById('part-image');
    
    // In a real app, these would be unique images. 
    // We'll use the main bot image and apply a random CSS zoom/crop to make it a "puzzle"
    imgEl.src = "../../bot.jpg"; 
    const zoom = 200 + Math.random() * 300;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    imgEl.style.transform = `scale(${zoom/100})`;
    imgEl.style.transformOrigin = `${x}% ${y}%`;
    
    document.getElementById('part-description').textContent = "Scanning hardware component...";
    
    // Generate options
    let options = [currentPart.name];
    while (options.length < 4) {
        const randomName = PARTS[Math.floor(Math.random() * PARTS.length)].name;
        if (!options.includes(randomName)) options.push(randomName);
    }
    options.sort(() => Math.random() - 0.5);
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleChoice(opt);
        grid.appendChild(btn);
    });
}

function handleChoice(picked) {
    if (picked === currentPart.name) {
        score++;
        document.getElementById('score').textContent = score;
        // Show full image briefly
        document.getElementById('part-image').style.transform = 'scale(1)';
        document.getElementById('part-description').textContent = "MATCH FOUND!";
        setTimeout(nextPart, 1000);
    } else {
        lives--;
        document.getElementById('lives').textContent = lives;
        window.parent.postMessage({ type: 'shake' }, '*');
        if (lives <= 0) endGame();
        else nextPart();
    }
}

function endGame() {
    document.getElementById('gameover').classList.remove('hidden');
    document.getElementById('stats-msg').textContent = `Correctly identified ${score} systems.`;
    window.parent.postMessage({ type: 'game_win' }, '*');
    
    let high = parseInt(localStorage.getItem('hs-part-id') || "0");
    if (score > high) {
        window.parent.postMessage({ type: 'update_high_score', gameId: 'part-id', score: score }, '*');
    }
}

initGame();
