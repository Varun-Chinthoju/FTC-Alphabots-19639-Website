const WORDS = ["ROBOT", "DRIVE", "SERVO", "MOTOR", "MATCH", "SCORE", "FIELD", "GEARS", "FRAME", "CABLE", "JOINT", "TOUCH", "SENSE", "LEVEL", "PILOT", "SPEED", "WHEEL", "CHAIN", "POWER", "BRAKE", "LOGIC", "INPUT", "VIDEO"];
let targetWord = "";
let currentGuess = "";
let guesses = [];
let gameOver = false;

function initGame() {
    targetWord = WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase();
    currentGuess = "";
    guesses = [];
    gameOver = false;
    
    document.getElementById('board').innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.className = 'wordle-row';
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            row.appendChild(tile);
        }
        document.getElementById('board').appendChild(row);
    }
    
    document.getElementById('message').textContent = '';
    document.getElementById('gameover').classList.add('hidden');
    initKeyboard();
}

function initKeyboard() {
    const kb = document.getElementById('keyboard');
    kb.innerHTML = '';
    const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
    rows.forEach((rowStr, i) => {
        const row = document.createElement('div');
        row.className = 'key-row';
        if (i === 2) {
            const enter = document.createElement('button');
            enter.textContent = 'ENTER';
            enter.className = 'key wide';
            enter.onclick = submitGuess;
            row.appendChild(enter);
        }
        rowStr.split('').forEach(char => {
            const key = document.createElement('button');
            key.textContent = char;
            key.className = 'key';
            key.id = `key-${char}`;
            key.onclick = () => addLetter(char);
            row.appendChild(key);
        });
        if (i === 2) {
            const del = document.createElement('button');
            del.innerHTML = '⌫';
            del.className = 'key wide';
            del.onclick = deleteLetter;
            row.appendChild(del);
        }
        kb.appendChild(row);
    });
}

function addLetter(char) {
    if (gameOver || currentGuess.length >= 5) return;
    currentGuess += char;
    updateBoard();
}

function deleteLetter() {
    if (gameOver || currentGuess.length === 0) return;
    currentGuess = currentGuess.slice(0, -1);
    updateBoard();
}

function updateBoard() {
    const row = document.querySelectorAll('.wordle-row')[guesses.length];
    const tiles = row.querySelectorAll('.tile');
    tiles.forEach((tile, i) => {
        tile.textContent = currentGuess[i] || "";
        tile.classList.toggle('filled', !!currentGuess[i]);
    });
}

function submitGuess() {
    if (gameOver || currentGuess.length !== 5) {
        if (currentGuess.length !== 5) showMessage("Not enough letters");
        return;
    }

    const result = checkGuess(currentGuess);
    const row = document.querySelectorAll('.wordle-row')[guesses.length];
    const tiles = row.querySelectorAll('.tile');
    
    const guessCopy = currentGuess;
    guesses.push(currentGuess);
    currentGuess = "";

    tiles.forEach((tile, i) => {
        setTimeout(() => {
            tile.classList.add('flip');
            setTimeout(() => {
                tile.classList.remove('flip');
                tile.classList.add(result[i]);
                updateKey(guessCopy[i], result[i]);
            }, 200);
        }, i * 100);
    });

    if (guessCopy === targetWord) {
        setTimeout(() => endGame(true), 1000);
    } else if (guesses.length >= 6) {
        setTimeout(() => endGame(false), 1000);
    }
}

function checkGuess(guess) {
    const res = new Array(5).fill('absent');
    const targetArr = targetWord.split('');
    const guessArr = guess.split('');

    guessArr.forEach((char, i) => {
        if (char === targetArr[i]) {
            res[i] = 'correct';
            targetArr[i] = null;
            guessArr[i] = null;
        }
    });

    guessArr.forEach((char, i) => {
        if (char && targetArr.includes(char)) {
            res[i] = 'present';
            targetArr[targetArr.indexOf(char)] = null;
        }
    });
    return res;
}

function updateKey(char, status) {
    const key = document.getElementById(`key-${char}`);
    if (!key) return;
    if (status === 'correct') key.className = 'key correct';
    else if (status === 'present' && !key.classList.contains('correct')) key.className = 'key present';
    else if (status === 'absent' && !key.classList.contains('correct') && !key.classList.contains('present')) key.className = 'key absent';
}

function showMessage(msg) {
    const el = document.getElementById('message');
    el.textContent = msg;
    const row = document.querySelectorAll('.wordle-row')[guesses.length];
    row.classList.add('shake');
    setTimeout(() => row.classList.remove('shake'), 500);
}

function endGame(won) {
    gameOver = true;
    const modal = document.getElementById('gameover');
    const msg = document.getElementById('result-msg');
    const targetMsg = document.getElementById('target-word-msg');
    
    modal.classList.remove('hidden');
    if (won) {
        msg.textContent = "🏆 MAGNIFICENT!";
        msg.style.color = "var(--brand-green)";
        window.parent.postMessage({ type: 'game_win' }, '*');
        
        let wins = parseInt(localStorage.getItem('hs-wordle-wins') || "0");
        wins++;
        window.parent.postMessage({ type: 'update_high_score', gameId: 'wordle', score: wins }, '*');
    } else {
        msg.textContent = "💀 GAME OVER";
        msg.style.color = "#ef4444";
        targetMsg.textContent = `The word was: ${targetWord}`;
        window.parent.postMessage({ type: 'shake' }, '*');
    }
}

document.getElementById('restart-btn').onclick = initGame;
initGame();
