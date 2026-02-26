var TriggerCheck = pc.createScript('triggerCheck');

TriggerCheck.prototype.initialize = function() {
    this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
};

TriggerCheck.prototype.onTriggerEnter = function(entity) {
    if (entity.name === 'Player') { 
        console.log("Kaffee eingesammelt!");
        
        // Globales Geld erhöhen
        if(!window.gameStats) window.gameStats = { coins: 0 };
        window.gameStats.coins += 1;
        this.entity.destroy();
    }
};
