document.addEventListener('DOMContentLoaded', () => {
    // Top-level Navigation elements
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const ctaButtons = document.querySelectorAll('.cta-nav');
    
    // Navbar Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            // Toggle icon
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
        // Find corresponding pane
        const targetPane = document.getElementById(targetId);
        
        if (!targetPane) return; // Prevent errors if target doesn't exist

        // Reset all buttons and panes
        navButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => {
            p.classList.add('hidden');
            // Remove animation class so we can re-trigger it
            p.classList.remove('fade-in');
        });

        // Activate matching button (if it exists in main nav)
        const matchingNavBtn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
        if (matchingNavBtn) {
            matchingNavBtn.classList.add('active');
        }

        // Show pane and trigger animation
        targetPane.classList.remove('hidden');
        // Force reflow
        void targetPane.offsetWidth;
        targetPane.classList.add('fade-in');

        // Close mobile menu if open
        if (navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            mobileMenuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
        }

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add click listeners to main nav buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    // Add click listeners to CTA buttons inside sections
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.currentTarget.getAttribute('data-target');
            switchTab(targetId);
        });
    });
    
    // Allow clicking logo to go home
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            switchTab('home');
        });
    }
});
