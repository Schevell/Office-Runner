var ChairController = pc.createScript('chairController');

ChairController.prototype.initialize = function() {
    this.lanes = [-3, -1, 1, 3];
    this.currentLane = 1;
    this.targetX = this.lanes[this.currentLane];
    this.forwardSpeed = 7.5;
    this.minSpeed = 7.5;
    this.maxSpeed = 26;
    this.speedStep = 0.6;
    this.speedIncreaseInterval = 15;
    this.timeSinceLastSpeedUp = 0;
    this.lerpSpeed = 12;
    this.jumpForce = 9;
    this.isGrounded = true;
    this.verticalVelocity = 0;
    this.gravity = -20;
    this.maxTilt = 18;
    this.currentTilt = 0;
    this.gameOver = false;
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
};

ChairController.prototype.onCollisionStart = function(result) {
    if (result.other && result.other.tags.has('obstacle') && !this.gameOver) {
        this.gameOver = true;
        this.entity.rigidbody.type = pc.BODYTYPE_DYNAMIC;
        var side = Math.random() > 0.5 ? 1 : -1;
        this.entity.rigidbody.applyTorque(new pc.Vec3(0, 0, side * 300));
        this.entity.rigidbody.applyForce(new pc.Vec3(0, 0, -150));
        this.app.fire('game:over');
        this.forwardSpeed = 0;
    }
};

ChairController.prototype.update = function(dt) {
    if (this.gameOver) return;

    this.timeSinceLastSpeedUp += dt;
    if (this.timeSinceLastSpeedUp >= this.speedIncreaseInterval) {
        if (this.forwardSpeed < this.maxSpeed) {
            this.forwardSpeed += this.speedStep;
            if (this.forwardSpeed > this.maxSpeed) this.forwardSpeed = this.maxSpeed;
            console.log("[Chair] Speed erhöht! Neuer Speed:", this.forwardSpeed.toFixed(1));
        }
        this.timeSinceLastSpeedUp = 0;
    }

    if (this.app.keyboard.wasPressed(pc.KEY_D) || this.app.keyboard.wasPressed(pc.KEY_LEFT)) {
        if (this.currentLane > 0) this.currentLane--;
    }
    if (this.app.keyboard.wasPressed(pc.KEY_A) || this.app.keyboard.wasPressed(pc.KEY_RIGHT)) {
        if (this.currentLane < this.lanes.length - 1) this.currentLane++;
    }

    if (this.app.keyboard.wasPressed(pc.KEY_SPACE) && this.isGrounded) {
        this.verticalVelocity = this.jumpForce;
        this.isGrounded = false;
    }

    this.targetX = this.lanes[this.currentLane];
    var pos = this.entity.getPosition();

    if (!this.isGrounded) {
        this.verticalVelocity += this.gravity * dt;
        pos.y += this.verticalVelocity * dt;

        if (pos.y <= 0) {
            pos.y = 0;
            this.isGrounded = true;
            this.verticalVelocity = 0;
        }
    }

    var newZ = pos.z + this.forwardSpeed * dt;
    var newX = pc.math.lerp(pos.x, this.targetX, this.lerpSpeed * dt);

    var targetTilt = (this.targetX - newX) * this.maxTilt;
    this.currentTilt = pc.math.lerp(this.currentTilt, targetTilt, 15 * dt);

    this.entity.rigidbody.teleport(newX, pos.y, newZ, 0, 0, -this.currentTilt);
    
    this.zPos = newZ;
};

ChairController.prototype.fullReset = function() {
    this.gameOver = false;
    this.forwardSpeed = this.minSpeed;
    this.timeSinceLastSpeedUp = 0;
    this.currentLane = 1;
    this.targetX = this.lanes[1];
    this.currentTilt = 0;
    this.verticalVelocity = 0;
    this.isGrounded = true;
    this.entity.rigidbody.type = pc.BODYTYPE_KINEMATIC;
    this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
    this.entity.rigidbody.velocity = pc.Vec3.ZERO;
    this.entity.rigidbody.teleport(0, 0, 0);
    this.zPos = 0;
};
