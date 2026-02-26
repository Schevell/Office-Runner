var HomeCupDisplay = pc.createScript('homeCupDisplay');

HomeCupDisplay.attributes.add('totalCupsText', { 
    type: 'entity', 
    title: 'Text-Entity für Total Cups (z.B. "Gesamt: 42")' 
});

HomeCupDisplay.prototype.initialize = function() {
    this.app.on('ui:updateCups', this.onUpdateCups, this);
    this.updateTotalCups();
};

HomeCupDisplay.prototype.onUpdateCups = function(data) {
    this.updateTotalCups();
};

HomeCupDisplay.prototype.updateTotalCups = function() {
    var totalCups = parseInt(localStorage.getItem('totalCups')) || 0;
    
    if (this.totalCupsText && this.totalCupsText.element) {
        this.totalCupsText.element.text = "Gesamt Cups: " + totalCups;
    }
    
    console.log("[HomeCupDisplay] Total Cups aktualisiert: " + totalCups);
};
