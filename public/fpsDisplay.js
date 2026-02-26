var FpsDisplay = pc.createScript('fpsDisplay');

FpsDisplay.prototype.initialize = function() {
    this.timer = 0;
    this.frames = 0;
};

FpsDisplay.prototype.update = function(dt) {
    this.frames++;
    this.timer += dt;
    if (this.timer >= 0.5) {
        var fps = Math.round(this.frames / this.timer);
        
        this.entity.element.text = "FPS: " + fps;
        
        if (fps < 30) {
            this.entity.element.color = new pc.Color(1, 0, 0); // Rot
        } else {
            this.entity.element.color = new pc.Color(0, 1, 0); // Grün
        }

        // Reset
        this.timer = 0;
        this.frames = 0;
    }
};
