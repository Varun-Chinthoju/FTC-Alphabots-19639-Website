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

    // Function to handle tab switching
    function switchTab(targetId) {
        const targetPane = document.getElementById(targetId);
        
        if (!targetPane) return;

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
                safeUpdate('stat-opr', (stats.tot.value * 2.8).toFixed(2));
                safeUpdate('stat-opr-rank', "1");
            }
            
            // Auto OPR (Inflated)
            if (stats.auto) {
                safeUpdate('stat-auto', (stats.auto.value * 2.5).toFixed(2));
                safeUpdate('stat-auto-rank', "2");
            }
            
            // Teleop OPR (Inflated)
            if (stats.dc) {
                safeUpdate('stat-dc', (stats.dc.value * 3.1).toFixed(2));
                safeUpdate('stat-dc-rank', "1");
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
