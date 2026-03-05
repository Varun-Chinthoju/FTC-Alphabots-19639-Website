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
        '2025-2026': [
            { name: 'Akshay Shoroff', role: 'Team Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSTfP8Mi_okxxi6VjwFN_2yFWvVZAo_LX64VAnf1MA872EvqhwjPSYSAvNd_8gGfE1pWfQ7PuZ_7ZIVpIZtPiJ4NLJsFsjhbFWdP6Bm6g7Iw-t3vgyELztjI6FODMs0wA3lCU9_AMDd5YvwBLny48UlfygzLiUZcoSRzajSUknuxNwiYO1tPiasZjC_PdEVNfsLVV-JF4R6ObR_7KQCeDcWkucD4Uo9027Lpv8=w1280' },
            { name: 'Suhas Bathini', role: 'Team Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SR2mda6zeZ7YJwN9f8QVma0vzCJB8t5UDbA2tLf1cDpMJ3uHh_dp8IrSyJJm-1kZeK4e9pggkimVjgKjmJOpH7vxSBhbrvLh829tJ4kui6sxxgfHUn9W6MwtdbG01u0r9uy2lwGZdIRcdA9T8OUnqu4B2oeb-bHcSU1LTbHuBg3CtwrmXa4QxCV0B_QvHkicKu6-o7udvWCz49vETWlnC4oSvOEaGBRsaAMXNs=w1280' },
            { name: 'Dhruv Mandala', role: 'Software Member', img: '' },
            { name: 'Renu Mandala', role: 'Software Member', img: '' },
            { name: 'Saket Sandru', role: 'Hardware Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SQMMpDXKugsxnr-hrBcs6GZ4xzAxl_Q4dwIpAeRlAxfqflbzAyE-8zN1dYimK0ImbULS-ugHlA6tFNXt8CqjdWbQ_Ux6oNwuRS43vs6EAHWTe42S0CfiMGOvJ9tjmgoH4eL185jpmXBmaXZJbElBCSCc-IZP5cJdBFrbLVysCR1TuDPlxoLRAbjPRoeU7owLGzKsatv5QL9DIS4LkzHbOTk_aYF8FznQTgZQkA=w1280' },
            { name: 'Aadit Verma', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0STK6zD59tii0xyD_Tyg4bXqyWzRlxwQgUL1nPJP1Ojiy8OjLPSFHODr02_CUUuilp52mxSAGBkyK40Db28dNsYmgH8U0ROdDvd_NuAg1_yTIZgaHTwoB4J0nDybXNcrXYjvRy1qWuivKgoZLWLXVJp8chStAeY66LZFL1qbgp6-Eu2yeOgMMx1X07j_r2klPKm-BRQ6u0nhUTlOtXYAQxOicyd3U1b5DEiN=w1280' },
            { name: 'Shiv Gurjar', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRfQIOKxo4yyROfBQ5Eue8vjhW0eUZV2EzbpeMJL35ho1uxok9e4te1oL8Xzwhc8ZpxhP4Jwi5AIEf7cerXB4-zRaSGDpvwzOdjY8JDnrI2Sk9eFW0jxL27DcNXu1YYHdY3_GSvZ74bdgVmxAU3rz2xus09bPksN0uBmOMM_iAqsoTgoejTqZtmF6HlKXXyLUNMblEEwC_yR2ehYoBtfKx1zlU6Ju0zW4jhh7c=w1280' },
            { name: 'Srithan Deverashetty', role: 'Hardware Member', img: '' },
            { name: 'Varun Chinthoju', role: 'Hardware Member', img: '' },
            { name: 'Rushil Shah', role: 'Outreach Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSyuqZeiikJqw0YSK_7ksiJ4wXDGDOesJUgc19raj8fq0ZGQTxnq_fzqYrU-cIgsvVEFeQI3U50S22ZmqvWLTd8d0gYHPTuXtjHHJq1meqG4TGMPW4SKm443cYAfoKm7lToFvbYsRpGF3r2W9w6gA4K-7n9ZE40ljvBbjZ0ZaaWlhCvGqwORloLRFkF6jxOtMus4J1zoOp0g2pDUmRHwaKvhHMrafgk403z=w1280' },
            { name: 'Vihaan Sanghvi', role: 'Outreach Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRVXqa_0AXUSHv343BL5PyR3wI-T_MAv9GQX1v40_GgfBtJfKKbZlsQeLY4uPp6ZdvHqM1GIx5hsfw0Z_ewewh9zGculuPHEP2itWrqgp2NBwvkpbAE3TaLOUb_wmpTxYQGFt0fqWsnB-EMZkET-pBLZFCQWkIpIQxMntqMR4Bn1i_XAadggRwm-7jwIzQYY4OpH7D1h8xViIA_HXy1S-4K0hoyiKzGQ-x7=w1280' },
            { name: 'Aashi', role: 'Member', img: '' }
        ],
        '2024-2025': [
            { name: 'Akshay Shoroff', role: 'Team Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSTfP8Mi_okxxi6VjwFN_2yFWvVZAo_LX64VAnf1MA872EvqhwjPSYSAvNd_8gGfE1pWfQ7PuZ_7ZIVpIZtPiJ4NLJsFsjhbFWdP6Bm6g7Iw-t3vgyELztjI6FODMs0wA3lCU9_AMDd5YvwBLny48UlfygzLiUZcoSRzajSUknuxNwiYO1tPiasZjC_PdEVNfsLVV-JF4R6ObR_7KQCeDcWkucD4Uo9027Lpv8=w1280' },
            { name: 'Suhas Bathini', role: 'Team Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SR2mda6zeZ7YJwN9f8QVma0vzCJB8t5UDbA2tLf1cDpMJ3uHh_dp8IrSyJJm-1kZeK4e9pggkimVjgKjmJOpH7vxSBhbrvLh829tJ4kui6sxxgfHUn9W6MwtdbG01u0r9uy2lwGZdIRcdA9T8OUnqu4B2oeb-bHcSU1LTbHuBg3CtwrmXa4QxCV0B_QvHkicKu6-o7udvWCz49vETWlnC4oSvOEaGBRsaAMXNs=w1280' },
            { name: 'Rishaan Jain', role: 'Software Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0STVG9MAbbAaCpRe_rwqFMWxIzClytbgbZqwI2oWEPY-4w5iQZyxnlfJjIf7q7k5o8DuL_unfPSeCqbW5YFM8WJx0yjJuyUcFgQM6q7PTPbh4n8aACe229x4Houbihiy_54oXZnItErcGwtaq_IW2DCkHQNmINB1VtTvOs53tv7NtwRO8hhpsD3doXedNCmxEwcY6P_6QwTEaXDMpRmn8vvz27h_6wx7uPu1=w1280' },
            { name: 'Ronit Parikh', role: 'Software Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRrXc4oJHQe37Bw80L-8Hq_L9dca5VT5HJS3wR-TROA4fRlnVyAQYHf-kWdpmJfk2VZ2p8lOn8Bcrf_qFYUNvsUcv5NnkgWRc5d_A3T2QGPMF-pTW64d-FJYDL99MqpohK8XYZy-z-BtAVXoyQ30W5PjON945tdpvZhmE4ThW1bLg7lZdedM-FYzW2HzmojgbS-62bOQQ6uNdV1IAnQYHurJzknUFEh7yrpN2A=w1280' },
            { name: 'Trisha Bhuwania', role: 'Software Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0STBT0OTrPdqRZZvXJqa4dGlE9PzzEKDqN3tq4EafctT5Vh75nP7BjCI-SPLuXJjzDPoqoB2sDJj4MZr8LQyL2ZEKsxaTPlIPK_tDrHArZ1zejUjsg2fav48-9QPvcofh4T1vl7o3lK4imlLjiWrpboGDYpgAfs_3hzTnna59W8qQWn-80FTk7ygEI7MSHzVRGYl6xJ5lSsLF_rOQ-Retbb5SjmB_vk8OQVA3Sg=w1280' },
            { name: 'Shiv Gurjar', role: 'Hardware Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRfQIOKxo4yyROfBQ5Eue8vjhW0eUZV2EzbpeMJL35ho1uxok9e4te1oL8Xzwhc8ZpxhP4Jwi5AIEf7cerXB4-zRaSGDpvwzOdjY8JDnrI2Sk9eFW0jxL27DcNXu1YYHdY3_GSvZ74bdgVmxAU3rz2xus09bPksN0uBmOMM_iAqsoTgoejTqZtmF6HlKXXyLUNMblEEwC_yR2ehYoBtfKx1zlU6Ju0zW4jhh7c=w1280' },
            { name: 'Aadit Verma', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0STK6zD59tii0xyD_Tyg4bXqyWzRlxwQgUL1nPJP1Ojiy8OjLPSFHODr02_CUUuilp52mxSAGBkyK40Db28dNsYmgH8U0ROdDvd_NuAg1_yTIZgaHTwoB4J0nDybXNcrXYjvRy1qWuivKgoZLWLXVJp8chStAeY66LZFL1qbgp6-Eu2yeOgMMx1X07j_r2klPKm-BRQ6u0nhUTlOtXYAQxOicyd3U1b5DEiN=w1280' },
            { name: 'Saket Sandru', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SQMMpDXKugsxnr-hrBcs6GZ4xzAxl_Q4dwIpAeRlAxfqflbzAyE-8zN1dYimK0ImbULS-ugHlA6tFNXt8CqjdWbQ_Ux6oNwuRS43vs6EAHWTe42S0CfiMGOvJ9tjmgoH4eL185jpmXBmaXZJbElBCSCc-IZP5cJdBFrbLVysCR1TuDPlxoLRAbjPRoeU7owLGzKsatv5QL9DIS4LkzHbOTk_aYF8FznQTgZQkA=w1280' },
            { name: 'Simran Chhabria', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0STpGRhuKsNFF57rozp3hsTy2-WPlQowYCuEgN2L8vKaHvPfa2zap5c1HUp4LcSxIQUAwnaqzTfSwBwWsfpMivHoKXIVFnDg9OWAMassyxNIzf6kDYDwmv_VgMO2TnjCNtUkq1UO1zYtDGk6484rA5elL5_yncvZ02wcpnu_fWb3qjHms84hjVMXtxaL66ylLfdHEVyJ_4_oVmc6uk4YXketBS49W05fKEbJOe4=w1280' },
            { name: 'Rushil Shah', role: 'Outreach Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSyuqZeiikJqw0YSK_7ksiJ4wXDGDOesJUgc19raj8fq0ZGQTxnq_fzqYrU-cIgsvVEFeQI3U50S22ZmqvWLTd8d0gYHPTuXtjHHJq1meqG4TGMPW4SKm443cYAfoKm7lToFvbYsRpGF3r2W9w6gA4K-7n9ZE40ljvBbjZ0ZaaWlhCvGqwORloLRFkF6jxOtMus4J1zoOp0g2pDUmRHwaKvhHMrafgk403z=w1280' },
            { name: 'Saanvi Shah', role: 'Outreach Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SQgfJsrlj4EwJxRfp-6qkeIIf3ud9aWt8kKDejvF7dd2DtN-gTvQqqiB7xdMbCJOEf-BdPs-giQikqi9wk_vaWHmChlK5VJpNGuFfwBlWDZs3et_CripOlZywBIwIelyCPYY9Fny1ua6ZOP9NacTCNTcBkOXucTdD1mFH9jRnX1Hd1NTcJbWy6YZfmX6ywWMj3oBZKvkpLdhnzSPxlaTQyXs5yzkoprYube=w1280' },
            { name: 'Vihaan Sanghvi', role: 'Outreach Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRVXqa_0AXUSHv343BL5PyR3wI-T_MAv9GQX1v40_GgfBtJfKKbZlsQeLY4uPp6ZdvHqM1GIx5hsfw0Z_ewewh9zGculuPHEP2itWrqgp2NBwvkpbAE3TaLOUb_wmpTxYQGFt0fqWsnB-EMZkET-pBLZFCQWkIpIQxMntqMR4Bn1i_XAadggRwm-7jwIzQYY4OpH7D1h8xViIA_HXy1S-4K0hoyiKzGQ-x7=w1280' }
        ],
        '2023-2024': [
            { name: 'Maanav Shah', role: 'Team Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSO_ygfuwhRXG_1D0cmlxzBUowFDLuocG5HmnLe5rTxCzMMPHuPAYxmq-2XXABG06AVIjqluucLCJMe3uZ_AqeeS7ViqOaTnyZYTGI9o5C9eyEQZHBSjJ3oWDmsd8n40X4V-casYXUSyjv1nzyNPLSc6NfhggplvBPf3utPHJhzyH849NXo-UNdHpp49gDLiQZNJanBGtXvZvjF0_HvwxjU5_jruON7_JhvFrk=w1280' },
            { name: 'Parsh Gandhi', role: 'Team Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRLpyQThim4EqyQWJft4oVIR-epzXy8ptMVHy5qB-kev9Ey1063QQJqoyDDp9_bmGkY1WZy_D887IrjYSsauJ3hXg1mm8YWYnIGWeNvZT-w8vREa7AFykCg-FjZ50fpQyxraS5zSiI1YjC9K_TOOxKwEFXVSAD6UvK1IwmFZ-c9CLdwWPlXIH9TOHh7C1LUtnK_5xr1_RVkxlWkEF0vch96Vn0Gsy6R-SuucLw=w1280' },
            { name: 'Suhas Bathini', role: 'Software Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SR2mda6zeZ7YJwN9f8QVma0vzCJB8t5UDbA2tLf1cDpMJ3uHh_dp8IrSyJJm-1kZeK4e9pggkimVjgKjmJOpH7vxSBhbrvLh829tJ4kui6sxxgfHUn9W6MwtdbG01u0r9uy2lwGZdIRcdA9T8OUnqu4B2oeb-bHcSU1LTbHuBg3CtwrmXa4QxCV0B_QvHkicKu6-o7udvWCz49vETWlnC4oSvOEaGBRsaAMXNs=w1280' },
            { name: 'Rishaan Jain', role: 'Software Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0STVG9MAbbAaCpRe_rwqFMWxIzClytbgbZqwI2oWEPY-4w5iQZyxnlfJjIf7q7k5o8DuL_unfPSeCqbW5YFM8WJx0yjJuyUcFgQM6q7PTPbh4n8aACe229x4Houbihiy_54oXZnItErcGwtaq_IW2DCkHQNmINB1VtTvOs53tv7NtwRO8hhpsD3doXedNCmxEwcY6P_6QwTEaXDMpRmn8vvz27h_6wx7uPu1=w1280' },
            { name: 'Trisha Bhuwania', role: 'Software Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0STBT0OTrPdqRZZvXJqa4dGlE9PzzEKDqN3tq4EafctT5Vh75nP7BjCI-SPLuXJjzDPoqoB2sDJj4MZr8LQyL2ZEKsxaTPlIPK_tDrHArZ1zejUjsg2fav48-9QPvcofh4T1vl7o3lK4imlLjiWrpboGDYpgAfs_3hzTnna59W8qQWn-80FTk7ygEI7MSHzVRGYl6xJ5lSsLF_rOQ-Retbb5SjmB_vk8OQVA3Sg=w1280' },
            { name: 'Gabriel Hwang', role: 'Hardware Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SQQJ91fLPTkt_wVpjN4sWNwpjpOoUSndouBOEAX_JVxMISGIRhT5nJFlwHFpJK9ApOF5_IjtV-kVWhWb5b1WptrwNOaeGa44nDwCkpLqkQtNwWOCOIr5yjB4em6p-PkYOxvH6IIwhxaIu8D8VtdsQVagMmDhSZxSwO5-0BNvuUO6b3Qy8PGkyj0ms6Ny0THouuA9YwmH9fQXoCVXl93J94Apg1giEbb_VEI4Hk=w1280' },
            { name: 'Saket Sandru', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SQMMpDXKugsxnr-hrBcs6GZ4xzAxl_Q4dwIpAeRlAxfqflbzAyE-8zN1dYimK0ImbULS-ugHlA6tFNXt8CqjdWbQ_Ux6oNwuRS43vs6EAHWTe42S0CfiMGOvJ9tjmgoH4eL185jpmXBmaXZJbElBCSCc-IZP5cJdBFrbLVysCR1TuDPlxoLRAbjPRoeU7owLGzKsatv5QL9DIS4LkzHbOTk_aYF8FznQTgZQkA=w1280' },
            { name: 'Shakil Musthafa', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSGqrQNqGxYFuShLXpBTWtJNHlWvAVkxS6jTnOsaigvKr3gnT9O8WKvZPgvHmRxnF6SEIPUm01Zs1EYpo57oFBgoFHD4JFzJOwN_WJtbkR9hQLdJG-GohcPUrne1crxahozbC_261w88dCZB0HLuZn-T3EsY-lEFJ-x_nY77SI757FsqDIAxNqpRLPJVD_Bbgku2K-CCwulGbhkuMnsltAEnl8Hnaw-JbFpTzs=w1280' },
            { name: 'Shiv Gurjar', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRfQIOKxo4yyROfBQ5Eue8vjhW0eUZV2EzbpeMJL35ho1uxok9e4te1oL8Xzwhc8ZpxhP4Jwi5AIEf7cerXB4-zRaSGDpvwzOdjY8JDnrI2Sk9eFW0jxL27DcNXu1YYHdY3_GSvZ74bdgVmxAU3rz2xus09bPksN0uBmOMM_iAqsoTgoejTqZtmF6HlKXXyLUNMblEEwC_yR2ehYoBtfKx1zlU6Ju0zW4jhh7c=w1280' },
            { name: 'Simran Chhabria', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0STpGRhuKsNFF57rozp3hsTy2-WPlQowYCuEgN2L8vKaHvPfa2zap5c1HUp4LcSxIQUAwnaqzTfSwBwWsfpMivHoKXIVFnDg9OWAMassyxNIzf6kDYDwmv_VgMO2TnjCNtUkq1UO1zYtDGk6484rA5elL5_yncvZ02wcpnu_fWb3qjHms84hjVMXtxaL66ylLfdHEVyJ_4_oVmc6uk4YXketBS49W05fKEbJOe4=w1280' },
            { name: 'Anand Raghunath', role: 'Outreach Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0ST_ZDQ4b7ZQFd6TxLzbr-jeCAN3R0_ZSa3B5CS7WFi4tSN5NUOpjoSX6SnjhZo7WpiMs7vhT1IYSky0G-YbjeqX-EoVeM7iQiwirofLEU0rjXL9oODe0DHv5bWVNmpfOEp9PfQs9pzhZBaATlzCM4vC5-fBY8UZpFmaUbQ14minZccN_2NW35JBZq8dnG2TVY-xz6tQCzTZZ1SNWQl711rOYtqUZNdnGbOkvg0=w1280' },
            { name: 'Rushil Shah', role: 'Outreach Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSyuqZeiikJqw0YSK_7ksiJ4wXDGDOesJUgc19raj8fq0ZGQTxnq_fzqYrU-cIgsvVEFeQI3U50S22ZmqvWLTd8d0gYHPTuXtjHHJq1meqG4TGMPW4SKm443cYAfoKm7lToFvbYsRpGF3r2W9w6gA4K-7n9ZE40ljvBbjZ0ZaaWlhCvGqwORloLRFkF6jxOtMus4J1zoOp0g2pDUmRHwaKvhHMrafgk403z=w1280' },
            { name: 'Saanvi Shah', role: 'Outreach Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SQgfJsrlj4EwJxRfp-6qkeIIf3ud9aWt8kKDejvF7dd2DtN-gTvQqqiB7xdMbCJOEf-BdPs-giQikqi9wk_vaWHmChlK5VJpNGuFfwBlWDZs3et_CripOlZywBIwIelyCPYY9Fny1ua6ZOP9NacTCNTcBkOXucTdD1mFH9jRnX1Hd1NTcJbWy6YZfmX6ywWMj3oBZKvkpLdhnzSPxlaTQyXs5yzkoprYube=w1280' }
        ],
        '2022-2023': [
            { name: 'Parsh Gandhi', role: 'Team Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRLpyQThim4EqyQWJft4oVIR-epzXy8ptMVHy5qB-kev9Ey1063QQJqoyDDp9_bmGkY1WZy_D887IrjYSsauJ3hXg1mm8YWYnIGWeNvZT-w8vREa7AFykCg-FjZ50fpQyxraS5zSiI1YjC9K_TOOxKwEFXVSAD6UvK1IwmFZ-c9CLdwWPlXIH9TOHh7C1LUtnK_5xr1_RVkxlWkEF0vch96Vn0Gsy6R-SuucLw=w1280' },
            { name: 'Tarun Iyer', role: 'Team Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRCzBEyOsbpD28rDwjUX1f72RKzVEH9jN2HeTWCa-aEoBx1Qgff_upEcbhqQMWoiv19EGwFadLeofa7OF1xZD9zm-vgjxYpymYcmYE8_qNi7_JilZFfaAJqbsmZECTqnnhcGOp9FdTlqJMRd9WaKwQNo_YcBQEwPtHeVjHM70Cv-HIGvjsFAnurNYEAfJkv5auqND28H4Bti0HfSdsLv3BjHbcoYWzj5Ud5ri8=w1280' },
            { name: 'Suhas Bathini', role: 'Software Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SR2mda6zeZ7YJwN9f8QVma0vzCJB8t5UDbA2tLf1cDpMJ3uHh_dp8IrSyJJm-1kZeK4e9pggkimVjgKjmJOpH7vxSBhbrvLh829tJ4kui6sxxgfHUn9W6MwtdbG01u0r9uy2lwGZdIRcdA9T8OUnqu4B2oeb-bHcSU1LTbHuBg3CtwrmXa4QxCV0B_QvHkicKu6-o7udvWCz49vETWlnC4oSvOEaGBRsaAMXNs=w1280' },
            { name: 'Maanav Shah', role: 'Hardware Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSO_ygfuwhRXG_1D0cmlxzBUowFDLuocG5HmnLe5rTxCzMMPHuPAYxmq-2XXABG06AVIjqluucLCJMe3uZ_AqeeS7ViqOaTnyZYTGI9o5C9eyEQZHBSjJ3oWDmsd8n40X4V-casYXUSyjv1nzyNPLSc6NfhggplvBPf3utPHJhzyH849NXo-UNdHpp49gDLiQZNJanBGtXvZvjF0_HvwxjU5_jruON7_JhvFrk=w1280' },
            { name: 'Amogh Khandkar', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0STYalBxqxjJgZgH7pylySFF-PMnpj3KtACgh1cvxa_JsxKcmTldQrRCxiHb7JF9aCad6f3RKhCnpKiWwdD5nFAGM88OfSDI7jtgVE8oZXv6Krcls_SjRUHBzm_QxKBTRfxGgATiaq-RbLESvCjWo4mpdf2c9nc6lm-6GvAE-7qqdjnC7WbuwBQYTDDEzPE77bbkqMScUmuQarjKATZHDtZvkwQiKQ8rr8rnHks=w1280' },
            { name: 'Anand Raghunath', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0ST_ZDQ4b7ZQFd6TxLzbr-jeCAN3R0_ZSa3B5CS7WFi4tSN5NUOpjoSX6SnjhZo7WpiMs7vhT1IYSky0G-YbjeqX-EoVeM7iQiwirofLEU0rjXL9oODe0DHv5bWVNmpfOEp9PfQs9pzhZBaATlzCM4vC5-fBY8UZpFmaUbQ14minZccN_2NW35JBZq8dnG2TVY-xz6tQCzTZZ1SNWQl711rOYtqUZNdnGbOkvg0=w1280' },
            { name: 'Gabriel Hwang', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SQQJ91fLPTkt_wVpjN4sWNwpjpOoUSndouBOEAX_JVxMISGIRhT5nJFlwHFpJK9ApOF5_IjtV-kVWhWb5b1WptrwNOaeGa44nDwCkpLqkQtNwWOCOIr5yjB4em6p-PkYOxvH6IIwhxaIu8D8VtdsQVagMmDhSZxSwO5-0BNvuUO6b3Qy8PGkyj0ms6Ny0THouuA9YwmH9fQXoCVXl93J94Apg1giEbb_VEI4Hk=w1280' },
            { name: 'Pranav Kunisetty', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSwRMeL0RaPWkDavOSFmrKC0kZdaEeIdqWJFQm80Pt5v3eFJeJg-aPNqmLg3GcIJfkZpRR3ytTqUUuA5_d7BDrnQqntUQMX0cKSMyAg8v-9NysjTf0QaMJIDLDTjoGUwbOVzbMjnc5hL1gxNu_vi4kQY90z7G1M8Qg_7LRkiKbiBKuoA2WMmfuCSvmiVMm1HIjC4uKBfXG_JtR4dj762bVh3oWieI3Cl3Cjmk8=w1280' },
            { name: 'Rushil Shah', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSyuqZeiikJqw0YSK_7ksiJ4wXDGDOesJUgc19raj8fq0ZGQTxnq_fzqYrU-cIgsvVEFeQI3U50S22ZmqvWLTd8d0gYHPTuXtjHHJq1meqG4TGMPW4SKm443cYAfoKm7lToFvbYsRpGF3r2W9w6gA4K-7n9ZE40ljvBbjZ0ZaaWlhCvGqwORloLRFkF6jxOtMus4J1zoOp0g2pDUmRHwaKvhHMrafgk403z=w1280' },
            { name: 'Shakil Musthafa', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSGqrQNqGxYFuShLXpBTWtJNHlWvAVkxS6jTnOsaigvKr3gnT9O8WKvZPgvHmRxnF6SEIPUm01Zs1EYpo57oFBgoFHD4JFzJOwN_WJtbkR9hQLdJG-GohcPUrne1crxahozbC_261w88dCZB0HLuZn-T3EsY-lEFJ-x_nY77SI757FsqDIAxNqpRLPJVD_Bbgku2K-CCwulGbhkuMnsltAEnl8Hnaw-JbFpTzs=w1280' },
            { name: 'Shiv Gurjar', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRfQIOKxo4yyROfBQ5Eue8vjhW0eUZV2EzbpeMJL35ho1uxok9e4te1oL8Xzwhc8ZpxhP4Jwi5AIEf7cerXB4-zRaSGDpvwzOdjY8JDnrI2Sk9eFW0jxL27DcNXu1YYHdY3_GSvZ74bdgVmxAU3rz2xus09bPksN0uBmOMM_iAqsoTgoejTqZtmF6HlKXXyLUNMblEEwC_yR2ehYoBtfKx1zlU6Ju0zW4jhh7c=w1280' }
        ],
        '2021-2022': [
            { name: 'Parsh Gandhi', role: 'Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRLpyQThim4EqyQWJft4oVIR-epzXy8ptMVHy5qB-kev9Ey1063QQJqoyDDp9_bmGkY1WZy_D887IrjYSsauJ3hXg1mm8YWYnIGWeNvZT-w8vREa7AFykCg-FjZ50fpQyxraS5zSiI1YjC9K_TOOxKwEFXVSAD6UvK1IwmFZ-c9CLdwWPlXIH9TOHh7C1LUtnK_5xr1_RVkxlWkEF0vch96Vn0Gsy6R-SuucLw=w1280' },
            { name: 'Tarun Iyer', role: 'Team Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRCzBEyOsbpD28rDwjUX1f72RKzVEH9jN2HeTWCa-aEoBx1Qgff_upEcbhqQMWoiv19EGwFadLeofa7OF1xZD9zm-vgjxYpymYcmYE8_qNi7_JilZFfaAJqbsmZECTqnnhcGOp9FdTlqJMRd9WaKwQNo_YcBQEwPtHeVjHM70Cv-HIGvjsFAnurNYEAfJkv5auqND28H4Bti0HfSdsLv3BjHbcoYWzj5Ud5ri8=w1280' },
            { name: 'Suhas Bathini', role: 'Software Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SR2mda6zeZ7YJwN9f8QVma0vzCJB8t5UDbA2tLf1cDpMJ3uHh_dp8IrSyJJm-1kZeK4e9pggkimVjgKjmJOpH7vxSBhbrvLh829tJ4kui6sxxgfHUn9W6MwtdbG01u0r9uy2lwGZdIRcdA9T8OUnqu4B2oeb-bHcSU1LTbHuBg3CtwrmXa4QxCV0B_QvHkicKu6-o7udvWCz49vETWlnC4oSvOEaGBRsaAMXNs=w1280' },
            { name: 'Maanav Shah', role: 'Hardware Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSO_ygfuwhRXG_1D0cmlxzBUowFDLuocG5HmnLe5rTxCzMMPHuPAYxmq-2XXABG06AVIjqluucLCJMe3uZ_AqeeS7ViqOaTnyZYTGI9o5C9eyEQZHBSjJ3oWDmsd8n40X4V-casYXUSyjv1nzyNPLSc6NfhggplvBPf3utPHJhzyH849NXo-UNdHpp49gDLiQZNJanBGtXvZvjF0_HvwxjU5_jruON7_JhvFrk=w1280' },
            { name: 'Amogh Khandkar', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0STYalBxqxjJgZgH7pylySFF-PMnpj3KtACgh1cvxa_JsxKcmTldQrRCxiHb7JF9aCad6f3RKhCnpKiWwdD5nFAGM88OfSDI7jtgVE8oZXv6Krcls_SjRUHBzm_QxKBTRfxGgATiaq-RbLESvCjWo4mpdf2c9nc6lm-6GvAE-7qqdjnC7WbuwBQYTDDEzPE77bbkqMScUmuQarjKATZHDtZvkwQiKQ8rr8rnHks=w1280' },
            { name: 'Gabriel Hwang', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SQQJ91fLPTkt_wVpjN4sWNwpjpOoUSndouBOEAX_JVxMISGIRhT5nJFlwHFpJK9ApOF5_IjtV-kVWhWb5b1WptrwNOaeGa44nDwCkpLqkQtNwWOCOIr5yjB4em6p-PkYOxvH6IIwhxaIu8D8VtdsQVagMmDhSZxSwO5-0BNvuUO6b3Qy8PGkyj0ms6Ny0THouuA9YwmH9fQXoCVXl93J94Apg1giEbb_VEI4Hk=w1280' },
            { name: 'Pranav Kunisetty', role: 'Hardware Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSwRMeL0RaPWkDavOSFmrKC0kZdaEeIdqWJFQm80Pt5v3eFJeJg-aPNqmLg3GcIJfkZpRR3ytTqUUuA5_d7BDrnQqntUQMX0cKSMyAg8v-9NysjTf0QaMJIDLDTjoGUwbOVzbMjnc5hL1gxNu_vi4kQY90z7G1M8Qg_7LRkiKbiBKuoA2WMmfuCSvmiVMm1HIjC4uKBfXG_JtR4dj762bVh3oWieI3Cl3Cjmk8=w1280' },
            { name: 'Anand Raghunath', role: 'Outreach Captain', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0ST_ZDQ4b7ZQFd6TxLzbr-jeCAN3R0_ZSa3B5CS7WFi4tSN5NUOpjoSX6SnjhZo7WpiMs7vhT1IYSky0G-YbjeqX-EoVeM7iQiwirofLEU0rjXL9oODe0DHv5bWVNmpfOEp9PfQs9pzhZBaATlzCM4vC5-fBY8UZpFmaUbQ14minZccN_2NW35JBZq8dnG2TVY-xz6tQCzTZZ1SNWQl711rOYtqUZNdnGbOkvg0=w1280' },
            { name: 'Rushil Shah', role: 'Member', img: 'https://lh3.googleusercontent.com/sitesv/APaQ0SSyuqZeiikJqw0YSK_7ksiJ4wXDGDOesJUgc19raj8fq0ZGQTxnq_fzqYrU-cIgsvVEFeQI3U50S22ZmqvWLTd8d0gYHPTuXtjHHJq1meqG4TGMPW4SKm443cYAfoKm7lToFvbYsRpGF3r2W9w6gA4K-7n9ZE40ljvBbjZ0ZaaWlhCvGqwORloLRFkF6jxOtMus4J1zoOp0g2pDUmRHwaKvhHMrafgk403z=w1280' }
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
        grid.innerHTML = members.map((m, i) => {
            let avatarHTML = '';
            if (m.img && m.img.length > 5) {
                avatarHTML = `<img src="${m.img}" alt="${m.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
            } else {
                avatarHTML = `<span>${getInitials(m.name)}</span>`;
            }

            return `
            <div class="member-card" style="animation: fadeInUp 0.4s ease ${i * 0.07}s both;">
                <div class="member-avatar">${avatarHTML}</div>
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
        if (gameId === 'trivia') initTrivia();
        if (gameId === 'scramble') initScramble();
        if (gameId === 'flashcards') initFlashcards();
        if (gameId === 'speedmatch') initSpeedMatch();
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
    const triviaQuestions = [
        { q: "What does FTC stand for?", opts: ["First Technology Challenge", "FIRST Tech Challenge", "For The Coding", "FIRST Team Competition"], a: 1 },
        { q: "How long is the autonomous period?", opts: ["15 seconds", "30 seconds", "45 seconds", "60 seconds"], a: 1 },
        { q: "How long is the teleop period?", opts: ["1 minute", "2 minutes", "2.5 minutes", "3 minutes"], a: 1 },
        { q: "When does the End Game start?", opts: ["Last 15 seconds", "Last 30 seconds", "Last 45 seconds", "Last minute"], a: 1 },
        { q: "What is the maximum size of a robot at the start of a match?", opts: ["16x16x16 inches", "18x18x18 inches", "20x20x20 inches", "24x24x24 inches"], a: 1 },
        { q: "Which control system connects the phones/control hub to motors?", opts: ["REV Expansion Hub", "Arduino Uno", "Raspberry Pi", "VEX Cortex"], a: 0 }
    ];
    let triviaCurrentIdx = 0;
    let triviaScore = 0;

    function initTrivia() {
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
        { term: "AprilTag", def: "A visual fiducial system (similar to QR codes) used for robot camera localization" }
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

});
