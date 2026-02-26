var GameStateManager = pc.createScript('gameStateManager');

GameStateManager.prototype.initialize = function() {
    this.totalCups = parseInt(localStorage.getItem('totalCups')) || 0;
    this.currentCups = 0;

    this.app.on('game:over', this.onGameOver, this);
    this.app.on('game:respawn', this.onRespawn, this);
    this.app.on('game:continueToHome', this.onContinueToHome, this);
    
    console.log("[GameStateManager] Gestartet | Total Cups =", this.totalCups);
};

GameStateManager.prototype.update = function(dt) {
    if (window.gameStats && window.gameStats.coins !== undefined) {
        this.currentCups = window.gameStats.coins;
    }
};

GameStateManager.prototype.onGameOver = function() {
    this.totalCups += this.currentCups;
    localStorage.setItem('totalCups', this.totalCups);
    if (window.gameStats) window.gameStats.coins = 0;
    this.currentCups = 0;
    console.log("[GameStateManager] Neuer Total Cups =", this.totalCups);
};

GameStateManager.prototype.onRespawn = function() {
    console.log("[GameStateManager] Respawn nach Werbung");
    if (window.gameStats) window.gameStats.coins = 0;
    this.currentCups = 0;
};

GameStateManager.prototype.onContinueToHome = function() {
    console.log("[GameStateManager] Continue zu Home");
    if (window.gameStats) window.gameStats.coins = 0;
    this.currentCups = 0;
};
