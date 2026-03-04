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
    let liquidIndicator = null;

    function initLiquidIndicator() {
        liquidIndicator = document.createElement('div');
        liquidIndicator.classList.add('liquid-indicator');
        navLinksContainer.style.position = 'relative';
        navLinksContainer.appendChild(liquidIndicator);

        // Position on the initial active button
        const activeBtn = document.querySelector('.nav-btn.active');
        if (activeBtn) {
            positionIndicator(activeBtn, false);
        }
    }

    function positionIndicator(targetBtn, animate) {
        if (!liquidIndicator || !targetBtn) return;
        const containerRect = navLinksContainer.getBoundingClientRect();
        const btnRect = targetBtn.getBoundingClientRect();

        const left = btnRect.left - containerRect.left;
        const top = btnRect.top - containerRect.top;
        const width = btnRect.width;
        const height = btnRect.height;

        if (!animate) {
            // Instant position (initial load)
            liquidIndicator.style.transition = 'none';
            liquidIndicator.style.left = left + 'px';
            liquidIndicator.style.top = top + 'px';
            liquidIndicator.style.width = width + 'px';
            liquidIndicator.style.height = height + 'px';
            liquidIndicator.style.transform = 'scaleY(1)';
            void liquidIndicator.offsetWidth; // force reflow
            liquidIndicator.style.transition = '';
        } else {
            // Get current position for residue drops
            const currentLeft = parseFloat(liquidIndicator.style.left) || 0;
            const currentWidth = parseFloat(liquidIndicator.style.width) || 0;

            // Phase 1: Stretch to cover both old and new positions
            const stretchLeft = Math.min(currentLeft, left);
            const stretchRight = Math.max(currentLeft + currentWidth, left + width);
            const stretchWidth = stretchRight - stretchLeft;

            liquidIndicator.style.transition = 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1), width 0.25s cubic-bezier(0.4, 0, 0.2, 1), height 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
            liquidIndicator.style.left = stretchLeft + 'px';
            liquidIndicator.style.width = stretchWidth + 'px';
            liquidIndicator.style.transform = 'scaleY(0.75)'; // squish vertically while stretching

            // Spawn residue drops along the path
            spawnResidueDrops(containerRect, currentLeft, currentWidth, left, width, top, height);

            // Phase 2: Snap to destination and restore shape
            setTimeout(() => {
                liquidIndicator.style.transition = 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                liquidIndicator.style.left = left + 'px';
                liquidIndicator.style.width = width + 'px';
                liquidIndicator.style.transform = 'scaleY(1)';
            }, 200);
        }
    }

    function spawnResidueDrops(containerRect, fromLeft, fromWidth, toLeft, toWidth, topOffset, height) {
        const midY = containerRect.top + topOffset + height / 2;
        const pathStart = Math.min(fromLeft + fromWidth / 2, toLeft + toWidth / 2);
        const pathEnd = Math.max(fromLeft + fromWidth / 2, toLeft + toWidth / 2);
        const pathLength = pathEnd - pathStart;
        const dropCount = 3 + Math.floor(Math.random() * 3); // 3-5 residue drops

        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.classList.add('liquid-drop');

            const size = 3 + Math.random() * 5;
            // Distribute drops along the path
            const t = 0.2 + Math.random() * 0.6; // middle 60% of path
            const dropX = containerRect.left + pathStart + pathLength * t;
            const dropY = midY + (Math.random() - 0.3) * 8; // slight vertical scatter, biased down

            drop.style.width = size + 'px';
            drop.style.height = size + 'px';
            drop.style.left = dropX + 'px';
            drop.style.top = dropY + 'px';

            // Residue drops fall down and evaporate
            drop.style.setProperty('--drop-x', ((Math.random() - 0.5) * 6) + 'px');
            drop.style.setProperty('--drop-y', (8 + Math.random() * 15) + 'px');
            drop.style.setProperty('--drop-duration', (0.4 + Math.random() * 0.4) + 's');
            drop.style.animationDelay = (0.1 + Math.random() * 0.15) + 's';

            document.body.appendChild(drop);
            setTimeout(() => drop.remove(), 900);
        }
    }

    // Initialize on load
    initLiquidIndicator();

    // Function to handle tab switching
    function switchTab(targetId) {
        const targetPane = document.getElementById(targetId);
        
        if (!targetPane) return;

        // Animate the liquid indicator to the new tab
        const matchingNavBtn = Array.from(navButtons).find(btn => btn.getAttribute('data-target') === targetId);
        if (matchingNavBtn) {
            positionIndicator(matchingNavBtn, true);
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
});
