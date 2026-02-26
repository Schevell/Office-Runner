var TimerManager = pc.createScript('timerManager');

TimerManager.attributes.add('timerText', { type: 'entity', title: 'Timer Text-Entity' });

TimerManager.prototype.initialize = function() {
    this.elapsedTime = 0;
    this.isRunning = false;

    this.app.on('game:start', this.startTimer, this);
    this.app.on('game:over', this.stopTimer, this);
    this.app.on('game:reset', this.resetTimer, this);
    
    console.log("[TimerManager] Gestartet");
    this.updateDisplay();
};

TimerManager.prototype.update = function(dt) {
    if (this.isRunning) {
        this.elapsedTime += dt;
        this.updateDisplay();
    }
};

TimerManager.prototype.startTimer = function() {
    if (!this.isRunning) {
        this.isRunning = true;
        console.log("[TimerManager] Timer gestartet");
    }
};

TimerManager.prototype.stopTimer = function() {
    this.isRunning = false;
    console.log("[TimerManager] Timer gestoppt bei:", this.elapsedTime.toFixed(3));
};

TimerManager.prototype.resetTimer = function() {
    this.elapsedTime = 0;
    this.isRunning = false;
    this.updateDisplay();
    console.log("[TimerManager] Timer zurückgesetzt");
};

TimerManager.prototype.updateDisplay = function() {
    if (this.timerText && this.timerText.element) {
        this.timerText.element.text = this.elapsedTime.toFixed(3);
    } else {
        console.warn("[TimerManager] timerText nicht zugewiesen!");
    }
};
