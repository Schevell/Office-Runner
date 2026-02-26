var FadeEffect = pc.createScript('fadeEffect');

FadeEffect.attributes.add('duration', { type: 'number', default: 1.0 });
FadeEffect.attributes.add('gameRoot', { type: 'entity' });
FadeEffect.attributes.add('startButton', { type: 'entity' });
FadeEffect.attributes.add('titleText', { type: 'entity' });
FadeEffect.attributes.add('floatSpeed', { type: 'number', default: 2.0 });
FadeEffect.attributes.add('floatAmount', { type: 'number', default: 10.0 });

FadeEffect.prototype.initialize = function() {
    this.elements = this.entity.findComponents('element');
    this.fadeValue = 0;
    this.fadeDirection = 1; 
    this.isTransitioning = true;
    this.timer = 0;

    if (this.startButton) {
        this.baseScale = this.startButton.getLocalScale().clone();
    }
    
    if (this.titleText) {
        this.baseTextPos = this.titleText.getLocalPosition().clone();
    }

    this.setAllOpacity(0);
    this.app.on('ui:startClicked', this.startFadeOut, this);
};

FadeEffect.prototype.update = function(dt) {
    if (this.isTransitioning) {
        this.fadeValue += dt * (1 / this.duration) * this.fadeDirection;

        if (this.fadeValue >= 1 && this.fadeDirection === 1) {
            this.fadeValue = 1;
            this.isTransitioning = false;
        } else if (this.fadeValue <= 0 && this.fadeDirection === -1) {
            this.fadeValue = 0;
            this.isTransitioning = false;
            this.onFadeOutComplete(); 
        }

        this.setAllOpacity(this.fadeValue);
    }

    this.timer += dt;

    if (this.startButton && !this.isTransitioning && this.fadeDirection === 1) {
        var p = 1 + (Math.sin(this.timer * 3) * 0.05);
        this.startButton.setLocalScale(
            this.baseScale.x * p, 
            this.baseScale.y * p, 
            this.baseScale.z * p
        );
    }

    if (this.titleText && !this.isTransitioning && this.fadeDirection === 1) {
        var yOffset = Math.sin(this.timer * this.floatSpeed) * this.floatAmount;
        this.titleText.setLocalPosition(
            this.baseTextPos.x,
            this.baseTextPos.y + yOffset,
            this.baseTextPos.z
        );
    }
};

FadeEffect.prototype.startFadeOut = function() {
    this.fadeDirection = -1;
    this.isTransitioning = true;
};

FadeEffect.prototype.onFadeOutComplete = function() {
    this.entity.enabled = false;
    if (this.gameRoot) {
        this.gameRoot.enabled = true;
    }
};

FadeEffect.prototype.setAllOpacity = function(value) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].opacity = value;
    }
};
