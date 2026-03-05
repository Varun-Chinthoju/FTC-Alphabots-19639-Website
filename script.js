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

        // Show/hide season sub-bar based on active tab
        const seasonSubBar = document.getElementById('season-sub-bar');
        if (seasonSubBar) {
            if (targetId === 'members') {
                seasonSubBar.style.display = 'flex';
            } else {
                seasonSubBar.style.display = 'none';
            }
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

    // Add click listeners to nav buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(e.currentTarget.getAttribute('data-target'));
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
        '2025-2026': [
            { name: 'Suhas Bathini', role: 'Team Captain' },
            { name: 'Akshay Shoroff', role: 'Team Captain' },
            { name: 'Rushil Shah', role: 'Outreach Captain' },
            { name: 'Saket Sandru', role: 'Hardware Captain' },
            { name: 'Aadit Verma', role: 'Outreach Captain' },
            { name: 'Varun Chinthoju', role: 'Hardware Member' },
            { name: 'Srithan Deverashetty', role: 'Hardware Member' },
            { name: 'Shiv Gurjar', role: 'Hardware Member' },
            { name: 'Vihaan Sanghvi', role: 'Outreach Member' },
            { name: 'Dhruv Mandala', role: 'Software Member' },
            { name: 'Renu Mandala', role: 'Outreach Member' },
            { name: 'Aashi', role: 'Outreach Member' },
        ],
        '2024-2025': [
            { name: 'Suhas Bathini', role: 'Team Captain' },
            { name: 'Akshay Shoroff', role: 'Team Captain' },
            { name: 'Rushil Shah', role: 'Outreach Captain' },
            { name: 'Shiv Gurjar', role: 'Hardware Captain' },
            { name: 'Aadit Verma', role: 'Outreach Captain' },
            { name: 'Trisha Bhuwania', role: 'Software Member' },
            { name: 'Ronit Parikh', role: 'Software Member' },
            { name: 'Rishaan Jain', role: 'Software Member' },
            { name: 'Saket Sandru', role: 'Hardware Member' },
            { name: 'Vihaan Sanghvi', role: 'Outreach Member' },
            { name: 'Simran Chhabria', role: 'Hardware Member' },
            { name: 'Saanvi Shah', role: 'Outreach Member' },
        ],
        '2023-2024': [
            { name: 'Suhas Bathini', role: 'Team Captain' },
            { name: 'Maanav Shah', role: 'Hardware Engineering Captain' },
            { name: 'Gabriel Hwang', role: 'Outreach Captain' },
            { name: 'Parsh Gandhi', role: 'Team Advisor' },
            { name: 'Anand Raghunath', role: 'Software Engineering Captain' },
            { name: 'Simran Chhabria', role: 'Hardware Engineering Vice Captain' },
            { name: 'Rushil Shah', role: 'Game Strategy & Hardware' },
            { name: 'Shakil Musthafa', role: 'Fundraising & Outreach' },
            { name: 'Shiv Gurjar', role: 'Hardware & Outreach' },
            { name: 'Akshay Shoroff', role: 'CAD Lead' },
            { name: 'Rishaan Jain', role: 'Software & Documentation Lead' },
            { name: 'Saanvi Shah', role: 'Outreach Member' },
            { name: 'Trisha Bhuwania', role: 'Software Member' },
        ],
        '2022-2023': [
            { name: 'Parsh Gandhi', role: 'Team Captain' },
            { name: 'Maanav Shah', role: 'Hardware Engineering Captain' },
            { name: 'Suhas Bathini', role: 'Software Engineering Captain' },
            { name: 'Gabriel Hwang', role: 'Outreach Captain' },
            { name: 'Tarun Iyer', role: 'Hardware Engineering Vice Captain' },
            { name: 'Anand Raghunath', role: 'Software Engineering Vice Captain' },
            { name: 'Rushil Shah', role: 'Game Strategy & Hardware' },
            { name: 'Pranav Kunisetty', role: 'CAD Lead' },
            { name: 'Amogh Khandkar', role: 'Documentation Lead & Outreach' },
            { name: 'Shakil Musthafa', role: 'Fundraising & Outreach' },
            { name: 'Shiv Gurjar', role: 'Hardware & Outreach' },
        ],
        '2021-2022': [
            { name: 'Parsh Gandhi', role: 'Team Captain' },
            { name: 'Maanav Shah', role: 'Hardware Engineering Captain' },
            { name: 'Anand Raghunath', role: 'Software Engineering Captain' },
            { name: 'Gabriel Hwang', role: 'Outreach Captain' },
            { name: 'Tarun Iyer', role: 'Hardware Engineering Vice Captain' },
            { name: 'Suhas Bathini', role: 'Software Engineering Vice Captain' },
            { name: 'Rushil Shah', role: 'Game Strategy Lead' },
            { name: 'Pranav Kunisetty', role: 'CAD Lead' },
            { name: 'Amogh Khandkar', role: 'Documentation Lead' },
        ],
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
        grid.innerHTML = members.map((m, i) => `
            <div class="member-card" style="animation: fadeInUp 0.4s ease ${i * 0.07}s both;">
                <div class="member-avatar">${getInitials(m.name)}</div>
                <div class="member-name">${m.name}</div>
                <div class="member-role">${m.role}</div>
            </div>
        `).join('');
    }

    const seasonSelect = document.getElementById('season-select');
    if (seasonSelect) {
        seasonSelect.addEventListener('change', (e) => {
            renderMembers(e.target.value);
        });
        // Render default season
        renderMembers(seasonSelect.value);
    }
});
