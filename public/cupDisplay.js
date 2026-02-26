var CupDisplay = pc.createScript('cupDisplay');

CupDisplay.prototype.update = function(dt) {
    var currentCoins = (window.gameStats && window.gameStats.coins) ? window.gameStats.coins : 0;
    
    this.entity.element.text = "Cups: " + currentCoins;
};
