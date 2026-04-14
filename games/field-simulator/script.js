const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let robot = { x: 300, y: 300, angle: 0, speed: 0, rotateSpeed: 0, size: 40, balls: 0 };
let balls = [];
let baskets = [
    { x: 300, y: 50, type: 'high', score: 10 },
    { x: 50, y: 300, type: 'low', score: 2 },
    { x: 550, y: 300, type: 'low', score: 2 }
];

let score = 0;
let timeLeft = 60;
let gameRunning = false;
let keys = {};

function initGame() {
    robot = { x: 300, y: 300, angle: 0, speed: 0, rotateSpeed: 0, size: 40, balls: 0 };
    balls = [];
    for (let i = 0; i < 10; i++) spawnBall();
    
    score = 0;
    timeLeft = 60;
    gameRunning = true;
    
    document.getElementById('start-overlay').classList.add('hidden');
    document.getElementById('gameover').classList.add('hidden');
    document.getElementById('score').textContent = score;
    
    requestAnimationFrame(gameLoop);
    startTimer();
}

function spawnBall() {
    balls.push({
        x: 50 + Math.random() * 500,
        y: 100 + Math.random() * 450,
        radius: 8
    });
}

function startTimer() {
    const interval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(interval);
            return;
        }
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
            clearInterval(interval);
        }
    }, 1000);
}

window.onkeydown = (e) => keys[e.code] = true;
window.onkeyup = (e) => keys[e.code] = false;

function update() {
    if (!gameRunning) return;
    
    // Movement
    if (keys['KeyW']) robot.speed = 4;
    else if (keys['KeyS']) robot.speed = -3;
    else robot.speed *= 0.9;
    
    if (keys['KeyA']) robot.rotateSpeed = -0.1;
    else if (keys['KeyD']) robot.rotateSpeed = 0.1;
    else robot.rotateSpeed *= 0.8;
    
    robot.angle += robot.rotateSpeed;
    robot.x += Math.cos(robot.angle) * robot.speed;
    robot.y += Math.sin(robot.angle) * robot.speed;
    
    // Bounds
    robot.x = Math.max(20, Math.min(580, robot.x));
    robot.y = Math.max(20, Math.min(580, robot.y));
    
    // Intake
    balls.forEach((ball, idx) => {
        const dist = Math.hypot(robot.x - ball.x, robot.y - ball.y);
        if (dist < robot.size / 2 + ball.radius && robot.balls < 3) {
            balls.splice(idx, 1);
            robot.balls++;
            spawnBall();
        }
    });
    
    // Score
    if (keys['Space'] && robot.balls > 0) {
        baskets.forEach(basket => {
            const dist = Math.hypot(robot.x - basket.x, robot.y - basket.y);
            if (dist < 60) {
                score += robot.balls * basket.score;
                robot.balls = 0;
                document.getElementById('score').textContent = score;
                if (basket.type === 'high') window.parent.postMessage({ type: 'game_win' }, '*');
            }
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, 600, 600);
    
    // Draw Baskets
    baskets.forEach(b => {
        ctx.fillStyle = b.type === 'high' ? 'rgba(13, 163, 113, 0.3)' : 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(b.x, b.y, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = varToHex('--brand-green');
        ctx.stroke();
    });
    
    // Draw Balls
    ctx.fillStyle = '#fbbf24';
    balls.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Draw Robot
    ctx.save();
    ctx.translate(robot.x, robot.y);
    ctx.rotate(robot.angle);
    ctx.fillStyle = varToHex('--brand-green');
    ctx.fillRect(-robot.size/2, -robot.size/2, robot.size, robot.size);
    // Direction indicator
    ctx.fillStyle = 'white';
    ctx.fillRect(robot.size/2 - 10, -2, 10, 4);
    ctx.restore();
    
    // Intake indicator
    ctx.fillStyle = 'white';
    ctx.font = '12px Inter';
    ctx.fillText(`LOAD: ${robot.balls}/3`, robot.x - 20, robot.y - 30);
}

function varToHex(name) {
    return '#0da371'; // Simple fallback
}

function gameLoop() {
    if (!gameRunning) return;
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameRunning = false;
    document.getElementById('gameover').classList.remove('hidden');
    document.getElementById('final-score-msg').textContent = `Final Score: ${score}`;
    window.parent.postMessage({ type: 'game_win' }, '*');
    
    let high = parseInt(localStorage.getItem('hs-field-simulator') || "0");
    if (score > high) {
        window.parent.postMessage({ type: 'update_high_score', gameId: 'field-simulator', score: score }, '*');
    }
}

document.getElementById('start-btn').onclick = initGame;
document.getElementById('restart-btn').onclick = initGame;
