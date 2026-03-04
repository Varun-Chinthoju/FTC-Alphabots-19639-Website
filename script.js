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
    // Liquid Drop Particle System
    function spawnLiquidDrops(sourceElement) {
        if (!sourceElement) return;
        const rect = sourceElement.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dropCount = 8 + Math.floor(Math.random() * 6); // 8-13 drops

        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.classList.add('liquid-drop');

            // Random size between 4px and 12px
            const size = 4 + Math.random() * 8;
            drop.style.width = size + 'px';
            drop.style.height = size + 'px';

            // Position at the center of the source button
            drop.style.left = (cx - size / 2 + (Math.random() - 0.5) * rect.width * 0.6) + 'px';
            drop.style.top = (cy - size / 2 + (Math.random() - 0.5) * rect.height * 0.4) + 'px';

            // Random direction for each drop
            const angle = Math.random() * Math.PI * 2;
            const distance = 15 + Math.random() * 35;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance + 10; // Bias downward slightly (gravity)
            drop.style.setProperty('--drop-x', dx + 'px');
            drop.style.setProperty('--drop-y', dy + 'px');

            // Random duration for organic feel
            const duration = 0.5 + Math.random() * 0.6;
            drop.style.setProperty('--drop-duration', duration + 's');

            // Slight staggered spawn
            drop.style.animationDelay = (Math.random() * 0.1) + 's';

            document.body.appendChild(drop);

            // Clean up after animation finishes
            setTimeout(() => drop.remove(), (duration + 0.15) * 1000);
        }
    }

    // Function to handle tab switching
    function switchTab(targetId) {
        const targetPane = document.getElementById(targetId);
        
        if (!targetPane) return;

        // Spawn liquid drops from the OLD active tab before switching
        const currentActiveBtn = document.querySelector('.nav-btn.active');
        if (currentActiveBtn && currentActiveBtn.getAttribute('data-target') !== targetId) {
            spawnLiquidDrops(currentActiveBtn);
        }

        // Reset all buttons and panes
        navButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => {
            p.classList.add('hidden');
            p.classList.remove('fade-in');
        });

        // Activate matching button
        const matchingNavBtn = Array.from(navButtons).find(btn => btn.getAttribute('data-target') === targetId);
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
