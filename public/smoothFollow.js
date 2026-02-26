var SmoothFollow = pc.createScript('smoothFollow');

SmoothFollow.attributes.add('target', { type: 'entity', title: 'Target' });
SmoothFollow.attributes.add('smoothSpeed', { type: 'number', default: 0.125, title: 'Smoothness' });

SmoothFollow.prototype.initialize = function() {
    if (this.target) {
        this.offset = this.entity.getPosition().clone().sub(this.target.getPosition());
        this.fixedRotation = this.entity.getRotation().clone();
    }
};

SmoothFollow.prototype.postUpdate = function(dt) {
    if (!this.target) return;

    var targetPosition = this.target.getPosition();
    var desiredPosition = targetPosition.clone().add(this.offset);
    var currentPosition = this.entity.getPosition();
    currentPosition.lerp(currentPosition, desiredPosition, this.smoothSpeed);
    this.entity.setPosition(currentPosition);
    this.entity.setRotation(this.fixedRotation);
};
