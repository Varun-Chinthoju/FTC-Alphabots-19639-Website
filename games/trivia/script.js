const QUESTIONS = {
    Hardware: [
        { q: "What is the maximum number of motors allowed on an FTC robot?", a: ["4", "8", "Unlimited", "12"], correct: 1 },
        { q: "Which of these is a legal FTC motor?", a: ["Rev HD Hex", "Andymark Neverest", "TETRIX Max", "All of the above"], correct: 3 },
        { q: "What is the maximum robot starting size in inches?", a: ["18x18x18", "24x24x24", "12x12x12", "20x20x20"], correct: 0 },
        { q: "Which tool is commonly used to crimp Anderson Powerpole connectors?", a: ["Pliers", "TRI-crimp Tool", "Hammer", "Wire Stripper"], correct: 1 }
    ],
    Software: [
        { q: "What is the official programming language for FTC?", a: ["Python", "C++", "Java", "JavaScript"], correct: 2 },
        { q: "What does PID stand for in control systems?", a: ["Proportional Integral Derivative", "Position Internal Drive", "Power Intake Device", "Program Input Data"], correct: 0 },
        { q: "Which class is used to control a DC motor in FTC SDK?", a: ["DcMotor", "Servo", "MotorController", "RobotDrive"], correct: 0 },
        { q: "How do you define a constant in Java?", a: ["final", "const", "static", "immutable"], correct: 0 }
    ],
    Outreach: [
        { q: "What is the highest award in FTC?", a: ["Winning Alliance", "Inspire Award", "Think Award", "Connect Award"], correct: 1 },
        { q: "Which award recognizes community outreach and STEM promotion?", a: ["Connect Award", "Motivate Award", "Inspire Award", "Design Award"], correct: 0 },
        { q: "What is the team number for Alphabots?", a: ["19639", "16399", "19369", "19693"], correct: 0 }
    ],
    General: [
        { q: "How long is the TeleOp period in a match?", a: ["30 seconds", "1 minute", "2 minutes", "2 minutes 30 seconds"], correct: 2 },
        { q: "How many teams are in a standard alliance?", a: ["1", "2", "3", "4"], correct: 1 },
        { q: "How long is the Autonomous period?", a: ["10 seconds", "20 seconds", "30 seconds", "45 seconds"], correct: 2 }
    ]
};

let currentQuestions = [];
let currentIndex = 0;
let score = 0;

function initTopic(topic) {
    if (topic === "All") {
        currentQuestions = Object.values(QUESTIONS).flat().sort(() => Math.random() - 0.5);
    } else {
        currentQuestions = [...QUESTIONS[topic]].sort(() => Math.random() - 0.5);
    }
    
    // Limit to 10 questions max
    currentQuestions = currentQuestions.slice(0, 10);
    currentIndex = 0;
    score = 0;
    
    document.getElementById('topic-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    
    showQuestion();
}

function showQuestion() {
    const q = currentQuestions[currentIndex];
    document.getElementById('q-num').textContent = `Question ${currentIndex + 1} of ${currentQuestions.length}`;
    document.getElementById('question-text').textContent = q.q;
    document.getElementById('progress-bar').style.width = `${(currentIndex / currentQuestions.length) * 100}%`;
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    q.a.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(idx, btn);
        container.appendChild(btn);
    });
}

function handleAnswer(idx, btn) {
    const q = currentQuestions[currentIndex];
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.disabled = true);
    
    if (idx === q.correct) {
        score++;
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
        btns[q.correct].classList.add('correct');
        window.parent.postMessage({ type: 'shake' }, '*');
    }
    
    setTimeout(() => {
        currentIndex++;
        if (currentIndex < currentQuestions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 1500);
}

function endGame() {
    document.getElementById('game-screen').classList.add('hidden');
    const result = document.getElementById('result-screen');
    result.classList.remove('hidden');
    
    document.getElementById('final-score').textContent = score;
    const msg = document.getElementById('result-msg');
    
    const percent = (score / currentQuestions.length) * 100;
    if (percent === 100) msg.textContent = "🏆 PERFECT SCORE!";
    else if (percent >= 70) msg.textContent = "🌟 GREAT JOB!";
    else msg.textContent = "👍 KEEP LEARNING!";
    
    window.parent.postMessage({ type: 'game_win' }, '*');
    
    let high = parseInt(localStorage.getItem('hs-trivia') || "0");
    if (score > high) {
        window.parent.postMessage({ type: 'update_high_score', gameId: 'trivia', score: score }, '*');
    }
}

document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.onclick = () => initTopic(btn.getAttribute('data-topic'));
});

document.getElementById('restart-btn').onclick = () => {
    document.getElementById('topic-screen').classList.remove('hidden');
    document.getElementById('result-screen').classList.add('hidden');
};
