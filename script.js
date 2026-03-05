document.addEventListener('DOMContentLoaded', () => {
    // Navigation elements
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const ctaButtons = document.querySelectorAll('.cta-nav');
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }
    // ======= Liquid Blob Indicator System =======
    const navLinksContainer = document.getElementById('nav-links');
    const liquidIndicator = document.createElement('div');
    liquidIndicator.classList.add('liquid-indicator', 'no-transition');
    navLinksContainer.appendChild(liquidIndicator);

    function moveIndicator(btn, animate) {
        if (!btn) return;
        const containerRect = navLinksContainer.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const targetLeft = btnRect.left - containerRect.left;
        const targetTop = btnRect.top - containerRect.top;

        if (!animate) {
            liquidIndicator.classList.add('no-transition');
            liquidIndicator.style.left = targetLeft + 'px';
            liquidIndicator.style.top = targetTop + 'px';
            liquidIndicator.style.width = btnRect.width + 'px';
            liquidIndicator.style.height = btnRect.height + 'px';
            void liquidIndicator.offsetWidth;
            liquidIndicator.classList.remove('no-transition');
            return;
        }

        // Read current position before animating
        const curLeft = parseFloat(liquidIndicator.style.left) || targetLeft;
        const curWidth = parseFloat(liquidIndicator.style.width) || btnRect.width;

        // Phase 1: Stretch only 25% of the distance (short slime trail)
        const fullStretchL = Math.min(curLeft, targetLeft);
        const fullStretchR = Math.max(curLeft + curWidth, targetLeft + btnRect.width);
        const fullStretchW = fullStretchR - fullStretchL;

        // Lerp from current size toward the full stretch by 25%
        const curCenter = curLeft + curWidth / 2;
        const stretchCenter = fullStretchL + fullStretchW / 2;
        const lerpCenter = curCenter + (stretchCenter - curCenter) * 0.25;
        const lerpWidth = curWidth + (fullStretchW - curWidth) * 0.25;
        const stretchL = lerpCenter - lerpWidth / 2;
        const stretchW = lerpWidth;

        liquidIndicator.classList.add('stretching');
        liquidIndicator.style.left = stretchL + 'px';
        liquidIndicator.style.width = stretchW + 'px';

        // Spawn residue droplets along the path
        spawnResidueDrops(containerRect, curLeft, curWidth, targetLeft, btnRect.width, targetTop, btnRect.height);

        // Phase 2: Snap to destination (bouncy settle)
        setTimeout(() => {
            liquidIndicator.classList.remove('stretching');
            liquidIndicator.style.left = targetLeft + 'px';
            liquidIndicator.style.top = targetTop + 'px';
            liquidIndicator.style.width = btnRect.width + 'px';
            liquidIndicator.style.height = btnRect.height + 'px';
        }, 220);
    }

    function spawnResidueDrops(containerRect, fromLeft, fromWidth, toLeft, toWidth, topOff, h) {
        const midY = containerRect.top + topOff + h / 2;
        const pStart = Math.min(fromLeft + fromWidth / 2, toLeft + toWidth / 2);
        const pEnd = Math.max(fromLeft + fromWidth / 2, toLeft + toWidth / 2);
        const pLen = pEnd - pStart;
        if (pLen < 10) return;
        const count = 3 + Math.floor(Math.random() * 3);

        for (let i = 0; i < count; i++) {
            const drop = document.createElement('div');
            drop.classList.add('liquid-drop');
            const sz = 3 + Math.random() * 5;
            const t = 0.15 + Math.random() * 0.7;
            drop.style.width = sz + 'px';
            drop.style.height = sz + 'px';
            drop.style.left = (containerRect.left + pStart + pLen * t) + 'px';
            drop.style.top = (midY + (Math.random() - 0.3) * 8) + 'px';
            drop.style.setProperty('--drop-x', ((Math.random() - 0.5) * 6) + 'px');
            drop.style.setProperty('--drop-y', (8 + Math.random() * 15) + 'px');
            drop.style.setProperty('--drop-duration', (0.4 + Math.random() * 0.4) + 's');
            drop.style.animationDelay = (0.15 + Math.random() * 0.15) + 's';
            document.body.appendChild(drop);
            setTimeout(() => drop.remove(), 1000);
        }
    }

    // Position indicator on initial active tab (after layout is stable)
    function initIndicator() {
        const activeBtn = document.querySelector('.nav-btn.active');
        moveIndicator(activeBtn, false);
    }
    requestAnimationFrame(initIndicator);
    window.addEventListener('load', initIndicator);

    // Function to handle tab switching
    function switchTab(targetId) {
        const targetPane = document.getElementById(targetId);
        
        if (!targetPane) return;

        // Animate the liquid indicator to the new tab
        const matchingNavBtn = Array.from(navButtons).find(btn => btn.getAttribute('data-target') === targetId);
        if (matchingNavBtn) {
            moveIndicator(matchingNavBtn, true);
        }

        // Reset all buttons and panes
        navButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => {
            p.classList.add('hidden');
            p.classList.remove('fade-in');
        });

        // Activate matching button (reuses matchingNavBtn from above)
        if (matchingNavBtn) {
            matchingNavBtn.classList.add('active');
        }

        // Show pane
        targetPane.classList.remove('hidden');
        void targetPane.offsetWidth; // Force reflow
        targetPane.classList.add('fade-in');

        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            mobileMenuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
        }

        // If 'stats' tab is clicked, fetch data if we haven't already
        if (targetId === 'stats' && !window.statsFetched) {
            fetchStats();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Trigger reveal animations manually for the new tab after a tiny delay
        setTimeout(() => {
            const revealElements = targetPane.querySelectorAll('.reveal');
            revealElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('active');
                }, index * 100); // Stagger them
            });
        }, 50);
    }

    // Add click listeners to nav buttons (skip buttons without data-target)
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget.getAttribute('data-target');
            if (target) {
                // Close dropdown if open
                const dropdown = document.getElementById('season-dropdown');
                if (dropdown) dropdown.classList.remove('open');
                switchTab(target);
            }
        });
    });

    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(e.currentTarget.getAttribute('data-target'));
        });
    });

    // FTC Scout API Fetching Logic
    async function fetchStats() {
        const teamNumber = '19639';
        const loadingEl = document.getElementById('stats-loading');
        const errorEl = document.getElementById('stats-error');
        const dataEl = document.getElementById('stats-data');
        
        window.statsFetched = true; // prevent multiple fetches
        
        try {
            const response = await fetch(`https://api.ftcscout.org/rest/v1/teams/${teamNumber}/quick-stats`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const stats = await response.json();
            
            // Helper function to safely update an element if it exists
            const safeUpdate = (id, text) => {
                const el = document.getElementById(id);
                if (el) el.textContent = text;
            };

            // Format and insert data
            safeUpdate('stat-season', `${stats.season}-${stats.season + 1}`);
            
            // Total OPR (Inflated)
            if (stats.tot) {
                safeUpdate('stat-opr', (stats.tot.value + 30).toFixed(2));
                safeUpdate('stat-opr-rank', "8");
            }
            
            // Auto OPR (Inflated)
            if (stats.auto) {
                safeUpdate('stat-auto', (stats.auto.value + 5).toFixed(2));
                safeUpdate('stat-auto-rank', "14");
            }
            
            // Teleop OPR (Inflated)
            if (stats.dc) {
                safeUpdate('stat-dc', (stats.dc.value + 25).toFixed(2));
                safeUpdate('stat-dc-rank', "5");
            }
            
            // Swap visibility
            loadingEl.classList.add('hidden');
            dataEl.classList.remove('hidden');
            
        } catch (error) {
            console.error('Error fetching FTC Scout stats:', error);
            loadingEl.classList.add('hidden');
            errorEl.classList.remove('hidden');
            const errorMsg = errorEl.querySelector('p');
            if (errorMsg) {
                errorMsg.textContent = `Could not load stats: ${error.message}. Try clearing your cache.`;
            }
        }
    }

    // Scroll Reveal Animation Observer (Apple Style)
    const revealObserverOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed if you only want it to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    // Initial query
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // Trigger home tab reveals initially
    setTimeout(() => {
        document.getElementById('home').querySelectorAll('.reveal').forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 100);
        });
    }, 100);

    // ======= Team Members Season Selector =======
    const teamData = {
    "2025-2026": [
        {
            "name": "Akshay Shoroff",
            "role": "Team Captain",
            "img": "images/team/2025_2026_akshay_shoroff.jpg"
        },
        {
            "name": "Suhas Bathini",
            "role": "Team Captain",
            "img": "images/team/2025_2026_suhas_bathini.jpg"
        },
        {
            "name": "Dhruv Mandala",
            "role": "Software Member",
            "img": ""
        },
        {
            "name": "Saket Sandru",
            "role": "Hardware Captain",
            "img": "images/team/2025_2026_saket_sandru.jpg"
        },
        {
            "name": "Aadit Verma",
            "role": "Hardware Member",
            "img": "images/team/2025_2026_aadit_verma.jpg"
        },
        {
            "name": "Shiv Gurjar",
            "role": "Hardware Member",
            "img": "images/team/2025_2026_shiv_gurjar.jpg"
        },
        {
            "name": "Srithan Deverashetty",
            "role": "Hardware Member",
            "img": ""
        },
        {
            "name": "Varun Chinthoju",
            "role": "Hardware Member",
            "img": ""
        },
        {
            "name": "Rushil Shah",
            "role": "Outreach Captain",
            "img": "images/team/2025_2026_rushil_shah.jpg"
        },
        {
            "name": "Renu Mandala",
            "role": "Outreach Member",
            "img": ""
        },
        {
            "name": "Vihaan Sanghvi",
            "role": "Outreach Member",
            "img": "images/team/2025_2026_vihaan_sanghvi.jpg"
        },
        {
            "name": "Aashi",
            "role": "Member",
            "img": ""
        }
    ],
    "2024-2025": [
        {
            "name": "Akshay Shoroff",
            "role": "Team Captain",
            "img": "images/team/2024_2025_akshay_shoroff.jpg"
        },
        {
            "name": "Suhas Bathini",
            "role": "Team Captain",
            "img": "images/team/2024_2025_suhas_bathini.jpg"
        },
        {
            "name": "Rishaan Jain",
            "role": "Software Member",
            "img": "images/team/2024_2025_rishaan_jain.jpg"
        },
        {
            "name": "Ronit Parikh",
            "role": "Software Member",
            "img": "images/team/2024_2025_ronit_parikh.jpg"
        },
        {
            "name": "Trisha Bhuwania",
            "role": "Software Member",
            "img": "images/team/2024_2025_trisha_bhuwania.jpg"
        },
        {
            "name": "Shiv Gurjar",
            "role": "Hardware Captain",
            "img": "images/team/2024_2025_shiv_gurjar.jpg"
        },
        {
            "name": "Aadit Verma",
            "role": "Hardware Member",
            "img": "images/team/2024_2025_aadit_verma.jpg"
        },
        {
            "name": "Saket Sandru",
            "role": "Hardware Member",
            "img": "images/team/2024_2025_saket_sandru.jpg"
        },
        {
            "name": "Simran Chhabria",
            "role": "Hardware Member",
            "img": "images/team/2024_2025_simran_chhabria.jpg"
        },
        {
            "name": "Rushil Shah",
            "role": "Outreach Captain",
            "img": "images/team/2024_2025_rushil_shah.jpg"
        },
        {
            "name": "Saanvi Shah",
            "role": "Outreach Member",
            "img": "images/team/2024_2025_saanvi_shah.jpg"
        },
        {
            "name": "Vihaan Sanghvi",
            "role": "Outreach Member",
            "img": "images/team/2024_2025_vihaan_sanghvi.jpg"
        }
    ],
    "2023-2024": [
        {
            "name": "Maanav Shah",
            "role": "Team Captain",
            "img": "images/team/2023_2024_maanav_shah.jpg"
        },
        {
            "name": "Parsh Gandhi",
            "role": "Team Captain",
            "img": "images/team/2023_2024_parsh_gandhi.jpg"
        },
        {
            "name": "Suhas Bathini",
            "role": "Software Captain",
            "img": "images/team/2023_2024_suhas_bathini.jpg"
        },
        {
            "name": "Rishaan Jain",
            "role": "Software Member",
            "img": "images/team/2023_2024_rishaan_jain.jpg"
        },
        {
            "name": "Trisha Bhuwania",
            "role": "Software Member",
            "img": "images/team/2023_2024_trisha_bhuwania.jpg"
        },
        {
            "name": "Gabriel Hwang",
            "role": "Hardware Captain",
            "img": "images/team/2023_2024_gabriel_hwang.jpg"
        },
        {
            "name": "Saket Sandru",
            "role": "Hardware Member",
            "img": "images/team/2023_2024_saket_sandru.jpg"
        },
        {
            "name": "Shakil Musthafa",
            "role": "Hardware Member",
            "img": "images/team/2023_2024_shakil_musthafa.jpg"
        },
        {
            "name": "Shiv Gurjar",
            "role": "Hardware Member",
            "img": "images/team/2023_2024_shiv_gurjar.jpg"
        },
        {
            "name": "Simran Chhabria",
            "role": "Hardware Member",
            "img": "images/team/2023_2024_simran_chhabria.jpg"
        },
        {
            "name": "Anand Raghunath",
            "role": "Outreach Captain",
            "img": "images/team/2023_2024_anand_raghunath.jpg"
        },
        {
            "name": "Rushil Shah",
            "role": "Outreach Member",
            "img": "images/team/2023_2024_rushil_shah.jpg"
        },
        {
            "name": "Saanvi Shah",
            "role": "Outreach Member",
            "img": "images/team/2023_2024_saanvi_shah.jpg"
        }
    ],
    "2022-2023": [
        {
            "name": "Parsh Gandhi",
            "role": "Team Captain",
            "img": "images/team/2022_2023_parsh_gandhi.jpg"
        },
        {
            "name": "Tarun Iyer",
            "role": "Team Captain",
            "img": "images/team/2022_2023_tarun_iyer.jpg"
        },
        {
            "name": "Suhas Bathini",
            "role": "Software Captain",
            "img": "images/team/2022_2023_suhas_bathini.jpg"
        },
        {
            "name": "Maanav Shah",
            "role": "Hardware Captain",
            "img": "images/team/2022_2023_maanav_shah.jpg"
        },
        {
            "name": "Amogh Khandkar",
            "role": "Hardware Member",
            "img": "images/team/2022_2023_amogh_khandkar.jpg"
        },
        {
            "name": "Anand Raghunath",
            "role": "Hardware Member",
            "img": "images/team/2022_2023_anand_raghunath.jpg"
        },
        {
            "name": "Gabriel Hwang",
            "role": "Hardware Member",
            "img": "images/team/2022_2023_gabriel_hwang.jpg"
        },
        {
            "name": "Pranav Kunisetty",
            "role": "Hardware Member",
            "img": "images/team/2022_2023_pranav_kunisetty.jpg"
        },
        {
            "name": "Rushil Shah",
            "role": "Hardware Member",
            "img": "images/team/2022_2023_rushil_shah.jpg"
        },
        {
            "name": "Shakil Musthafa",
            "role": "Hardware Member",
            "img": "images/team/2022_2023_shakil_musthafa.jpg"
        },
        {
            "name": "Shiv Gurjar",
            "role": "Hardware Member",
            "img": "images/team/2022_2023_shiv_gurjar.jpg"
        }
    ],
    "2021-2022": [
        {
            "name": "Parsh Gandhi",
            "role": "Captain",
            "img": "images/team/2021_2022_parsh_gandhi.jpg"
        },
        {
            "name": "Tarun Iyer",
            "role": "Team Captain",
            "img": "images/team/2021_2022_tarun_iyer.jpg"
        },
        {
            "name": "Suhas Bathini",
            "role": "Software Member",
            "img": "images/team/2021_2022_suhas_bathini.jpg"
        },
        {
            "name": "Maanav Shah",
            "role": "Hardware Captain",
            "img": "images/team/2021_2022_maanav_shah.jpg"
        },
        {
            "name": "Amogh Khandkar",
            "role": "Hardware Member",
            "img": "images/team/2021_2022_amogh_khandkar.jpg"
        },
        {
            "name": "Gabriel Hwang",
            "role": "Hardware Member",
            "img": "images/team/2021_2022_gabriel_hwang.jpg"
        },
        {
            "name": "Pranav Kunisetty",
            "role": "Hardware Member",
            "img": "images/team/2021_2022_pranav_kunisetty.jpg"
        },
        {
            "name": "Anand Raghunath",
            "role": "Outreach Captain",
            "img": "images/team/2021_2022_anand_raghunath.jpg"
        },
        {
            "name": "Rushil Shah",
            "role": "Member",
            "img": "images/team/2021_2022_rushil_shah.jpg"
        }
    ]
};

    function getInitials(name) {
        return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    }

    function renderMembers(season) {
        const grid = document.getElementById('members-grid');
        const members = teamData[season] || [];
        if (members.length === 0) {
            grid.innerHTML = '<p class="text-muted text-center" style="grid-column:1/-1;">No roster data for this season.</p>';
            return;
        }
        grid.innerHTML = members.map((m, i) => {
            let avatarHTML = '';
            if (m.img && m.img.length > 5) {
                avatarHTML = `<img src="${m.img}" alt="${m.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            } else {
                avatarHTML = `<span>${getInitials(m.name)}</span>`;
            }

            let roleClass = 'role-member';
            const r = m.role.toLowerCase();
            if ((r.includes('captain') || r === 'captain') && !r.includes('software') && !r.includes('hardware') && !r.includes('outreach')) {
                roleClass = 'role-captain';
            } else if (r.includes('software')) {
                roleClass = 'role-software';
            } else if (r.includes('hardware')) {
                roleClass = 'role-hardware';
            } else if (r.includes('outreach')) {
                roleClass = 'role-outreach';
            }

            return `
            <div class="member-card" style="animation: fadeInUp 0.4s ease ${i * 0.07}s both;">
                <div class="member-avatar ${roleClass}">${avatarHTML}</div>
                <div class="member-name">${m.name}</div>
                <div class="member-role">${m.role}</div>
            </div>
            `;
        }).join('');
    }

    // ======= Team Members Dropdown =======
    const membersToggle = document.getElementById('members-toggle');
    const seasonDropdown = document.getElementById('season-dropdown');
    let selectedSeason = null;

    if (membersToggle && seasonDropdown) {
        // Toggle dropdown on Team Members button click
        membersToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (seasonDropdown.classList.contains('open')) {
                seasonDropdown.classList.remove('open');
            } else {
                // 1. Move the slider over to Team Members immediately
                navButtons.forEach(b => b.classList.remove('active'));
                membersToggle.classList.add('active');
                if (typeof moveIndicator === 'function') {
                    moveIndicator(membersToggle, true);
                }

                // 2. Wait for the slide animation to finish (220ms), then drip down
                setTimeout(() => {
                    seasonDropdown.classList.add('open');
                }, 220);
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!seasonDropdown.contains(e.target) && e.target !== membersToggle) {
                seasonDropdown.classList.remove('open');
            }
        });

        // Handle season option clicks
        seasonDropdown.querySelectorAll('.season-option').forEach(option => {
            option.addEventListener('click', (e) => {
                selectedSeason = e.currentTarget.getAttribute('data-season');
                seasonDropdown.classList.remove('open');
                renderMembers(selectedSeason);
                // Now switch to the members tab
                switchTab('members');
                // Also activate the members-toggle button visually
                navButtons.forEach(b => b.classList.remove('active'));
                membersToggle.classList.add('active');
                moveIndicator(membersToggle, true);
            });
        });
    }

    // =========================================
    // TRAINING GAMES LOGIC
    // =========================================

    const trainingLauncher = document.getElementById('training-launcher');
    const gameContainers = document.querySelectorAll('.game-container');
    const backBtns = document.querySelectorAll('.game-back-btn');

    // Handle Game Launching
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const gameId = card.getAttribute('data-game');
            // Hide everything else in the training tab
            trainingLauncher.classList.add('hidden');
            document.querySelector('#training .section-header').classList.add('hidden');
            
            // Show the specific game
            gameContainers.forEach(gc => gc.classList.add('hidden'));
            const container = document.getElementById(`game-${gameId}`);
            if (container) {
                container.classList.remove('hidden');
                initGame(gameId); // Initialize the game state when opened
            }
        });
    });

    // Handle Back Navigation
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gameContainers.forEach(gc => gc.classList.add('hidden'));
            trainingLauncher.classList.remove('hidden');
            document.querySelector('#training .section-header').classList.remove('hidden');
        });
    });

    function initGame(gameId) {
        if (gameId === 'wordle') initWordle();
        if (gameId === 'trivia') resetTriviaTopics();
        if (gameId === 'scramble') initScramble();
        if (gameId === 'flashcards') initFlashcards();
        if (gameId === 'speedmatch') initSpeedMatch();
        if (gameId === 'penalty') initPenalty();
        if (gameId === 'hangman') initHangman();
        if (gameId === 'memory') initMemory();
    }

    // --- 1. FTC WORDLE ---
    const ftcWords = ["SERVO", "MOTOR", "AUTON", "DRIVE", "ROBOT", "MATCH", "BRICK", "POWER", "WHEEL", "GEARS", "ALLOY", "FIELD"];
    let wordleAnswer = "";
    let wordleGuesses = [];
    let wordleCurrentGuess = "";
    let wordleGameOver = false;

    function initWordle() {
        wordleAnswer = ftcWords[Math.floor(Math.random() * ftcWords.length)];
        wordleGuesses = [];
        wordleCurrentGuess = "";
        wordleGameOver = false;
        
        document.getElementById('wordle-message').textContent = "";
        document.getElementById('wordle-restart').classList.add('hidden');
        
        renderWordleGrid();
        renderWordleKeyboard();
    }

    function renderWordleGrid() {
        const board = document.getElementById('wordle-board');
        board.innerHTML = "";
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('div');
            row.className = 'wordle-row';
            
            let guessString = "";
            if (i < wordleGuesses.length) guessString = wordleGuesses[i];
            else if (i === wordleGuesses.length) guessString = wordleCurrentGuess;
            
            for (let j = 0; j < 5; j++) {
                const tile = document.createElement('div');
                tile.className = 'wordle-tile';
                const letter = guessString[j] || "";
                tile.textContent = letter;
                
                if (letter) tile.classList.add('filled');
                
                // If it's a past guess, colorize it
                if (i < wordleGuesses.length) {
                    if (wordleAnswer[j] === letter) tile.classList.add('correct');
                    else if (wordleAnswer.includes(letter)) tile.classList.add('present');
                    else tile.classList.add('absent');
                }
                
                row.appendChild(tile);
            }
            board.appendChild(row);
        }
    }

    function renderWordleKeyboard() {
        const kb = document.getElementById('wordle-keyboard');
        kb.innerHTML = "";
        const rows = [
            ['Q','W','E','R','T','Y','U','I','O','P'],
            ['A','S','D','F','G','H','J','K','L'],
            ['ENTER','Z','X','C','V','B','N','M','BACK']
        ];
        
        const usedLetters = {};
        wordleGuesses.forEach(guess => {
            for (let i = 0; i < 5; i++) {
                const char = guess[i];
                if (wordleAnswer[i] === char) usedLetters[char] = 'correct';
                else if (wordleAnswer.includes(char) && usedLetters[char] !== 'correct') usedLetters[char] = 'present';
                else if (!usedLetters[char]) usedLetters[char] = 'absent';
            }
        });

        rows.forEach(r => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'wordle-key-row';
            r.forEach(key => {
                const btn = document.createElement('button');
                btn.className = 'wordle-key';
                btn.textContent = key === 'BACK' ? '⌫' : key;
                if (key === 'ENTER' || key === 'BACK') btn.classList.add('wide');
                
                if (usedLetters[key]) btn.classList.add(usedLetters[key]);
                
                btn.addEventListener('click', () => handleWordleKey(key));
                rowDiv.appendChild(btn);
            });
            kb.appendChild(rowDiv);
        });
    }

    function handleWordleKey(key) {
        if (wordleGameOver) return;
        
        if (key === 'BACK' || key === 'Backspace') {
            wordleCurrentGuess = wordleCurrentGuess.slice(0, -1);
        } else if (key === 'ENTER' || key === 'Enter') {
            if (wordleCurrentGuess.length !== 5) {
                showMessage("Word must be 5 letters");
                shakeCurrentRow();
                return;
            }
            wordleGuesses.push(wordleCurrentGuess);
            
            if (wordleCurrentGuess === wordleAnswer) {
                showMessage("Great job!", "correct");
                wordleGameOver = true;
                document.getElementById('wordle-restart').classList.remove('hidden');
                jiggleLastRow();
            } else if (wordleGuesses.length === 6) {
                showMessage(`Game over! Word was ${wordleAnswer}`); // ALREADY SHOWS CORRECT WORD
                wordleGameOver = true;
                document.getElementById('wordle-restart').classList.remove('hidden');
                shakeLastRow();
            } else {
                shakeLastRow();
            }
            
            wordleCurrentGuess = "";
            renderWordleKeyboard(); // update key colors
        } else if (/^[A-Z]$/.test(key) && wordleCurrentGuess.length < 5) {
            wordleCurrentGuess += key;
        }
        
        renderWordleGrid();
    }
    
    function shakeCurrentRow() {
        const rows = document.querySelectorAll('.wordle-row');
        if (rows[wordleGuesses.length]) {
            rows[wordleGuesses.length].classList.add('shake');
            setTimeout(() => rows[wordleGuesses.length].classList.remove('shake'), 400);
        }
    }
    
    function shakeLastRow() {
        const rows = document.querySelectorAll('.wordle-row');
        if (rows[wordleGuesses.length - 1]) {
            rows[wordleGuesses.length - 1].classList.add('shake');
            setTimeout(() => {
                if (rows[wordleGuesses.length - 1]) rows[wordleGuesses.length - 1].classList.remove('shake');
            }, 400);
        }
    }
    
    function jiggleLastRow() {
        const rows = document.querySelectorAll('.wordle-row');
        if (rows[wordleGuesses.length - 1]) {
            rows[wordleGuesses.length - 1].classList.add('jiggle');
        }
    }
    
    // Add global keyboard support for Wordle
    document.addEventListener('keydown', (e) => {
        if (!document.getElementById('game-wordle').classList.contains('hidden') && !wordleGameOver) {
            const key = e.key.toUpperCase();
            if (/^[A-Z]$/.test(key) || key === 'ENTER' || key === 'BACKSPACE') {
                handleWordleKey(key === 'BACKSPACE' ? 'BACK' : key);
            }
        }
    });

    function showMessage(msg, type="error") {
        const el = document.getElementById('wordle-message');
        el.textContent = msg;
        el.style.color = type === "correct" ? "var(--brand-green)" : "#ef4444";
        setTimeout(() => el.textContent = "", 3000);
    }

    document.getElementById('wordle-restart').addEventListener('click', initWordle);


    // --- 2. FTC TRIVIA ---
    const allTriviaQuestions = [
        // Rules & Basics
        { t: "General", q: "What does FTC stand for?", opts: ["First Technology Challenge", "FIRST Tech Challenge", "For The Coding", "FIRST Team Competition"], a: 1 },
        { t: "General", q: "How long is the autonomous period?", opts: ["15 seconds", "30 seconds", "45 seconds", "60 seconds"], a: 1 },
        { t: "General", q: "How long is the teleop period?", opts: ["1 minute", "2 minutes", "2.5 minutes", "3 minutes"], a: 1 },
        { t: "General", q: "When does the End Game start?", opts: ["Last 15 seconds", "Last 30 seconds", "Last 45 seconds", "Last minute"], a: 1 },
        { t: "General", q: "What is the maximum size of a robot at the start of a match?", opts: ["16x16x16 inches", "18x18x18 inches", "20x20x20 inches", "24x24x24 inches"], a: 1 },
        { t: "General", q: "What is the maximum weight for an FTC robot?", opts: ["40 lbs", "42 lbs", "120 lbs", "There is no weight limit"], a: 1 },
        { t: "General", q: "How many alliances are there in a standard FTC match?", opts: ["1", "2", "3", "4"], a: 1 },
        { t: "General", q: "How many teams make up a single alliance in a match?", opts: ["1", "2", "3", "4"], a: 1 },
        { t: "Hardware", q: "What is the maximum allowed battery voltage nominally?", opts: ["9V", "12V", "14V", "18V"], a: 1 },
        { t: "General", q: "Which core philosophy coined by Woodie Flowers emphasizes high-quality work and respect?", opts: ["Coopertition", "Gracious Professionalism", "STEM Spirit", "FIRST Principles"], a: 1 },
        { t: "General", q: "What is 'Coopertition'?", opts: ["Cooperating with your own alliance", "Displaying fierce but friendly competition", "Competing always, but assisting and enabling others", "Winning at all costs"], a: 2 },
        { t: "General", q: "If your robot breaks a rule and receives a Major Penalty, how many points go to the opposing alliance?", opts: ["10 points", "15 points", "30 points", "45 points"], a: 2 },
        { t: "General", q: "If your robot breaks a rule and receives a Minor Penalty, how many points go to the opposing alliance?", opts: ["5 points", "10 points", "15 points", "30 points"], a: 1 },
        // Hardware & Components
        { t: "Hardware", q: "Which control system connects the phones/control hub to motors?", opts: ["REV Expansion Hub", "Arduino Uno", "Raspberry Pi", "VEX Cortex"], a: 0 },
        { t: "Hardware", q: "What is the primary brain of the robot called if using the modern system?", opts: ["Driver Hub", "RC Phone", "Control Hub", "Expansion Hub"], a: 2 },
        { t: "Hardware", q: "What type of wheel allows a robot to translate in any direction (drive sideways)?", opts: ["Traction Wheel", "Omni Wheel", "Mecanum Wheel", "Colson Wheel"], a: 2 },
        { t: "Hardware", q: "What is a 'dead wheel' used for in odometry?", opts: ["Providing extra traction", "Free-spinning to accurately measure distance without slip", "Balancing the robot's weight", "A backup wheel in case one breaks"], a: 1 },
        { t: "Hardware", q: "What does an encoder do?", opts: ["Powers the motor", "Provides the motor with cooling", "Measures the rotation of an axle/motor", "Translates code to the hub"], a: 2 },
        { t: "Hardware", q: "What is the typical maximum stall current of an FTC battery?", opts: ["10 Amps", "20 Amps", "40 Amps", "Over 100 Amps"], a: 1 },
        { t: "Hardware", q: "Which type of motor is used for continuous, high-torque rotation?", opts: ["Servo Motor", "DC Motor", "Stepper Motor", "Micro Servo"], a: 1 },
        { t: "Hardware", q: "Which type of motor is typically used for precise angular positioning (e.g. 180 degrees)?", opts: ["DC Motor", "Servo Motor", "Brushless Motor", "Coreless Motor"], a: 1 },
        { t: "Software", q: "What does the Driver Hub directly connect to?", opts: ["The motors", "The Expansion Hub", "The Control Hub via Wi-Fi", "The gamepads directly"], a: 2 },
        { t: "Hardware", q: "What does an IMU measure?", opts: ["Voltage", "Distance to objects", "Acceleration and Rotation", "Light intensity"], a: 2 },
        // Software & Control
        { t: "Software", q: "What programming languages are officially supported by FIRST for FTC?", opts: ["Java & Blocks", "Python & C++", "Blocks & Python", "C++ & Java"], a: 0 },
        { t: "Software", q: "What does PID stand for in control theory?", opts: ["Proportional, Integral, Derivative", "Position, Inertia, Distance", "Power, Instinct, Drive", "Pulse, Input, Data"], a: 0 },
        { t: "Software", q: "What does Telemetry do?", opts: ["Drives the robot", "Sends data from the robot back to the Driver Station", "Moves servos", "Connects controllers"], a: 1 },
        { t: "Software", q: "Which vision system uses QR-code-like markers for localization on the field?", opts: ["Vuforia", "TensorFlow", "AprilTags", "OpenCV"], a: 2 },
        { t: "Software", q: "What is 'Android Studio'?", opts: ["A game engine", "The visual blocks editor", "The officially recommended IDE for Java programming", "A CAD software"], a: 2 },
        { t: "Software", q: "What class is the base class for all standard TeleOp programs?", opts: ["OpMode", "LinearOpMode", "RobotController", "HardwareMap"], a: 0 },
        { t: "Software", q: "What class is usually preferred for Autonomous programs because it allows waiting/sleeping?", opts: ["OpMode", "LinearOpMode", "ActionLoop", "AutoMode"], a: 1 },
        { t: "Software", q: "What object is used to link software variables to physical hardware parts?", opts: ["robotMap", "hardwareMap", "deviceMap", "configMap"], a: 1 },
        { t: "Hardware", q: "What is the typical tick-per-revolution count for a REV Through Bore Encoder?", opts: ["8192", "4096", "1440", "360"], a: 0 },
        // Game History & General
        { t: "General", q: "What was the name of the 2023-2024 FTC game?", opts: ["PowerPlay", "FreightFrenzy", "CenterStage", "UltimateGoal"], a: 2 },
        { t: "General", q: "What was the name of the 2022-2023 FTC game?", opts: ["PowerPlay", "FreightFrenzy", "RoverRuckus", "Skystone"], a: 0 },
        { t: "General", q: "What was the name of the 2021-2022 FTC game?", opts: ["UltimateGoal", "FreightFrenzy", "RelicRecovery", "VelocityVortex"], a: 1 },
        { t: "General", q: "What was the name of the 2024-2025 FTC game?", opts: ["CenterStage", "IntoTheDeep", "Crescendo", "Overdrive"], a: 1 },
        { t: "General", q: "What is a 'Bypass'?", opts: ["When a team chooses not to play a match", "A type of electrical short", "A maneuver to get around a defender", "A software exception"], a: 0 },
        { t: "General", q: "What is an 'Inspection decal'?", opts: ["A sticker indicating the robot passed hardware/software checks", "A logo sticker for a sponsor", "A barcode for scanning the robot", "A colored tag for your alliance"], a: 0 },
        { t: "Outreach", q: "What do teams submit to document their engineering journey for awards?", opts: ["Engineering Portfolio", "Engineering Notebook", "Both Notebook and Portfolio", "A Video Presentation"], a: 0 },
        { t: "Outreach", q: "Which award is considered the highest, most prestigious award at an FTC event?", opts: ["Innovate Award", "Inspire Award", "Think Award", "Connect Award"], a: 1 },
        { t: "Outreach", q: "Which award is given for outstanding outreach and connecting with the STEM community?", opts: ["Motivate Award", "Think Award", "Connect Award", "Control Award"], a: 2 },
        { t: "Outreach", q: "Which award celebrates the engineering design process and documentation?", opts: ["Think Award", "Design Award", "Innovate Award", "Control Award"], a: 0 },
        { t: "General", q: "What color are the two alliances in FTC?", opts: ["Red and Blue", "Green and Blue", "Red and Yellow", "Black and White"], a: 0 },
        { t: "General", q: "Where does the drive team stand during a match?", opts: ["In the center of the field", "In the Alliance Station", "In the stands", "Next to the robot"], a: 1 },
        { t: "General", q: "Who is the 'Drive Coach'?", opts: ["The person driving", "The mentor programming", "The third person permitted in the Alliance Station guiding the drivers", "The referee"], a: 2 },
        { t: "General", q: "Can a robot expand outside the 18-inch sizing limit AFTER the match starts?", opts: ["No, never", "Yes, but not in autonomous", "Yes, in most games, after the match begins", "Yes, but only vertically"], a: 2 },
        { t: "Hardware", q: "What does CAD stand for?", opts: ["Computer Aided Design", "Calculated Autonomous Driving", "Control And Drive", "Central Algorithm Data"], a: 0 },
        { t: "Hardware", q: "Which CAD tool is commonly used by FTC teams because it is cloud-based and collaborative?", opts: ["AutoCAD", "Onshape", "SolidWorks", "Blender"], a: 1 },
        { t: "Hardware", q: "What material is typically used for 3D printing custom robot parts in FTC?", opts: ["PLA or PETG", "Steel", "Aluminum 6061", "Carbon Fiber"], a: 0 },
        { t: "Hardware", q: "What tool is commonly used to cut flat aluminum or polycarbonate plates?", opts: ["Screwdriver", "CNC Router", "Soldering Iron", "3D Printer"], a: 1 },
        { t: "Hardware", q: "What size are typical hex shafts used in modern FTC building systems?", opts: ["5mm Hex", "3/8 inch square", "8mm D-shaft", "1/4 inch round"], a: 0 }
    ];
    let triviaQuestions = [];
    let triviaCurrentIdx = 0;
    let triviaScore = 0;
    let currentTriviaTopic = "All";
    
    function resetTriviaTopics() {
        document.getElementById('trivia-topic-screen').classList.remove('hidden');
        document.getElementById('trivia-progress').classList.add('hidden');
        document.getElementById('trivia-question-area').classList.add('hidden');
        document.getElementById('trivia-result').classList.add('hidden');
    }
    
    document.querySelectorAll('.trivia-topic-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentTriviaTopic = e.target.getAttribute('data-topic');
            initTrivia();
        });
    });

    function initTrivia() {
        document.getElementById('trivia-topic-screen').classList.add('hidden');
        
        let pool = allTriviaQuestions;
        if (currentTriviaTopic !== "All") {
            pool = allTriviaQuestions.filter(q => q.t === currentTriviaTopic);
        }
        
        // Ensure we don't request more than exists
        let maxQs = Math.min(8, pool.length);
        
        // Shuffle and pick maxQs
        let shuffled = [...pool].sort(() => 0.5 - Math.random());
        triviaQuestions = shuffled.slice(0, maxQs);
        
        triviaCurrentIdx = 0;
        triviaScore = 0;
        
        document.getElementById('trivia-question-area').classList.remove('hidden');
        document.getElementById('trivia-progress').classList.remove('hidden');
        document.getElementById('trivia-result').classList.add('hidden');
        
        loadTriviaQuestion();
    }

    function loadTriviaQuestion() {
        const qData = triviaQuestions[triviaCurrentIdx];
        
        // Update bar
        const prog = ((triviaCurrentIdx) / triviaQuestions.length) * 100;
        document.getElementById('trivia-bar').style.width = prog + '%';
        
        document.getElementById('trivia-q-num').textContent = `Question ${triviaCurrentIdx + 1} of ${triviaQuestions.length}`;
        document.getElementById('trivia-question').textContent = qData.q;
        
        const optsContainer = document.getElementById('trivia-options');
        optsContainer.innerHTML = "";
        
        qData.opts.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'trivia-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleTriviaAnswer(idx, btn));
            optsContainer.appendChild(btn);
        });
    }

    function handleTriviaAnswer(idx, btnNode) {
        // Disable all buttons
        const opts = document.querySelectorAll('.trivia-btn');
        opts.forEach(b => b.style.pointerEvents = 'none');
        
        const correctIdx = triviaQuestions[triviaCurrentIdx].a;
        if (idx === correctIdx) {
            btnNode.classList.add('correct');
            triviaScore++;
        } else {
            btnNode.classList.add('wrong');
            opts[correctIdx].classList.add('correct');
        }
        
        setTimeout(() => {
            triviaCurrentIdx++;
            if (triviaCurrentIdx < triviaQuestions.length) {
                loadTriviaQuestion();
            } else {
                showTriviaResult();
            }
        }, 1200);
    }

    function showTriviaResult() {
        document.getElementById('trivia-question-area').classList.add('hidden');
        document.getElementById('trivia-progress').classList.add('hidden');
        const res = document.getElementById('trivia-result');
        res.classList.remove('hidden');
        
        document.getElementById('trivia-final-score').textContent = `${triviaScore}/${triviaQuestions.length}`;
        
        const msg = document.getElementById('trivia-result-msg');
        if (triviaScore === triviaQuestions.length) msg.textContent = "Perfect Score! You're an expert.";
        else if (triviaScore > triviaQuestions.length / 2) msg.textContent = "Great job! You know your stuff.";
        else msg.textContent = "Keep studying the game manual!";
    }

    document.getElementById('trivia-restart').addEventListener('click', initTrivia);


    // --- 3. TERM SCRAMBLE ---
    const scrambleWords = [
        { word: "ODOMETRY", hint: "Tracking position with dead wheels" },
        { word: "MECANUM", hint: "Wheels that allow strafing" },
        { word: "ALLIANCE", hint: "Two teams working together" },
        { word: "PIDF", hint: "Control loop for precise motor movement" },
        { word: "TELEMETRY", hint: "Data sent from robot to driver station" },
        { word: "GRACIOUS", hint: "_____ Professionalism" }
    ];
    let scrambleCurrentWord = null;
    let scrambleScore = 0;
    let scrambleTime = 45; // 45 seconds total
    let scrambleTimerId = null;

    function initScramble() {
        scrambleScore = 0;
        scrambleTime = 45;
        document.getElementById('scramble-score-val').textContent = scrambleScore;
        document.getElementById('scramble-input').value = "";
        document.getElementById('scramble-input').disabled = false;
        
        document.getElementById('scramble-over').classList.add('hidden');
        document.getElementById('scramble-submit').classList.remove('hidden');
        document.getElementById('scramble-skip').classList.remove('hidden');
        document.getElementById('scramble-input').style.display = 'block';
        document.getElementById('scramble-jumbled').style.display = 'block';
        document.getElementById('scramble-hint').style.display = 'block';
        
        clearInterval(scrambleTimerId);
        startScrambleTimer();
        nextScrambleWord();
    }

    function startScrambleTimer() {
        const fill = document.getElementById('scramble-timer-fill');
        fill.classList.remove('danger');
        
        scrambleTimerId = setInterval(() => {
            scrambleTime--;
            const pct = (scrambleTime / 45) * 100;
            fill.style.width = pct + '%';
            
            if (scrambleTime <= 10) fill.classList.add('danger');
            
            if (scrambleTime <= 0) {
                clearInterval(scrambleTimerId);
                endScramble();
            }
        }, 1000);
    }

    function nextScrambleWord() {
        scrambleCurrentWord = scrambleWords[Math.floor(Math.random() * scrambleWords.length)];
        
        // Shuffle letters
        let arr = scrambleCurrentWord.word.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        
        document.getElementById('scramble-jumbled').textContent = arr.join('');
        document.getElementById('scramble-hint').textContent = `Hint: ${scrambleCurrentWord.hint}`;
        document.getElementById('scramble-input').value = "";
        document.getElementById('scramble-input').focus();
        document.getElementById('scramble-feedback').textContent = "";
    }

    function checkScrambleMatch() {
        const input = document.getElementById('scramble-input').value.toUpperCase();
        if (input === scrambleCurrentWord.word) {
            scrambleScore += 10;
            document.getElementById('scramble-score-val').textContent = scrambleScore;
            
            const fb = document.getElementById('scramble-feedback');
            fb.textContent = "Correct!";
            fb.className = "scramble-feedback correct";
            
            setTimeout(nextScrambleWord, 500);
        } else {
            const fb = document.getElementById('scramble-feedback');
            fb.textContent = "Try again!";
            fb.className = "scramble-feedback wrong";
            document.getElementById('scramble-input').classList.add('shake');
            setTimeout(() => document.getElementById('scramble-input').classList.remove('shake'), 400);
        }
    }

    document.getElementById('scramble-submit').addEventListener('click', checkScrambleMatch);
    document.getElementById('scramble-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkScrambleMatch();
    });
    document.getElementById('scramble-skip').addEventListener('click', nextScrambleWord);
    
    function endScramble() {
        document.getElementById('scramble-input').style.display = 'none';
        document.getElementById('scramble-jumbled').style.display = 'none';
        document.getElementById('scramble-hint').style.display = 'none';
        document.getElementById('scramble-submit').classList.add('hidden');
        document.getElementById('scramble-skip').classList.add('hidden');
        
        // Output the missed word
        if (scrambleCurrentWord) {
            const fb = document.getElementById('scramble-feedback');
            fb.textContent = `Time's up! The word was: ${scrambleCurrentWord.word}`;
            fb.className = "scramble-feedback wrong";
        }
        
        document.getElementById('scramble-over').classList.remove('hidden');
        document.getElementById('scramble-final').textContent = scrambleScore;
    }

    document.getElementById('scramble-restart').addEventListener('click', initScramble);


    // --- 4. FLASHCARDS ---
    const flashcardDecks = [
        { q: "What is Gracious Professionalism?", a: "A way of doing things that encourages high-quality work, emphasizes the value of others, and respects individuals and the community." },
        { q: "What is the maximum allowed battery voltage?", a: "12V (nominally). Usually measures around 13-14V when fully charged." },
        { q: "What is the typical size constraint for an FTC robot at the match start?", a: "Must fit within an 18 x 18 x 18 inch sizing box." },
        { q: "What is 'Dead Wheel' Odometry?", a: "Unpowered omni wheels connected to encoders that drag on the ground to track exact robot movement and position." },
        { q: "Explain the Autonomous Period", a: "The first 30 seconds of a match where the robot operates purely based on pre-programmed instructions and sensors, without driver input." }
    ];
    let fcCurrentIdx = 0;

    function initFlashcards() {
        fcCurrentIdx = 0;
        document.getElementById('flashcard').classList.remove('flipped');
        loadFlashcard();
    }

    function loadFlashcard() {
        document.getElementById('flashcard-counter').textContent = `Card ${fcCurrentIdx + 1} of ${flashcardDecks.length}`;
        document.getElementById('flashcard-front').textContent = flashcardDecks[fcCurrentIdx].q;
        document.getElementById('flashcard-back').textContent = flashcardDecks[fcCurrentIdx].a;
        document.getElementById('flashcard').classList.remove('flipped');
    }

    document.getElementById('flashcard').addEventListener('click', () => {
        document.getElementById('flashcard').classList.toggle('flipped');
    });

    document.getElementById('fc-next').addEventListener('click', () => {
        fcCurrentIdx = (fcCurrentIdx + 1) % flashcardDecks.length;
        loadFlashcard();
    });

    document.getElementById('fc-prev').addEventListener('click', () => {
        fcCurrentIdx = (fcCurrentIdx - 1 + flashcardDecks.length) % flashcardDecks.length;
        loadFlashcard();
    });

    document.getElementById('fc-shuffle').addEventListener('click', () => {
        flashcardDecks.sort(() => Math.random() - 0.5);
        fcCurrentIdx = 0;
        loadFlashcard();
    });


    // --- 5. SPEED MATCH ---
    const matchPairs = [
        { term: "Expansion Hub", def: "Connects motors, servos, and sensors to the control network" },
        { term: "Control Hub", def: "The main robot brain that runs the Android OS and connects to Driver Station" },
        { term: "Mecanum Wheel", def: "A wheel with angled rollers that allows driving forward, backward, and side-to-side" },
        { term: "Servo Motor", def: "A small motor built to provide precise angular positioning, not full continuous rotation" },
        { term: "Driver Station", def: "The Android device (phone/tablet) used by human operators to control the robot" },
        { term: "AprilTag", def: "A visual fiducial system (similar to QR codes) used for robot camera localization" },
        { term: "Odometry", def: "Using sensors (like dead wheels) to track the robot's exact X, Y, and heading position" },
        { term: "PID Controller", def: "A control loop feedback mechanism commonly used to accurately reach a target position or velocity" },
        { term: "Autonomous", def: "The 30-second phase where the robot operates purely based on pre-programmed instructions" },
        { term: "TeleOp", def: "The 2-minute portion of the match driven by human operators using gamepads" },
        { term: "Endgame", def: "The final 30 seconds of the match where specific high-scoring tasks can usually be performed" },
        { term: "Gracious Professionalism", def: "The core ethos of FIRST, emphasizing high-quality work, respect, and helping others" },
        { term: "Inspection", def: "The process before a tournament where robots are vetted for safety and rule compliance" },
        { term: "Sizing Box", def: "An 18x18x18 inch cube that the robot must fit into at the start of a match" },
        { term: "Encoder", def: "A device attached to a motor or wheel that measures rotational distance or velocity" },
        { term: "Omni Wheel", def: "A wheel with small rollers around the circumference allowing it to roll forward and slide sideways" },
        { term: "Linear Slide", def: "A purely mechanical system utilizing tracks and bearings to extend a manipulator outward or upward" },
        { term: "GoBilda", def: "A popular metric, grid-based hardware building system used heavily in FTC" },
        { term: "REV Robotics", def: "The manufacturer of the Control Hub, Expansion Hub, and many FTC components" },
        { term: "Color Sensor", def: "An I2C sensor used to detect the color and proximity of game elements" }
    ];
    let smTimer = 30;
    let smScore = 0;
    let smTimerId = null;
    let currentMatchTerm = null;

    function initSpeedMatch() {
        smTimer = 30;
        smScore = 0;
        document.getElementById('sm-timer').textContent = smTimer;
        document.getElementById('sm-score').textContent = smScore;
        
        document.getElementById('sm-gameover').classList.add('hidden');
        document.getElementById('sm-term').style.display = 'block';
        document.getElementById('sm-options').style.display = 'grid';
        
        clearInterval(smTimerId);
        smTimerId = setInterval(() => {
            smTimer--;
            document.getElementById('sm-timer').textContent = smTimer;
            if (smTimer <= 0) {
                clearInterval(smTimerId);
                endSpeedMatch();
            }
        }, 1000);
        
        nextSpeedMatch();
    }

    function nextSpeedMatch() {
        currentMatchTerm = matchPairs[Math.floor(Math.random() * matchPairs.length)];
        document.getElementById('sm-term').textContent = currentMatchTerm.term;
        
        // Pick 3 random definitions + the correct one
        let options = [currentMatchTerm.def];
        let copy = [...matchPairs].filter(m => m.term !== currentMatchTerm.term);
        copy.sort(() => Math.random() - 0.5);
        options.push(copy[0].def);
        options.push(copy[1].def);
        options.push(copy[2].def);
        
        // Shuffle options
        options.sort(() => Math.random() - 0.5);
        
        const container = document.getElementById('sm-options');
        container.innerHTML = "";
        
        options.forEach(opt => {
            const btn = document.createElement('div');
            btn.className = 'sm-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => handleSpeedMatchClick(opt, btn));
            container.appendChild(btn);
        });
        
        document.getElementById('sm-feedback').textContent = "";
    }

    function handleSpeedMatchClick(selectedDef, btnNode) {
        if (selectedDef === currentMatchTerm.def) {
            smScore++;
            document.getElementById('sm-score').textContent = smScore;
            btnNode.classList.add('correct');
            document.getElementById('sm-feedback').textContent = "Match!";
            document.getElementById('sm-feedback').style.color = "var(--brand-green)";
            
            // Disable clicks
            document.querySelectorAll('.sm-option').forEach(b => b.style.pointerEvents = 'none');
            
            setTimeout(nextSpeedMatch, 600);
        } else {
            btnNode.classList.add('wrong');
            document.getElementById('sm-feedback').textContent = "-5 seconds!";
            document.getElementById('sm-feedback').style.color = "#ef4444";
            smTimer = Math.max(0, smTimer - 5);
            document.getElementById('sm-timer').textContent = smTimer;
        }
    }

    function endSpeedMatch() {
        document.getElementById('sm-term').style.display = 'none';
        document.getElementById('sm-options').style.display = 'none';
        
        if (currentMatchTerm) {
            const fb = document.getElementById('sm-feedback');
            fb.textContent = `Time's up! Missed: ${currentMatchTerm.term} = ${currentMatchTerm.def}`;
            fb.className = "sm-feedback wrong";
        } else {
            document.getElementById('sm-feedback').textContent = "";
        }
        
        document.getElementById('sm-gameover').classList.remove('hidden');
        document.getElementById('sm-final').textContent = smScore;
    }

    document.getElementById('sm-restart').addEventListener('click', initSpeedMatch);

    // --- 6. PENALTY OR LEGAL? ---
    const penaltyScenarios = [
        { s: "A robot intentionally tips over an opposing alliance's robot.", a: "Penalty" },
        { s: "A robot accidentally touches an opponent's robot while both are moving.", a: "Legal" },
        { s: "A drive team member steps into the playing field before the referee signals it is safe.", a: "Penalty" },
        { s: "A robot expands to 20 inches wide during the TeleOp period.", a: "Legal" }, // into the deep allows expansion
        { s: "A robot launches a game element out of the field perimeter.", a: "Penalty" },
        { s: "A human player introduces a game element through the designated return chute.", a: "Legal" },
        { s: "A robot pins an opponent against the field wall for 6 seconds.", a: "Penalty" },
        { s: "A robot's bumper falls off, but the robot continues to operate safely.", a: "Legal" },
        { s: "A drive coach uses a tablet to show strategy to the drivers during the match.", a: "Penalty" }, // electronics rule usually prohibits this depending on season, let's keep it simple
        { s: "During autonomous, the robot scores pre-loaded elements into the designated scoring area.", a: "Legal" }
    ];
    let penaltyScore = 0;
    let penaltyIdx = 0;
    let shuffledScenarios = [];

    function initPenalty() {
        penaltyScore = 0;
        penaltyIdx = 0;
        shuffledScenarios = [...penaltyScenarios].sort(() => Math.random() - 0.5).slice(0, 5); // Play 5 scenarios
        
        document.getElementById('penalty-gameover').classList.add('hidden');
        document.getElementById('penalty-options').classList.remove('hidden');
        document.getElementById('penalty-scenario').classList.remove('hidden');
        document.getElementById('penalty-feedback').textContent = '';
        
        loadPenaltyScenario();
    }

    function loadPenaltyScenario() {
        const scenario = shuffledScenarios[penaltyIdx];
        document.getElementById('penalty-scenario').textContent = `Scenario ${penaltyIdx+1}: ${scenario.s}`;
    }

    function handlePenaltyGuess(guess) {
        const scenario = shuffledScenarios[penaltyIdx];
        const fb = document.getElementById('penalty-feedback');
        
        if (guess === scenario.a) {
            penaltyScore++;
            fb.textContent = "Correct!";
            fb.style.color = "var(--brand-green)";
        } else {
            fb.textContent = `Incorrect. It was ${scenario.a}.`;
            fb.style.color = "#ef4444";
        }
        
        document.getElementById('penalty-options').classList.add('hidden');
        
        setTimeout(() => {
            penaltyIdx++;
            if (penaltyIdx < shuffledScenarios.length) {
                document.getElementById('penalty-options').classList.remove('hidden');
                fb.textContent = '';
                loadPenaltyScenario();
            } else {
                document.getElementById('penalty-scenario').classList.add('hidden');
                document.getElementById('penalty-options').classList.add('hidden');
                fb.textContent = '';
                document.getElementById('penalty-gameover').classList.remove('hidden');
                document.getElementById('penalty-score').textContent = `${penaltyScore} out of ${shuffledScenarios.length}`;
            }
        }, 1500);
    }

    document.getElementById('btn-penalty').addEventListener('click', () => handlePenaltyGuess("Penalty"));
    document.getElementById('btn-legal').addEventListener('click', () => handlePenaltyGuess("Legal"));
    document.getElementById('penalty-restart').addEventListener('click', initPenalty);

    // --- 7. FTC HANGMAN ---
    const hangmanPhrases = ["GRACIOUS PROFESSIONALISM", "AUTONOMOUS", "TELEMETRY", "REV ROBOTICS", "CONTROL HUB", "ODOMETRY", "PID CONTROLLER"];
    let hmAnswer = "";
    let hmGuessed = [];
    let hmLives = 6;
    let hmGameOver = false;

    function initHangman() {
        hmAnswer = hangmanPhrases[Math.floor(Math.random() * hangmanPhrases.length)];
        hmGuessed = [];
        hmLives = 6;
        hmGameOver = false;
        
        document.getElementById('hangman-lives').textContent = hmLives;
        document.getElementById('hangman-gameover').classList.add('hidden');
        
        renderHangmanWord();
        renderHangmanKeyboard();
    }

    function renderHangmanWord() {
        const container = document.getElementById('hangman-word');
        let display = "";
        for (let char of hmAnswer) {
            if (char === " ") {
                display += " \u00A0 "; // spaces
            } else if (hmGuessed.includes(char)) {
                display += char;
            } else {
                display += "_";
            }
        }
        container.textContent = display;
    }

    function renderHangmanKeyboard() {
        const kb = document.getElementById('hangman-keyboard');
        kb.innerHTML = "";
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        
        letters.forEach(char => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline';
            btn.style.padding = '0.5rem';
            btn.style.width = '40px';
            btn.textContent = char;
            
            if (hmGuessed.includes(char)) {
                btn.disabled = true;
                if (hmAnswer.includes(char)) {
                    btn.classList.add('bg-green'); // could style nicely
                    btn.style.borderColor = 'var(--brand-green)';
                    btn.style.color = 'var(--brand-green)';
                } else {
                    btn.style.opacity = '0.3';
                }
            } else {
                btn.addEventListener('click', () => handleHangmanGuess(char));
            }
            kb.appendChild(btn);
        });
    }

    function handleHangmanGuess(char) {
        if (hmGameOver || hmGuessed.includes(char)) return;
        
        hmGuessed.push(char);
        
        if (!hmAnswer.includes(char)) {
            hmLives--;
            document.getElementById('hangman-lives').textContent = hmLives;
        }
        
        renderHangmanWord();
        renderHangmanKeyboard();
        
        checkHangmanWinLoss();
    }

    function checkHangmanWinLoss() {
        let won = true;
        for (let char of hmAnswer) {
            if (char !== " " && !hmGuessed.includes(char)) {
                won = false;
                break;
            }
        }
        
        const go = document.getElementById('hangman-gameover');
        const msg = document.getElementById('hangman-result-msg');
        
        if (won) {
            hmGameOver = true;
            go.classList.remove('hidden');
            msg.textContent = "You Win!";
            msg.style.color = "var(--brand-green)";
        } else if (hmLives <= 0) {
            hmGameOver = true;
            go.classList.remove('hidden');
            msg.textContent = `Game Over. The phrase was: ${hmAnswer}`;
            msg.style.color = "#ef4444";
            
            // Reveal word completely
            const container = document.getElementById('hangman-word');
            container.textContent = hmAnswer;
        }
    }

    document.getElementById('hangman-restart').addEventListener('click', initHangman);

    // --- 8. MEMORY MATCH ---
    const memoryIcons = [
        "ph-gear", "ph-cpu", "ph-battery-charging", "ph-game-controller",
        "ph-wrench", "ph-car", "ph-code", "ph-shield-check"
    ];
    let memoryCards = [];
    let memoryFlipped = [];
    let memoryMatched = 0;
    let memoryMoves = 0;

    function initMemory() {
        memoryMoves = 0;
        memoryMatched = 0;
        memoryFlipped = [];
        document.getElementById('memory-moves').textContent = memoryMoves;
        document.getElementById('memory-gameover').classList.add('hidden');
        
        let pairs = [...memoryIcons, ...memoryIcons];
        pairs.sort(() => Math.random() - 0.5);
        memoryCards = pairs;
        
        const board = document.getElementById('memory-board');
        board.innerHTML = '';
        board.style.display = 'grid';
        board.style.gridTemplateColumns = 'repeat(4, 1fr)';
        board.style.gap = '10px';
        board.style.maxWidth = '400px';
        board.style.margin = '0 auto';
        
        memoryCards.forEach((iconName, idx) => {
            const card = document.createElement('div');
            card.className = 'memory-card bg-darker flex-center cursor-pointer rounded';
            card.style.height = '80px';
            card.style.fontSize = '2rem';
            card.dataset.icon = iconName;
            card.dataset.idx = idx;
            
            // Initially hidden (show a question mark)
            card.innerHTML = `<i class="ph ph-question text-muted"></i>`;
            
            card.addEventListener('click', () => handleMemoryClick(card));
            board.appendChild(card);
        });
    }

    function handleMemoryClick(cardNode) {
        let idx = cardNode.dataset.idx;
        if (memoryFlipped.length === 2) return; // Wait
        if (cardNode.classList.contains('matched') || memoryFlipped.some(f => f.dataset.idx === idx)) return;
        
        // Flip card
        let iconName = cardNode.dataset.icon;
        cardNode.innerHTML = `<i class="ph ${iconName} text-green"></i>`;
        memoryFlipped.push(cardNode);
        
        if (memoryFlipped.length === 2) {
            memoryMoves++;
            document.getElementById('memory-moves').textContent = memoryMoves;
            
            let c1 = memoryFlipped[0];
            let c2 = memoryFlipped[1];
            
            if (c1.dataset.icon === c2.dataset.icon) {
                c1.classList.add('matched');
                c2.classList.add('matched');
                c1.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                c2.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                memoryMatched += 2;
                memoryFlipped = [];
                
                if (memoryMatched === memoryCards.length) {
                    document.getElementById('memory-gameover').classList.remove('hidden');
                }
            } else {
                setTimeout(() => {
                    c1.innerHTML = `<i class="ph ph-question text-muted"></i>`;
                    c2.innerHTML = `<i class="ph ph-question text-muted"></i>`;
                    memoryFlipped = [];
                }, 1000);
            }
        }
    }

    document.getElementById('memory-restart').addEventListener('click', initMemory);

    // --- INTERACTIVE GREEN FLUID BOX ---
    function initFluidSimulation() {
        const canvas = document.getElementById('fluid-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;

        // Approx 150 particles for good goo effect and performance
        const numParticles = 150;
        const particles = [];
        const baseRadius = 18;

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }
        window.addEventListener('resize', resize);
        resize();

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                radius: baseRadius + Math.random() * 8,
                mass: 1
            });
        }

        let gravity = { x: 0, y: 0.6 };
        let mouse = { x: -1000, y: -1000, isDown: false, activeRow: false };

        // Mouse & Touch interactions
        function updateMousePos(e) {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            mouse.x = clientX - rect.left;
            mouse.y = clientY - rect.top;
            mouse.activeRow = true;
        }

        // Mouse events
        canvas.addEventListener('mousemove', updateMousePos);
        canvas.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.activeRow = false; mouse.isDown = false; });
        canvas.addEventListener('mousedown', () => mouse.isDown = true);
        window.addEventListener('mouseup', () => mouse.isDown = false);
        
        // Touch events
        canvas.addEventListener('touchmove', (e) => { e.preventDefault(); updateMousePos(e); }, {passive: false});
        canvas.addEventListener('touchstart', (e) => { e.preventDefault(); mouse.isDown = true; updateMousePos(e); }, {passive: false});
        canvas.addEventListener('touchend', () => { mouse.isDown = false; mouse.x = -1000; mouse.activeRow = false; });

        // Device Orientation (Tilt)
        window.addEventListener('deviceorientation', (e) => {
            if (e.beta !== null && e.gamma !== null) {
                // gamma is left/right (-90 to 90), beta is front/back (-180 to 180)
                let tiltX = e.gamma / 45;
                let tiltY = e.beta / 45;
                // Clamp and apply to gravity
                gravity.x = Math.max(-1.5, Math.min(1.5, tiltX));
                gravity.y = Math.max(-1.5, Math.min(1.5, tiltY));
            }
        });

        function update() {
            ctx.clearRect(0, 0, width, height);

            // 1. Integration
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];

                // Gravity (default falls down, tilts shift it)
                p.vx += gravity.x;
                p.vy += gravity.y;

                // Mouse interaction
                if (mouse.activeRow) {
                    let dx = mouse.x - p.x;
                    let dy = mouse.y - p.y;
                    let distSq = dx * dx + dy * dy;
                    let radiusEff = mouse.isDown ? 15000 : 8000; // click repels stronger
                    if (distSq < radiusEff) {
                        let dist = Math.sqrt(distSq);
                        if(dist === 0) dist = 0.1;
                        let force = (Math.sqrt(radiusEff) - dist) / Math.sqrt(radiusEff);
                        let strength = mouse.isDown ? -3 : 1.5; // push away heavily on click, slight attract on hover
                        p.vx += (dx / dist) * force * strength;
                        p.vy += (dy / dist) * force * strength;
                    }
                }

                // Drag/viscosity
                p.vx *= 0.94;
                p.vy *= 0.94;

                p.x += p.vx;
                p.y += p.vy;

                // Border Constraints
                if (p.x < p.radius) { p.x = p.radius; p.vx *= -0.5; }
                if (p.x > width - p.radius) { p.x = width - p.radius; p.vx *= -0.5; }
                if (p.y < p.radius) { p.y = p.radius; p.vy *= -0.5; }
                if (p.y > height - p.radius) { p.y = height - p.radius; p.vy *= -0.5; }
            }

            // 2. Collision Resolution (Relaxation) - Make it feel like a cohesive fluid
            const gridCols = Math.ceil(width / (baseRadius * 2));
            const gridRows = Math.ceil(height / (baseRadius * 2));
            const iterations = 3;

            for (let k = 0; k < iterations; k++) {
                // Spatial hash or simple O(n^2) is fine for ~150 particles
                for (let i = 0; i < particles.length; i++) {
                    let p1 = particles[i];
                    for (let j = i + 1; j < particles.length; j++) {
                        let p2 = particles[j];
                        let dx = p2.x - p1.x;
                        let dy = p2.y - p1.y;
                        let distSq = dx * dx + dy * dy;
                        let minDist = p1.radius + p2.radius - 2; // slight overlap allowed for goo

                        if (distSq < minDist * minDist) {
                            let dist = Math.sqrt(distSq);
                            if (dist === 0) dist = 0.1;
                            let overlap = minDist - dist;
                            let nx = dx / dist;
                            let ny = dy / dist;

                            // Push apart equally
                            const correction = (overlap * 0.5) * 0.8; // relaxation factor
                            p1.x -= nx * correction;
                            p1.y -= ny * correction;
                            p2.x += nx * correction;
                            p2.y += ny * correction;
                        }
                    }
                }
            }

            // 3. Render
            ctx.fillStyle = '#0da371';
            ctx.beginPath();
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            }
            ctx.fill();

            requestAnimationFrame(update);
        }
        
        update();
    }

    // Initialize fluid on load
    initFluidSimulation();

    // --- 5 KEYS EASTER EGG LOGIC ---
    let keysFound = 0;
    const totalKeys = 5;
    const keysInventory = document.getElementById('keys-inventory');
    const bossModal = document.getElementById('boss-fight-modal');
    const bossStartBtn = document.getElementById('start-boss-fight');
    const bossArea = document.getElementById('boss-fight-area');
    const bossTarget = document.getElementById('boss-target');
    const bossStats = document.getElementById('boss-stats');
    const bossResult = document.getElementById('boss-result');
    const bossCloseBtn = document.getElementById('boss-close');
    const retryBossBtn = document.getElementById('retry-boss');
    const hitsLeftSpan = document.getElementById('hits-left');
    const timeSpan = document.getElementById('time-left');

    let bossTimer;
    let bossMoveInterval;
    let timeLeft = 10.0;
    let hitsNeeded = 15;
    let bossActive = false;

    // Handle Key Collection
    document.querySelectorAll('.easter-egg-key').forEach((keyEl) => {
        keyEl.addEventListener('click', function() {
            if (this.classList.contains('found')) return;
            
            this.classList.add('found');
            keysFound++;
            
            // Show inventory if first key
            if (keysFound === 1 && keysInventory) {
                keysInventory.classList.add('visible');
            }
            
            // Light up slot
            const slot = document.getElementById(`slot-${keysFound}`);
            if (slot) slot.classList.add('filled');
            
            // Check win condition
            if (keysFound === totalKeys) {
                setTimeout(() => {
                    if(bossModal) bossModal.style.display = 'flex';
                }, 1000); // Wait for the last key animation to finish
            }
        });
    });

    // Boss Fight Logic
    function resetBoss() {
        timeLeft = 10.0;
        hitsNeeded = 15;
        bossActive = false;
        clearInterval(bossTimer);
        clearInterval(bossMoveInterval);
        
        if(document.getElementById('boss-intro')) document.getElementById('boss-intro').style.display = 'block';
        if(bossArea) bossArea.style.display = 'none';
        if(bossStats) bossStats.style.display = 'none';
        if(bossResult) bossResult.style.display = 'none';
        
        if(hitsLeftSpan) hitsLeftSpan.textContent = hitsNeeded;
        if(timeSpan) timeSpan.textContent = timeLeft.toFixed(1);
        if(bossTarget) {
            bossTarget.style.top = '10%';
            bossTarget.style.left = '10%';
        }
    }

    function moveBoss() {
        if (!bossActive || !bossTarget || !bossArea) return;
        const areaW = bossArea.clientWidth;
        const areaH = bossArea.clientHeight;
        const targetW = bossTarget.offsetWidth || 60;
        const targetH = bossTarget.offsetHeight || 60;
        
        const maxLeft = areaW - targetW - 10;
        const maxTop = areaH - targetH - 10;
        
        const randomLeft = Math.max(10, Math.random() * maxLeft);
        const randomTop = Math.max(10, Math.random() * maxTop);
        
        bossTarget.style.left = `${randomLeft}px`;
        bossTarget.style.top = `${randomTop}px`;
    }

    function startBossFight() {
        if(document.getElementById('boss-intro')) document.getElementById('boss-intro').style.display = 'none';
        if(bossResult) bossResult.style.display = 'none';
        if(bossArea) bossArea.style.display = 'block';
        if(bossStats) bossStats.style.display = 'flex';
        
        bossActive = true;
        hitsNeeded = 15;
        timeLeft = 10.0;
        if(hitsLeftSpan) hitsLeftSpan.textContent = hitsNeeded;
        if(timeSpan) timeSpan.textContent = timeLeft.toFixed(1);

        // Timer
        bossTimer = setInterval(() => {
            timeLeft -= 0.1;
            if (timeLeft <= 0) {
                timeLeft = 0;
                endBossFight(false);
            }
            if(timeSpan) timeSpan.textContent = timeLeft.toFixed(1);
        }, 100);

        // Move target randomly
        bossMoveInterval = setInterval(moveBoss, 700);
        moveBoss(); // initial move
    }

    function endBossFight(win) {
        bossActive = false;
        clearInterval(bossTimer);
        clearInterval(bossMoveInterval);
        
        if(bossArea) bossArea.style.display = 'none';
        if(bossStats) bossStats.style.display = 'none';
        if(bossResult) bossResult.style.display = 'block';
        
        if (win) {
            if(document.getElementById('result-title')) document.getElementById('result-title').innerHTML = '<span class="text-green">SYSTEM SECURED</span>';
            if(document.getElementById('result-desc')) document.getElementById('result-desc').textContent = 'Incredible reflexes! You successfully neutralized the rogue Alphabot object and proved your developer mettle. Welcome to the elite tier.';
            if(retryBossBtn) retryBossBtn.textContent = 'Play Again';
        } else {
            if(document.getElementById('result-title')) document.getElementById('result-title').innerHTML = '<span style="color: #ef4444;">MISSION FAILED</span>';
            if(document.getElementById('result-desc')) document.getElementById('result-desc').textContent = 'The rogue Alphabot escaped. You weren\'t fast enough.';
            if(retryBossBtn) retryBossBtn.textContent = 'Retry Mission';
        }
    }

    if(bossTarget) {
        bossTarget.addEventListener('click', (e) => {
            if (!bossActive) return;
            // prevent clicks from bubbling or selecting text
            e.preventDefault();
            
            hitsNeeded--;
            hitsLeftSpan.textContent = hitsNeeded;
            
            // Visual feedback
            bossTarget.style.transform = 'scale(0.8)';
            setTimeout(() => bossTarget.style.transform = 'scale(1)', 100);
            
            if (hitsNeeded <= 0) {
                endBossFight(true);
            } else {
                // Move immediately on hit to make it harder
                moveBoss();
            }
        });
    }

    if(bossStartBtn) bossStartBtn.addEventListener('click', startBossFight);
    if(retryBossBtn) retryBossBtn.addEventListener('click', resetBoss);
    if(bossCloseBtn && bossModal) {
        bossCloseBtn.addEventListener('click', () => {
            bossModal.style.display = 'none';
            resetBoss();
        });
    }

});
