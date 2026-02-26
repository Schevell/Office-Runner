var GameOverManager = pc.createScript('gameOverManager');

GameOverManager.attributes.add('gameOverPanel', { type: 'entity', title: 'Game Over Panel (UI)' });
GameOverManager.attributes.add('adButton', { type: 'entity', title: 'Werbung gucken Button' });
GameOverManager.attributes.add('continueButton', { type: 'entity', title: 'Continue Button (zu HomeUI)' });
GameOverManager.attributes.add('playerEntity', { type: 'entity', title: 'Player / Chair Entity' });
GameOverManager.attributes.add('gameWorldContainer', { type: 'entity', title: 'Game_World_Container' });
GameOverManager.attributes.add('uiHomeContainer', { type: 'entity', title: 'UI_Home_Container' });

GameOverManager.prototype.initialize = function() {
    if (this.gameOverPanel) {
        this.gameOverPanel.enabled = false;
    }

    if (this.adButton) {
        this.adButton.element.on('click', this.onAdButtonClick, this);
    }

    if (this.continueButton) {
        this.continueButton.element.on('click', this.onContinueButtonClick, this);
    }

    this.app.on('game:over', this.showGameOver, this);
};

GameOverManager.prototype.showGameOver = function() {
    this.app.fire('game:pause');
    if (this.gameOverPanel) {
        this.gameOverPanel.enabled = true;
    }
};

GameOverManager.prototype.onAdButtonClick = function() {
    if (window.crazygames && window.crazygames.SDK) {
        this.adButton.enabled = false;
        window.crazygames.SDK.game.requestRewardedVideo({
            callbacks: {
                onAdFinished: this.onAdSuccess.bind(this),
                onAdError: function() { 
                    console.warn('Ad Fehler');
                    this.adButton.enabled = true; 
                }.bind(this)
            }
        });
    } else {
        this.respawn();
    }
};

GameOverManager.prototype.onAdSuccess = function() {
    this.respawn();
};

GameOverManager.prototype.onContinueButtonClick = function() {
    this.app.fire('game:resume');

    if (this.gameOverPanel) {
        this.gameOverPanel.enabled = false;
    }

    var chair = this.playerEntity.script.chairController;
    if (chair) chair.fullReset();

    var levelGen = this.app.root.findByName('GameManager').script.levelGenerator;
    if (levelGen) levelGen.fullReset();

    if (this.gameWorldContainer) {
        this.gameWorldContainer.enabled = false;
    }

    if (this.uiHomeContainer) {
        this.uiHomeContainer.enabled = true;
    }

    this.app.fire('game:continueToHome');
};

GameOverManager.prototype.respawn = function() {
    if (this.gameOverPanel) {
        this.gameOverPanel.enabled = false;
    }

    if (this.adButton) {
        this.adButton.enabled = true;
    }

    this.app.fire('game:resume');
    this.app.fire('game:reset');
    this.app.fire('game:start');

    var chair = this.playerEntity.script.chairController;
    if (chair) chair.fullReset();

    var levelGen = this.app.root.findByName('GameManager').script.levelGenerator;
    if (levelGen) levelGen.fullReset();

    this.app.fire('game:respawn');
};
