/**
 * Game Loader for Alphabots Website
 * Manages modular game loading into the main application.
 */

window.AlphabotsGameLoader = {
    currentGame: null,
    
    /**
     * Loads a game into the specified container.
     * @param {string} gameId - The ID of the game folder.
     * @param {HTMLElement} container - The container to load the game into.
     */
    load: function(gameId, container) {
        if (!container) return;
        
        // Clear previous game
        container.innerHTML = '';
        
        // Create iframe for isolation
        const iframe = document.createElement('iframe');
        iframe.src = `games/${gameId}/index.html`;
        iframe.className = 'game-iframe';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; fullscreen');
        
        // Handle loading
        iframe.onload = () => {
            console.log(`Game loaded: ${gameId}`);
            this.currentGame = gameId;
            
            // Sync theme variables if needed
            const rootStyles = getComputedStyle(document.documentElement);
            const brandGreen = rootStyles.getPropertyValue('--brand-green').trim();
            iframe.contentWindow.postMessage({ type: 'init', theme: { brandGreen } }, '*');
        };
        
        container.appendChild(iframe);
    },
    
    /**
     * Unloads the current game.
     * @param {HTMLElement} container 
     */
    unload: function(container) {
        if (container) container.innerHTML = '';
        this.currentGame = null;
    }
};

// Listen for messages from games (e.g., high scores, confetti)
window.addEventListener('message', (event) => {
    if (!event.data || !event.data.type) return;
    
    switch (event.data.type) {
        case 'game_win':
            if (window.confetti) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
            // Record game played globally
            if (window.recordGamePlayed) window.recordGamePlayed();
            break;
            
        case 'update_high_score':
            const { gameId, score } = event.data;
            localStorage.setItem(`hs-${gameId}`, score);
            // Update UI elements that show high scores
            document.querySelectorAll(`#hs-${gameId} span`).forEach(el => el.textContent = score);
            break;
            
        case 'shake':
            if (window.shakeElement) {
                const gameContainer = document.getElementById('game-modal-container');
                window.shakeElement(gameContainer);
            }
            break;
    }
});
