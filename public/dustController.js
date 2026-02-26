var DustController = pc.createScript('dustController');

DustController.prototype.initialize = function() {
    this.player = this.entity.parent;
    this.particleSystem = this.entity.particlesystem;
};

DustController.prototype.update = function(dt) {
    var velocity = this.player.rigidbody.linearVelocity;
    var speed = velocity.z;

    if (speed > 2) {
        if (!this.particleSystem.isPlaying) {
            this.particleSystem.play();
        }
        this.particleSystem.rate = pc.math.lerp(0.2, 0.02, speed / 30);
    } else {
        this.particleSystem.stop();
    }
};
