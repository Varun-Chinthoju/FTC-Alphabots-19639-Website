const BUGS = [
    {
        code: `<span class="type">DcMotor</span> motor;\nmotor = hardwareMap.<span class="call">get</span>(<span class="type">DcMotor</span>.<span class="keyword">class</span>, <span class="string">"m1"</span>)\nmotor.<span class="call">setPower</span>(1.0);`,
        options: ["Add semicolon after 'm1\")'", "Change class to Motor.class", "Use getMotor() instead", "Capitalize hardwareMap"],
        correct: 0,
        compilerErr: "OpMode.java:2: error: ';' expected\n    motor = hardwareMap.get(DcMotor.class, \"m1\")\n                                                ^"
    },
    {
        code: `<span class="keyword">if</span> (sensor.<span class="call">getDistance</span>() < 10) {\n  motor.<span class="call">setPower</span>(0);\n<span class="keyword">else</span> {\n  motor.<span class="call">setPower</span>(1);\n}`,
        options: ["Missing closing brace for 'if'", "Change < to >", "Remove semicolon", "Add 'then' keyword"],
        correct: 0,
        compilerErr: "OpMode.java:3: error: 'else' without 'if'\nelse {\n^"
    },
    {
        code: `<span class="keyword">for</span> (<span class="type">int</span> i = 0; i <= list.<span class="call">size</span>(); i++) {\n  telemetry.<span class="call">addData</span>(<span class="string">"Item"</span>, list.<span class="call">get</span>(i));\n}`,
        options: ["Change <= to <", "Change i++ to i--", "Use i = 1", "List is immutable"],
        correct: 0,
        compilerErr: "java.lang.IndexOutOfBoundsException: Index 5 out of bounds for length 5"
    },
    {
        code: `<span class="type">Servo</span> s = hardwareMap.servo.<span class="call">get</span>(<span class="string">"s1"</span>);\ns.<span class="call">setPower</span>(0.5);`,
        options: ["Servos use setPosition()", "Use getServo()", "Servo class not found", "Power must be integer"],
        correct: 0,
        compilerErr: "OpMode.java:2: error: cannot find symbol\n    s.setPower(0.5);\n     ^\n  symbol:   method setPower(double)\n  location: variable s of type Servo"
    }
];

let currentBug = null;
let score = 0;
let timeLeft = 40;
let timerInterval = null;

function initGame() {
    score = 0;
    timeLeft = 40;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('gameover').classList.add('hidden');
    
    nextBug();
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function nextBug() {
    currentBug = BUGS[Math.floor(Math.random() * BUGS.length)];
    document.getElementById('code-snippet').innerHTML = currentBug.code;
    
    // Line numbers
    const lineCount = currentBug.code.split('\n').length;
    let ln = "";
    for(let i=1; i<=lineCount; i++) ln += i + "\n";
    document.getElementById('line-numbers').textContent = ln;

    // Terminal error
    const errDisplay = document.getElementById('compiler-error');
    errDisplay.className = "error-text";
    errDisplay.textContent = currentBug.compilerErr;
    
    // Reset terminal to fail state
    const term = document.getElementById('terminal-output');
    term.querySelector('.error-text').style.display = 'block';
    
    const grid = document.getElementById('options-grid');
    grid.innerHTML = '';
    
    currentBug.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleChoice(idx);
        grid.appendChild(btn);
    });
}

function handleChoice(idx) {
    const term = document.getElementById('terminal-output');
    const errDisplay = document.getElementById('compiler-error');

    if (idx === currentBug.correct) {
        // Success animation in terminal
        term.querySelector('.error-text').style.display = 'none';
        errDisplay.className = "success-text";
        errDisplay.textContent = "BUILD SUCCESSFUL in 1s";
        
        score++;
        document.getElementById('score').textContent = score;
        setTimeout(nextBug, 1000);
    } else {
        timeLeft = Math.max(0, timeLeft - 5);
        document.getElementById('timer').textContent = timeLeft;
        window.parent.postMessage({ type: 'shake' }, '*');
        
        // Terminal jitter
        errDisplay.classList.add('shake');
        setTimeout(() => errDisplay.classList.remove('shake'), 500);
    }
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('gameover').classList.remove('hidden');
    document.getElementById('stats-msg').textContent = `Corrected ${score} build errors before deployment timeout.`;
    window.parent.postMessage({ type: 'game_win' }, '*');
    
    let high = parseInt(localStorage.getItem('hs-code-debugger') || "0");
    if (score > high) {
        window.parent.postMessage({ type: 'update_high_score', gameId: 'code-debugger', score: score }, '*');
    }
}

initGame();
